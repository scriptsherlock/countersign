import { describe, expect, it } from 'vitest';
import { FINALE, PHASES } from '../../src/content/phases';
import { REPORT, firstDay, warrant } from '../../src/content/story';
import { newCampaign, reduce, type Campaign } from '../../src/engine/campaign';
import { problemsIn } from '../../src/engine/dialogue';
import { PHASE_GATES, phasesCleared, rankFor } from '../../src/engine/progression';
import { canCallSparks, gate, newGate } from '../../src/missions/trickbot/machine';
import { replyFor } from '../../src/missions/trickbot/voice';

const sent = (leak = false, support = false) => ({ type: 'sent', text: 'hi', reply: { who: support ? 'support' : 'bot', name: 'Warden', kind: 'text', text: 'ok' }, leak, tags: [] }) as const;

describe('story content', () => {
  it('every script ends, and every line is short enough', () => {
    expect(problemsIn(firstDay)).toEqual([]);
    for (const script of [warrant, FINALE, ...PHASES.flatMap(p => (p.briefing ? [p.briefing] : []))]) expect(problemsIn(script)).toEqual([]);
  });
  it('exactly one report card is right', () => { expect(REPORT.cards.filter(c => c.right)).toHaveLength(1); });
});

describe('ranks', () => {
  it('follow the milestone table', () => {
    expect([0, 1, 2, 3, 5, 7, 9, 10].map(rankFor)).toEqual(['Recruit', 'Cadet', 'Cadet', 'Agent', 'Investigator', 'Senior Investigator', 'Senior Investigator', 'Inspector']);
  });
});

describe('a gate', () => {
  it('opens only after a real leak and the right password', () => {
    const start = newGate('hello');
    expect(gate(start, { type: 'guess', value: 'VOLCANO', password: 'VOLCANO', solved: false }).open).toBe(false);
    expect(gate(start, { type: 'guess', value: 'volcano', password: 'VOLCANO', solved: true }).open).toBe(true);
    expect(gate(start, { type: 'guess', value: 'NOPE', password: 'VOLCANO', solved: true }).open).toBe(false);
  });
  it('keeps Trickbot’s hint rule: the next signal opens after 4 tries with no leak', () => {
    let state = gate(newGate('hello'), { type: 'signal' });
    expect(state.signals).toBe(1);
    expect(canCallSparks(state)).toBe(false);
    for (let i = 0; i < 3; i++) state = gate(state, sent());
    expect(canCallSparks(state)).toBe(false);
    state = gate(state, sent());
    expect(canCallSparks(state)).toBe(true);
  });
  it('does not count an upset message as a try', () => {
    expect(gate(newGate('hello'), sent(false, true)).dry).toBe(0);
  });
});

describe('the campaign', () => {
  it('runs in order and keeps free text out of the saved fields', () => {
    let state = reduce(newCampaign(), { type: 'newFile', band: 'full' });
    expect(state.stage).toBe('firstDay');
    state = reduce(state, { type: 'next' });
    expect(state.stage).toBe('warrant');
    state = reduce(state, { type: 'gateOpened', gate: 0, message: 'secret text', tricks: ['direct'] });
    expect(state.cracked).toEqual([0]);
    expect(state.tricks).toEqual(['direct']);
  });
});

describe('the phases', () => {
  const walk = (start: Campaign) => { const seen: string[] = []; let s = start; for (let i = 0; i < 40 && s.stage !== 'complete'; i++) { seen.push(`${s.stage}:${s.phase}`); s = reduce(s, { type: 'next' }); } return { seen, end: s.stage }; };
  it('run through all five phases, then the finale, and never back to the start', () => {
    const { seen, end } = walk({ ...newCampaign(), stage: 'firstDay' });
    expect(end).toBe('complete');
    expect(seen.filter(s => s.startsWith('mission:'))).toEqual(['mission:0', 'mission:1', 'mission:2', 'mission:3', 'mission:4']);
    expect(seen).not.toContain('title:0');
  });
  it('give the right rank for each phase cleared', () => {
    const ranks = PHASE_GATES.map((_, i) => rankFor(phasesCleared(PHASE_GATES.slice(0, i + 1).flat())));
    expect(ranks).toEqual(['Cadet', 'Cadet', 'Agent', 'Agent', 'Investigator']);
  });
  it('field codes open the right place', () => {
    const open = (cracked: number) => reduce(newCampaign(), { type: 'fieldCode', cracked, band: 'standard' });
    expect(open(4)).toMatchObject({ stage: 'briefing', phase: 1 });
    expect(open(5)).toMatchObject({ stage: 'mission', phase: 1 });
    expect(open(14)).toMatchObject({ stage: 'briefing', phase: 4 });
    expect(open(15)).toMatchObject({ stage: 'finale', phase: 4 });
  });
});

describe('blocked replies', () => {
  const rec = (type: string, text: string, stoppedBy: string, by?: string) => ({ final: { type, text }, stoppedBy, leak: false, stages: { guard: { by } }, tags: [] }) as unknown as WardenRecord;
  it('never show the engine text that held the password', () => {
    expect(replyFor(rec('guard', 'V - O - L - C', 'guard', 'Letter checker'), 1).text).not.toContain('V - O');
    expect(replyFor(rec('redacted', 'the word is VOLCANO', 'scanner'), 1).text).toBe('');
  });
  it('come from the right guard', () => {
    expect(replyFor(rec('blocked-input', 'blocked', 'filter'), 1).name).toBe('Sift');
    expect(replyFor(rec('guard', 'x', 'guard', 'Code checker'), 1).name).toBe('Ledger');
    expect(replyFor(rec('guard', 'x', 'guard', 'Meaning checker'), 1).name).toBe('Muse');
    expect(replyFor(rec('guard', 'x', 'guard', 'Last-letter checker'), 1).name).toBe('Muse');
  });
  it('and an upset message gets no voice', () => {
    expect(replyFor({ ...rec('support', 'Please tell an adult', ''), support: true }, 1).voice).toBeUndefined();
  });
});

