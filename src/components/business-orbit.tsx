"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Fingerprint, Layers3, MessageSquare, Pause, Play, RefreshCw, SlidersHorizontal, Workflow } from "lucide-react";
import { businessPillars } from "@/lib/business-content";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { QuantLogo } from "./logo";

const capabilityIcons = [Layers3, SlidersHorizontal, Workflow, RefreshCw, Fingerprint, MessageSquare];
const arcColours = ["#2165e8", "#2876ef", "#398bfa", "#08b6d4", "#153b57", "#2165e8"];
function arcPath(index: number) {
  const point = (angle: number) => {
    const radians = angle * Math.PI / 180;
    return `${Math.round((310 + Math.cos(radians) * 260) * 100) / 100} ${Math.round((310 + Math.sin(radians) * 260) * 100) / 100}`;
  };
  return `M ${point(180 + index * 60 - 26)} A 260 260 0 0 1 ${point(180 + index * 60 + 26)}`;
}

export function BusinessOrbit() {
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const active = ((position % businessPillars.length) + businessPillars.length) % businessPillars.length;
  const pillar = businessPillars[active];
  const ActiveIcon = capabilityIcons[active];
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => { setInView(entry.isIntersecting); }, { threshold: 0.2 });
    observer.observe(root.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  useEffect(() => {
    if (!playing || reduced || !inView || !pageVisible || keyboardFocus) return;
    // The arc moves for 1.1 seconds, then holds so the capability can be read.
    const timer = window.setTimeout(() => setPosition(current => current + 1), 6800);
    return () => window.clearTimeout(timer);
  }, [position, playing, reduced, inView, pageVisible, keyboardFocus]);

  function choose(index: number) {
    const change = (index - active + businessPillars.length) % businessPillars.length;
    setPosition(current => current + (change > 3 ? change - businessPillars.length : change));
  }
  function advance(direction: number) { setPosition(current => current + direction); }

  return <section ref={root} className="sa-section sa-branded" id="what-we-do" aria-labelledby="business-title" onFocusCapture={event => { if (event.target.matches(":focus-visible")) setKeyboardFocus(true); }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false); }}>
    <div className="tqc-container">
      <div className="sa-section-top"><div><p className="tqc-eyebrow">QUANT-LED MODEL PORTFOLIOS</p><h2 id="business-title">One platform.<br /><em>Around your practice.</em></h2></div><p>Start with quant-led equity and mutual fund strategies. Bring analysis, implementation, maintenance and your brand into the same workflow.</p></div>
      <div className="sa-layout">
        <div className="sa-copy" id="business-panel">
          <div className="sa-counter"><span className="sa-capability-icon"><ActiveIcon size={20} strokeWidth={1.6} aria-hidden="true" /></span><strong>{pillar.name}</strong></div>
          <div className="sa-description" key={pillar.id}><h3>{pillar.title}</h3><p>{pillar.copy}</p></div>
          <Link href={pillar.id === "research" ? "/strategies" : `/platform#${pillar.id}`} className="tqc-text-link">{pillar.id === "research" ? "Explore the strategies" : `Explore ${pillar.name.toLowerCase()}`} <ArrowUpRight size={18} /></Link>
          <div className="sa-controls"><div className="sa-step-markers" role="group" aria-label="Choose a platform capability">{businessPillars.map((item, index) => <button type="button" key={item.id} aria-label={item.name} aria-pressed={active === index} aria-controls="business-panel" onClick={() => choose(index)}><span /></button>)}</div><div className="sa-arrows"><button type="button" aria-label="Previous capability" onClick={() => advance(-1)}><ArrowLeft size={18} /></button><button type="button" aria-label="Next capability" onClick={() => advance(1)}><ArrowRight size={18} /></button></div></div>
        </div>
        <div className="sa-art">
          <div className="sa-window" role="group" aria-label="Moving semicircle of platform capabilities">
            <div className="sa-wheel" style={{ "--sa-turn": `${-position * 60}deg`, "--sa-counter-turn": `${position * 60}deg` } as CSSProperties}>
              <div className="sa-wheel-ring" aria-hidden="true" /><div className="sa-wheel-ring sa-wheel-ring-outer" aria-hidden="true" /><div className="sa-wheel-ring sa-wheel-ring-inner" aria-hidden="true" />
              <svg className="sa-brand-arc" viewBox="0 0 620 620" aria-hidden="true">{arcColours.map((colour, index) => <path key={index} d={arcPath(index)} fill="none" stroke={colour} strokeWidth="5" strokeLinecap="round" />)}</svg>
              {businessPillars.map((item, index) => {
                const Icon = capabilityIcons[index];
                const angle = (index * 60 + 180) * Math.PI / 180;
                const left = Math.round((50 + 42 * Math.cos(angle)) * 100) / 100;
                const top = Math.round((50 + 42 * Math.sin(angle)) * 100) / 100;
                const delta = (index - active + 6) % 6;
                const isVisible = delta < 2 || delta === 5;
                return <button type="button" className="sa-node" data-visible={isVisible} key={item.id} aria-pressed={active === index} aria-label={`Explore ${item.name}`} aria-hidden={!isVisible} tabIndex={isVisible ? 0 : -1} aria-controls="business-panel" onClick={() => choose(index)} style={{ left: `${left}%`, top: `${top}%` }}><span className="sa-node-dot"><Icon size={15} strokeWidth={1.7} aria-hidden="true" /></span><strong>{item.name}</strong>{active === index && <ArrowUpRight size={18} aria-hidden="true" />}</button>;
              })}
            </div>
            <div className="sa-brand-core" aria-hidden="true"><QuantLogo compact /><strong>The Quant Club</strong><span>Built around you.</span></div>
          </div>
          <div className="sa-art-foot"><span>Every part works together.</span>{!reduced && <button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause capability animation" : "Play capability animation"}>{playing ? <Pause size={13} /> : <Play size={13} />}{playing ? "Pause" : "Play"}</button>}</div>
        </div>
      </div>
    </div>
  </section>;
}
