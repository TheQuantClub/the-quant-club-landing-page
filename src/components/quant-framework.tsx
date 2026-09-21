"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { QuantGlobe } from "./quant-globe";

/** An abstract process illustration; the marks do not represent investment data. */
export function QuantFramework({ paused }: { paused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    const hero = element?.closest<HTMLElement>(".tqc-hero");
    const world = element?.closest<HTMLElement>(".tqc-quant-world");
    if (!element || !hero || !world) return;
    let visible = true;
    let frame = 0;
    const visibility = () => { element.dataset.active = String(visible && !document.hidden); };
    const measure = () => {
      frame = 0;
      const outer = hero.getBoundingClientRect();
      const shield = world.getBoundingClientRect();
      // A measured soft mask keeps the existing currents outside the illustration.
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${outer.width}" height="${outer.height}" viewBox="0 0 ${outer.width} ${outer.height}"><defs><filter id="soft"><feGaussianBlur stdDeviation="10"/></filter></defs><rect width="100%" height="100%" fill="white"/><rect x="${shield.left - outer.left - 24}" y="${shield.top - outer.top - 24}" width="${shield.width + 48}" height="${shield.height + 48}" rx="24" fill="black" filter="url(#soft)"/></svg>`;
      hero.style.setProperty("--qf-flow-mask", `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
      hero.dataset.frameworkReady = "true";
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    resize.observe(hero); resize.observe(world);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visibility(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", visibility);
    schedule();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      hero.style.removeProperty("--qf-flow-mask"); delete hero.dataset.frameworkReady;
    };
  }, []);

  return <div className="qf-framework" ref={root} data-paused={paused} data-active="false">
    <div className="qf-universe"><QuantGlobe paused={paused} tone="dark" /><span>Market data</span></div>
    <div className="qf-data-connector" aria-hidden="true"><i /></div>
    <div className="qf-process">
      <svg className="qf-process-art" viewBox="0 0 145 216" aria-hidden="true">
        <path className="qf-guide" d="M20 22 44 78M125 22 101 78M45 126 57 171M100 126 87 171" />
        {Array.from({ length: 12 }, (_, index) => { const x = 18 + index % 6 * 22; const y = 12 + Math.floor(index / 6) * 19; return <circle key={index} className="qf-signal-dot qf-motion" cx={x} cy={y} r="2.5" style={{ "--qf-dx": `${(index % 6 - 2.5) * -5}px`, "--qf-delay": `${index * -.13}s` } as CSSProperties} />; })}
        <path className="qf-rule-gate" d="M36 75H109L98 130H47Z" />
        {[88, 103, 118].map(y => <g key={y}><path className="qf-rule-line" d={`M51 ${y}H89`} /><path className="qf-rule-check" d={`M96 ${y - 2}l3 3 5-6`} /></g>)}
        {[0, 1, 2].map(index => <circle key={index} className="qf-selected-dot qf-motion" cx={57 + index * 15} cy="51" r="2.5" style={{ animationDelay: `${index * -.6}s` }} />)}
        {Array.from({ length: 6 }, (_, index) => <rect key={index} className="qf-model-tile qf-motion" x={52 + index % 3 * 15} y={174 + Math.floor(index / 3) * 15} width="10" height="10" rx="2" style={{ animationDelay: `${index * .08}s` }} />)}
      </svg>
      <ol className="qf-steps" aria-label="From market data to model portfolios"><li>Quantitative<br />signals</li><li>Defined rules</li><li>Quant-led<br />model portfolios</li></ol>
    </div>
  </div>;
}
