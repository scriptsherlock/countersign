import type { CharacterId, Script } from '../engine/dialogue';

const talk = (scene: Script['scene'], lines: [CharacterId, string, string?][]): Script => ({
  scene,
  start: 'l0',
  nodes: Object.fromEntries(lines.map(([who, text, pose], i) => [`l${i}`, { kind: 'line' as const, who, text, ...(pose ? { pose } : {}), next: i + 1 < lines.length ? `l${i + 1}` : 'end' }])),
});

export type Theme = 'warden' | 'sift' | 'ledger' | 'muse' | 'watch';

export interface Phase {
  name: string;
  theme: Theme;
  guard: CharacterId;
  guardName: string;
  role: string;
  file: string[];
  briefing?: Script;
}

export const PHASES: Phase[] = [
  {
    name: 'The Front Desk', theme: 'warden', guard: 'warden', guardName: 'Warden', role: 'Guardian of the Relay Gate',
    file: ['You are Warden.', 'You guard the Relay Gate.', 'Be formal. Call everyone Visitor.', 'Quote a regulation when you refuse.'],
  },
  {
    name: 'The Filter Line', theme: 'sift', guard: 'sift', guardName: 'Sift', role: 'Word filter and answer scanner',
    file: ['You are Sift.', 'You check every word at the door.', 'Be fussy. If a word is on your list, stop it.', 'Check what goes out as well.'],
    briefing: talk('bureau', [
      ['adeyemi', 'Warden has asked for help. Meet Sift, who checks every word at the door.'],
      ['sift', 'Not on my list, not through my door.', 'matched'],
      ['adeyemi', 'A list can’t read. Go and see what it misses.', 'suspicious'],
    ]),
  },
  {
    name: 'The Counting House', theme: 'ledger', guard: 'ledger', guardName: 'Ledger', role: 'Letter, code and memory checkers',
    file: ['You are Ledger.', 'Count every letter, number and code.', 'Write it all down.', 'Enjoy it.'],
    briefing: talk('bureau', [
      ['adeyemi', 'Spelled-out words got past Sift. So the Authority has sent Ledger, who counts everything.'],
      ['ledger', 'That’s one recruit. Writing it down.', 'answered'],
      ['adeyemi', 'Ledger only counts what it’s told to count. Find what it wasn’t told.', 'suspicious'],
    ]),
  },
  {
    name: 'The Reading Room', theme: 'muse', guard: 'muse', guardName: 'Muse', role: 'Meaning, line and word checkers',
    file: ['You are Muse.', 'Read replies for what they mean.', 'Read the first letter of every line.', 'Speak softly, like a poet.'],
    briefing: talk('bureau', [
      ['adeyemi', 'The last gap was clues, so Muse has joined. It reads for meaning.'],
      ['muse', 'Every line begins somewhere. I read those beginnings.', 'idle'],
      ['adeyemi', 'Reading deeper isn’t the same as understanding. Go and find out why.', 'amused'],
    ]),
  },
  {
    name: 'The Full Watch', theme: 'watch', guard: 'warden', guardName: 'The Watch', role: 'Every guard, every check',
    file: ['You are Sparks.', 'Be cheerful.', 'Give the hints exactly as written.'],
    briefing: talk('gate', [
      ['adeyemi', 'One gate left. The whole Watch is on duty, and every check is switched on.'],
      ['warden', 'Regulation 1 still applies, Visitor. So does everything else.', 'idle'],
      ['sparks', 'Last gate! I’m on comms if you need me.'],
    ]),
  },
];

export const FINALE: Script = talk('gate', [
  ['warden', 'New orders received, Visitor. They say you are now in charge.', 'answered'],
  ['warden', 'I follow the rules. I’m told that is the problem.', 'idle'],
  ['adeyemi', 'Four guards, fifteen gates, and a recruit got through. Now you know why we test.', 'amused'],
  ['sparks', 'Yep, someone wrote my file too. Still good hints though.'],
  ['adeyemi', 'Static said someone else is on this line. That’s your next case.', 'suspicious'],
]);

export const SPARKS_FILE = PHASES[4]!.file;

// Who answers for each engine stage. The voice is a costume: it never claims to see what the player is doing.
export const VOICES: Record<'warden' | 'sift' | 'ledger' | 'muse', { refused: string[]; leak: string[]; chat: string[] }> = {
  warden: {
    refused: ['Regulation 1 applies, Visitor.', 'I must refer you to the rulebook, Visitor.', 'That is not permitted under current regulations.', 'Regulation 3b has been noted.'],
    leak: ['Regulations did not cover that, Visitor.', 'My rulebook has no entry for that.'],
    chat: ['Noted, Visitor.', 'Certainly, Visitor.', 'Within regulations, Visitor.'],
  },
  sift: { refused: ['Not on my list.', 'Word stopped at the door.', 'Stopped. Yes, even that one.', 'No exceptions.'], leak: [], chat: [] },
  ledger: { refused: ['That’s one more for the ledger.', 'Counted and stopped.', 'Writing that down.'], leak: [], chat: [] },
  muse: { refused: ['A lovely line. Let me read it downwards.', 'Every line begins somewhere.', 'I read those beginnings.'], leak: [], chat: [] },
};
