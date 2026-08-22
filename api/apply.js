// Vercel serverless function — handles careers applications (with CV attachment).
// Mirrors /api/contact.js conventions. The CV arrives as base64 JSON (client caps
// at 3MB raw — Vercel's function body limit is 4.5MB and base64 inflates ~33%).

const CONTACT_TO = process.env.CONTACT_TO || "hello@otterhomecare.co.uk";
const CONTACT_FROM = process.env.CONTACT_FROM || "Otter Website <onboarding@resend.dev>";

const MAX_CV_BYTES = 3 * 1024 * 1024; // 3MB raw
const OK_EXT = /\.(pdf|doc|docx)$/i;

import { verifyTurnstile, turnstileMessage, clientIp } from "./_turnstile.js";

const esc = (s = "") =>
  String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = req.body || {};
  const { name = "", phone = "", email = "", role = "", cvName = "", cvData = "" } = body;

  // Spam honeypot — same convention as /api/contact.
  // Honeypots. "company" was the only guard here until 22 Aug 2026, hidden with
  // display:none — the most guessed field name, hidden the most detectable way.
  // "website" matches the enquiry forms: a plausible name, moved off-screen
  // rather than hidden, so a bot that skips known honeypots still fills it.
  // A human cannot reach either, so these are the only things we drop on.
  if (body.company || body.website) return res.status(200).json({ ok: true });

  // Turnstile. This endpoint was left open when /api/contact was hardened, and
  // it is the softer target of the two: no origin check, no timing check, no
  // rate limit, and it accepts file uploads. Same contract as the enquiry form
  // — unconfigured is a no-op, Cloudflare being unreachable fails open, and a
  // refusal always says why and gives the phone number. Somebody applying for
  // a care job must never be turned away with an unexplained error.
  {
    const ts = await verifyTurnstile({
      token: (body["cf-turnstile-response"] || "").toString(),
      ip: clientIp(req),
    });
    if (ts.state === "missing" || ts.state === "fail") {
      return res.status(400).json({ ok: false, error: turnstileMessage(ts) });
    }
  }

  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!name.trim() || (!emailValid && !phone.trim())) {
    return res.status(400).json({ ok: false, error: "Please add your name and a phone number or email." });
  }

  // CV is optional (some people apply first, send a CV after) — but if present, validate it.
  let attachment = null;
  if (cvData) {
    if (!OK_EXT.test(cvName || "")) {
      return res.status(400).json({ ok: false, error: "Please attach your CV as a PDF, DOC or DOCX." });
    }
    const approxBytes = Math.floor(cvData.length * 0.75);
    if (approxBytes > MAX_CV_BYTES) {
      return res.status(400).json({ ok: false, error: "That file is over 3MB — please attach a smaller copy, or email it to hello@otterhomecare.co.uk." });
    }
    attachment = { filename: cvName.replace(/[^\w.\- ]/g, "_"), content: cvData };
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(200).json({ ok: true, emailed: false, note: "Resend not configured yet" });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        ...(emailValid ? { reply_to: email } : {}),
        subject: `Job application — ${role || "role not specified"} — ${name}`,
        html: `
          <h2>New job application from the Otter Homecare website</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Phone:</strong> ${esc(phone) || "—"}</p>
          <p><strong>Email:</strong> ${esc(email) || "—"}</p>
          <p><strong>Role:</strong> ${esc(role) || "—"}</p>
          <p><strong>CV:</strong> ${attachment ? esc(attachment.filename) + " (attached)" : "not attached"}</p>
        `,
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("Resend error (apply):", r.status, detail);
      return res.status(502).json({ ok: false, error: "Could not send right now — please email hello@otterhomecare.co.uk or call 01225 690022." });
    }
  } catch (err) {
    console.error("Apply handler error:", err);
    return res.status(500).json({ ok: false, error: "Something went wrong — please email hello@otterhomecare.co.uk." });
  }

  return res.status(200).json({ ok: true, emailed: true });
}
