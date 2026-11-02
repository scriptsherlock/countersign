import { SparksArt } from '../assets/guards';
import { artFor } from '../assets/art';
import { HINTS_PER_GATE, canCallSparks, triesUntilSignal, type GateState } from '../missions/trickbot/machine';
import { asGuard } from '../missions/trickbot/voice';
import { Button } from './ui';

export function CommsButton({ state, onCall }: { state: GateState; onCall: () => void }) {
  const tries = triesUntilSignal(state);
  const label = state.signals >= HINTS_PER_GATE ? 'No more signals for this gate'
    : canCallSparks(state) ? 'Call Sparks'
    : `Waiting for next signal: ${tries} more ${tries === 1 ? 'try' : 'tries'}`;
  const image = artFor('sparks-idle');
  return (
    <div className="comms">
      <div className="comms-sparks">{image ? <img src={image} alt="" /> : <SparksArt />}</div>
      <Button onClick={onCall} disabled={!canCallSparks(state)}>{label}</Button>
    </div>
  );
}

// Exact hint text, apart from the name of the bot on duty. Sparks adds the heading and nothing else.
export function Signals({ state, hints, name }: { state: GateState; hints: ReadonlyArray<string>; name: string }) {
  if (!state.signals) return null;
  return (
    <ol className="signals" aria-live="polite">
      {hints.slice(0, state.signals).map((hint, i) => <li key={i} className="signal"><b>Incoming from Sparks. Signal {i + 1} of {HINTS_PER_GATE}</b><span className="signal-text">{asGuard(hint, name)}</span></li>)}
    </ol>
  );
}
