"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { businessPillars } from "@/lib/business-content";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function BusinessOrbit() {
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(true);
  const active = ((position % businessPillars.length) + businessPillars.length) % businessPillars.length;
  const pillar = businessPillars[active];
  const root = useRef<HTMLElement>(null);
  const visible = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; }, { threshold: 0.2 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setInterval(() => {
      if (visible.current && !document.hidden) setPosition(current => current + 1);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [playing, reduced]);

  function choose(index: number) {
    const change = (index - active + businessPillars.length) % businessPillars.length;
    setPosition(current => current + (change > 3 ? change - businessPillars.length : change));
    setPlaying(false);
  }
  function advance(direction: number) { setPosition(current => current + direction); setPlaying(false); }

  return <section ref={root} className="sa-section" id="what-we-do" aria-labelledby="business-title">
    <div className="tqc-container">
      <div className="sa-section-top"><p className="tqc-eyebrow">02 / WHAT WE BRING TO YOUR PRACTICE</p><p>From model portfolios to the work around your clients.</p></div>
      <div className="sa-layout">
        <div className="sa-copy" id="business-panel">
          <div className="sa-counter"><span>0{active + 1}</span><span>/ 06</span><i /><strong>{pillar.name}</strong></div>
          <div className="sa-description" key={pillar.id}><h2 id="business-title">{pillar.title}</h2><p>{pillar.copy}</p></div>
          <Link href={`/platform#${pillar.id}`} className="tqc-text-link">Explore {pillar.name.toLowerCase()} <ArrowUpRight size={18} /></Link>
          <div className="sa-controls"><div className="sa-step-markers" role="group" aria-label="Choose a platform capability">{businessPillars.map((item, index) => <button type="button" key={item.id} aria-label={item.name} aria-pressed={active === index} aria-controls="business-panel" onClick={() => choose(index)}><span /></button>)}</div><div className="sa-arrows"><button type="button" aria-label="Previous capability" onClick={() => advance(-1)}><ArrowLeft size={18} /></button><button type="button" aria-label="Next capability" onClick={() => advance(1)}><ArrowRight size={18} /></button></div></div>
        </div>
        <div className="sa-art">
          <div className="sa-window" role="group" aria-label="Moving semicircle of platform capabilities">
            <div className="sa-wheel" style={{ "--sa-turn": `${-position * 60}deg`, "--sa-counter-turn": `${position * 60}deg` } as CSSProperties}>
              <div className="sa-wheel-ring" aria-hidden="true" /><div className="sa-wheel-ring sa-wheel-ring-outer" aria-hidden="true" /><div className="sa-wheel-ring sa-wheel-ring-inner" aria-hidden="true" />
              {businessPillars.map((item, index) => {
                const angle = (index * 60 + 180) * Math.PI / 180;
                const left = Math.round((50 + 42 * Math.cos(angle)) * 100) / 100;
                const top = Math.round((50 + 42 * Math.sin(angle)) * 100) / 100;
                const delta = (index - active + 6) % 6;
                const isVisible = delta < 2 || delta === 5;
                return <button type="button" className="sa-node" data-visible={isVisible} key={item.id} aria-pressed={active === index} aria-label={`Explore ${item.name}`} aria-hidden={!isVisible} tabIndex={isVisible ? 0 : -1} onFocus={() => setPlaying(false)} aria-controls="business-panel" onClick={() => choose(index)} style={{ left: `${left}%`, top: `${top}%` }}><span className="sa-node-dot">0{index + 1}</span><strong>{item.name}</strong>{active === index && <ArrowUpRight size={18} aria-hidden="true" />}</button>;
              })}
            </div>
            <div className="sa-axis" aria-hidden="true"><span>YOUR PRACTICE</span><i /><span>CONNECTED</span></div>
          </div>
          <div className="sa-art-foot"><span>Every part works together.</span>{!reduced && <button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause capability animation" : "Play capability animation"}>{playing ? <Pause size={13} /> : <Play size={13} />}{playing ? "Pause" : "Play"}</button>}</div>
        </div>
      </div>
    </div>
  </section>;
}
