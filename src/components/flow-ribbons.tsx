import { useId } from "react";

/** Decorative research ribbons; these paths do not represent financial data. */
export function FlowRibbons() {
  const id = useId().replaceAll(":", "");
  return <div className="q-flow-ribbons" aria-hidden="true"><svg viewBox="0 0 1440 840" preserveAspectRatio="none">
    <defs>
      <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#46bfee" stopOpacity=".1"/><stop offset=".35" stopColor="#3299eb" stopOpacity=".15"/><stop offset=".72" stopColor="#1978e8" stopOpacity=".65"/><stop offset="1" stopColor="#2563eb" stopOpacity=".32"/></linearGradient>
      <linearGradient id={`${id}-wash`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#bdeaff" stopOpacity=".05"/><stop offset=".65" stopColor="#8dd7fa" stopOpacity=".13"/><stop offset="1" stopColor="#5aaff8" stopOpacity=".21"/></linearGradient>
      <linearGradient id={`${id}-light`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#4acff2" stopOpacity="0"/><stop offset=".6" stopColor="#24b8f0" stopOpacity=".7"/><stop offset="1" stopColor="#2563eb" stopOpacity="0"/></linearGradient>
    </defs>
    <g className="q-flow-sweep">
      <path d="M-120 526C100 430 242 830 525 731S875 567 1060 472 1307 155 1570 194L1570 323C1290 257 1256 466 1081 558S783 779 557 777 126 591-120 650Z" fill={`url(#${id}-wash)`}/>
      {Array.from({length:34},(_,i)=><path key={i} d={`M-140 ${533+i*3.3}C85 ${388+i*5} 240 ${853+i*.2} 526 ${720+i*1.6}S853 ${610+i*3} 1065 ${477+i*2.4} 1300 ${120+i*4.3} 1580 ${173+i*4.4}`} stroke={`url(#${id}-line)`} strokeWidth={i%7===0?1.3:.6} fill="none" opacity={i%7===0?.7:.4}/>) }
      {[0,13,25].map(i=><path key={i} className="q-flow-light" style={{animationDelay:`${i*-1.7}s`}} d={`M-140 ${533+i*3.3}C85 ${388+i*5} 240 ${853+i*.2} 526 ${720+i*1.6}S853 ${610+i*3} 1065 ${477+i*2.4} 1300 ${120+i*4.3} 1580 ${173+i*4.4}`} pathLength="1000" stroke={`url(#${id}-light)`} strokeWidth="1.8" strokeDasharray="55 945" fill="none"/>)}
    </g>
    <g className="q-flow-upper">
      <path d="M650 770C1080 810 897 269 1221 139S1470-99 1580-90V19C1410 129 1372 164 1194 252S1100 800 686 837Z" fill={`url(#${id}-wash)`}/>
      {Array.from({length:20},(_,i)=><path key={i} d={`M${637+i*4} 865C${1145+i*3} 821 ${803+i*6} ${283+i*2} 1225 ${124+i*4}S1450 ${-77+i*3} 1540 ${-130+i*7}`} fill="none" stroke={`url(#${id}-line)`} opacity=".13" strokeWidth=".7"/>)}
    </g>
  </svg></div>;
}
