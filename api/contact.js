// Vercel serverless function — handles contact-form submissions.
// Lives in /api (Vercel-native function), so the Astro static build stays untouched.
// Emails each enquiry via Resend. Goes live the moment RESEND_API_KEY is set in
// the Vercel project's Environment Variables — until then it accepts submissions
// and reports "email not yet configured" so nothing errors.

// Comma-separated, so an enquiry can reach more than one mailbox. This matters: the Report
// Centre's enquiry counter reads hello@, while the office actually works out of jamie@ — if
// CONTACT_TO names only one of them the other sees nothing, and the RC silently reports zero
// enquiries. Set CONTACT_TO in Vercel to "hello@otterhomecare.co.uk, jamie@otterhomecare.co.uk".
const CONTACT_TO = (process.env.CONTACT_TO || "hello@otterhomecare.co.uk")
  .split(",").map((s) => s.trim()).filter(Boolean);
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
    // Provenance, collected from the URL/referrer at submit time by window.otterAdSource
    // (SiteLayout head). Nothing is stored on the visitor's device to produce these.
    gclid = "", gbraid = "", wbraid = "", gad_source = "",
    utm_source = "", utm_medium = "", utm_campaign = "",
    page = "", referrer = "",
  } = body;
  const message = (body.message || body.msg || "").toString();

  // ── Spam handling ─────────────────────────────────────────────────────────
  // Six Faker-generated submissions arrived in half an hour on 22 Aug 2026
  // (Lelia Lockman, Wava Kozey, Garland Feeney…). The only defence was a
  // honeypot named "company" hidden with display:none — the most guessed name,
  // hidden the most detectable way — so current tooling walked straight past it.
  //
  // GOVERNING RULE: for a care company, silently losing one real enquiry is far
  // worse than receiving a hundred junk ones. Someone ringing round in a crisis
  // must always get through. So we DROP only where a human physically could not
  // have produced the submission, and otherwise let it through with the subject
  // tagged so the office can filter it. Nothing borderline is ever discarded.

  // 1 · Honeypots — the only certain signal. A human cannot fill these: both are
  //     off-screen rather than display:none (which bots detect and skip), and
  //     "website" is a plausible-looking field name rather than the usual
  //     "company", so a bot that avoids known honeypots still fills it.
  if (body.company || body.website) return res.status(200).json({ ok: true });


  const name = (nameField || [firstName, lastName].filter(Boolean).join(" ")).trim();
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  // Everything below only ever RAISES SUSPICION. None of it drops anything.
  const suspicion = [];

  // 2 · Origin. A browser posting our own form sends an Origin or Referer on our
  //     host. A script posting the endpoint directly usually sends neither, or
  //     sends someone else's. Missing is treated as neutral: privacy tooling
  //     strips these, and no-JS form posts vary by browser.
  const originHdr = req.headers.origin || req.headers.referer || "";
  if (originHdr && !/^https?:\/\/(www\.)?otterhomecare\.co\.uk/.test(originHdr)) {
    suspicion.push("posted from " + originHdr);
  }

  // 3 · Time on form. The page stamps ts on load; a person needs several seconds
  //     to type a name and number. Absent ts is neutral — no-JS users have none.
  const ts = parseInt(body.ts, 10);
  if (ts && Number.isFinite(ts)) {
    const seconds = (Date.now() - ts) / 1000;
    if (seconds < 3) suspicion.push("form completed in " + seconds.toFixed(1) + "s");
    if (seconds > 60 * 60 * 12) suspicion.push("form page was " + Math.round(seconds / 3600) + "h old");
  }

  // 4 · Links in the message. Real enquiries about care for a parent do not
  //     contain URLs; link-dropping is most of what this kind of spam is for.
  const links = (message.match(/https?:\/\/|www\.|\[url|<a\s/gi) || []).length;
  if (links) suspicion.push(links + " link(s) in the message");

  // 5 · Cyrillic or CJK in a West Wiltshire enquiry form.
  if (/[\u0400-\u04FF\u4E00-\u9FFF]/.test(name + " " + message)) {
    suspicion.push("non-Latin script");
  }

  const suspect = suspicion.length > 0;

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

  // "Came from" line for the team. A Google Ads click ID (gclid, or gbraid/wbraid when iOS
  // privacy suppresses gclid) is hard proof the visitor arrived on a paid click — that is the
  // line to trust when judging whether the ads are producing enquiries. No click ID means the
  // enquiry was NOT a tracked ad click.
  const adClickId = gclid || gbraid || wbraid;
  const cameFrom =
    adClickId    ? "Google Ads — paid click"
    : gad_source ? "Google Ads (no click ID captured)"
    : utm_source ? `${utm_source}${utm_medium ? ` / ${utm_medium}` : ""}`
    : referrer   ? referrer
    :              "Direct or unknown — not a tracked ad click";

  const sourceHtml = `
          <hr>
          <p style="font-size:13px;color:#555"><strong>Came from:</strong> ${esc(cameFrom)}</p>
          ${adClickId ? `<p style="font-size:12px;color:#777"><strong>Google click ID:</strong> ${esc(adClickId)}</p>` : ""}
          ${utm_campaign ? `<p style="font-size:13px;color:#555"><strong>Campaign:</strong> ${esc(utm_campaign)}</p>` : ""}
          ${page ? `<p style="font-size:13px;color:#555"><strong>Page used:</strong> ${esc(page)}</p>` : ""}`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        ...(emailValid ? { reply_to: email } : {}),
        subject: `${suspect ? "[likely spam] " : ""}Website enquiry from ${name}`,
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
          ${sourceHtml}
            ${suspect ? `<hr><p style="font-size:13px;color:#a33"><strong>Flagged as likely spam:</strong> ${esc(suspicion.join("; "))}. Delivered anyway — a possible enquiry is never discarded.</p>` : ""}
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
