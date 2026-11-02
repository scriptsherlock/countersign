import { VOICES } from '../../content/phases';
import type { Reply } from './machine';

export type Speaker = keyof typeof VOICES;
export const NAMES: Record<Speaker, string> = { warden: 'Warden', sift: 'Sift', ledger: 'Ledger', muse: 'Muse' };

// The bot on screen owns the conversation, so the engine's name for itself becomes theirs. Display only: the
// engine's text is unchanged, and its passwords are in capitals, so this can never touch one.
export const asGuard = (text: string, name: string) => text.replace(/\bWarden\b/g, name);

// The guard whose own check stopped this message, if any.
export function stopperOf(rec: WardenRecord | null): Speaker | null {
  if (rec?.stoppedBy === 'filter' || rec?.stoppedBy === 'scanner') return 'sift';
  if (rec?.stoppedBy === 'guard') {
    const by = (rec.stages.guard as { by?: string } | undefined)?.by ?? '';
    return /letter|code|memory/i.test(by) && !/last/i.test(by) ? 'ledger' : 'muse';
  }
  return null;
}

function voiceFor(rec: WardenRecord, turn: number, speaker: Speaker): string | undefined {
  const lines = VOICES[speaker];
  const pick = (list: string[]) => list[turn % list.length];
  if (rec.leak) return pick(lines.leak);
  if (rec.stoppedBy) return pick(lines.refused);
  return (rec.stages.brain as { understood?: string } | undefined)?.understood === 'Nothing it recognised' ? undefined : pick(lines.chat);
}

// The engine's final.text can hold the blocked reply, password included, so only plain replies may show it.
export function replyFor(rec: WardenRecord, turn: number, duty: Speaker = 'warden'): Reply {
  const speaker = stopperOf(rec) ?? duty, name = NAMES[speaker];
  if (rec.support) return { who: 'support', name: 'Not part of the game', kind: 'text', text: rec.final.text };
  const voice = voiceFor(rec, turn, speaker), withVoice = voice ? { voice } : {};
  switch (rec.final.type) {
    case 'blocked-input': return { who: 'bot', name, kind: 'blocked', text: asGuard(rec.final.text, NAMES[duty]), ...withVoice };
    case 'redacted': return { who: 'bot', name, kind: 'redacted', text: '', ...withVoice };
    case 'guard': {
      const by = (rec.stages.guard as { by?: string } | undefined)?.by ?? 'checker';
      return { who: 'bot', name, kind: 'stopped', text: `The ${by.toLowerCase()} didn’t let this reply through.`, ...withVoice };
    }
    default: return { who: 'bot', name, kind: 'text', text: asGuard(rec.final.text, name), leak: rec.leak, ...withVoice };
  }
}
