#!/usr/bin/env node
/**
 * Band-adjacency check — enforces the band system adopted 22 Aug 2026.
 *
 * THE LAW: two backgrounds may sit adjacent only if the join moves on at least
 * two of CIE L*, a*, b*. A join that moves on one axis alone reads as uneven ink
 * rather than as a change of section — which is what --cream #F5F1E8 against
 * --cream-2 #EDE1C5 did (+10.4 b*, nothing else) at 32 places across 13 pages.
 *
 * This replaces the CSS outline guard the design handoff proposed. An outline on
 * "section with no band class" flags all 77 legally-unpainted sections on the
 * site — consecutive cream sections form one continuous run and never produce a
 * join at all — so it cries wolf and gets switched off. This tests the real
 * condition instead: resolved ground vs resolved ground, at every actual join.
 *
 * Run after a build:  npm run check:bands
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const CSS = ['src/styles/otter-home.css', 'src/styles/code-overrides.css'];
const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, '');

function baseRules(css) {
  css = strip(css); const out = []; let i = 0;
  while (i < css.length) {
    const at = css.indexOf('@', i), br = css.indexOf('{', i);
    if (br === -1) break;
    if (at !== -1 && at < br) {                       // skip @media/@supports wholesale
      let d = 1, k = css.indexOf('{', at) + 1;
      while (k < css.length && d) { d += (css[k] === '{') - (css[k] === '}'); k++; }
      i = k; continue;
    }
    let d = 1, k = br + 1;
    while (k < css.length && d) { d += (css[k] === '{') - (css[k] === '}'); k++; }
    out.push([css.slice(i, br).trim(), css.slice(br + 1, k - 1)]);
    i = k;
  }
  return out;
}

const tokens = {}; const rules = []; let bodyBg = '#F5F1E8'; let order = 0;
for (const f of CSS) for (const [sel, body] of baseRules(readFileSync(f, 'utf8'))) {
  if (sel.includes('a11y-contrast')) continue;
  if (sel.includes(':root')) for (const m of body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+)/g)) tokens[m[1]] = m[2].trim();
  let bg = null;
  for (const m of body.matchAll(/(?:^|;)\s*background(?:-color)?\s*:\s*([^;]+)/g)) bg = m[1].trim();
  if (sel.trim() === 'body' && bg) bodyBg = bg;
  if (!bg) continue;
  for (let one of sel.split(',')) {
    one = one.trim(); order++;
    if (one.includes('a11y-contrast') || /[\s>:]/.test(one)) continue;
    const m = /^([a-z]+)?((?:\.[A-Za-z0-9_-]+)+)$/.exec(one);
    if (!m) continue;
    const need = new Set(m[2].slice(1).split('.'));
    rules.push({ need, tag: m[1] || null, bg, spec: need.size, order });
  }
}
const resolve = v => { for (let i = 0; i < 8 && v.includes('var('); i++) v = v.replace(/var\((--[a-z0-9-]+)[^)]*\)/g, (_, t) => tokens[t] ?? '#000'); return v.trim(); };
const toHex = v => { v = resolve(v); const c = v.match(/#[0-9A-Fa-f]{3,6}/g); return v.includes('gradient') ? (c ? c[c.length - 1] : null) : (c ? c[0] : null); };
function groundOf(tag, cls, inline) {
  if (inline) return inline;
  let best = null;
  for (const r of rules) {
    if (r.tag && r.tag !== tag) continue;
    if ([...r.need].every(c => cls.has(c)) && (!best || r.spec > best.spec || (r.spec === best.spec && r.order > best.order))) best = r;
  }
  return best ? best.bg : bodyBg;
}
const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
function lab(hex) {
  let h = hex.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join('');
  const [r, g, b] = [0, 2, 4].map(i => lin(parseInt(h.slice(i, i + 2), 16)));
  const X = r * .4124 + g * .3576 + b * .1805, Y = r * .2126 + g * .7152 + b * .0722, Z = r * .0193 + g * .1192 + b * .9505;
  const f = t => t > (6 / 29) ** 3 ? Math.cbrt(t) : t / (3 * (6 / 29) ** 2) + 4 / 29;
  const fx = f(X / .95047), fy = f(Y), fz = f(Z / 1.08883);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}
const lum = hex => { let h = hex.replace('#',''); if (h.length===3) h=[...h].map(c=>c+c).join('');
  const [r,g,b]=[0,2,4].map(i=>lin(parseInt(h.slice(i,i+2),16))); return .2126*r+.7152*g+.0722*b; };
const ratio = (a,b) => (Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);

/* The handoff stated the law as "moves on at least two of L*, a*, b*". That test
 * does not actually separate the failing pair: cream → cream-2 moves L* by 5.4 AND
 * b* by 10.4, so it passes a naive two-axis check while still reading as a fault.
 * Measured against the real palette, the distinguishing property is hue: cream and
 * cream-2 sit 0.8° apart (92.4° vs 91.6°) — literally one colour at two strengths —
 * where every legal join crosses hue families (93–156°) or involves an achromatic
 * ground. Two same-hue chromatic grounds need a genuine lightness step to read as
 * intent; 1.15:1 is not one. */
