// Reads Trickbot at the pinned commit, so that uncommitted work there can never reach this game.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const VENDOR = resolve(ROOT, 'src/missions/trickbot/vendor/warden-engine.js');
export const BEGIN = '// ===== BEGIN WARDEN ENGINE =====';
export const END = '// ===== END WARDEN ENGINE =====';

const START_MARK = '/* ===== Warden engine';
const END_MARK = '/* ===== UI ===== */';
const pin = JSON.parse(readFileSync(resolve(ROOT, 'tools/warden.pin.json'), 'utf8'));
export const COMMIT = pin.commit;
const repo = process.env.TRICKBOT_REPO ?? resolve(ROOT, pin.repo);

export function pinned(path) {
  return execFileSync('git', ['-C', repo, 'show', `${COMMIT}:${path}`], { encoding: 'utf8', maxBuffer: 1 << 28 });
}

export function engineSpan(html) {
  const start = html.indexOf(START_MARK), end = html.indexOf(END_MARK);
  if (start < 0 || end < start) throw new Error(`Engine markers not found at ${COMMIT}. Trickbot must keep "${START_MARK}" and "${END_MARK}".`);
  return { start, end };
}

export function pinnedEngine() {
  const html = pinned('index.html'), { start, end } = engineSpan(html);
  return html.slice(start, end);
}

export function vendoredEngine(text) {
  const a = text.indexOf(BEGIN), b = text.indexOf(END);
  if (a < 0 || b < a) throw new Error('Engine markers not found in the vendored file.');
  return text.slice(a + BEGIN.length + 1, b);
}
