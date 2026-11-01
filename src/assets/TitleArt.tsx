import { artFor } from './art';

// The retro horizon: a slatted sun behind the Relay tower, and a grid that runs towards you.
export function TitleArt() {
  const image = artFor('scene-title');
  if (image) return <img className="title-image" src={image} alt="" />;
  return (
    <div className="horizon" aria-hidden="true">
      <svg className="sun" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFBC3D" /><stop offset=".55" stopColor="#FF5A8A" /><stop offset="1" stopColor="#7C4DFF" /></linearGradient>
          <mask id="slats"><rect width="1600" height="700" fill="#fff" />{Array.from({ length: 9 }, (_, i) => <rect key={i} y={330 + i * 40} width="1600" height={4 + i * 2.6} fill="#000" />)}</mask>
        </defs>
        <circle cx="1090" cy="420" r="290" fill="url(#sun)" mask="url(#slats)" />
        <path d="M1078 700 1084 250 1090 130 1096 250 1102 700Z" fill="#0C1340" />
        <rect x="1058" y="330" width="64" height="7" fill="#0C1340" />
        <rect x="1068" y="270" width="44" height="6" fill="#0C1340" />
        <path d="M0 700V610H90V570H180V630H260V540H350V600H470V650H560V590H660V640H760V560H860V620H960V590H1010V640H1170V580H1260V620H1340V550H1440V610H1520V580H1600V700Z" fill="#0C1340" />
      </svg>
      <div className="grid-floor"><div className="grid-lines" /></div>
    </div>
  );
}
