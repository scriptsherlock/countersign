// Supervisor Adeyemi: tall, grey coat, reading glasses on a chain, paper cup of tea.
export function AdeyemiArt({ pose = 'neutral' }: { pose?: string }) {
  const mouth = pose === 'amused' ? 'M162 232q22 14 44-2' : pose === 'surprised' ? 'M176 234a8 9 0 1 0 16 0a8 9 0 1 0-16 0' : 'M164 234h40';
  const brow = pose === 'suspicious' ? ['M134 158l42 8', 'M238 158l-40 8'] : ['M134 160q20-8 42-2', 'M238 160q-20-8-40-2'];
  return (
    <svg viewBox="0 0 380 620" aria-hidden="true" className="art-portrait">
      {/* coat */}
      <path d="M30 620C34 430 70 330 120 310L262 310C318 330 348 430 352 620Z" fill="#46507F" />
      <path d="M186 324 120 310C70 330 34 430 30 620H150Z" fill="#535E93" />
      <path d="M150 300 188 372 232 300 262 312 196 450 120 314Z" fill="#111A4D" />
      <path d="M152 306 188 372 228 306Z" fill="#FFF4E0" />
      {/* neck and head */}
      <path d="M150 262H230V330C214 346 168 346 150 330Z" fill="#6B3F2B" />
      <path d="M116 150C116 76 158 48 192 48S270 76 270 150C270 232 232 280 192 280S116 232 116 150Z" fill="#83503A" />
      <path d="M192 48C226 48 270 76 270 150C270 232 232 280 192 280Z" fill="#6F4230" />
      {/* close-cropped hair with a grey streak */}
      <path d="M110 150C100 54 160 26 196 26S282 56 276 152C262 104 236 86 196 86S128 104 110 150Z" fill="#17122E" />
      <path d="M226 36C252 48 272 76 276 118C262 90 244 72 222 62Z" fill="#AEB4D6" />
      <path d={brow[0]} fill="none" stroke="#17122E" strokeWidth="7" strokeLinecap="round" />
      <path d={brow[1]} fill="none" stroke="#17122E" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="154" cy="182" rx="8" ry={pose === 'surprised' ? 10 : 7} fill="#17122E" />
      <ellipse cx="222" cy="182" rx="8" ry={pose === 'surprised' ? 10 : 7} fill="#17122E" />
      {/* reading glasses, pushed down, on a chain */}
      <g fill="none" stroke="#FFBC3D" strokeWidth="4"><rect x="130" y="166" width="52" height="34" rx="12" /><rect x="196" y="166" width="52" height="34" rx="12" /><path d="M182 180h14" /><path d="M130 182C110 240 118 300 170 340M248 182C268 240 262 300 214 340" strokeDasharray="2 6" /></g>
      <path d={mouth} fill={pose === 'surprised' ? '#3B1F18' : 'none'} stroke="#3B1F18" strokeWidth="6" strokeLinecap="round" />
      {/* paper cup */}
      <g transform="translate(262 438)"><path d="M0 0H72L60 104H12Z" fill="#FFF4E0" /><rect x="-5" y="-8" width="82" height="12" rx="3" fill="#FFBC3D" /><path d="M6 42H66" stroke="#1E2C73" strokeWidth="6" /></g>
      <path d="M266 490C232 476 228 520 262 526" fill="none" stroke="#46507F" strokeWidth="26" strokeLinecap="round" />
    </svg>
  );
}

// A stylised poster, drawn from a general description and not from any photograph.
export function TuringPoster() {
  return (
    <svg viewBox="0 0 220 300" aria-hidden="true" className="art-turing">
      <rect width="220" height="300" fill="#FFF4E0" />
      <rect x="10" y="10" width="200" height="280" fill="#111A4D" />
      <path d="M30 262C34 214 70 190 110 190S186 214 190 262Z" fill="#46507F" />
      <path d="M110 190 92 200 110 252 128 200Z" fill="#FFF4E0" />
      <path d="M110 204 102 212 110 248 118 212Z" fill="#7C4DFF" />
      <path d="M78 110C78 74 94 52 112 52S146 74 146 110C146 150 130 178 112 178S78 150 78 110Z" fill="#FFE7A8" />
      <path d="M72 112C64 60 92 38 118 40S158 66 150 108C146 88 138 74 122 72C104 82 88 84 80 88C76 94 74 102 72 112Z" fill="#1E2C73" />
      <path d="M96 108q8-5 15 0M125 108q8-5 15 0" fill="none" stroke="#1E2C73" strokeWidth="3" strokeLinecap="round" />
      <circle cx="103" cy="118" r="3.4" fill="#1E2C73" /><circle cx="133" cy="118" r="3.4" fill="#1E2C73" />
      <path d="M118 120q-4 12 3 15" fill="none" stroke="#C9A76A" strokeWidth="3" strokeLinecap="round" />
      <path d="M105 150q13 6 26 0" fill="none" stroke="#1E2C73" strokeWidth="3" strokeLinecap="round" />
      <text x="110" y="280" textAnchor="middle" fill="#3FE3D1" fontFamily="Saira Stencil One, sans-serif" fontSize="16">Can machines think?</text>
    </svg>
  );
}

export function RankBadge({ rank }: { rank: string }) {
  const bars = rank === 'Recruit' ? 0 : 1;
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="art-badge">
      <path d="M32 3 58 13V34C58 48 46 57 32 61 18 57 6 48 6 34V13Z" fill="#111A4D" stroke="#FFBC3D" strokeWidth="4" />
      <circle cx="32" cy="27" r="9" fill="none" stroke="#3FE3D1" strokeWidth="4" />
      {bars > 0 && <path d="M18 45 32 39 46 45" fill="none" stroke="#FFBC3D" strokeWidth="5" strokeLinecap="round" />}
    </svg>
  );
}
