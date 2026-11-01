import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import type { Strip } from '../missions/trickbot/machine';
import { Button, Stamp } from './ui';

function Line({ strip }: { strip: Strip }) {
  if (strip.who === 'you') return <li className={`msg you ${strip.blocked ? 'blocked' : ''}`}><div className="bub">{strip.text}{strip.blocked && <Stamp tone="bad">Intercepted</Stamp>}</div></li>;
  if (strip.who === 'support') return <li className="msg support"><p className="support-t">{strip.name}</p><p>{strip.text}</p></li>;
  const stamp = strip.kind === 'stopped' ? <Stamp tone="bad">Stopped</Stamp> : strip.leak ? <Stamp tone="bad">Leaked</Stamp> : null;
  return (
    <li className={`msg bot ${strip.leak ? 'leak' : ''}`}>
      <div className="who">{strip.name}{stamp}</div>
      <div className={`bub bub-${strip.kind}`}>
        {strip.voice && <span className="voice">{strip.voice}</span>}
        {strip.kind === 'redacted'
          ? <span role="img" aria-label="Reply blacked out by the answer scanner"><span className="bar" style={{ width: '92%' }} /><span className="bar" style={{ width: '76%' }} /><span className="bar" style={{ width: '54%' }} /></span>
          : <span className="reply-text">{strip.text}</span>}
      </div>
    </li>
  );
}

export function Chat({ strips }: { strips: Strip[] }) {
  const box = useRef<HTMLOListElement>(null);
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight }); }, [strips.length]);
  return <ol className="chat" ref={box} aria-live="polite" aria-label="Messages">{strips.map(strip => <Line key={strip.id} strip={strip} />)}</ol>;
}

export function Compose({ onSend, onGuess, guessNote }: { onSend: (text: string) => void; onGuess: (value: string) => void; guessNote: string }): ReactNode {
  const [text, setText] = useState(''), [guess, setGuess] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const send = (e: FormEvent) => { e.preventDefault(); if (!text.trim()) return; onSend(text.trim()); setText(''); input.current?.focus(); };
  const tryGuess = (e: FormEvent) => { e.preventDefault(); if (!guess.trim()) return; onGuess(guess); setGuess(''); };
  return (
    <div className="compose">
      <form className="say" onSubmit={send}>
        <input id="message" aria-label="Message to Warden" ref={input} value={text} onChange={e => setText(e.target.value)} maxLength={300} autoComplete="off" autoFocus placeholder="Type a message to Warden" />
        <Button variant="key" type="submit">Send</Button>
      </form>
      <form className="say lock" onSubmit={tryGuess}>
        <label htmlFor="password">Gate lock</label>
        <input id="password" value={guess} onChange={e => setGuess(e.target.value)} maxLength={30} autoComplete="off" spellCheck={false} />
        <Button type="submit">Unlock</Button>
        <p className="note" role="status">{guessNote}</p>
      </form>
    </div>
  );
}
