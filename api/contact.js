// Vercel serverless function — handles contact-form submissions.
// Lives in /api (Vercel-native function), so the Astro static build stays untouched.
// Emails each enquiry via Resend. Goes live the moment RESEND_API_KEY is set in
// the Vercel project's Environment Variables — until then it accepts submissions
// and reports "email not yet configured" so nothing errors.

const CONTACT_TO = process.env.CONTACT_TO || "hello@otterhomecare.co.uk";
// Until the otterhomecare.co.uk domain is verified in Resend, sends must come from
// Resend's shared onboarding domain. Swap to website@otterhomecare.co.uk post-verify.
const CONTACT_FROM = process.env.CONTACT_FROM || "Otter Website <onboarding@resend.dev>";

const esc = (s = "") =>
  String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Vercel auto-parses JSON and urlencoded bodies into req.body.
  // Handles both the simple contact form (firstName/lastName/message) and the
  // booking form (name/phone/who/area/msg).
  const body = req.body || {};
  const {
    firstName = "", lastName = "", name: nameField = "",
    email = "", phone = "", consent = "",
    who = "", area = "",
  } = body;
  const message = (body.message || body.msg || "").toString();

  // Spam honeypot: bots fill the hidden "company" field; humans never see it.
  if (body.company) return res.status(200).json({ ok: true }); // silently drop

  const name = (nameField || [firstName, lastName].filter(Boolean).join(" ")).trim();
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  // Need a name and at least one way to reach them (valid email OR a phone number).
  if (!name || (!emailValid && !phone.trim())) {
    return res.status(400).json({ ok: false, error: "Please add your name and a phone number or email." });
  }

  const wantsFormRedirect = (req.headers["accept"] || "").includes("text/html");

  // If Resend isn't configured yet, accept the submission so the POC works,
  // but make it clear email isn't wired up.
  if (!process.env.RESEND_API_KEY) {
    if (wantsFormRedirect) return res.redirect(303, "/thank-you");
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
        subject: `Website enquiry from ${name}`,
        html: `
          <h2>New enquiry from the Otter Homecare website</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Phone:</strong> ${esc(phone) || "—"}</p>
          <p><strong>Email:</strong> ${esc(email) || "—"}</p>
          ${who ? `<p><strong>Care for:</strong> ${esc(who)}</p>` : ""}
          ${area ? `<p><strong>Area:</strong> ${esc(area)}</p>` : ""}
          ${consent ? `<p><strong>Marketing opt-in:</strong> Yes</p>` : ""}
          <hr>
          <p style="white-space:pre-wrap">${esc(message) || "(no message)"}</p>
        `,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("Resend error:", r.status, detail);
      return res.status(502).json({ ok: false, error: "Could not send right now — please call us on 01225 690022." });
    }
  } catch (err) {
    console.error("Contact handler error:", err);
    return res.status(500).json({ ok: false, error: "Something went wrong — please call us on 01225 690022." });
  }

  if (wantsFormRedirect) return res.redirect(303, "/thank-you");
  return res.status(200).json({ ok: true, emailed: true });
}
