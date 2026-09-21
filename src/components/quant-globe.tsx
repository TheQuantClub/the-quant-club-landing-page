"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number };
const TAU = Math.PI * 2;

function turn(point: Point, angle: number): Point {
  const tilt = -.34;
  const x = point.x * Math.cos(angle) + point.z * Math.sin(angle);
  return { x: x * Math.cos(tilt) - point.y * Math.sin(tilt), y: x * Math.sin(tilt) + point.y * Math.cos(tilt), z: -point.x * Math.sin(angle) + point.z * Math.cos(angle) };
}

/** A decorative, rotating wire globe. No model data is used or represented. */
export function QuantGlobe({ paused, tone = "light" }: { paused: boolean; tone?: "light" | "dark" }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const controlRef = useRef<(() => void) | null>(null);

  useEffect(() => { pausedRef.current = paused; controlRef.current?.(); }, [paused]);
  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!host || !canvas || !context) return;
    const ctx = context;
    const dark = tone === "dark";
    const colours = dark ? {
      atmosphereInner: "rgba(37,99,235,.2)", atmosphereMiddle: "rgba(6,182,212,.1)", atmosphereOuter: "rgba(6,182,212,0)",
      meridianAccent: "rgba(6,182,212,.76)", meridianFront: "rgba(255,255,255,.32)", meridianBack: "rgba(37,99,235,.23)",
      latitudeAccent: "rgba(6,182,212,.72)", latitude: "rgba(255,255,255,.18)",
      nodeGlow: "rgba(6,182,212,.09)", nodeAccent: "6,182,212", nodeBase: "255,255,255",
    } : {
      atmosphereInner: "rgba(95,176,255,.14)", atmosphereMiddle: "rgba(156,213,255,.12)", atmosphereOuter: "rgba(225,243,255,0)",
      meridianAccent: "rgba(0,149,207,.58)", meridianFront: "rgba(37,99,235,.32)", meridianBack: "rgba(65,123,223,.085)",
      latitudeAccent: "rgba(6,182,212,.48)", latitude: "rgba(37,99,235,.15)",
      nodeGlow: "rgba(33,101,232,.045)", nodeAccent: "6,170,204", nodeBase: "37,99,235",
    };
    let width = 600, height = 600, frame = 0, lastTime = 0, phase = .5, visible = true;

    function draw(time: number) {
      frame = 0;
      if (!visible || document.hidden) return;
      if (!pausedRef.current && time - lastTime < 32) { frame = requestAnimationFrame(draw); return; }
      const elapsed = Math.min(time - lastTime, 50);
      lastTime = time;
      if (!pausedRef.current) phase += elapsed * .000115;
      ctx.clearRect(0, 0, width, height);
      const radius = Math.min(width, height) * .435;
      const cx = width * .5, cy = height * .47;
      const project = (p: Point) => ({ x: cx + p.x * radius * (4 / (4 - p.z)), y: cy + p.y * radius * (4 / (4 - p.z)), z: p.z });
      const atmosphere = ctx.createRadialGradient(cx - radius * .2, cy - radius * .2, radius * .12, cx, cy, radius * 1.04);
      atmosphere.addColorStop(0, colours.atmosphereInner); atmosphere.addColorStop(.65, colours.atmosphereMiddle); atmosphere.addColorStop(1, colours.atmosphereOuter);
      ctx.fillStyle = atmosphere; ctx.fillRect(0, 0, width, height);

      // Woven meridians retain the depth and movement of the original artwork.
      const ribs = width < 420 ? 38 : 52;
      for (let rib = 0; rib < ribs; rib++) {
        for (let front = 0; front < 2; front++) {
          ctx.beginPath(); let drawing = false;
          for (let step = 1; step < 64; step++) {
            const latitude = step / 64 * Math.PI, longitude = rib / ribs * TAU + Math.sin(latitude * 1.7) * .45;
            const p = turn({ x: Math.sin(latitude) * Math.cos(longitude), y: Math.cos(latitude) * 1.04, z: Math.sin(latitude) * Math.sin(longitude) }, phase);
            const q = project(p);
            if ((p.z >= 0 ? 1 : 0) === front) { if (!drawing) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y); drawing = true; } else drawing = false;
          }
          ctx.strokeStyle = front ? rib % 7 === 0 ? colours.meridianAccent : colours.meridianFront : colours.meridianBack;
          ctx.lineWidth = rib % 7 === 0 ? 1 : .65; ctx.stroke();
        }
      }
      for (let latitude = 1; latitude < 19; latitude++) {
        const a = latitude / 19 * Math.PI; ctx.beginPath();
        for (let step = 0; step <= 96; step++) {
          const b = step / 96 * TAU, q = project(turn({ x: Math.sin(a) * Math.cos(b), y: Math.cos(a) * 1.04, z: Math.sin(a) * Math.sin(b) }, phase));
          if (!step) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = latitude === 9 ? colours.latitudeAccent : colours.latitude; ctx.lineWidth = latitude === 9 ? 1 : .6; ctx.stroke();
      }
      for (let i = 0; i < 68; i++) {
        const a = Math.acos(1 - 2 * (i + .5) / 68), b = i * 2.39996;
        const p = turn({ x: Math.sin(a) * Math.cos(b), y: Math.cos(a) * 1.04, z: Math.sin(a) * Math.sin(b) }, phase), q = project(p);
        const alpha = p.z < 0 ? dark ? .24 : .16 : .55 + p.z * .38;
        if (p.z > .4) { ctx.beginPath(); ctx.arc(q.x, q.y, 8, 0, TAU); ctx.fillStyle = colours.nodeGlow; ctx.fill(); }
        ctx.beginPath(); ctx.arc(q.x, q.y, p.z < 0 ? 1.35 : 2.2 + p.z * .8, 0, TAU); ctx.fillStyle = `rgba(${i % 9 === 0 ? colours.nodeAccent : colours.nodeBase},${alpha})`; ctx.fill();
      }
      if (!pausedRef.current) frame = requestAnimationFrame(draw);
    }
    function start() { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw); }
    controlRef.current = () => { cancelAnimationFrame(frame); frame = 0; start(); };
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); ctx.setTransform(ratio, 0, 0, ratio, 0, 0); start();
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) { cancelAnimationFrame(frame); frame = 0; } else start(); });
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); };
    resize.observe(host); intersection.observe(host); document.addEventListener("visibilitychange", visibility); start();
    return () => { cancelAnimationFrame(frame); controlRef.current = null; resize.disconnect(); intersection.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, [tone]);

  return <div className="kg-globe" ref={hostRef} data-tone={tone} aria-hidden="true"><div className="kg-globe-halo" /><canvas ref={canvasRef} /></div>;
}
