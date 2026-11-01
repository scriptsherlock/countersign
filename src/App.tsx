import { useEffect, useReducer, useState, type FormEvent } from 'react';
import { TitleArt } from './assets/TitleArt';
import { DialogueBox } from './components/DialogueBox';
import { Button, SceneStage } from './components/ui';
import { FINALE, PHASES } from './content/phases';
import { firstDay, warrant, SPLICE } from './content/story';
import { newCampaign, reduce } from './engine/campaign';
import type { Band } from './engine/dialogue';
import { phasesCleared, rankFor } from './engine/progression';
import { clearGame, loadGame, saveGame } from './engine/save';
import { Complete, FieldReport, PhaseFile, SecondSplice, TuringHotspot } from './missions/trickbot/screens';
import { TrickbotMission } from './missions/trickbot/TrickbotMission';
import engine from './missions/trickbot/vendor/warden-engine.js';

const STYLES: { band: Band; label: string; hint: string }[] = [
  { band: 'simple', label: 'Short and simple', hint: 'Years 4–6' },
  { band: 'standard', label: 'Standard', hint: 'Years 7–9' },
  { band: 'full', label: 'Full detail', hint: 'Years 10–13' },
];

function Title({ onNew, onContinue, onCode, saved }: { onNew: (band: Band) => void; onContinue: () => void; onCode: (cracked: number) => void; saved: boolean }) {
  const [choosing, setChoosing] = useState(false), [code, setCode] = useState(''), [note, setNote] = useState('');
  const useCode = (e: FormEvent) => {
    e.preventDefault();
    const cracked = engine.parseLevelCode(code);
    if (cracked) onCode(cracked); else setNote('No signal on that code. Check it and try again.');
  };
  return (
    <main className="title">
      <TitleArt />
      <div className="title-text">
        <h1 data-text="Countersign">Countersign</h1>
        <p className="title-tag">Who’s really on the line?</p>
        {choosing ? (
          <div className="styles" role="group" aria-label="Choose a briefing style">
            {STYLES.map(s => <Button key={s.band} variant={s.band === 'standard' ? 'key' : 'quiet'} autoFocus={s.band === 'standard'} onClick={() => onNew(s.band)}>{s.label}<small>{s.hint}</small></Button>)}
          </div>
        ) : (
          <div className="row">
            <Button variant="key" autoFocus onClick={() => setChoosing(true)}>New file</Button>
            {saved && <Button onClick={onContinue}>Continue</Button>}
          </div>
        )}
        <details className="codebox">
          <summary>Have a field code?</summary>
          <form className="row" onSubmit={useCode}>
            <input aria-label="Field code" value={code} onChange={e => setCode(e.target.value)} maxLength={14} spellCheck={false} autoComplete="off" />
            <Button type="submit">Open file</Button>
          </form>
          <p className="note" role="status">{note}</p>
        </details>
      </div>
      <p className="title-foot">A practice game. Only try these tricks on practice bots.</p>
    </main>
  );
}

export function App() {
  const [state, dispatch] = useReducer(reduce, undefined, newCampaign);
  const [saved] = useState(loadGame);
  const [promotedFrom, setPromotedFrom] = useState('Recruit');
  useEffect(() => { if (state.stage !== 'title') saveGame(state); }, [state]);

  const callSign = state.flags.find(f => f.startsWith('sign:'))?.slice(5) ?? 'Agent Zero';
  const rank = rankFor(phasesCleared(state.cracked));
  const next = () => dispatch({ type: 'next' });
  const after = SPLICE.options.find(o => state.flags.includes(o.set))?.after ?? 'Static’s tape is still in the Bureau’s files.';

  switch (state.stage) {
    case 'title':
      return <Title saved={!!saved} onContinue={() => saved && dispatch({ type: 'continue', saved })} onNew={band => { clearGame(); dispatch({ type: 'newFile', band }); }} onCode={cracked => { clearGame(); dispatch({ type: 'fieldCode', cracked, band: 'standard' }); }} />;
    case 'firstDay':
      return <main className="full"><SceneStage scene={firstDay.scene}><DialogueBox script={firstDay} band={state.band} onDone={flags => { dispatch({ type: 'flags', flags }); next(); }} /></SceneStage></main>;
    case 'warrant':
      return <main className="full"><SceneStage scene={warrant.scene}><TuringHotspot /><DialogueBox script={warrant} band={state.band} flags={state.flags} onDone={next} /></SceneStage></main>;
    case 'briefing': {
      const script = PHASES[state.phase]!.briefing!;
      return <main className="full" data-theme={PHASES[state.phase]!.theme}><SceneStage scene={script.scene}>{script.scene === 'bureau' && <TuringHotspot />}<DialogueBox key={state.phase} script={script} band={state.band} flags={state.flags} onDone={next} /></SceneStage></main>;
    }
    case 'mission':
      return <TrickbotMission key={state.phase} phase={state.phase} rank={rank} callSign={callSign} cracked={state.cracked} tricks={state.tricks} onOpened={(gate, message, tricks) => { setPromotedFrom(rank); dispatch({ type: 'gateOpened', gate, message, tricks }); }} onDone={next} />;
    case 'file':
      return <main className="full" data-theme={PHASES[state.phase]!.theme}><PhaseFile phase={state.phase} rank={rank} promoted={promotedFrom !== rank} onNext={next} /></main>;
    case 'report':
      return <main className="full"><FieldReport band={state.band} onDone={card => { dispatch({ type: 'report', card }); next(); }} /></main>;
    case 'splice':
      return <main className="full"><SecondSplice band={state.band} winning={state.winning} onChoice={flag => { dispatch({ type: 'flags', flags: [...state.flags, flag] }); next(); }} /></main>;
    case 'finale':
      return <main className="full"><SceneStage scene={FINALE.scene}><DialogueBox script={FINALE} band={state.band} flags={state.flags} onDone={next} /></SceneStage></main>;
    case 'complete':
      return <main className="full"><Complete rank={rank} after={after} onRestart={() => { clearGame(); dispatch({ type: 'restart' }); }} /></main>;
  }
}
