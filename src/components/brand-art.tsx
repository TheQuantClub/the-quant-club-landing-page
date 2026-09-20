export function OrbitArt({ id = "hero", compact = false }: { id?: string; compact?: boolean }) {
  const project = (theta: number, phi: number) => {
    const radius = 170 + 60 * Math.cos(phi);
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const z = 60 * Math.sin(phi);
    const py = y * .58 - z * .82;
    return [330 + x * .85 - py * .53, 306 + x * .53 + py * .85];
  };
  const curve = (index: number, around: boolean) => Array.from({ length: 101 }, (_, p) => {
    const t = p / 100 * Math.PI * 2;
    const [x, y] = project(around ? t : index / 64 * Math.PI * 2, around ? index / 26 * Math.PI * 2 : t);
    return `${p ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  return <svg className={`orbit-art ${compact ? "orbit-art--compact" : ""}`} viewBox="0 0 660 610" aria-hidden="true">
    <defs>
      <radialGradient id={`${id}-glow`}><stop stopColor="#2563eb" stopOpacity=".3"/><stop offset="1" stopColor="#2563eb" stopOpacity="0"/></radialGradient>
      <linearGradient id={`${id}-wire`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9bfbff"/><stop offset=".38" stopColor="#06b6d4"/><stop offset=".72" stopColor="#2563eb"/><stop offset="1" stopColor="#284280"/></linearGradient>
    </defs>
    <circle cx="340" cy="315" r="294" fill={`url(#${id}-glow)`}/>
    <g className="orbit-guides" fill="none" stroke="#557b9c" strokeWidth=".6">
      <circle cx="330" cy="306" r="262" strokeDasharray="2 8" opacity=".5"/>
      <ellipse cx="330" cy="306" rx="304" ry="135" transform="rotate(-28 330 306)" opacity=".3"/>
      <path d="M330 25v30M330 558v27M48 306H72M591 306h26"/>
    </g>
    <g className="orbit-core" fill="none" stroke={`url(#${id}-wire)`}>
      {Array.from({ length: 64 }, (_, i) => <path key={`v${i}`} d={curve(i, false)} strokeWidth={i % 8 === 0 ? 1.5 : .65} opacity={(.36 + Math.sin(i / 64 * Math.PI) * .55).toFixed(4)}/>)}
      {Array.from({ length: 26 }, (_, i) => <path key={`h${i}`} d={curve(i, true)} strokeWidth=".7" opacity={.35}/>) }
    </g>
    <g fill="#8eeaff"><circle cx="101" cy="188" r="3"/><circle cx="553" cy="441" r="3"/></g>
    <g stroke="#537c97" strokeWidth=".7" fill="none"><path d="M101 188L66 154H19M553 441l32 39h44"/></g>
    {!compact && <g fill="#79a1bc" fontSize="8" fontFamily="monospace" letterSpacing="2"><text x="20" y="145">DEFINED BY PROCESS</text><text x="464" y="498">BUILT ON DISCIPLINE</text></g>}
  </svg>;
}

export function StrategyShape({ variant }: { variant: string }) {
  return <div className={`strategy-sculpture sculpture--${variant}`} aria-hidden="true">
    {Array.from({ length: 9 }, (_, i) => <span key={i} style={{ "--ring": i } as React.CSSProperties}/>)}
    <i/><b/>
  </div>;
}
