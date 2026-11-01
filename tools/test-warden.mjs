// Runs Trickbot's own test suite against the vendored engine. Its files come from the pinned commit,
// with the engine text in the page swapped for the copy that ships in this game.
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT, VENDOR, engineSpan, pinned, pinnedEngine, vendoredEngine } from './warden-source.mjs';

const vendored = vendoredEngine(readFileSync(VENDOR, 'utf8'));
if (vendored !== pinnedEngine()) {
  console.error('The vendored Warden engine differs from the pinned commit. Run npm run sync:warden.');
  process.exit(1);
}

const dir = resolve(ROOT, '.tmp/warden-test');
rmSync(dir, { recursive: true, force: true });
mkdirSync(resolve(dir, 'scripts'), { recursive: true });
mkdirSync(resolve(dir, 'tests'), { recursive: true });

// ES modules are always strict and the page script isn't, so a pass in the page proves nothing about this game.
const strict = vendored.replace(/^(\/\*.*\*\/\n)/, "$1'use strict';\n");
if (strict === vendored) throw new Error('Could not switch the engine to strict mode.');
const html = pinned('index.html'), { start, end } = engineSpan(html);
writeFileSync(resolve(dir, 'index.html'), html.slice(0, start) + strict + html.slice(end));
for (const file of ['scripts/engine.cjs', 'tests/engine.test.cjs', 'tests/probes.json', 'tests/innocent.json', 'tests/researcher-questions.json']) {
  writeFileSync(resolve(dir, file), pinned(file));
}

const run = spawnSync(process.execPath, ['--test', 'tests/engine.test.cjs'], { cwd: dir, encoding: 'utf8' });
const summary = run.stdout.split('\n').filter(line => /^. (tests|pass|fail) \d+/.test(line));
console.log(summary.join('\n'));
if (run.status !== 0) console.log(run.stdout.split('failing tests:')[1] ?? run.stderr);
process.exit(run.status ?? 1);
