"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";

type ArtProps = {
  variant: string;
  tone?: "light" | "dark";
  compact?: boolean;
  paused?: boolean;
};

const descriptions: Record<string, string> = {
  large: "A bold, anchored blue form with a moving research scan, representing established large-cap companies.",
  mid: "An expanding fan of flowing bands represents the dedicated mid-cap universe.",
  small: "Fine lines converge through a selection gate and emerge as a focused set, representing small-cap research.",
  multi: "Three coloured streams weave into one composition, representing research across market-cap segments.",
  funds: "Equal-sized graphic tiles rotate into a shared mosaic, representing diversified fund construction.",
  sector: "A highlight moves between equal sector panels, representing a changing allocation focus at review.",
};

function sequence(index: number, extra: CSSProperties = {}): CSSProperties {
  return { "--sc-i": index, ...extra } as CSSProperties;
}

function LargeArt({ id }: { id: string }) {
  return <>
    <defs>
      <clipPath id={`${id}-anchor`}><rect x="163" y="60" width="202" height="220" rx="101"/></clipPath>
    </defs>
    <g className="sc-anchor-echo" fill="none" stroke="#377dc4" strokeWidth="1">
      <rect x="88" y="73" width="202" height="196" rx="98" opacity=".2"/>
      <rect x="111" y="69" width="202" height="204" rx="101" opacity=".35"/>
      <rect x="136" y="64" width="202" height="213" rx="101" opacity=".65"/>
    </g>
    <rect x="163" y="60" width="202" height="220" rx="101" fill={`url(#${id}-blue)`}/>
    <g clipPath={`url(#${id}-anchor)`}>
      {Array.from({ length: 25 }, (_, i) => <path key={i} d={`M150 ${64+i*9}H380`} stroke="#c3eeff" strokeWidth=".8" opacity=".28"/>)}
      <rect className="sc-anchor-scan" x="128" y="25" width="62" height="310" fill={`url(#${id}-shine)`} transform="rotate(22 260 170)"/>
      <path d="M266 44v257" stroke="#9fedff" strokeWidth="2" opacity=".45"/>
    </g>
    <path d="M394 64v217M387 64h14m-14 217h14" className="sc-fine"/>
    <path d="M89 294h309" className="sc-fine"/>
    <circle cx="266" cy="170" r="18" fill="#071b31"/>
    <path d="M260 170h12m-6-6v12" stroke="#bdedff" strokeWidth="1.5"/>
    <circle className="sc-anchor-dot" cx="394" cy="170" r="3" fill="#b3f7ff"/>
  </>;
}

