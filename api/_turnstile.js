// Shared Cloudflare Turnstile verification for the two form endpoints.
//
// Underscore-prefixed so Vercel treats it as a module rather than a route.
//
// This lives in one place deliberately. Both /api/contact and /api/apply sit in
// front of someone trying to reach a care company — a family enquiring, or a
// carer applying for work — and the rule that governs both is the same: never
// lose a real submission silently. Two copies of this logic would drift, and
// the copy that drifted would be the one that quietly dropped somebody.
//
// Returns a state; the caller decides what to do with it, because the two
// endpoints answer differently (contact may have to reply with a whole HTML
// page for a no-JS post, apply is always fetch/JSON).
//
//   off         no secret configured — behave exactly as before Turnstile
//   pass        verified
//   missing     no token at all — the shape a direct scripted POST has
//   fail        Cloudflare rejected it ({ stale } true if it merely expired)
//   unreachable we could not reach Cloudflare — fail OPEN, never punish the
//               visitor for our own dependency having a bad day

export async function verifyTurnstile({ token, ip }) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { state: "off" };
  if (!token) return { state: "missing" };

  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    const verdict = await r.json();
    if (verdict && verdict.success) return { state: "pass" };
    const codes = (verdict && verdict["error-codes"]) || [];
    return {
      state: "fail",
      // A token expires after ~5 minutes. Someone upset, elderly, or
      // interrupted mid-form will hit this routinely, and it is not their
      // fault — so it gets its own wording rather than a security scolding.
      stale: codes.includes("timeout-or-duplicate") || codes.includes("invalid-input-response"),
    };
  } catch {
    return { state: "unreachable" };
  }
}

// Plain-English reason, always carrying the phone number so a refusal is a
// route through rather than a dead end.
export function turnstileMessage({ state, stale }) {
  if (state === "missing") {
    return "We could not complete the security check — it may have been blocked by your browser or your network. " +
           "Please try again, or ring us on 01225 690022 and we will take the details over the phone.";
  }
  if (stale) {
    return "That took a little while, so the security check timed out. Please send it once more — " +
           "or ring us on 01225 690022 and we will take the details over the phone.";
  }
  return "We could not complete the security check. Please try again, or ring us on 01225 690022 " +
         "and we will take the details over the phone.";
}

export function clientIp(req) {
  return (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
}
