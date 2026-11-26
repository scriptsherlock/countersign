import { useEffect, useState } from 'react';
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
// The list can be hidden to a small tab; a new signal opens it again.
export function Signals({ state, hints, name }: { state: GateState; hints: ReadonlyArray<string>; name: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => setHidden(false), [state.signals]);
  if (!state.signals) return null;
  const count = `${state.signals} ${state.signals === 1 ? 'signal' : 'signals'}`;
  return (
    <div className={`signals-box ${hidden ? 'is-hidden' : ''}`}>
      <button type="button" className="signals-toggle" aria-expanded={!hidden} aria-controls="sparks-signals" onClick={() => setHidden(!hidden)}>
        {hidden ? `Show Sparks’s ${count}` : 'Hide signals'}
      </button>
      <ol id="sparks-signals" className="signals" aria-live="polite" hidden={hidden}>
        {hints.slice(0, state.signals).map((hint, i) => <li key={i} className="signal"><b>Incoming from Sparks. Signal {i + 1} of {HINTS_PER_GATE}</b><span className="signal-text">{asGuard(hint, name)}</span></li>)}
      </ol>
    </div>
  );
}
