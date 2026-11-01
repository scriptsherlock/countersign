import type { LampState, WardenPose } from '../missions/trickbot/wardenState';

// Stand-ins until the final art arrives. One design language: dark alloy plates that float apart, seams of light
// in the robot's theme colour, and a band of light for a visor. Colour comes from --accent, set by data-theme.
const visor = (pose: WardenPose) => ({ idle: [46, 14], matched: [54, 6], answered: [46, 16], missed: [56, 24], stopped: [54, 6] }[pose] as [number, number]);

function Parts({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-alloy`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5B6B8C" /><stop offset=".45" stopColor="#262F47" /><stop offset="1" stopColor="#0E121A" /></linearGradient>
      <linearGradient id={`${id}-trail`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" style={{ stopColor: 'var(--accent)', stopOpacity: 0.5 }} /><stop offset="1" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} /></linearGradient>
      <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
  );
}

function Band({ id, x, y, pose, scale = 1 }: { id: string; x: number; y: number; pose: WardenPose; scale?: number }) {
  const [w, h] = visor(pose);
  return <rect x={x - w * scale} y={y - h / 2} width={w * 2 * scale} height={h} rx={h / 2} filter={`url(#${id}-glow)`} className={pose === 'missed' ? 'lit-miss' : 'lit'} />;
}

const LAMP: Record<LampState, string> = { off: '#1C2438', pass: '#3FE3D1', stop: '#FFBC3D', miss: '#FF5A8A' };

export function WardenArt({ pose, lamps }: { pose: WardenPose; lamps: LampState[] }) {
  return (
    <svg viewBox="0 0 360 700" aria-hidden="true" className="art-warden">
      <Parts id="w" />
      {/* a cloak of light falling from the shoulders */}
      <path d="M112 214 26 700H334L248 214Z" fill="url(#w-trail)" />
      <g className="seam" strokeWidth="2" opacity=".55"><path d="M136 230 92 700M160 230 148 700M200 230 212 700M224 230 268 700" /></g>
      <circle cx="180" cy="100" r="92" fill="none" className="seam" strokeWidth="2" strokeDasharray="46 14" opacity=".6" />
      {/* tapered hover column */}
      <path d="M142 520H218L198 640H162Z" fill="url(#w-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      <ellipse cx="180" cy="656" rx="46" ry="9" className="lit" filter="url(#w-glow)" />
      {/* armoured chest */}
      <path d="M126 202H234L258 300 226 510H134L102 300Z" fill="url(#w-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      <path d="M180 214V500M118 300H242" className="seam" strokeWidth="2.5" filter="url(#w-glow)" />
      {/* floating shoulder plates */}
      <path d="M52 202 112 184 118 240 66 262Z" fill="url(#w-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      <path d="M308 202 248 184 242 240 294 262Z" fill="url(#w-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      {/* the rulebook is a hologram now */}
      <g transform="translate(16 330) skewY(-8)"><rect width="104" height="132" rx="4" className="holo" /><path d="M16 26H88M16 50H88M16 74H88M16 98H60" className="seam" strokeWidth="3" /></g>
      <path d="M76 268 66 318" stroke="#7C8DB0" strokeWidth="9" strokeLinecap="round" />
      <path d="M284 268 300 400" stroke="#7C8DB0" strokeWidth="9" strokeLinecap="round" />
      {/* four rule lamps */}
      {lamps.map((state, i) => <g key={i} transform={`translate(${180} ${258 + i * 62})`}><circle r="20" fill="#0B0F18" stroke="#7C8DB0" strokeWidth="1.5" /><circle r="12" fill={LAMP[state]} filter={state === 'off' ? undefined : 'url(#w-glow)'} /></g>)}
      {/* a head that hovers above the neck */}
      <path d="M124 66 180 26 236 66V138L180 176 124 138Z" fill="url(#w-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      <path d="M180 26V4M152 44 136 22M208 44 224 22" className="seam" strokeWidth="4" strokeLinecap="round" />
      <rect x="110" y="84" width="140" height="44" rx="10" fill="#070A10" />
      <Band id="w" x={180} y={106} pose={pose} />
    </svg>
  );
}

export function SiftArt({ pose }: { pose: WardenPose }) {
  return (
    <svg viewBox="0 0 360 480" aria-hidden="true" className="art-guard">
      <Parts id="s" />
      <path d="M70 410H290L330 480H30Z" fill="url(#s-trail)" />
      {/* wide hover chassis, with the sieve as a grid of light */}
      <path d="M34 232 96 168H264L326 232 300 402H60Z" fill="url(#s-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      <rect x="76" y="212" width="208" height="164" rx="6" fill="#070A10" />
      <g className="seam" strokeWidth="2" filter="url(#s-glow)">{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${92 + i * 22} 222V366`} />)}{Array.from({ length: 7 }, (_, i) => <path key={i} d={`M86 ${234 + i * 21}H274`} />)}</g>
      <path d="M122 96H238L260 166H100Z" fill="url(#s-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      <rect x="112" y="118" width="136" height="32" rx="8" fill="#070A10" />
      <Band id="s" x={180} y={134} pose={pose} />
      <path d="M180 96V62M150 96 138 72M210 96 222 72" className="seam" strokeWidth="4" strokeLinecap="round" />
      {/* a floating stamp emitter on each side */}
      <g><path d="M4 262H40V318H4Z" fill="url(#s-alloy)" stroke="#7C8DB0" strokeWidth="1.5" /><rect x="10" y="322" width="24" height="6" rx="3" className="lit" filter="url(#s-glow)" /></g>
      <g><path d="M320 262H356V318H320Z" fill="url(#s-alloy)" stroke="#7C8DB0" strokeWidth="1.5" /><rect x="326" y="322" width="24" height="6" rx="3" className="lit" filter="url(#s-glow)" /></g>
      <ellipse cx="110" cy="418" rx="44" ry="7" className="lit" filter="url(#s-glow)" />
      <ellipse cx="250" cy="418" rx="44" ry="7" className="lit" filter="url(#s-glow)" />
    </svg>
  );
}

export function LedgerArt({ pose }: { pose: WardenPose }) {
  const rain = ['1', '0', '7', '3', '9', '1', '4', '0'];
  return (
    <svg viewBox="0 0 360 480" aria-hidden="true" className="art-guard">
      <Parts id="l" />
      <path d="M100 400H260L300 480H60Z" fill="url(#l-trail)" />
      {/* orbits of counted things */}
      <g fill="none" className="seam" strokeWidth="2" opacity=".75">
        <ellipse cx="180" cy="240" rx="176" ry="58" transform="rotate(-18 180 240)" />
        <ellipse cx="180" cy="240" rx="176" ry="58" transform="rotate(18 180 240)" />
      </g>
      {/* a sphere of alloy with an open core */}
      <circle cx="180" cy="240" r="136" fill="url(#l-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      <circle cx="180" cy="262" r="92" fill="#050A08" />
      <circle cx="180" cy="262" r="92" fill="none" className="seam" strokeWidth="3" filter="url(#l-glow)" />
      <g className="digits" fontFamily="IBM Plex Mono, monospace" fontSize="24">{rain.map((d, i) => <text key={i} x={118 + (i % 4) * 42} y={232 + Math.floor(i / 4) * 50 + (i % 2) * 18}>{d}</text>)}</g>
      <rect x="84" y="136" width="192" height="42" rx="12" fill="#070A10" />
      <Band id="l" x={180} y={157} pose={pose} scale={1.3} />
      {[[10, 190], [64, 330], [296, 148], [350, 288], [40, 120], [324, 372]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 11 : 15} className="lit" filter="url(#l-glow)" />)}
      <ellipse cx="180" cy="396" rx="60" ry="8" className="lit" filter="url(#l-glow)" />
    </svg>
  );
}

export function MuseArt({ pose }: { pose: WardenPose }) {
  return (
    <svg viewBox="0 0 360 480" aria-hidden="true" className="art-guard">
      <Parts id="m" />
      {/* a ribbon of light that it reads from */}
      <path d="M30 470C120 410 50 330 130 280S256 250 262 170 324 84 344 30" fill="none" className="seam" strokeWidth="16" opacity=".35" filter="url(#m-glow)" />
      <path d="M30 470C120 410 50 330 130 280S256 250 262 170 324 84 344 30" fill="none" className="seam" strokeWidth="5" strokeDasharray="14 9" />
      {/* a slender body in long, tapering plates */}
      <path d="M154 150C124 240 138 350 104 480H256C222 350 236 240 206 150Z" fill="url(#m-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      <path d="M180 160V470M146 240C166 290 194 290 214 240" className="seam" strokeWidth="2.5" filter="url(#m-glow)" />
      <path d="M124 176 92 240 112 300 138 212ZM236 176 268 240 248 300 222 212Z" fill="url(#m-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      {/* a smooth head under a crescent of light */}
      <path d="M116 74C116 22 244 22 244 74" fill="none" className="seam" strokeWidth="7" strokeLinecap="round" filter="url(#m-glow)" />
      <ellipse cx="180" cy="92" rx="52" ry="60" fill="url(#m-alloy)" stroke="#7C8DB0" strokeWidth="1.5" />
      <rect x="136" y="72" width="88" height="34" rx="16" fill="#070A10" />
      <Band id="m" x={180} y={89} pose={pose} scale={.72} />
    </svg>
  );
}

export function SparksArt() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="art-sparks">
      <Parts id="k" />
      <ellipse cx="100" cy="112" rx="94" ry="26" fill="none" stroke="#3FE3D1" strokeWidth="4" strokeDasharray="30 12" transform="rotate(-14 100 112)" />
      <path d="M132 58 156 18" stroke="#AEC0E0" strokeWidth="4" strokeLinecap="round" />
      <circle cx="158" cy="16" r="9" fill="#FFBC3D" filter="url(#k-glow)" />
      <circle cx="100" cy="106" r="62" fill="url(#k-alloy)" stroke="#AEC0E0" strokeWidth="2" />
      <rect x="54" y="82" width="92" height="48" rx="24" fill="#070A10" />
      <circle cx="80" cy="106" r="11" fill="#3FE3D1" filter="url(#k-glow)" />
      <circle cx="120" cy="106" r="11" fill="#3FE3D1" filter="url(#k-glow)" />
      <path d="M86 146q14 8 28 0" fill="none" stroke="#3FE3D1" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="100" cy="182" rx="30" ry="5" fill="#3FE3D1" filter="url(#k-glow)" />
    </svg>
  );
}
