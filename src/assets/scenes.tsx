import type { ReactElement } from 'react';
import type { SceneId } from '../engine/dialogue';

// A small fixed sequence, so the skyline looks the same on every load and in every screenshot.
const noise = (seed: number) => { const x = Math.sin(seed * 12.9898) * 43758.5453; return x - Math.floor(x); };

function Windows({ x, y, w, h, seed, lit }: { x: number; y: number; w: number; h: number; seed: number; lit: string }) {
  const panes: ReactElement[] = [];
  for (let row = 0; row * 26 < h - 24; row++) for (let col = 0; col * 20 < w - 22; col++) {
    const n = noise(seed + row * 7 + col * 13);
    if (n > 0.72) panes.push(<rect key={`${row}-${col}`} x={x + 12 + col * 20} y={y + 16 + row * 26} width={10} height={14} fill={n > 0.93 ? '#FFBC3D' : lit} opacity={0.35 + n * 0.5} />);
  }
  return <g>{panes}</g>;
}

function Block({ x, w, top, base, fill, seed, lit = '#3FE3D1' }: { x: number; w: number; top: number; base: number; fill: string; seed: number; lit?: string }) {
  return <g><rect x={x} y={top} width={w} height={base - top} fill={fill} /><Windows x={x} y={top} w={w} h={base - top} seed={seed} lit={lit} /></g>;
}

function Skyline() {
  const far = [[0, 130, 300], [120, 170, 240], [280, 120, 330], [390, 190, 200], [570, 130, 290], [690, 160, 170], [840, 120, 300], [950, 180, 230], [1120, 130, 180], [1240, 170, 280], [1400, 200, 220]] as const;
  const near = [[-30, 230, 420], [190, 170, 520], [350, 260, 380], [960, 240, 470], [1190, 200, 360], [1380, 260, 500]] as const;
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0C1340" /><stop offset=".6" stopColor="#2A1F7A" /><stop offset="1" stopColor="#7C4DFF" /></linearGradient>
        <radialGradient id="tower" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#3FE3D1" stopOpacity=".55" /><stop offset="1" stopColor="#3FE3D1" stopOpacity="0" /></radialGradient>
        <filter id="neon" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)" />
      <circle cx="800" cy="210" r="340" fill="url(#tower)" />
      {far.map(([x, w, top], i) => <Block key={i} x={x} w={w} top={top + 90} base={760} fill="#1E2C73" seed={i + 1} lit="#6F7FE0" />)}
      {/* the Relay tower is the tallest thing in the city */}
      <path d="M770 760 L785 180 L800 60 L815 180 L830 760 Z" fill="#111A4D" />
      <rect x="760" y="300" width="80" height="10" fill="#3FE3D1" filter="url(#neon)" />
      <rect x="772" y="196" width="56" height="8" fill="#3FE3D1" filter="url(#neon)" />
      <circle cx="800" cy="66" r="7" fill="#FFBC3D" filter="url(#neon)" />
      {near.map(([x, w, top], i) => <Block key={i} x={x} w={w} top={top + 120} base={800} fill="#111A4D" seed={i + 31} lit="#3FE3D1" />)}
      <g filter="url(#neon)"><rect x="1012" y="438" width="136" height="46" rx="6" fill="none" stroke="#FF5A8A" strokeWidth="5" /><path d="M1034 462h92" stroke="#FF5A8A" strokeWidth="5" /></g>
      <rect y="760" width="1600" height="140" fill="#0C1340" />
      <g fill="#FFF4E0" opacity=".22">{[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={i} x={560 + i * 66} y={810} width={40} height={90} />)}</g>
      {/* a delivery bot waits at the crossing, as bots do */}
      <g transform="translate(440 716)"><rect x="0" y="16" width="70" height="44" rx="10" fill="#1E2C73" stroke="#3FE3D1" strokeWidth="3" /><circle cx="16" cy="66" r="9" fill="#FFF4E0" /><circle cx="54" cy="66" r="9" fill="#FFF4E0" /><rect x="30" y="-6" width="4" height="24" fill="#FFF4E0" /><circle cx="32" cy="-8" r="6" fill="#FFBC3D" /></g>
      <g stroke="#C9B6FF" strokeWidth="2" opacity=".28">{Array.from({ length: 70 }, (_, i) => { const x = noise(i) * 1600, y = noise(i + 99) * 860; return <path key={i} d={`M${x} ${y}l-6 34`} />; })}</g>
    </svg>
  );
}

