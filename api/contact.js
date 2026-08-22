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

  // 6 · Faker surnames. Every name in the 22 Aug run — Kozey, Legros, Oberbrunner,
  //     Yundt, Rath, Feeney, Lockman, Hermiston — comes from the surname list in
  //     the Faker library, which is what most form-spam tooling generates from.
  //     These are real surnames and someone could genuinely be called Rath, so
  //     this TAGS and never drops. It is deliberately narrow: distinctive entries
  //     only, not common names that happen to be in the list.
  const FAKER_SURNAMES = new Set([
    "abbott","altenwerth","anderson","bahringer","bailey","balistreri","barrows","bartell",
    "bartoletti","bashirian","batz","bauch","baumbach","bayer","beahan","beatty","bechtelar",
    "becker","bednar","beier","berge","bergnaum","bergstrom","bernhard","bernier","blanda",
    "blick","bode","boehm","bogan","bogisich","borer","bosco","botsford","boyer","boyle",
    "braun","bruen","buckridge","carroll","carter","cartwright","casper","cassin","champlin",
    "christiansen","cole","collier","collins","conn","connelly","conroy","considine","corkery",
    "cormier","corwin","cronin","crooks","cruickshank","cummerata","cummings","dach","damore",
    "daniel","dare","daugherty","davis","deckow","denesik","dibbert","dickens","dicki","dietrich",
    "donnelly","dooley","douglas","doyle","durgan","ebert","effertz","eichmann","emard","emmerich",
    "erdman","ernser","fadel","fahey","farrell","fay","feeney","feest","feil","ferry","fisher",
    "flatley","frami","franecki","friesen","fritsch","funk","gerhold","gerlach","gibson","gislason",
    "gleason","glover","goldner","goodwin","gorczany","gottlieb","goyette","grady","graham","grant",
    "green","greenfelder","greenholt","gulgowski","gusikowski","gutkowski","gutmann","haag","hackett",
    "hagenes","hahn","haley","halvorson","hamill","hammes","hand","hane","hansen","harber","harris",
    "hartmann","harvey","hauck","hayes","heaney","heathcote","hegmann","heidenreich","heller",
    "herman","hermann","hermiston","herzog","hessel","hettinger","hickle","hilll","hills","hilpert",
    "hintz","hirthe","hodkiewicz","hoeger","homenick","hoppe","howe","howell","hudson","huel",
    "huels","hyatt","jacobi","jacobs","jacobson","jakubowski","jaskolski","jast","jenkins","jerde",
    "johns","johnson","johnston","jones","kassulke","kautzer","keebler","keeling","kemmer","kerluke",
    "kertzmann","kessler","kiehn","kihn","kilback","king","kirlin","klein","kling","klocko","koch",
    "koelpin","koepp","kohler","konopelski","koss","kovacek","kozey","krajcik","kreiger","kris",
    "kshlerin","kuhic","kuhlman","kuhn","kulas","kunde","kunze","kuphal","kutch","kuvalis","labadie",
    "lakin","lang","langosh","langworth","larkin","larson","leannon","lebsack","ledner","leffler",
    "legros","lehner","lemke","lesch","leuschke","lind","lindgren","littel","little","lockman",
    "lowe","lubowitz","lueilwitz","luettgen","lynch","macejkovic","maggio","mann","mante","marks",
    "marquardt","marvin","mayer","mayert","mccullough","mcdermott","mcglynn","mckenzie","mclaughlin",
    "medhurst","mertz","metz","miller","mills","mitchell","moen","mohr","monahan","moore","morar",
    "morissette","mosciski","mraz","mueller","muller","murazik","murphy","murray","nader","nicolas",
    "nienow","nikolaus","nitzsche","nolan","oberbrunner","ohara","okeefe","okon","olson","ondricka",
    "oreilly","orn","ortiz","osinski","pacocha","padberg","pagac","parisian","parker","paucek",
    "pfannerstill","pfeffer","pollich","pouros","powlowski","predovic","price","prohaska","prosacco",
    "purdy","quigley","quitzon","rath","ratke","rau","raynor","reichel","reichert","reilly",
    "reinger","rempel","renner","reynolds","rice","rippin","ritchie","robel","roberts","rodriguez",
    "rogahn","rohan","rolfson","romaguera","roob","rosenbaum","rowe","ruecker","runolfsdottir",
    "runolfsson","runte","russel","rutherford","ryan","sanford","satterfield","sauer","sawayn",
    "schaden","schaefer","schamberger","schiller","schimmel","schinner","schmeler","schmidt","schmitt",
    "schneider","schoen","schowalter","schroeder","schulist","schultz","schumm","schuppe","schuster",
    "senger","shanahan","shields","simonis","sipes","skiles","smith","smitham","spencer","spinka",
    "sporer","stamm","stanton","stark","stehr","steuber","stiedemann","stokes","stoltenberg","stracke",
    "streich","stroman","strosin","swaniawski","swift","terry","thiel","thompson","tillman","torp",
    "torphy","towne","toy","trantow","tremblay","treutel","tromp","turcotte","turner","ullrich",
    "upton","vandervort","veum","volkman","von","vonrueden","waelchi","walker","walsh","walter",
    "ward","waters","watsica","weber","wehner","weimann","weissnat","welch","west","white",
    "wiegand","wilderman","wildman","wilkinson","will","williamson","willms","windler","wintheiser",
    "wisoky","wisozk","witting","wiza","wolf","wolff","wuckert","wunsch","wyman","yost","young",
    "yundt","zboncak","zemlak","ziemann","zieme","zulauf",
  ]);
  // Common surnames that are also in Faker's list — never flag on these alone.
  const TOO_COMMON = new Set(["smith","jones","davis","miller","johnson","williamson","walker","turner",
    "murphy","murray","moore","mitchell","white","young","ward","walsh","price","parker","cole",
    "carter","collins","graham","grant","green","harris","hayes","hudson","jenkins","king","klein",
    "lang","little","lowe","lynch","mann","marks","reilly","reynolds","rice","roberts","rodriguez",
    "rowe","ryan","schmidt","schneider","shields","spencer","stokes","terry","thompson","west",
    "wilkinson","wolf","fisher","fay","funk","hansen","hand","howe","howell","koch","olson"]);
  const surname = name.trim().split(/\s+/).pop().toLowerCase().replace(/[^a-z]/g, "");
  if (surname && FAKER_SURNAMES.has(surname) && !TOO_COMMON.has(surname)) {
    suspicion.push("name matches the Faker test-data surname list");
  }

  // 7 · Burst. Serverless memory is per-instance and short-lived, so this is
  //     best-effort rather than a real rate limit — but a burst from one source
  //     usually lands on a warm instance, and it costs nothing. Tags only.
  //
  //     Two guards learned the hard way in testing: if there is no forwarded IP
  //     we skip this entirely rather than pooling every visitor into a shared
  //     "unknown" bucket (which tagged the third genuine enquiry of the day),
  //     and the threshold is 5, not 3 — households behind one router and whole
  //     towns behind carrier-grade NAT share an address, and a family that
  //     submits twice after a typo must never be treated as a bot.
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  if (ip) {
    globalThis.__otterSeen = globalThis.__otterSeen || new Map();
    const seen = globalThis.__otterSeen;
    const nowMs = Date.now();
    for (const [k, times] of seen) {
      const keep = times.filter((t) => nowMs - t < 15 * 60 * 1000);
      keep.length ? seen.set(k, keep) : seen.delete(k);
    }
    const mine = seen.get(ip) || [];
    mine.push(nowMs);
    seen.set(ip, mine);
    if (mine.length > 5) suspicion.push(mine.length + " submissions from this address in 15 minutes");
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
