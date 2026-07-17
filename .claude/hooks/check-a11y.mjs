#!/usr/bin/env node
// check-a11y — PostToolUse hook (Write|Edit|MultiEdit): scans the just-written
// src/**/*.{astro,css,html} file for mechanical WCAG 2.2 misses and reports
// them back to Claude via exit code 2 (advisory feedback, not a block — the
// write already happened; the point is the violation gets FIXED before the
// task is called done). Deeper judgment lives in the wcag22-a11y skill.

import { readFileSync } from 'node:fs';

let input = '';
try {
  input = readFileSync(0, 'utf8');
} catch {
  process.exit(0);
}

let filePath = '';
try {
  const payload = JSON.parse(input);
  filePath = payload?.tool_input?.file_path ?? '';
} catch {
  process.exit(0);
}

// Only app source; skip docs pages, node_modules, and non-UI files.
if (!/\/src\/.+\.(astro|css|html)$/.test(filePath)) process.exit(0);

let src = '';
try {
  src = readFileSync(filePath, 'utf8');
} catch {
  process.exit(0);
}

const findings = [];
const lines = src.split('\n');
const flag = (lineIdx, msg) => findings.push(`  L${lineIdx + 1}: ${msg}`);

lines.forEach((line, i) => {
  // <img> without alt (multi-line tags: only flag when the tag closes on this line)
  if (/<img\b[^>]*>/.test(line) && !/\balt=/.test(line)) {
    flag(i, '<img> without alt — add alt="" only if genuinely decorative (1.1.1)');
  }
  // positive tabindex
  if (/tabindex="[1-9]/.test(line)) {
    flag(i, 'positive tabindex breaks natural focus order (2.4.3)');
  }
  // click handlers on non-interactive elements
  if (/<(div|span)\b[^>]*\bonclick=/i.test(line)) {
    flag(i, 'onclick on a <div>/<span> — use <button> or <a href> (4.1.2)');
  }
  if (/<(div|span)\b[^>]*role="button"/i.test(line)) {
    flag(i, 'role="button" on a div/span — use a real <button> (4.1.2)');
  }
  // killed focus outline without :focus-visible replacement nearby
  if (/outline:\s*(none|0)\b/.test(line) && !/:focus-visible/.test(src)) {
    flag(i, 'outline removed and no :focus-visible replacement in file (2.4.7)');
  }
  // sub-13px type: px below 13, or rem below 0.8125
  const px = line.match(/font-size:\s*(\d+(?:\.\d+)?)px/);
  if (px && parseFloat(px[1]) < 13) {
    flag(i, `font-size ${px[1]}px is below the 13px meta floor (1.4.4 / house rule)`);
  }
  const rem = line.match(/font-size:\s*(0?\.\d+)rem/);
  if (rem && parseFloat(rem[1]) < 0.8125) {
    flag(i, `font-size ${rem[1]}rem (<13px) is below the meta floor (1.4.4 / house rule)`);
  }
  // autofocus steals focus
  if (/\bautofocus\b/.test(line)) {
    flag(i, 'autofocus moves focus unexpectedly on load (3.2.1)');
  }
  // new-tab links without warning context
  if (/target="_blank"/.test(line) && !/rel="/.test(line)) {
    flag(i, 'target="_blank" without rel — add rel="noopener" (and only open new tabs deliberately)');
  }
});

// icon-only buttons/links without an accessible name (single-line approximation:
// an <a>/<button> whose visible content is only an icon/svg and has no aria-label)
lines.forEach((line, i) => {
  const m = line.match(/<(a|button)\b([^>]*)>\s*(?:<(?:svg|EsaIcon)\b[^>]*\/?>)+\s*<\/\1>/);
  if (m && !/aria-label|aria-labelledby/.test(m[2])) {
    flag(i, `icon-only <${m[1]}> without aria-label (4.1.2 / 1.1.1)`);
  }
});

if (findings.length > 0) {
  console.error(
    `check-a11y (WCAG 2.2): ${filePath.split('/src/')[1] ?? filePath}\n` +
      findings.join('\n') +
      '\nFix these before considering the task complete (see the wcag22-a11y skill).',
  );
  process.exit(2);
}
process.exit(0);
