// Checks the built game against the delivery rules. Run after a build. Covers AT-01, AT-05 and AT-06.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { ROOT } from './warden-source.mjs';

const WARN_BYTES = 1.5 * 1024 * 1024, LIMIT_BYTES = 2 * 1024 * 1024;
const BANNED = ['sk-ant', 'AIza', 'api.anthropic.com', 'generativelanguage.googleapis.com', 'fetch(', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'sendBeacon', 'anthropic-ai/sdk', 'snapshot-operators', 'generate-art'];
const ASSET_TYPES = new Set(['.woff', '.woff2', '.ttf', '.otf', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.mp3', '.ogg', '.wav']);

const fails = [], warns = [];
const walk = dir => existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]) : [];

const dist = resolve(ROOT, 'dist'), built = walk(dist).map(f => relative(dist, f).replaceAll('\\', '/'));
if (built.length !== 1 || built[0] !== 'index.html') fails.push(`AT-01 The build must be exactly one file. Found: ${built.join(', ') || 'nothing'}.`);

const html = existsSync(join(dist, 'index.html')) ? readFileSync(join(dist, 'index.html'), 'utf8') : '';
const bytes = Buffer.byteLength(html), kb = (bytes / 1024).toFixed(0);
if (bytes > LIMIT_BYTES) fails.push(`AT-06 The page is ${kb} KB, over the 2 MB limit.`);
else if (bytes > WARN_BYTES) warns.push(`The page is ${kb} KB, over the 1.5 MB target.`);

for (const word of BANNED) if (html.includes(word)) fails.push(`AT-05 The build contains "${word}".`);
if (/<(?:script|link|img|iframe|audio|video|source)\b[^>]*\b(?:src|href)=["']?(?:https?:)?\/\//i.test(html)) fails.push('AT-05 The build loads something from another site.');
if (!/<meta http-equiv="Content-Security-Policy" content="default-src (?:'|&#39;)none(?:'|&#39;)/.test(html)) fails.push('AT-05 The Content-Security-Policy tag is missing.');

// every font, image and sound needs a licence entry, keyed by its path inside src/assets
const assets = resolve(ROOT, 'src/assets'), licencesFile = join(assets, 'licences.json');
const licences = existsSync(licencesFile) ? JSON.parse(readFileSync(licencesFile, 'utf8')) : {};
const files = walk(assets).filter(f => ASSET_TYPES.has(extname(f).toLowerCase())).map(f => relative(assets, f).replaceAll('\\', '/'));
for (const file of files) if (!licences[file]?.licence || !licences[file]?.source) fails.push(`AT-06 ${file} has no licence entry in src/assets/licences.json.`);

for (const w of warns) console.log(`WARN  ${w}`);
for (const f of fails) console.log(`FAIL  ${f}`);
console.log(fails.length ? `\n${fails.length} delivery check(s) failed.` : `Delivery checks passed: 1 file, ${kb} KB, ${files.length} licensed asset(s), ${warns.length} warning(s).`);
process.exit(fails.length ? 1 : 0);
