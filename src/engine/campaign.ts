import type { Band } from './dialogue';
import { GATE_COUNT, LAST_PHASE, PHASE_GATES, phaseOfGate } from './progression';

export const STAGES = ['title', 'firstDay', 'warrant', 'mission', 'file', 'report', 'splice', 'briefing', 'finale', 'complete'] as const;
export type Stage = (typeof STAGES)[number];

export interface Campaign {
  stage: Stage;
  phase: number;
  band: Band;
  flags: string[];
  cracked: number[];
  tricks: string[];
  report: string | null;
  /** The message that opened the last gate. Memory only: free text is never saved. */
  winning: string | null;
}

export type CampaignEvent =
  | { type: 'newFile'; band: Band }
  | { type: 'continue'; saved: Campaign }
  | { type: 'next' }
  | { type: 'flags'; flags: string[] }
  | { type: 'gateOpened'; gate: number; message: string; tricks: string[] }
  | { type: 'report'; card: string }
  | { type: 'fieldCode'; cracked: number; band: Band }
  | { type: 'restart' };

export const newCampaign = (): Campaign => ({ stage: 'title', phase: 0, band: 'standard', flags: [], cracked: [], tricks: [], report: null, winning: null });

function after(state: Campaign): Campaign {
  switch (state.stage) {
    case 'firstDay': return { ...state, stage: 'warrant' };
    case 'warrant': return { ...state, stage: 'mission' };
    case 'mission': return { ...state, stage: 'file' };
    case 'file':
      if (state.phase === 0) return { ...state, stage: 'report' };
      return state.phase < LAST_PHASE ? { ...state, stage: 'briefing', phase: state.phase + 1 } : { ...state, stage: 'finale' };
    case 'report': return { ...state, stage: 'splice' };
    case 'splice': return { ...state, stage: 'briefing', phase: 1 };
    case 'briefing': return { ...state, stage: 'mission' };
    case 'finale': return { ...state, stage: 'complete' };
    default: return state;
  }
}

export function reduce(state: Campaign, event: CampaignEvent): Campaign {
  switch (event.type) {
    case 'newFile': return { ...newCampaign(), band: event.band, stage: 'firstDay' };
    case 'continue': return event.saved;
    case 'next': return after(state);
    case 'flags': return { ...state, flags: event.flags };
    case 'gateOpened': return {
      ...state,
      winning: event.message,
      cracked: state.cracked.includes(event.gate) ? state.cracked : [...state.cracked, event.gate],
      tricks: [...new Set([...state.tricks, ...event.tricks])],
    };
    case 'report': return { ...state, report: event.card };
    case 'fieldCode': {
      const count = Math.min(event.cracked, GATE_COUNT);
      const cracked = Array.from({ length: count }, (_, i) => i);
      if (count >= GATE_COUNT) return { ...newCampaign(), band: event.band, cracked, phase: LAST_PHASE, stage: 'finale' };
      const phase = phaseOfGate(count);
      return { ...newCampaign(), band: event.band, cracked, phase, stage: (PHASE_GATES[phase] ?? [])[0] === count ? 'briefing' : 'mission' };
    }
    case 'restart': return newCampaign();
  }
}
