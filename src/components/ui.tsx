import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { artFor } from '../assets/art';
import { AdeyemiArt } from '../assets/characters';
import { LedgerArt, MuseArt, SiftArt, SparksArt, WardenArt } from '../assets/guards';
import { SceneArt } from '../assets/scenes';
import type { CharacterId, SceneId } from '../engine/dialogue';
import type { LampState, WardenPose } from '../missions/trickbot/wardenState';

export function Button({ variant = 'quiet', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'key' | 'quiet' }) {
  return <button type="button" {...props} className={`btn btn-${variant} ${props.className ?? ''}`} />;
}

export const Stamp = ({ children, tone, big }: { children: ReactNode; tone: 'bad' | 'ok' | 'warn' | 'off'; big?: boolean }) => <span className={`stamp st-${tone} ${big ? 'big' : ''}`}>{children}</span>;

export function SceneStage({ scene, children }: { scene: SceneId; children?: ReactNode }) {
  const image = artFor(`scene-${scene}`);
  return (
    <div className="stage scene-enter" key={scene}>
      <div className="stage-art">{image ? <img src={image} alt="" /> : <SceneArt scene={scene} />}</div>
      {children}
    </div>
  );
}

const BOT_POSES: Record<string, WardenPose> = { idle: 'idle', matched: 'matched', answered: 'answered', missed: 'missed', stopped: 'stopped' };

export function CharacterPortrait({ who, pose, lamps = [] }: { who: CharacterId; pose?: string; lamps?: LampState[] }) {
  const human = who === 'adeyemi';
  const rest = human ? 'neutral' : 'idle';
  // A character with any finished art never falls back to its stand-in, even if this pose isn't drawn yet.
  const image = artFor(who === 'sparks' ? 'sparks-idle' : `${who}-${pose ?? rest}`) ?? artFor(`${who}-${rest}`);
  if (image) return <img className="portrait-image" src={image} alt="" />;
  const botPose = BOT_POSES[pose ?? 'idle'] ?? 'idle';
  // data-theme sets --accent, so a guard keeps its own colour wherever it appears
  const art = (() => {
    switch (who) {
      case 'adeyemi': return <AdeyemiArt pose={pose ?? 'neutral'} />;
      case 'sparks': return <SparksArt />;
      case 'sift': return <SiftArt pose={botPose} />;
      case 'ledger': return <LedgerArt pose={botPose} />;
      case 'muse': return <MuseArt pose={botPose} />;
      default: return <WardenArt pose={botPose} lamps={lamps.length ? lamps : ['off', 'off', 'off', 'off']} />;
    }
  })();
  return <span className="theme-box" data-theme={who}>{art}</span>;
}
