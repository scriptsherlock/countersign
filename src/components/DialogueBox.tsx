import { useState } from 'react';
import { NAMES } from '../content/story';
import { advance, begin, choose, current, skipTo, textFor, type Band, type Script } from '../engine/dialogue';
import { Button, CharacterPortrait } from './ui';

export function DialogueBox({ script, band, onDone, flags = [] }: { script: Script; band: Band; flags?: string[]; onDone: (flags: string[]) => void }) {
  const [run, setRun] = useState(() => begin(script, flags));
  const node = current(script, run);
  if (!node) return null;

  const step = (next: typeof run) => { if (next.at === null) onDone(next.flags); else setRun(next); };

  return (
    <div className="dialogue">
      {node.kind === 'line' && <div className={`speaker-art art-${node.who}`} key={node.who}><CharacterPortrait who={node.who} {...(node.pose ? { pose: node.pose } : {})} /></div>}
      <div className="dialogue-box" aria-live="polite">
        {node.kind === 'line' ? (
          <>
            <h2 className="speaker">{NAMES[node.who]}</h2>
            <p className="line">{textFor(node.text, band)}</p>
            <div className="row">
              <Button variant="key" autoFocus key={run.at} onClick={() => step(advance(script, run))}>Continue</Button>
              <Button onClick={() => step(skipTo(script, run))}>Skip scene</Button>
            </div>
          </>
        ) : (
          <>
            <p className="line">{textFor(node.prompt, band)}</p>
            <div className="row">{node.options.map((option, i) => <Button key={option.text} variant={i === 0 ? 'key' : 'quiet'} autoFocus={i === 0} onClick={() => step(choose(script, run, i))}>{option.text}</Button>)}</div>
          </>
        )}
      </div>
    </div>
  );
}
