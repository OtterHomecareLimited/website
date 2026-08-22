#!/usr/bin/env node
/**
 * Fails the build if a design-handoff placeholder comment survives into src/.
 *
 * Why this exists: on 22 Aug 2026 a handoff said
 *
 *     {\/* UNCHANGED — the existing <details> and .calc-checked paragraph go here
 *         exactly as they are today. *\/}
 *
 * and that comment was pasted into the page in place of the content it was
 * telling us to keep. It silently deleted six paragraphs from
 * /home-care-vs-care-home — including the "we are not financial advisers"
 * caveat on a section about Deferred Payment Agreements, and the "Figures
 * checked" provenance line. It shipped, and nothing caught it: the page still
 * built, still validated, still looked finished. Only reading the source by
 * chance found it, days later.
 *
 * The signature is generic — a handoff instructs, the instruction gets pasted
 * instead of honoured — so the check is generic too.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../src", import.meta.url).pathname;

// Phrases that only ever appear in an instruction TO the implementer. Kept
// deliberately narrow: each must be something no real page copy would say.
const MARKERS = [
  /UNCHANGED\s+—\s+the existing/i,
  /\bgoes? here\b[\s\S]{0,40}\bexactly as (they|it) (are|is) today\b/i,
  /\bpaste[- ]ready\b/i,
  /\bexisting .{0,60}\bgoes here\b/i,
  /\bTODO\b.{0,40}\bhandoff\b/i,
  /\bleave (this|these) as (is|they are)\b.{0,30}\*\//i,
];

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(astro|md|mdx|html)$/.test(e)) files.push(full);
  }
})(ROOT);

const hits = [];
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const m of MARKERS) {
      if (m.test(line)) hits.push({ f: f.replace(ROOT, "src"), n: i + 1, line: line.trim() });
    }
  });
}

if (hits.length) {
  console.error("\n✗ handoff placeholder left in source — content was probably dropped:\n");
  for (const h of hits) console.error(`  ${h.f}:${h.n}\n    ${h.line.slice(0, 120)}\n`);
  console.error("  A handoff told you to keep something. Go and put it back.\n");
  process.exit(1);
}

console.log(`placeholder check passed — ${files.length} files`);