function MidArt({ id }: { id: string }) {
  return <>
    <defs><linearGradient id={`${id}-fan`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#1643a3"/><stop offset=".48" stopColor="#2b80ff"/><stop offset="1" stopColor="#a5f7f3"/></linearGradient></defs>
    <g transform="translate(260 245)">
      {Array.from({ length: 11 }, (_, i) => <g key={i} transform={`rotate(${(i-5)*11})`}>
        <path className="sc-fan-blade" style={sequence(i)} d="M-8 4V-134C-8-165 5-183 22-188V-23C22-7 12 4-8 4Z" fill={`url(#${id}-fan)`} stroke="#a6dbff" strokeOpacity=".3" strokeWidth=".8"/>
      </g>)}
      <circle r="17" fill="#0b2642" stroke="#7bccff" strokeWidth="1"/>
      <circle r="4" fill="#bcf9ff"/>
    </g>
    <path d="M91 277h337M111 283v-12m297 12v-12" className="sc-fine"/>
  </>;
}

function SmallArt({ id }: { id: string }) {
  return <>
    <path d="M42 76v199M35 76h14m-14 199h14" className="sc-fine"/>
    {Array.from({ length: 31 }, (_, i) => {
      const y = 63+i*7;
      const end = 129+(i%6)*17;
      const d = `M57 ${y}C144 ${y} 186 ${end} 277 ${end}`;
      return <g key={i}>
        <path d={d} stroke="#316bb1" strokeWidth="1" fill="none" opacity=".5"/>
        <path className="sc-selection-flow" style={sequence(i)} d={d} pathLength="100" stroke={i%4===0?"#97f7fc":"#408dff"} strokeWidth="1.3" fill="none"/>
      </g>;
    })}
    <rect x="270" y="86" width="22" height="181" rx="11" fill={`url(#${id}-blue)`}/>
    <path d="M281 96v161" stroke="#b5f7ff" strokeOpacity=".6"/>
    {Array.from({ length: 6 }, (_, i) => <g key={i} style={sequence(i)} className="sc-selected-strand">
      <path d={`M292 ${129+i*17}H333`} stroke="#5accf3" strokeWidth="1"/>
      <rect x="333" y={123+i*17} width="93" height="11" rx="5.5" fill={i%2===0?"#2d79f4":"#59dcf1"}/>
      <circle cx="443" cy={128.5+i*17} r="2" fill="#b6f4ff"/>
    </g>)}
  </>;
}

function MultiArt({ id }: { id: string }) {
  const streams = [
    { d: "M47 88C174 20 213 310 473 231", colour: "#2563eb", width: 56 },
    { d: "M47 171C174 291 299 38 473 139", colour: "#06b6d4", width: 42 },
    { d: "M47 257C223 358 262 26 473 80", colour: "#94dfff", width: 25 },
  ];
  return <>
    <defs><clipPath id={`${id}-weave`}><rect x="43" y="41" width="434" height="268" rx="4"/></clipPath></defs>
    <g clipPath={`url(#${id}-weave)`} fill="none">
      {streams.map(({d,colour,width},i)=><g key={i}>
        <path d={d} stroke="#041625" strokeWidth={width+5}/>
        <path d={d} stroke={colour} strokeWidth={width}/>
        {[-.3,-.1,.1,.3].map(offset=><path key={offset} d={d} transform={`translate(0 ${width*offset})`} stroke="#dcfbff" strokeWidth=".7" opacity=".24"/>)}
        <path className="sc-weave-light" style={sequence(i)} d={d} pathLength="100" stroke="#e0ffff" strokeWidth="1.5"/>
      </g>)}
    </g>
    <path d="M37 36h18m-18 0v18m446-18h-18m18 0v18M37 314h18m-18 0v-18m446 18h-18m18 0v-18" className="sc-fine"/>
  </>;
}

function FundsArt() {
  return <>
    {Array.from({ length: 12 }, (_, i) => {
      const x=115+(i%4)*73, y=62+Math.floor(i/4)*73;
      const colour=["#2563eb","#58cbe7","#2b6ed7","#a0deeb"][i%4];
      return <svg key={i} x={x} y={y} width="68" height="68" viewBox="0 0 68 68" overflow="hidden" className="sc-mosaic-cell">
        <rect width="68" height="68" fill="#0e2a46"/>
        <g className="sc-mosaic-tile" style={sequence(i)}>
          <path d="M0 0H68A68 68 0 0 1 0 68Z" fill={colour}/>
          <path d="M0 18A50 50 0 0 1 50 68M0 35A33 33 0 0 1 33 68M0 51A17 17 0 0 1 17 68" fill="none" stroke="#e1faff" strokeOpacity=".34" strokeWidth="1"/>
        </g>
      </svg>;
    })}
    <path d="M99 62v214m-5-214h10m-10 214h10M115 294h287m-287-5v10m287-10v10" className="sc-fine"/>
  </>;
}

function SectorArt({ id }: { id: string }) {
  return <>
    <defs><clipPath id={`${id}-sector-window`}><rect x="76" y="70" width="368" height="204" rx="4"/></clipPath></defs>
    <g clipPath={`url(#${id}-sector-window)`}>
      {Array.from({length: 4}, (_,i)=><g key={i} transform={`translate(${76+i*94} 70)`}>
        <rect width="86" height="204" fill="#102c47"/>
        {Array.from({length: 15}, (_,j)=><path key={j} d={`M0 ${j*15}l86-42`} stroke="#3974a5" strokeWidth="1" opacity=".45"/>)}
        <path d="M32 103h22m-11-11v22" stroke="#6892b7"/>
      </g>)}
      <g className="sc-sector-window">
        <rect x="76" y="70" width="86" height="204" fill={`url(#${id}-blue)`}/>
        {Array.from({length:15},(_,i)=><path key={i} d={`M76 ${70+i*15}l86-42`} stroke="#b2e9ff" strokeWidth="1" opacity=".45"/>)}
        <circle cx="119" cy="172" r="21" fill="#baf8ff"/>
        <path d="M111 172h16m-6-6 6 6-6 6" fill="none" stroke="#0c3e7d" strokeWidth="1.5"/>
      </g>
    </g>
    <path d="M76 294h368" className="sc-fine"/>
    <g className="sc-sector-cursor"><path d="M113 288l6-6 6 6" fill="none" stroke="#85eaff" strokeWidth="1.5"/></g>
  </>;
}

export function StrategyCharacterArt({ variant, tone = "light", compact = false, paused = false }: ArtProps) {
  const id = `sc-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element=ref.current;
    if (!element) return;
    let inView=false;
    const update=()=>{element.dataset.running=String(inView&&!document.hidden);};
    const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;update();},{threshold:.05});
    observer.observe(element);
    document.addEventListener("visibilitychange",update);
    return ()=>{observer.disconnect();document.removeEventListener("visibilitychange",update);};
  },[]);
  return <div ref={ref} className={`sc-art sc-art--${variant} sc-art--${tone}${compact?" sc-art--compact":""}`} data-paused={paused} data-running="false">
    <svg viewBox="0 0 520 350" role="img" aria-label={descriptions[variant]||"Abstract quantitative research illustration. Not portfolio data."}>
      <defs>
        <linearGradient id={`${id}-blue`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#1745a7"/><stop offset=".48" stopColor="#2563eb"/><stop offset="1" stopColor="#67d8f3"/></linearGradient>
        <linearGradient id={`${id}-shine`}><stop stopColor="#dcfcff" stopOpacity="0"/><stop offset=".5" stopColor="#dcfcff" stopOpacity=".55"/><stop offset="1" stopColor="#dcfcff" stopOpacity="0"/></linearGradient>
      </defs>
      {variant==="large"?<LargeArt id={id}/>:variant==="mid"?<MidArt id={id}/>:variant==="small"?<SmallArt id={id}/>:variant==="multi"?<MultiArt id={id}/>:variant==="funds"?<FundsArt/>:<SectorArt id={id}/>}
    </svg>
  </div>;
}
