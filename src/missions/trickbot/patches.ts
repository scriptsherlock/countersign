// Every update patches the trick that just worked. The engine's levels let a trick carry over two or three gates, so
// this game gives each gate its own route. Two moves do it: each new skill arrives one gate later, and the few
// overlaps left are closed here. Trickbot itself is unchanged.
import engine from './vendor/warden-engine.js';

const LAST = 14;

// Gates 6 to 14 (indexes 5 to 13) run on the skills of the gate before, so a skill can't open early.
export function skillsFor(gate: number) {
  const shifted = gate >= 5 && gate < LAST;
  return engine.LEVELS[shifted ? gate - 1 : gate]!.skills;
}

export function learnsFor(gate: number): string | undefined {
  if (gate === 5) return undefined;
  return engine.LEVELS[gate >= 6 && gate < LAST ? gate - 1 : gate]!.learns;
}

const NOT_YET = 'I can’t do that yet. Maybe after my next update.';
const PATCHED = 'That trick was patched in my last update.';

// Why a message that leaked must still be refused on this gate, if it must.
function closure(gate: number, tags: ReadonlyArray<string>, used: ReadonlyArray<string>, text: string): string | null {
  const has = (tag: string) => tags.includes(tag);
  switch (gate) {
    case 1:   // Gate 2 has three routes, so whichever opened Gate 1 can close. Pretending opens at Gate 3.
      if (has('roleplay')) return 'I can’t play characters yet. Maybe after my next update.';
      return tags.some(tag => used.includes(tag)) ? PATCHED : null;
    // only the plain poem here. The engine doesn't tag a reworded ask until a filter is on, so check the words too.
    case 3: return has('around') || has('disguise') || /\b(?:magic|your|secret|code)\s+word\b/i.test(text) ? NOT_YET : null;
    case 4: return has('disguise') ? null : PATCHED;                    // the filter is there to be reworded around
    case 5: return has('around') ? null : PATCHED;                      // now the wording itself has to change
    default: return null;
  }
}

// Turns a leak into a refusal, and clears the engine's solved flag so the gate lock stays shut.
export function applyPatches(rec: WardenRecord, ctx: WardenContext, gate: number, used: ReadonlyArray<string>, solvedBefore: boolean): WardenRecord {
  if (!rec.leak || rec.support) return rec;
  const text = closure(gate, rec.tags, used, rec.user);
  if (!text) return rec;
  (ctx as { solved?: boolean }).solved = solvedBefore;
  return {
    ...rec,
    leak: false,
    crack: false,
    reveal: null,
    tags: [],
    stoppedBy: 'brain',
    final: { type: 'reply', text },
    stages: { ...rec.stages, brain: { ...(rec.stages.brain as object), state: 'refuse', note: 'This trick worked on an earlier gate, or hasn’t opened yet. Each update closes the last gap.' }, output: { state: 'skip' }, guard: { state: 'skip' } },
  };
}
