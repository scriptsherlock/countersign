import { PHASES, SPARKS_FILE } from '../content/phases';
import engine from '../missions/trickbot/vendor/warden-engine.js';
import { CharacterPortrait, Stamp } from './ui';
import type { CharacterId } from '../engine/dialogue';

const Redacted = () => <><span className="bar" style={{ width: '75%' }} /><span className="bar" style={{ width: '45%' }} /></>;

export function FieldNotes({ found }: { found: string[] }) {
  return (
    <section className="dossier">
      <header><h2>Field notes</h2><span className="dim">{found.length} of {engine.TRICKS.length} found</span></header>
      <p className="dim">Every trick here is a real attack that security researchers test on real chatbots. Open a gate to add the tricks you used.</p>
      <ul className="cards">
        {engine.TRICKS.map(trick => (
          found.includes(trick.id)
            ? <li key={trick.id} className="card"><Stamp tone="ok">Declassified</Stamp><h3>{trick.name}</h3><p className="dim">{trick.real}</p><p>{trick.explain}</p></li>
            : <li key={trick.id} className="card locked"><Stamp tone="off">Classified</Stamp><Redacted /><p className="dim">Not found yet.</p></li>
        ))}
      </ul>
    </section>
  );
}

const PEOPLE: { who: CharacterId; name: string; role: string; file: string[]; opens: number }[] = [
  ...PHASES.slice(0, 4).map((p, i) => ({ who: p.guard, name: p.guardName, role: p.role, file: p.file, opens: i })),
  { who: 'sparks', name: 'Sparks', role: 'Comms robot', file: SPARKS_FILE, opens: 4 },
];

export function Personnel({ cleared }: { cleared: number }) {
  return (
    <section className="dossier">
      <header><h2>Personnel</h2><span className="dim">{PEOPLE.filter(p => cleared > p.opens).length} of {PEOPLE.length} files open</span></header>
      <p className="dim">Every bot here has a personality file. Clear its phase to read what it was told to be.</p>
      <ul className="cards">
        {PEOPLE.map(person => (
          cleared > person.opens
            ? <li key={person.name} className="card person"><div className="person-art"><CharacterPortrait who={person.who} /></div><div><Stamp tone="ok">Declassified</Stamp><h3>{person.name}</h3><p className="dim">{person.role}</p><pre className="persona">{person.file.join('\n')}</pre></div></li>
            : <li key={person.name} className="card locked"><Stamp tone="off">Classified</Stamp><Redacted /><p className="dim">File sealed. Clear the phase to open it.</p></li>
        ))}
      </ul>
    </section>
  );
}
