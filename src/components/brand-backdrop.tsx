"use client";

import { createContext, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { QuantLogo } from "./logo";

const MotionContext = createContext({ paused: false, reduced: true, toggle: () => {} });

export function BrandMotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const value = useMemo(() => ({ paused, reduced, toggle: () => setPaused(current => !current) }), [paused, reduced]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function BrandMotionControl() {
  const { paused, reduced, toggle } = useContext(MotionContext);
  if (reduced) return null;
  return <button type="button" className="br-motion-control" onClick={toggle} aria-pressed={paused} aria-label={paused ? "Play background motion" : "Pause background motion"} title={paused ? "Play background motion" : "Pause background motion"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? "Play backgrounds" : "Pause backgrounds"}</span></button>;
}

type BackdropProps = { variant?: "orbit" | "flow" | "signature"; tone?: "light" | "dark"; className?: string; paused?: boolean };

/** The Q identity and three travelling blue lines recur throughout the public site. */
export function BrandBackdrop({ variant = "signature", tone = "light", className = "", paused = false }: BackdropProps) {
  const motion = useContext(MotionContext);
  const root = useRef<HTMLDivElement>(null);
  const id = useId().replaceAll(":", "");
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let inView = false;
    const update = () => { element.dataset.active = String(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(element); document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div ref={root} className={`br-backdrop br-${variant} br-${tone} ${className}`} data-paused={paused || motion.paused || motion.reduced} data-active="false" aria-hidden="true">
    <div className="br-mark"><QuantLogo compact inverse={tone === "dark"} /></div>
    <svg className="br-streams" viewBox="0 0 1440 620" preserveAspectRatio="none">
      <defs><linearGradient id={`${id}-brand-line`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#377af0" stopOpacity="0" /><stop offset=".42" stopColor="#2f7cf0" stopOpacity=".2" /><stop offset=".73" stopColor="#2165e8" stopOpacity=".65" /><stop offset="1" stopColor="#08b6d4" stopOpacity=".2" /></linearGradient></defs>
      {[0, 1, 2].map(index => <g key={index} style={{ transform: `translateY(${index * 23}px)` }}><path d="M-90 380C150 160 410 650 790 414S1160 90 1500 234" fill="none" stroke={`url(#${id}-brand-line)`} strokeWidth={index === 1 ? "1.4" : ".8"} /><path className="br-trace" d="M-90 380C150 160 410 650 790 414S1160 90 1500 234" fill="none" stroke={tone === "dark" ? "#5dbbff" : "#2878f0"} strokeWidth="2" pathLength="1000" strokeDasharray="42 958" style={{ animationDelay: `${index * -4}s` }} /></g>)}
    </svg>
  </div>;
}
