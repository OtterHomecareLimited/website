// Pre-generates AVIF + WebP variants for the site's heavier photography.
//
// Why a script and not Astro's <Image>: our photos live in public/ (they are
// referenced by hand-written markup and by markdown content), and Astro's
// <Image> only optimises assets imported from src/. Rather than relocate 139
// files and rewrite every reference, this emits variants next to the originals
// and <Photo> serves them through a <picture> with the original as fallback.
//
// Only images at or above MIN_KB are processed — below that, the extra requests
// and the AVIF encode cost outweigh the saving. Output goes to public/img/opt/
// (gitignored) and is regenerated on demand; unchanged files are skipped, so
// repeat builds are cheap.
//
// Run: npm run images   (also runs automatically via prebuild)

import { readdir, stat, mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { createHash } from "node:crypto";

// Scans both folders: /img holds the photography, but /assets holds the logos
// and mascot art — homecare-logo.png alone was 126KB, heavier than the hero
// photo, and was never being touched because only /img was scanned.
const SRC_DIRS = [path.resolve("public/img"), path.resolve("public/assets")];
const SRC_ROOT = path.resolve("public");
const OUT_DIR = path.resolve("public/opt");
const MANIFEST = path.join(OUT_DIR, "manifest.json");
const MIN_KB = 70;
const WIDTHS = [480, 768, 1200, 1800];
const EXT = /\.(jpe?g|png)$/i;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (p === OUT_DIR) continue; // never recurse into our own output
      out.push(...(await walk(p)));
    } else if (EXT.test(entry.name)) {
      out.push(p);
    }
  }
  return out;
}

async function hashOf(file) {
  return createHash("sha1").update(await readFile(file)).digest("hex").slice(0, 12);
}

const manifest = existsSync(MANIFEST)
  ? JSON.parse(await readFile(MANIFEST, "utf8"))
  : {};

const files = (await Promise.all(SRC_DIRS.map(walk))).flat();
let built = 0;
let skipped = 0;
let savedBytes = 0;
const next = {};

for (const file of files) {
  const info = await stat(file);
  const rel = path.relative(SRC_ROOT, file);
  if (info.size < MIN_KB * 1024) continue;

  const key = rel.replace(/\\/g, "/");
  const hash = await hashOf(file);
  const meta = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w <= (meta.width ?? 0));
  if (widths.length === 0) widths.push(meta.width ?? 0);

  const base = key.replace(EXT, "");
  next[key] = { hash, width: meta.width, height: meta.height, widths, base };

  if (manifest[key]?.hash === hash) {
    // verify the outputs still exist before trusting the cache
    const allPresent = widths.every((w) =>
      ["avif", "webp"].every((f) => existsSync(path.join(OUT_DIR, `${base}-${w}.${f}`))),
    );
    if (allPresent) {
      skipped++;
      continue;
    }
  }

  await mkdir(path.join(OUT_DIR, path.dirname(key)), { recursive: true });
  for (const w of widths) {
    const pipeline = sharp(file).resize({ width: w, withoutEnlargement: true });
    const avif = path.join(OUT_DIR, `${base}-${w}.avif`);
    const webp = path.join(OUT_DIR, `${base}-${w}.webp`);
    await pipeline.clone().avif({ quality: 55, effort: 4 }).toFile(avif);
    await pipeline.clone().webp({ quality: 74 }).toFile(webp);
    savedBytes += info.size - (await stat(avif)).size;
  }
  built++;
  process.stdout.write(`  built ${key} (${widths.join(", ")})\n`);
}

await mkdir(OUT_DIR, { recursive: true });
await writeFile(MANIFEST, JSON.stringify(next, null, 1));
console.log(
  `\nimages: ${built} generated, ${skipped} cached, ` +
    `~${Math.round(savedBytes / 1024)}KB saved at largest widths`,
);