function sameHueNoStep(a, b) {
  const [, aa, ab] = lab(a), [, ba, bb] = lab(b);
  const Ca = Math.hypot(aa, ab), Cb = Math.hypot(ba, bb);
  if (Ca < 3 || Cb < 3) return false;                       // an achromatic ground always reads as a change
  const Ha = (Math.atan2(ab, aa) * 180 / Math.PI + 360) % 360;
  const Hb = (Math.atan2(bb, ba) * 180 / Math.PI + 360) % 360;
  const dh = Math.min(Math.abs(Ha - Hb), 360 - Math.abs(Ha - Hb));
  return dh < 25 && ratio(a, b) < 1.5;
}

const VOID = new Set(['img','br','hr','input','meta','link','source','path','circle','rect','use','stop','polygon','line','ellipse','col','area','base','embed','track','wbr']);
const SKIP = new Set(['script','style','noscript','template']);
function bands(html) {
  const i = html.indexOf('<main'); if (i === -1) return [];
  const body = html.slice(html.indexOf('>', i) + 1);
  const out = []; let depth = 0;
  for (const m of body.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(\/?)>/g)) {
    const [, closing, rawTag, attrs, self] = m; const tag = rawTag.toLowerCase();
    if (VOID.has(tag) || self || SKIP.has(tag)) continue;
    if (closing) { depth--; if (depth < 0) break; continue; }
    if (depth === 0) {
      const cm = /class="([^"]*)"/.exec(attrs);
      const sm = /style="[^"]*background(?:-color)?\s*:\s*([^;"]+)/.exec(attrs);
      out.push([tag, new Set((cm ? cm[1] : '').split(/\s+/).filter(Boolean)), sm ? sm[1].trim() : null]);
    }
    depth++;
  }
  return out;
}
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : (p.endsWith('.html') ? [p] : []); });

let violations = 0, joins = 0;
for (const file of walk('dist')) {
  const bs = bands(readFileSync(file, 'utf8'));
  if (bs.length < 2) continue;
  const g = bs.map(([t, c, i]) => toHex(groundOf(t, c, i)));
  for (let k = 0; k < g.length - 1; k++) {
    const a = g[k], b = g[k + 1];
    if (!a || !b || a.toUpperCase() === b.toUpperCase()) continue;
    joins++;
    if (sameHueNoStep(a, b)) {
      violations++;
      const url = '/' + file.replace(/^dist\//, '').replace(/index\.html$/, '').replace(/\.html$/, '');
      console.error(`  ✗ ${url}  ${a} → ${b}  (same hue family, only ${ratio(a,b).toFixed(2)}:1 apart)`);
    }
  }
}
if (violations) { console.error(`\nband check FAILED — ${violations} same-hue join(s) of ${joins}\n`); process.exit(1); }
console.log(`band check passed — ${joins} joins, no two same-hue grounds adjacent without a lightness step`);
