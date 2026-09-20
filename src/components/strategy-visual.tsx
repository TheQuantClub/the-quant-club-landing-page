"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";

type Point = { x: number; y: number; z: number };
type Stage = 0 | 1 | 2;
const stages = [
  { name: "Universe", description: "Start with a defined universe of investment opportunities." },
  { name: "Filter", description: "Apply the strategy’s rules. Candidates remain; others fall away." },
  { name: "Portfolio", description: "Bring the selected candidates into an equal-weight portfolio." },
] as const;
const TAU = Math.PI * 2;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (callback: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const getServerReducedMotion = () => false;

function rotate(point: Point, angle: number): Point {
  const yaw = angle;
  const tilt = -0.37;
  const x = point.x * Math.cos(yaw) + point.z * Math.sin(yaw);
  const z = -point.x * Math.sin(yaw) + point.z * Math.cos(yaw);
  return {
    x: x * Math.cos(tilt) - point.y * Math.sin(tilt),
    y: x * Math.sin(tilt) + point.y * Math.cos(tilt),
    z,
  };
}

/** An abstract research field, not a performance or portfolio data visualisation. */
export function StrategyVisual({ active = 0, compact = false, onMotionChange }: { active?: number; compact?: boolean; onMotionChange?: (paused: boolean) => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion);
  const motionPaused = paused || reducedMotion;
  const [stage, setStage] = useState<Stage>(0);
  const stageRef = useRef<Stage>(0);

  useEffect(() => { onMotionChange?.(motionPaused); }, [motionPaused, onMotionChange]);

  const chooseStage = (next: Stage) => {
    stageRef.current = next;
    setStage(next);
    hostRef.current?.dispatchEvent(new Event("processchange"));
  };

  useEffect(() => {
    activeRef.current = active;
    hostRef.current?.dispatchEvent(new Event("strategychange"));
  }, [active]);

  useEffect(() => {
    pausedRef.current = paused;
    hostRef.current?.dispatchEvent(new Event("motiontoggle"));
  }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;
    const motion = window.matchMedia(reducedMotionQuery);
    let frame = 0;
    let width = 600;
    let height = 560;
    let visible = true;
    let phase = 0;
    let lastTime = 0;
    let easedActive = activeRef.current;
    let pointerTarget = 0;
    let pointerAngle = 0;
    let stageElapsed = 0;
    const stageDuration = [3200, 2800, 4200];

    function draw(time: number) {
      if (!canvas) return;
      if (!visible || document.hidden) { frame = 0; return; }
      const frozen = motion.matches || pausedRef.current;
      if (time - lastTime < 32 && !frozen) { frame = requestAnimationFrame(draw); return; }
      const elapsed = Math.min(time - lastTime, 50);
      lastTime = time;
      phase += frozen ? 0 : elapsed * 0.00014;
      if (!frozen) {
        stageElapsed += elapsed;
        if (stageElapsed >= stageDuration[stageRef.current]) {
          const next = ((stageRef.current + 1) % 3) as Stage;
          stageRef.current = next;
          stageElapsed = 0;
          setStage(next);
        }
      }
      const processStage = stageRef.current;
      const stageProgress = frozen ? 1 : Math.min(stageElapsed / (processStage === 1 ? 1650 : 1450), 1);
      const filterProgress = processStage === 0 ? 0 : processStage === 1 ? stageProgress : 1;
      const assemblyProgress = processStage === 2 ? stageProgress : 0;
      if (!frozen) pointerAngle += (pointerTarget - pointerAngle) * 0.05;
      easedActive += (activeRef.current - easedActive) * 0.04;
      ctx.clearRect(0, 0, width, height);
      const size = Math.min(width, height);
      const radius = size * 0.276;
      const cx = width * 0.48;
      const cy = height * 0.398;
      const blue = easedActive > 3.5 ? "20,95,224" : "37,99,235";
      const project = (p: Point) => {
        const perspective = 3.8 / (3.8 - p.z);
        return { x: cx + p.x * radius * perspective, y: cy + p.y * radius * perspective, z: p.z };
      };

      const atmosphere = ctx.createRadialGradient(cx + radius * 0.25, cy - radius * 0.25, radius * 0.08, cx, cy, radius * 1.7);
      atmosphere.addColorStop(0, "rgba(147,216,255,.26)");
      atmosphere.addColorStop(0.56, "rgba(172,221,255,.11)");
      atmosphere.addColorStop(1, "rgba(225,243,255,0)");
      ctx.fillStyle = atmosphere;
      ctx.fillRect(0, 0, width, height);

      // The thin external orbit is drawn in two passes, giving the field real depth.
      function orbit(front: boolean) {
        const orbitTilt = -0.5 + Math.sin(easedActive * 0.6) * 0.08;
        ctx.beginPath();
        let drawing = false;
        for (let i = 0; i <= 180; i++) {
          const a = i / 180 * TAU;
          const p = rotate({ x: Math.cos(a) * 1.5, y: Math.sin(a) * 0.39, z: Math.sin(a) * 1.4 }, orbitTilt);
          const q = project(p);
          if ((p.z >= 0) === front) {
            if (!drawing) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
            drawing = true;
          } else drawing = false;
        }
        ctx.lineWidth = front ? 0.9 : 0.6;
        ctx.strokeStyle = front ? "rgba(37,99,235,.43)" : "rgba(37,99,235,.14)";
        ctx.stroke();
      }
      orbit(false);

      // Meridians subtly twist between poles; the research field feels woven, not rigid.
      for (let rib = 0; rib < 58; rib++) {
        const longitude = rib / 58 * TAU;
        for (let side = 0; side < 2; side++) {
          ctx.beginPath();
          let drawing = false;
          let depth = 0;
          let count = 0;
          for (let step = 1; step < 74; step++) {
            const latitude = step / 74 * Math.PI;
            const twist = Math.sin(latitude * 1.7 + easedActive * 0.25) * 0.5;
            const a = longitude + twist;
            const p = rotate({
              x: Math.sin(latitude) * Math.cos(a),
              y: Math.cos(latitude) * (1.04 + Math.sin(easedActive) * 0.025),
              z: Math.sin(latitude) * Math.sin(a),
            }, phase + 0.55 + pointerAngle);
            const q = project(p);
            if ((p.z >= 0 ? 1 : 0) === side) {
              if (!drawing) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
              depth += p.z; count++; drawing = true;
            } else drawing = false;
          }
          const opacity = (side ? 0.15 + Math.max(0, depth / Math.max(count, 1)) * 0.36 : 0.065) * (1 - filterProgress * 0.36);
          ctx.strokeStyle = `rgba(${rib % 7 === 0 ? "6,182,212" : blue},${opacity})`;
          ctx.lineWidth = rib % 7 === 0 ? 0.95 : 0.65;
          ctx.stroke();
        }
      }

      for (let latitude = 1; latitude < 21; latitude++) {
        const a = latitude / 21 * Math.PI;
        ctx.beginPath();
        for (let step = 0; step <= 112; step++) {
          const b = step / 112 * TAU;
          const p = rotate({ x: Math.sin(a) * Math.cos(b), y: Math.cos(a) * 1.04, z: Math.sin(a) * Math.sin(b) }, phase + 0.55 + pointerAngle);
          const q = project(p);
          if (step === 0) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
        }
        ctx.lineWidth = latitude === 10 ? 1.1 : 0.5;
        ctx.strokeStyle = latitude === 10 ? "rgba(6,182,212,.5)" : "rgba(37,99,235,.13)";
        ctx.stroke();
      }

      orbit(true);
      // A luminous screen travels across the universe; passing nodes visibly split
      // into selected candidates and muted opportunities, without claiming a factor model.
      if (processStage === 1) {
        const scanY = cy - radius * 1.05 + stageProgress * radius * 2.1;
        const scanWidth = Math.sqrt(Math.max(0.06, 1 - Math.pow((scanY - cy) / (radius * 1.08), 2))) * radius;
        const wash = ctx.createLinearGradient(0, scanY - radius * 0.35, 0, scanY + 6);
        wash.addColorStop(0, "rgba(6,182,212,0)");
        wash.addColorStop(1, "rgba(6,182,212,.1)");
        ctx.fillStyle = wash;
        ctx.beginPath(); ctx.ellipse(cx, cy, radius * 1.04, radius * 1.08, -0.1, 0, TAU); ctx.save(); ctx.clip();
        ctx.fillRect(cx - radius * 1.3, scanY - radius * 0.35, radius * 2.6, radius * 0.35 + 5);
        ctx.restore();
        ctx.beginPath(); ctx.ellipse(cx, scanY, scanWidth, radius * 0.1, -0.06, 0, TAU);
        ctx.strokeStyle = `rgba(6,182,212,${stageProgress < 1 ? 0.78 : 0.18})`;
        ctx.lineWidth = 1.6; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx - scanWidth - 8, scanY); ctx.lineTo(cx + scanWidth + 8, scanY);
        ctx.strokeStyle = "rgba(6,182,212,.18)"; ctx.lineWidth = 0.7; ctx.stroke();
      }

      // Fixed deterministic seeds avoid randomness and server/client mismatches.
      const candidates: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < 82; i++) {
        const longitude = i * 2.39996 + phase * 0.22;
        const latitude = Math.acos(1 - 2 * (i + 0.5) / 82);
        const p = rotate({ x: Math.sin(latitude) * Math.cos(longitude), y: Math.cos(latitude) * 1.04, z: Math.sin(latitude) * Math.sin(longitude) }, phase + 0.55 + pointerAngle);
        const q = project(p);
        const selected = i % 7 === 1 || i % 17 === 0;
        const scanned = processStage === 2 || (processStage === 1 && q.y < cy - radius * 1.05 + stageProgress * radius * 2.1);
        const faded = scanned && !selected;
        const highlighted = scanned && selected;
        const alpha = faded ? (p.z < 0 ? 0.055 : 0.12) : highlighted ? (p.z < 0 ? 0.34 : 1) : p.z < 0 ? 0.16 : 0.59 + p.z * 0.36;
        const dotRadius = highlighted ? (p.z < 0 ? 2.5 : 4.2 + p.z * 1.1) : p.z < 0 ? 1.4 : 2.35 + p.z;
        if (selected && p.z > -0.1) candidates.push(q);
        if (p.z > 0.25 && !faded) {
          const glow = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, 12);
          glow.addColorStop(0, `rgba(6,182,212,${alpha * (highlighted ? 0.55 : 0.25)})`);
          glow.addColorStop(1, "rgba(6,182,212,0)");
          ctx.fillStyle = glow; ctx.fillRect(q.x - 12, q.y - 12, 24, 24);
        }
        ctx.beginPath(); ctx.arc(q.x, q.y, dotRadius, 0, TAU);
        ctx.fillStyle = `rgba(${highlighted ? "6,182,212" : faded ? "125,148,173" : blue},${alpha})`;
        ctx.fill();
        if (highlighted && p.z > 0) {
          ctx.beginPath(); ctx.arc(q.x, q.y, dotRadius + 3.2, 0, TAU);
          ctx.strokeStyle = "rgba(6,182,212,.38)"; ctx.lineWidth = 0.8; ctx.stroke();
          if (width > 400) {
            ctx.beginPath(); ctx.moveTo(q.x - 2, q.y); ctx.lineTo(q.x - 0.5, q.y + 1.5); ctx.lineTo(q.x + 2.3, q.y - 1.6);
            ctx.strokeStyle = "white"; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }

      if (processStage === 2) {
        const tileBox = host?.querySelector<HTMLElement>(".qv-portfolio-blocks");
        const tileRect = tileBox?.getBoundingClientRect();
        const hostRect = host?.getBoundingClientRect();
        if (tileRect && hostRect) {
          candidates.sort((a, b) => b.z - a.z);
          candidates.slice(0, 5).forEach((candidate, index) => {
            const destination = { x: tileRect.left - hostRect.left + tileRect.width * ((index + 0.5) / 5), y: tileRect.top - hostRect.top + tileRect.height / 2 };
            const localProgress = Math.max(0, Math.min(1, assemblyProgress * 1.5 - index * 0.12));
            const control = { x: candidate.x + (destination.x - candidate.x) * 0.6, y: candidate.y - radius * 0.16 };
            ctx.beginPath(); ctx.moveTo(candidate.x, candidate.y); ctx.quadraticCurveTo(control.x, control.y, destination.x, destination.y);
            ctx.strokeStyle = `rgba(6,182,212,${0.13 + localProgress * 0.2})`; ctx.lineWidth = 0.8; ctx.stroke();
            if (localProgress < 1) {
              const t = localProgress;
              const x = (1-t)*(1-t)*candidate.x + 2*(1-t)*t*control.x + t*t*destination.x;
              const y = (1-t)*(1-t)*candidate.y + 2*(1-t)*t*control.y + t*t*destination.y;
              ctx.beginPath(); ctx.arc(x, y, 3.5, 0, TAU); ctx.fillStyle = "#06b6d4"; ctx.fill();
            }
          });
        }
      }
      const satelliteAngle = -phase * 1.2 + 0.6;
      const satellite = project(rotate({ x: Math.cos(satelliteAngle) * 1.5, y: Math.sin(satelliteAngle) * 0.39, z: Math.sin(satelliteAngle) * 1.4 }, -0.5));
      ctx.beginPath(); ctx.arc(satellite.x, satellite.y, 5, 0, TAU);
      ctx.fillStyle = "#2563eb"; ctx.fill();
      ctx.beginPath(); ctx.arc(satellite.x, satellite.y, 10, 0, TAU);
      ctx.strokeStyle = "rgba(37,99,235,.18)"; ctx.lineWidth = 1; ctx.stroke();
      if (!frozen) frame = requestAnimationFrame(draw);
      else frame = 0;
    }

    function start() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      start();
    });
    resize.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      host.dataset.inView = String(visible);
      if (!visible) { cancelAnimationFrame(frame); frame = 0; }
      else start();
    }, { rootMargin: "60px" });
    intersection.observe(host);
    const visibility = () => {
      host.dataset.pageVisible = String(!document.hidden);
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else start();
    };
    const strategyChange = () => {
      if (motion.matches || pausedRef.current) easedActive = activeRef.current;
      start();
    };
    const processChange = () => {
      stageElapsed = 0;
      start();
    };
    const toggleMotion = () => {
      if (pausedRef.current) { cancelAnimationFrame(frame); frame = 0; }
      else start();
    };
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || motion.matches || pausedRef.current || !host) return;
      const rect = host.getBoundingClientRect();
      pointerTarget = ((event.clientX - rect.left) / rect.width - 0.5) * 0.35;
    };
    const pointerLeave = () => { pointerTarget = 0; };
    document.addEventListener("visibilitychange", visibility);
    host.addEventListener("strategychange", strategyChange);
    host.addEventListener("processchange", processChange);
    host.addEventListener("motiontoggle", toggleMotion);
    host.addEventListener("pointermove", pointerMove, { passive: true });
    host.addEventListener("pointerleave", pointerLeave);
    motion.addEventListener("change", start);
    start();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect(); intersection.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      host.removeEventListener("strategychange", strategyChange);
      host.removeEventListener("processchange", processChange);
      host.removeEventListener("motiontoggle", toggleMotion);
      host.removeEventListener("pointermove", pointerMove);
      host.removeEventListener("pointerleave", pointerLeave);
      motion.removeEventListener("change", start);
    };
  }, []);

  return <div ref={hostRef} className={`qv-art qv-stage-${stage}${compact ? " qv-compact" : ""}${motionPaused ? " qv-paused" : ""}`} role="group" aria-label="Interactive research process: universe, systematic filtering and equal-weight portfolio. An abstract illustration, not actual holdings." style={{ "--qv-active": active } as CSSProperties}>
    <div className="qv-grid" aria-hidden="true" />
    <div className="qv-coordinate qv-coordinate-top" aria-hidden="true"><span className="qv-cross" />FROM UNIVERSE TO PORTFOLIO<span>PROCESS ILLUSTRATION</span></div>
    <canvas ref={canvasRef} className="qv-canvas" aria-hidden="true" />
    <svg className="qv-connectors" viewBox="0 0 600 560" aria-hidden="true">
      <path d="M87 126H159L194 165" /><path d="M408 213L464 167H530" />
      <circle cx="194" cy="165" r="3"/><circle cx="408" cy="213" r="3"/>
    </svg>
    <div className="qv-label qv-universe" aria-hidden="true"><span className="qv-label-kicker"><i/>Universe</span><strong>The starting set</strong><span className="qv-universe-dots">{Array.from({length: 16}, (_, i) => <i key={i}/>)}</span></div>
    <div className="qv-label qv-selection" aria-hidden="true"><span className="qv-label-kicker"><i/>Systematic filter</span><strong>{stage === 0 ? "Rules, before choices." : stage === 1 ? "Screen. Select." : "Selected candidates"}</strong><span className="qv-filter-dots">{Array.from({length: 12}, (_, i) => <i key={i} className={i % 4 === 1 ? "qv-candidate" : ""}/>)}</span></div>
    <div className="qv-label qv-portfolio" aria-hidden="true"><span className="qv-label-kicker"><i/>Portfolio</span><strong>Equal weight.</strong><span className="qv-portfolio-blocks">{Array.from({length: 5}, (_, i) => <i key={i} style={{ "--tile-index": i } as CSSProperties}/>)}</span></div>
    <div className="qv-process-controls"><div className="qv-steps" role="group" aria-label="Choose a research process stage">{stages.map((item, index) => <button key={item.name} type="button" onClick={() => chooseStage(index as Stage)} aria-pressed={stage === index}><span className="qv-step-dot"/>{item.name}</button>)}</div><button type="button" className="qv-motion-button" onClick={() => setPaused(!paused)} disabled={reducedMotion} aria-label={reducedMotion ? "Motion paused by your reduced-motion preference" : motionPaused ? "Play motion" : "Pause motion"} title={reducedMotion ? "Motion is paused to respect your device preference" : undefined}><svg viewBox="0 0 16 16" aria-hidden="true">{motionPaused ? <path d="M5 3.5L12 8 5 12.5Z"/> : <><path d="M5 4V12"/><path d="M11 4V12"/></>}</svg><span>{motionPaused ? "Play motion" : "Pause motion"}</span></button></div>
    <p className="qv-process-caption">{stages[stage].description}</p>
  </div>;
}
