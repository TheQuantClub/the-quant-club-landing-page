"use client";

import { useEffect, useId, useRef } from "react";

const paths = [
  "M-160 590C90 344 345 872 688 650S1060 345 1250 405 1450 765 1640 430",
  "M-160 635C90 389 345 917 688 695S1060 390 1250 450 1450 810 1640 475",
  "M-160 680C90 434 345 962 688 740S1060 435 1250 495 1450 855 1640 520",
];

/** Three decorative blue currents, without market or portfolio data. */
export function FlowRibbons({ paused = false, tone = "light" }: { paused?: boolean; tone?: "light" | "dark" }) {
  const id = useId().replaceAll(":", "");
  const root = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = true;
    const update = () => { element.dataset.active = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element); document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div ref={root} className="q-flow-ribbons" data-paused={paused} data-tone={tone} aria-hidden="true"><svg viewBox="0 0 1440 840" preserveAspectRatio="none"><defs>
    <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="0"><stop stopColor={dark ? "#06b6d4" : "#49bce9"} stopOpacity={dark ? ".22" : ".12"} /><stop offset=".42" stopColor={dark ? "#2563eb" : "#2586ed"} stopOpacity={dark ? ".5" : ".28"} /><stop offset=".73" stopColor={dark ? "#06b6d4" : "#2165e8"} stopOpacity={dark ? ".9" : ".86"} /><stop offset="1" stopColor={dark ? "#ffffff" : "#48adea"} stopOpacity={dark ? ".4" : ".3"} /></linearGradient>
    <linearGradient id={`${id}-light`} x1="0" y1="0" x2="1" y2="0"><stop stopColor={dark ? "#06b6d4" : "#55c9fa"} stopOpacity="0" /><stop offset=".5" stopColor={dark ? "#ffffff" : "#1872f4"} /><stop offset="1" stopColor={dark ? "#06b6d4" : "#63cdff"} stopOpacity="0" /></linearGradient>
  </defs><g className="q-flow-sweep">{paths.map((path, index) => <g key={path}><path d={path} fill="none" stroke={`url(#${id}-blue)`} strokeWidth="14" opacity={dark ? ".1" : ".06"} /><path d={path} fill="none" stroke={`url(#${id}-blue)`} strokeWidth={2.3 - index * .35} /><path d={path} className="q-flow-light" fill="none" pathLength="1000" stroke={`url(#${id}-light)`} strokeWidth="3" strokeDasharray="90 910" style={{ animationDelay: `${index * -3.5}s` }} /></g>)}</g></svg></div>;
}
