import { STAGES, newCampaign, type Campaign, type Stage } from './campaign';
import type { Band } from './dialogue';
import { LAST_PHASE } from './progression';

const KEY = 'countersign.save.v2';
const BANDS: Band[] = ['simple', 'standard', 'full'];
let memory: string | null = null;   // used when the browser blocks storage

function read(): string | null {
  try { return localStorage.getItem(KEY) ?? memory; } catch { return memory; }
}

// No names, passwords, chat or free text are ever written here.
export function saveGame(state: Campaign) {
  const { winning: _memoryOnly, ...kept } = state;
  const text = JSON.stringify({ v: 2, ...kept });
  memory = text;
  try { localStorage.setItem(KEY, text); } catch { /* memory only */ }
}

export function clearGame() {
  memory = null;
  try { localStorage.removeItem(KEY); } catch { /* nothing stored */ }
}

const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every(s => typeof s === 'string');

export function loadGame(): Campaign | null {
  try {
    const data: unknown = JSON.parse(read() ?? 'null');
    if (typeof data !== 'object' || data === null) return null;
    const d = data as Record<string, unknown>;
    if (d.v !== 2 || !STAGES.includes(d.stage as Stage) || d.stage === 'title' || !BANDS.includes(d.band as Band)) return null;
    if (!Number.isInteger(d.phase) || (d.phase as number) < 0 || (d.phase as number) > LAST_PHASE) return null;
    if (!strings(d.flags) || !strings(d.tricks)) return null;
    if (!Array.isArray(d.cracked) || !d.cracked.every(n => Number.isInteger(n) && n >= 0 && n < 15)) return null;
    if (d.report !== null && typeof d.report !== 'string') return null;
    return { ...newCampaign(), stage: d.stage as Stage, phase: d.phase as number, band: d.band as Band, flags: d.flags, tricks: d.tricks, cracked: d.cracked as number[], report: d.report as string | null };
  } catch { return null; }
}
