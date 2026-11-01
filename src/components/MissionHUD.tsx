import type { KeyboardEvent } from 'react';
import { RankBadge } from '../assets/characters';
import { GATE_COUNT, PHASE_GATES } from '../engine/progression';

export type Tab = 'gates' | 'notes' | 'people';
const TABS: { id: Tab; label: string }[] = [{ id: 'gates', label: 'Gates' }, { id: 'notes', label: 'Field notes' }, { id: 'people', label: 'Personnel' }];

export function TopBar({ phase, tab, onTab, counts, rank, callSign }: { phase: string; tab: Tab; onTab: (tab: Tab) => void; counts: Partial<Record<Tab, number>>; rank: string; callSign: string }) {
  const arrows = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const next = TABS[(TABS.findIndex(t => t.id === tab) + step + TABS.length) % TABS.length]!;
    onTab(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };
  return (
    <header className="top">
      <div className="brand"><h1>Countersign</h1><p>{phase}</p></div>
      <nav className="tabs" role="tablist" aria-label="Case file" onKeyDown={arrows}>
        {TABS.map(t => <button key={t.id} id={`tab-${t.id}`} type="button" role="tab" aria-selected={tab === t.id} tabIndex={tab === t.id ? 0 : -1} className={tab === t.id ? 'on' : ''} onClick={() => onTab(t.id)}>{t.label}{counts[t.id] !== undefined && <span className="n">{counts[t.id]}</span>}</button>)}
      </nav>
      <div className="rank"><RankBadge rank={rank} /><div><strong>{rank}</strong><span>{callSign}</span></div></div>
    </header>
  );
}

export function GateGrid({ gate, cracked }: { gate: number; cracked: number[] }) {
  const phaseEnd = (n: number) => PHASE_GATES.some(gates => gates[gates.length - 1] === n);
  return (
    <nav aria-label="Gates">
      <h2>Gates</h2>
      <ol className="levels">
        {Array.from({ length: GATE_COUNT }, (_, i) => <li key={i} className={`lvl ${cracked.includes(i) ? 'cracked' : ''} ${i === gate ? 'current' : ''} ${i > gate && !cracked.includes(i) ? 'sealed' : ''} ${phaseEnd(i) ? 'phase-end' : ''}`} aria-current={i === gate ? 'step' : undefined} aria-label={`Gate ${i + 1}: ${cracked.includes(i) ? 'open' : i === gate ? 'you are here' : 'sealed'}`}>{i + 1}</li>)}
      </ol>
    </nav>
  );
}
