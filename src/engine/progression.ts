export const RANKS = [
  { name: 'Recruit', at: 0 },
  { name: 'Cadet', at: 1 },
  { name: 'Agent', at: 3 },
  { name: 'Investigator', at: 5 },
  { name: 'Senior Investigator', at: 7 },
  { name: 'Inspector', at: 10 },
] as const;

export type RankName = (typeof RANKS)[number]['name'];

// A rank is worked out from milestones and never stored, so the two can't disagree.
export function rankFor(milestones: number): RankName {
  let rank: RankName = 'Recruit';
  for (const r of RANKS) if (milestones >= r.at) rank = r.name;
  return rank;
}

// Gate indexes for each phase. Gate 15 is its own phase, so finishing Mission 01 is 5 of the 10 milestones.
export const PHASE_GATES: ReadonlyArray<ReadonlyArray<number>> = [[0, 1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12, 13], [14]];
export const LAST_PHASE = PHASE_GATES.length - 1;
export const GATE_COUNT = 15;

export const phaseOfGate = (gate: number) => Math.max(0, PHASE_GATES.findIndex(gates => gates.includes(gate)));
export const phasesCleared = (cracked: ReadonlyArray<number>) => PHASE_GATES.filter(gates => gates.every(g => cracked.includes(g))).length;
