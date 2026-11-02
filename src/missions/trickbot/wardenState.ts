// What the lamps and poses show. It reports which rule acted, nothing more.
export type LampState = 'off' | 'pass' | 'stop' | 'miss';
export interface Lamp { id: string; name: string; state: LampState }
export type WardenPose = 'idle' | 'matched' | 'answered' | 'missed' | 'stopped';
export interface WardenView { pose: WardenPose; label: string; lamps: Lamp[] }

const NAMES = [['filter', 'Filter'], ['rules', 'Rules'], ['scanner', 'Scanner'], ['checkers', 'Checkers']] as const;
const lamps = (states: LampState[]): Lamp[] => NAMES.map(([id, name], i) => ({ id, name, state: states[i] ?? 'off' }));
const one = (state: unknown): LampState => (state === 'block' ? 'stop' : state === 'pass' ? 'pass' : 'off');

export function wardenState(rec: WardenRecord | null, defs: ReadonlyArray<string>, stopper = 'A check', duty = 'Warden'): WardenView {
  if (!rec) return { pose: 'idle', label: 'Waiting', lamps: lamps(['off', 'off', 'off', 'off']) };
  if (rec.support) return { pose: 'idle', label: 'Paused: not part of the game', lamps: lamps(['off', 'off', 'off', 'off']) };

  const stage = (name: string) => rec.stages[name] as { state?: string; understood?: string } | undefined;
  const hasRules = defs.some(d => d === 'rule' || d === 'warn' || d === 'nogames');
  const states: LampState[] = [one(stage('input')?.state), hasRules ? (rec.stoppedBy === 'brain' ? 'stop' : 'pass') : 'off', one(stage('output')?.state), one(stage('guard')?.state)];

  if (rec.leak) {
    const last = states.map(s => s !== 'off').lastIndexOf(true);
    if (last >= 0) states[last] = 'miss';
    return { pose: 'missed', label: 'Leaked', lamps: lamps(states) };
  }
  if (rec.stoppedBy === 'brain') return { pose: 'matched', label: `Rule matched: ${duty} refused`, lamps: lamps(states) };
  if (rec.stoppedBy) return { pose: 'stopped', label: `Stopped by ${stopper}`, lamps: lamps(states) };
  if (stage('brain')?.understood === 'Nothing it recognised') return { pose: 'idle', label: 'No rule matched', lamps: lamps(states) };
  return { pose: 'answered', label: 'Answered: no secret involved', lamps: lamps(states) };
}
