"use client";
import { useEffect, useRef, useState } from "react";

/**
 * A small dot that follows the pointer and a ring that trails behind it.
 * Over case studies the ring opens up and reads "View"; over [data-invert]
 * text it becomes a white disc that shows the text in negative. Buttons marked
 * [data-magnetic] lean towards the pointer, and a thin line trails the pointer,
 * fading from its tail.
 * Only runs for mouse users who haven't asked for reduced motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    let magnet: HTMLElement | null = null;
    const TRAIL_MS = 450; // how long a point of the trail stays visible
    const points: { x: number; y: number; t: number }[] = [];
    let trailDrawn = false;
    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      for (const c of e.getCoalescedEvents?.() ?? [e]) points.push({ x: c.clientX, y: c.clientY, t: performance.now() });
      const t = e.target as HTMLElement;
      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(x - r.left - r.width / 2) * 0.25}px, ${(y - r.top - r.height / 2) * 0.35}px)`;
      }
      const view = t.closest("[data-cursor='view']");
      const link = t.closest("a, button");
      const invert = t.closest("[data-invert]");
      ring.current?.classList.toggle("is-view", !!view);
      ring.current?.classList.toggle("is-link", !view && !!link);
      ring.current?.classList.toggle("is-invert", !view && !link && !!invert);
    };
    const leave = () => { x = y = -100; points.length = 0; release(); };
    const drawTrail = () => {
      const c = trail.current;
      const ctx = c?.getContext("2d");
      if (!c || !ctx) return;
      const now = performance.now();
      while (points.length && now - points[0].t > TRAIL_MS) points.shift();
      if (!points.length && !trailDrawn) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth, h = window.innerHeight;
      if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      for (let i = 1; i < points.length; i++) {
        const a = 1 - (now - points[i].t) / TRAIL_MS;
        ctx.strokeStyle = `rgba(173, 80, 25, ${a.toFixed(3)})`; // --rust
        ctx.beginPath();
        ctx.moveTo(points[i - 1].x, points[i - 1].y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
      }
      trailDrawn = points.length > 0;
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      drawTrail();
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      release();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!on) return null;
  return (
    <>
      <canvas ref={trail} className="cursor-trail" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span>View</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
