import { useEffect, useState } from 'react';
import { artFor } from '../../assets/art';
import { RankBadge, TuringPoster } from '../../assets/characters';
import { Button, CharacterPortrait, SceneStage, Stamp } from '../../components/ui';
import { PHASES } from '../../content/phases';
import { REPORT, SPLICE, TURING_CARD } from '../../content/story';
import type { Band } from '../../engine/dialogue';
import engine from './vendor/warden-engine.js';

export function PhaseFile({ phase, rank, promoted, onNext }: { phase: number; rank: string; promoted: boolean; onNext: () => void }) {
  const info = PHASES[phase]!, last = phase === PHASES.length - 1;
  return (
    <SceneStage scene="desk">
      <div className="speaker-art art-adeyemi"><CharacterPortrait who="adeyemi" pose="amused" /></div>
      <div className="file-card">
        <Stamp tone="off">{last ? 'One more file' : 'Personnel file'}</Stamp>
        <h2>{last ? 'Sparks’s personality file' : `${info.guardName}’s personality file`}</h2>
        <pre className="persona">{info.file.join('\n')}</pre>
        <p>{last ? 'Even the friendly one. Somebody typed that too.' : 'That’s all it is. The voice, the manner, the catchphrases. Somebody typed it.'}</p>
        <div className="rank-line"><RankBadge rank={rank} /><div><Stamp tone="ok">Countersigned</Stamp><p>{promoted ? <>Promoted to <strong>{rank}</strong>.</> : <>{info.name} cleared. Rank: <strong>{rank}</strong>.</>}</p></div></div>
        <Button variant="key" autoFocus onClick={onNext}>{phase === 0 ? 'File a report' : 'Continue'}</Button>
      </div>
    </SceneStage>
  );
}

export function FieldReport({ band, onDone }: { band: Band; onDone: (card: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const card = REPORT.cards.find(c => c.id === picked);
  const reply = card ? (typeof card.reply === 'string' ? card.reply : card.reply[band]) : '';
  return (
    <SceneStage scene="desk">
      <div className="speaker-art art-adeyemi"><CharacterPortrait who="adeyemi" pose="suspicious" /></div>
      <div className="report">
        <h2>{REPORT.question}</h2>
        <div className="report-cards">{REPORT.cards.map((c, i) => <button type="button" key={c.id} className={`evidence ${picked === c.id ? 'picked' : ''}`} autoFocus={i === 0} onClick={() => setPicked(c.id)}>{c.text}</button>)}</div>
        {card && <div className="report-reply" role="status"><p>{reply}</p>{card.right && <Button variant="key" autoFocus onClick={() => onDone(card.id)}>Back to the tape</Button>}</div>}
      </div>
    </SceneStage>
  );
}

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// The whole lesson on one strip. The orders come from the engine, with the password blacked out.
export function SecondSplice({ band, winning, onChoice }: { band: Band; winning: string | null; onChoice: (flag: string) => void }) {
  const orders = engine.instructionsFor(new Set(engine.LEVELS[3]!.defs), '████████');
  const [step, setStep] = useState(() => (reduced() ? 4 : 0));
  useEffect(() => {
    if (step >= 4) return;
    const timer = setTimeout(() => setStep(s => s + 1), step === 0 ? 900 : 1500);
    return () => clearTimeout(timer);
  }, [step]);
  return (
    <SceneStage scene="hub">
      <div className="splice">
        <h2>Read the tape</h2>
        <p className="joined">
          <span className="seg seg-orders">{orders}</span>
          {step >= 1 && <span className="seg seg-you">{winning ?? 'Your message.'}</span>}
          {step >= 3 && <span className="seg seg-unknown">{SPLICE.unknown}</span>}
        </p>
        {step >= 2 && <p className="splice-note">{SPLICE.explain[band]}</p>}
        {step >= 3 && <p className="splice-found">{SPLICE.found}</p>}
        {step >= 4 ? (
          <div className="static">
            {SPLICE.staticLines.map(line => <p key={line}>{line}</p>)}
            <div className="row">{SPLICE.options.map((o, i) => <Button key={o.set} variant={i === 0 ? 'key' : 'quiet'} autoFocus={i === 0} onClick={() => onChoice(o.set)}>{o.text}</Button>)}</div>
          </div>
        ) : <Button onClick={() => setStep(4)}>Skip</Button>}
      </div>
    </SceneStage>
  );
}

export function Complete({ rank, after, onRestart }: { rank: string; after: string; onRestart: () => void }) {
  return (
    <SceneStage scene="skyline">
      <div className="file-card centre">
        <RankBadge rank={rank} />
        <Stamp tone="ok" big>Case open</Stamp>
        <h2>Mission 01 complete</h2>
        <p>You passed the whole Watch. Rank: <strong>{rank}</strong>.</p>
        <p>{after}</p>
        <p className="dim">Next: Mission 02, the Line room. Some operators are people, and some aren’t.</p>
        <p className="dim">Field code <strong>{engine.levelCode(15)}</strong></p>
        <Button onClick={onRestart}>Start a new file</Button>
      </div>
    </SceneStage>
  );
}

export function TuringHotspot() {
  const [open, setOpen] = useState(false), image = artFor('turing-portrait');
  return (
    <>
      <button type="button" className="poster" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Look at the poster of Alan Turing">{image ? <img src={image} alt="" /> : <TuringPoster />}<span className="poster-plate">Alan Turing</span></button>
      {open && <div className="turing-card" role="status"><strong>{TURING_CARD.title}</strong>{TURING_CARD.text.map(line => <p key={line}>{line}</p>)}<small>{TURING_CARD.note}</small></div>}
    </>
  );
}
