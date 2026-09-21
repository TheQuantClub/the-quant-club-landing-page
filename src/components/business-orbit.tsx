"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { ArrowRight, Pause, Play, ArrowUpRight } from "lucide-react";
import { businessPillars } from "@/lib/business-content";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverMotion = () => true;

export function BusinessOrbit() {
  const [position, setPosition] = useState(0);
  const active = position % businessPillars.length;
  const [playing, setPlaying] = useState(true);
  const root = useRef<HTMLElement>(null);
  const visible = useRef(false);
  const reduced = useSyncExternalStore(subscribeMotion, getMotion, serverMotion);
  const pillar = businessPillars[active];

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => { visible.current = entries[0].isIntersecting; }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const interval = window.setInterval(() => {
      if (visible.current && document.visibilityState === "visible") setPosition(current => current + 1);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [playing, reduced]);

  const choose = (index: number) => { setPosition(current => current + (index - current % businessPillars.length + businessPillars.length) % businessPillars.length); setPlaying(false); };
  return (
    <section ref={root} className="tqc-business tqc-section" id="what-we-do" aria-labelledby="business-title"><div className="tqc-container">
      <div className="tqc-section-heading"><div><p className="tqc-eyebrow">02 / WHAT WE DO</p><h2 id="business-title">Research is the beginning.<br />We connect what follows.</h2></div><p>One connected workflow, from choosing a strategy to the next client conversation.</p></div>
      <div className="tqc-business-layout"><div className="tqc-business-panel" id="business-panel">
        <div className="tqc-business-progress"><span>0{active + 1}</span><span>/ 06</span><i /><span>{pillar.name}</span></div>
        <div className="tqc-business-copy" key={pillar.id}><h3>{pillar.title}</h3><p>{pillar.copy}</p></div>
        <Link href={`/platform#${pillar.id}`} className="tqc-text-link">See it on the platform <ArrowUpRight size={18} /></Link>
        <div className="tqc-business-controls"><span>Explore each part of the workflow</span><button type="button" aria-label="Next part of the workflow" onClick={() => choose((active + 1) % businessPillars.length)}><ArrowRight size={19} /></button></div>
      </div><div className="tqc-orbit-wrap">
        <div className="tqc-orbit" role="group" aria-label="Explore what The Quant Club does">
          <div className="tqc-orbit-track" aria-hidden="true"><i /><i /></div>
          <div className="tqc-orbit-traveler" style={{ transform: `rotate(${position * 60}deg)` }} aria-hidden="true"><i /></div>
          <div className="tqc-orbit-core" aria-hidden="true"><span>THE QUANT CLUB</span><strong>Your firm.<br /><em>Connected.</em></strong><div><i /><i /><i /></div></div>
          {businessPillars.map((item, index) => {
            const angle = (index * 60 - 90) * Math.PI / 180;
            return <button className="tqc-orbit-node" key={item.id} type="button" aria-pressed={active === index} aria-controls="business-panel" onClick={() => choose(index)} style={{ "--node-x": `${50 + Math.cos(angle) * 37}%`, "--node-y": `${50 + Math.sin(angle) * 37}%` } as CSSProperties}><span>0{index + 1}</span><strong>{item.name}</strong></button>;
          })}
        </div>
        <div className="tqc-orbit-foot"><span>Your investment workflow, connected.</span>{!reduced && <button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause workflow animation" : "Play workflow animation"}>{playing ? <Pause size={13} /> : <Play size={13} />}{playing ? "Pause" : "Play"}</button>}</div>
      </div></div>
    </div></section>
  );
}
