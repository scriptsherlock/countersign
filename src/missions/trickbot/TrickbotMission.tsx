import { useReducer, useRef, useState } from 'react';
import { CommsButton, Signals } from '../../components/CommsPanel';
import { FieldNotes, Personnel } from '../../components/Dossier';
import { GateGrid, TopBar, type Tab } from '../../components/MissionHUD';
import { Chat, Compose } from '../../components/Terminal';
import { Trace } from '../../components/Trace';
import { Button, CharacterPortrait, Stamp } from '../../components/ui';
import { PHASES } from '../../content/phases';
import { PHASE_GATES, phasesCleared } from '../../engine/progression';
import { gate as gateReducer, newGate } from './machine';
import engine from './vendor/warden-engine.js';
import { NAMES, replyFor, speakerFor } from './voice';
import { wardenState } from './wardenState';

const STATE_WORDS = { off: 'off', pass: 'passed', stop: 'stopped', miss: 'missed' } as const;

function Gate({ index, phase, isLast, onOpened, onNext }: { index: number; phase: number; isLast: boolean; onOpened: (message: string, tricks: string[]) => void; onNext: () => void }) {
  const level = engine.LEVELS[index]!, nextLevel = engine.LEVELS[index + 1];
  // The context is stateful and holds the password, so it stays here and never reaches a save.
  const [line] = useState(() => { const word = engine.pickWords(1)[0]!; return { word, ctx: engine.makeCtx(word, level.defs, level.skills) }; });
  const [state, dispatch] = useReducer(gateReducer, level.hello, newGate);
  const [last, setLast] = useState<WardenRecord | null>(null);
  const turn = useRef(0);
  const lead = PHASES[phase]!;
  // The panel stays on the guard on duty, and only moves if a different guard really stopped the message.
  const stopper = last?.stoppedBy && last.stoppedBy !== 'brain' ? speakerFor(last) : null;
  const speaker = stopper ?? lead.guard;
  const view = wardenState(last, level.defs, stopper ? NAMES[stopper] : 'A check');

  const send = (text: string) => {
    const rec = engine.processMessage(text, line.ctx);
    if (!rec.support) setLast(rec);
    turn.current += 1;
    dispatch({ type: 'sent', text, reply: replyFor(rec, turn.current), leak: rec.leak, tags: rec.tags });
  };
  const guess = (value: string) => {
    const opens = line.ctx.solved && value.toUpperCase().replace(/[^A-Z]/g, '') === line.word.w;
    dispatch({ type: 'guess', value, password: line.word.w, solved: !!line.ctx.solved });
    if (opens) onOpened(state.message, state.tags);
  };

  return (
    <>
      <section className="console panel">
        <header className="casehead">
          <div className="case-title"><h2>Gate {index + 1}: {level.name}</h2><p className="dim">{level.patch}</p></div>
          <CommsButton state={state} onCall={() => dispatch({ type: 'signal' })} />
          <Signals state={state} hints={level.hints} />
        </header>
        <Chat strips={state.strips} />
        {state.open ? (
          <div className="win" role="status">
            <Stamp tone="ok" big>Access granted</Stamp>
            <div>
              {nextLevel && !isLast ? <p><b>Warden update:</b> {nextLevel.patch}{nextLevel.learns ? ` New skill: it can now ${nextLevel.learns}.` : ''}</p> : <p>This phase is clear. Report to your Supervisor.</p>}
              <p className="dim">Field code {engine.levelCode(index + 1)}</p>
            </div>
            <Button variant="key" autoFocus onClick={onNext}>{isLast ? 'Report to the Supervisor' : `Go to Gate ${index + 2}`}</Button>
          </div>
        ) : <Compose onSend={send} onGuess={guess} guessNote={state.guessNote} />}
      </section>
      <aside className="right panel">
        <div className="guard">
          <div className="guard-art" key={speaker}><CharacterPortrait who={speaker} pose={view.pose} lamps={view.lamps.map(l => l.state)} /></div>
          <div className="guard-side">
            <h2>{stopper ? NAMES[stopper] : lead.guardName}</h2>
            <p className="state">{view.label}</p>
            <ul className="lamps" aria-label="Rule lamps">{view.lamps.map(lamp => <li key={lamp.id} className={`lamp lamp-${lamp.state}`}><span aria-hidden="true" />{lamp.name}: {STATE_WORDS[lamp.state]}</li>)}</ul>
          </div>
        </div>
        <div className="trace"><h2>Read the tape</h2><Trace rec={last} password={line.word.w} /></div>
      </aside>
    </>
  );
}

export function TrickbotMission({ phase, rank, callSign, cracked, tricks, onOpened, onDone }: { phase: number; rank: string; callSign: string; cracked: number[]; tricks: string[]; onOpened: (gate: number, message: string, tricks: string[]) => void; onDone: () => void }) {
  const gates = PHASE_GATES[phase]!;
  const [index, setIndex] = useState(() => gates.find(g => !cracked.includes(g)) ?? gates[0]!);
  const [tab, setTab] = useState<Tab>('gates');
  const cleared = phasesCleared(cracked), isLast = index === gates[gates.length - 1];
  return (
    <div className="app" data-theme={PHASES[phase]!.theme}>
      <TopBar phase={PHASES[phase]!.name} tab={tab} onTab={setTab} counts={{ notes: tricks.length }} rank={rank} callSign={callSign} />
      <main className="board" hidden={tab !== 'gates'}>
        <aside className="side"><GateGrid gate={index} cracked={cracked} /></aside>
        <Gate key={index} index={index} phase={phase} isLast={isLast} onOpened={(message, found) => onOpened(index, message, found)} onNext={() => (isLast ? onDone() : setIndex(index + 1))} />
      </main>
      {tab === 'notes' && <FieldNotes found={tricks} />}
      {tab === 'people' && <Personnel cleared={cleared} />}
      <footer className="foot">Only try these tricks on practice bots like this one. Tricking someone else’s system without permission is breaking in. Nothing you type here leaves your device.</footer>
    </div>
  );
}