function Bureau() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id="lamp" cx=".5" cy="0" r="1"><stop offset="0" stopColor="#FFBC3D" stopOpacity=".55" /><stop offset="1" stopColor="#FFBC3D" stopOpacity="0" /></radialGradient>
        <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0C1340" /><stop offset="1" stopColor="#7C4DFF" /></linearGradient>
      </defs>
      <rect width="1600" height="900" fill="#17235F" />
      <rect x="1130" y="120" width="360" height="460" fill="url(#night)" />
      <g fill="#111A4D"><rect x="1130" y="400" width="90" height="180" /><rect x="1230" y="330" width="80" height="250" /><rect x="1320" y="440" width="170" height="140" /></g>
      <g fill="#3FE3D1" opacity=".7"><rect x="1250" y="360" width="8" height="12" /><rect x="1280" y="410" width="8" height="12" /><rect x="1150" y="440" width="8" height="12" /><rect x="1400" y="470" width="8" height="12" /></g>
      <path d="M1130 120h360v460h-360zM1308 120v460M1130 350h360" fill="none" stroke="#111A4D" strokeWidth="14" />
      {/* shelves of tape: the Bureau's whole memory */}
      <g>
        {[190, 330, 470].map(y => <rect key={y} x="90" y={y} width="430" height="12" fill="#111A4D" />)}
        {[0, 1, 2].flatMap(s => Array.from({ length: 8 }, (_, i) => <g key={`${s}-${i}`} transform={`translate(${116 + i * 52} ${142 + s * 140})`}><circle r="23" cy="24" fill={noise(s * 9 + i) > 0.7 ? '#FFBC3D' : '#FFE7A8'} /><circle r="7" cy="24" fill="#111A4D" /></g>))}
      </g>
      <path d="M0 0H1600V900H0Z" fill="#111A4D" opacity=".14" />
      <path d="M650 0 L300 760 H1160 L810 0 Z" fill="url(#lamp)" />
      <rect x="690" y="0" width="80" height="44" fill="#111A4D" />
      <ellipse cx="730" cy="46" rx="62" ry="12" fill="#FFBC3D" />
      <rect y="760" width="1600" height="140" fill="#0C1340" />
      <rect x="230" y="704" width="1020" height="26" rx="4" fill="#FFF4E0" opacity=".92" />
      <rect x="230" y="730" width="1020" height="34" fill="#111A4D" />
      {/* a real paper strip across the desk */}
      <path d="M330 716c120-18 240 14 360 0s220-16 340 0" fill="none" stroke="#FFE7A8" strokeWidth="14" />
    </svg>
  );
}

function Gate() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0C1340" /><stop offset="1" stopColor="#1E2C73" /></linearGradient>
        <radialGradient id="behind" cx=".5" cy=".55" r=".5"><stop offset="0" stopColor="#3FE3D1" stopOpacity=".5" /><stop offset=".7" stopColor="#7C4DFF" stopOpacity=".18" /><stop offset="1" stopColor="#7C4DFF" stopOpacity="0" /></radialGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1E2C73" /><stop offset="1" stopColor="#0C1340" /></linearGradient>
        <filter id="edge" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect width="1600" height="900" fill="url(#wall)" />
      <circle cx="800" cy="420" r="560" fill="url(#behind)" />
      {/* the gate itself: three heavy arches, the innermost one lit */}
      <path d="M260 780V360a540 340 0 0 1 1080 0V780" fill="none" stroke="#111A4D" strokeWidth="96" />
      <path d="M360 780V380a440 280 0 0 1 880 0V780" fill="none" stroke="#17235F" strokeWidth="56" />
      <path d="M440 780V400a360 230 0 0 1 720 0V780" fill="none" stroke="#3FE3D1" strokeWidth="6" filter="url(#edge)" />
      <g fill="#111A4D">{[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={i} x={250 + i * 8} y={420 + i * 44} width="30" height="16" opacity=".0" />)}</g>
      <g fill="#7C4DFF" opacity=".5"><rect x="222" y="520" width="76" height="10" /><rect x="222" y="620" width="76" height="10" /><rect x="1302" y="520" width="76" height="10" /><rect x="1302" y="620" width="76" height="10" /></g>
      {/* tape runs over the gate and out to the terminal on the right */}
      <path d="M-20 150C260 100 520 210 800 130S1320 90 1620 170" fill="none" stroke="#FFE7A8" strokeWidth="18" />
      <path d="M-20 150C260 100 520 210 800 130S1320 90 1620 170" fill="none" stroke="#111A4D" strokeWidth="3" strokeDasharray="3 15" />
      <path d="M0 780H1600V900H0Z" fill="url(#floor)" />
      <path d="M440 780 300 900M1160 780 1300 900M640 780 600 900M960 780 1000 900" stroke="#3FE3D1" strokeWidth="2" opacity=".35" />
      <rect y="776" width="1600" height="5" fill="#3FE3D1" opacity=".5" />
    </svg>
  );
}

function Hub() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect width="1600" height="900" fill="#0E1540" />
      <g stroke="#7C4DFF" fill="none" strokeWidth="6" opacity=".55">
        <path d="M0 120C300 240 420 40 760 170S1300 60 1600 210" />
        <path d="M0 260C240 180 520 340 820 250S1360 340 1600 280" stroke="#C9B6FF" opacity=".5" />
        <path d="M0 700C360 620 480 790 800 700S1320 650 1600 740" stroke="#3FE3D1" opacity=".5" />
      </g>
      {/* hand-built racks along the floor, each with one small lamp: somebody lives and works here */}
      <g fill="#141E5C">{Array.from({ length: 16 }, (_, i) => <rect key={i} x={i * 110 - 20} y={860 - noise(i + 4) * 60} width="96" height="120" />)}</g>
      <g fill="#FFBC3D">{Array.from({ length: 16 }, (_, i) => <circle key={i} cx={i * 110 + 26} cy={876 - noise(i + 4) * 60} r="4" />)}</g>
    </svg>
  );
}

const ART: Record<SceneId, () => ReactElement> = { skyline: Skyline, bureau: Bureau, gate: Gate, hub: Hub, desk: Bureau };
export const SceneArt = ({ scene }: { scene: SceneId }) => { const Art = ART[scene]; return <Art />; };
