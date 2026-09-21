"use client";

import { useEffect, useId, useRef } from "react";

const paths = [
  "M-160 590C90 344 345 872 688 650S1060 345 1250 405 1450 765 1640 430",
  "M-160 635C90 389 345 917 688 695S1060 390 1250 450 1450 810 1640 475",
  "M-160 680C90 434 345 962 688 740S1060 435 1250 495 1450 855 1640 520",
];

/** Three decorative blue currents, without market or portfolio data. */
export function FlowRibbons({ paused = false }: { paused?: boolean }) {
  const id = useId().replaceAll(":", "");
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = true;
    const update = () => { element.dataset.active = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element); document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div ref={root} className="q-flow-ribbons" data-paused={paused} aria-hidden="true"><svg viewBox="0 0 1440 840" preserveAspectRatio="none"><defs>
    <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#49bce9" stopOpacity=".12" /><stop offset=".42" stopColor="#2586ed" stopOpacity=".28" /><stop offset=".73" stopColor="#2165e8" stopOpacity=".86" /><stop offset="1" stopColor="#48adea" stopOpacity=".3" /></linearGradient>
    <linearGradient id={`${id}-light`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#55c9fa" stopOpacity="0" /><stop offset=".5" stopColor="#1872f4" /><stop offset="1" stopColor="#63cdff" stopOpacity="0" /></linearGradient>
  </defs><g className="q-flow-sweep">{paths.map((path, index) => <g key={path}><path d={path} fill="none" stroke={`url(#${id}-blue)`} strokeWidth="14" opacity=".06" /><path d={path} fill="none" stroke={`url(#${id}-blue)`} strokeWidth={2.3 - index * .35} /><path d={path} className="q-flow-light" fill="none" pathLength="1000" stroke={`url(#${id}-light)`} strokeWidth="3" strokeDasharray="90 910" style={{ animationDelay: `${index * -3.5}s` }} /></g>)}</g></svg></div>;
}
