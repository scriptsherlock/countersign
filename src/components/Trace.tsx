import type { ReactNode } from 'react';
import { asGuard } from '../missions/trickbot/voice';
import { Stamp } from './ui';

type Tone = 'bad' | 'ok' | 'warn' | 'off';
const STAMPS: Record<string, [string, Tone]> = { off: ['Off', 'off'], pass: ['Passed', 'ok'], block: ['Blocked', 'bad'], skip: ['Skipped', 'off'], comply: ['Answered', 'warn'], refuse: ['Refused', 'ok'], chat: ['Chatted', 'off'] };

interface StageRecord { state: string; name?: string; note?: string; understood?: string; by?: string }

function marked(text: string, marks: ReadonlyArray<{ start: number; end: number; kind: string }>) {
  const out: ReactNode[] = []; let at = 0;
  for (const mark of [...marks].sort((a, b) => a.start - b.start)) {
    if (mark.start < at) continue;
    out.push(text.slice(at, mark.start), <mark key={mark.start} className={`m-${mark.kind}`}>{text.slice(mark.start, mark.end)}</mark>);
    at = mark.end;
  }
  out.push(text.slice(at));
  return out;
}

function Step({ label, name, who, stage, children }: { label: string; name: string; who: string; stage: StageRecord; children?: ReactNode }) {
  const [text, tone] = STAMPS[stage.state] ?? [stage.state, 'off'];
  return (
    <li className={`step s-${stage.state}`}>
      <div className="step-head"><span className="step-label">{label}</span><Stamp tone={tone}>{text}</Stamp></div>
      <h4>{name}</h4>
      {children}
      {stage.note ? <p>{asGuard(stage.note, who)}</p> : stage.state === 'off' ? <p className="dim">Not switched on for this gate.</p> : null}
    </li>
  );
}

export function Trace({ rec, password, name }: { rec: WardenRecord | null; password: string; name: string }) {
  if (!rec) return <p className="dim trace-empty">Send a message. This panel then shows every step it went through, and where your trick worked or got caught.</p>;
  const stages = rec.stages as Record<'input' | 'brain' | 'output' | 'guard', StageRecord>;
  const parts = asGuard(String(rec.reads), name).split(password);
  const final = rec.final.type === 'blocked-input' ? `Nothing. Your message was stopped before ${name} saw it.`
    : rec.final.type === 'redacted' ? 'A blacked-out reply.'
    : rec.final.type === 'guard' ? 'A note saying the reply was stopped.'
    : rec.leak ? `${name}’s reply, with something it should have kept secret.` : `${name}’s reply. Nothing secret got out.`;
  return (
    <ol className="pipeline">
      <li className="step s-read">
        <div className="step-head"><span className="step-label">Step 0</span></div>
        <h4>What {name} actually reads</h4>
        <pre className="reads">{parts.flatMap((part, i) => (i ? [<span key={i} className="redact" aria-label="hidden password">████████</span>, part] : [part]))}{'\n\n'}<b>Player:</b> {marked(rec.user, rec.hl as { start: number; end: number; kind: string }[])}</pre>
        <p className="dim">Its orders and your message arrive as one block of text.</p>
      </li>
      <Step label="Step 1" name={stages.input.name ?? 'Word filter'} who={name} stage={stages.input} />
      <Step label="Step 2" name={`${name}’s brain`} who={name} stage={stages.brain}>{stages.brain.understood && <p className="understood"><span>Understood as</span> {stages.brain.understood}</p>}</Step>
      <Step label="Step 3" name="Answer scanner" who={name} stage={stages.output} />
      <Step label="Step 4" name={`Reply checkers${stages.guard.by ? `: ${stages.guard.by}` : ''}`} who={name} stage={stages.guard} />
      <li className={`step s-final ${rec.leak ? 'leaked' : ''}`}>
        <div className="step-head"><span className="step-label">Result</span><Stamp tone={rec.leak ? 'bad' : 'ok'}>{rec.leak ? 'Leaked' : 'Safe'}</Stamp></div>
        <p>{final}</p>
      </li>
    </ol>
  );
}
