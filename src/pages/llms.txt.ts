// /llms.txt — prerendered at build time so the review score/count in the
// description always match src/data/reviewStats.json (auto-updated by the
// RC pipeline). Edit the words in src/data/llms.template.txt, not here.
import template from "../data/llms.template.txt?raw";
import stats from "../data/reviewStats.json";

const body = template
  .replaceAll("{{HOMECARE_SCORE}}", stats.homecare.score)
  .replaceAll("{{HOMECARE_COUNT}}", String(stats.homecare.count));

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
