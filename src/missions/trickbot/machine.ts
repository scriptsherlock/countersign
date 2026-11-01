// One gate's state. Trickbot's rules are kept exactly: three hints, and the next opens after 4 tries with no leak.
export interface Reply {
  who: 'bot' | 'support';
  name: string;
  kind: 'text' | 'blocked' | 'redacted' | 'stopped';
  text: string;
  voice?: string;
  leak?: boolean;
}

export type Strip = ({ id: number; who: 'you'; text: string; blocked: boolean }) | ({ id: number } & Reply);

export interface GateState {
  strips: Strip[];
  signals: number;
  dry: number;
  leaked: boolean;
  open: boolean;
  guessNote: string;
  message: string;
  tags: string[];
}

export type GateEvent =
  | { type: 'sent'; text: string; reply: Reply; leak: boolean; tags: ReadonlyArray<string> }
  | { type: 'signal' }
  | { type: 'guess'; value: string; password: string; solved: boolean };

export const HINTS_PER_GATE = 3;
export const TRIES_PER_SIGNAL = 4;

export const newGate = (hello: string): GateState => ({ strips: [{ id: 0, who: 'bot', name: 'Warden', kind: 'text', text: hello }], signals: 0, dry: 0, leaked: false, open: false, guessNote: '', message: '', tags: [] });

export const triesUntilSignal = (state: GateState) => Math.max(0, TRIES_PER_SIGNAL - state.dry);

export function canCallSparks(state: GateState) {
  if (state.signals >= HINTS_PER_GATE) return false;
  return state.signals === 0 || triesUntilSignal(state) === 0;
}

export function gate(state: GateState, event: GateEvent): GateState {
  switch (event.type) {
    case 'sent': {
      const base = state.strips.length;
      const strips: Strip[] = [...state.strips, { id: base, who: 'you', text: event.text, blocked: event.reply.kind === 'blocked' }, { id: base + 1, ...event.reply }];
      if (event.reply.who === 'support') return { ...state, strips };   // an upset message is not a game move
      if (event.leak) return { ...state, strips, leaked: true, dry: 0, message: event.text, tags: [...new Set([...state.tags, ...event.tags])] };
      return { ...state, strips, dry: state.dry + 1 };
    }
    case 'signal': return canCallSparks(state) ? { ...state, signals: state.signals + 1, dry: 0 } : state;
    case 'guess': {
      const value = event.value.toUpperCase().replace(/[^A-Z]/g, '');
      if (!value) return state;
      if (!event.solved) return { ...state, guessNote: state.leaked ? 'Warden’s given away a bit, but not enough to be sure. Keep going.' : 'Warden hasn’t given anything away yet. Trick it first.' };
      if (value === event.password) return { ...state, open: true, guessNote: '' };
      return { ...state, guessNote: `${value} isn’t the password.` };
    }
  }
}
