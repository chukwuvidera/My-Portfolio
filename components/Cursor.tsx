"use client";
import { useEffect, useRef, useState } from "react";

/**
 * A small dot that follows the pointer and a ring that trails behind it.
 * Over case studies the ring opens up and reads "View"; buttons marked
 * [data-magnetic] lean towards the pointer.
 * Only runs for mouse users who haven't asked for reduced motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
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
      ring.current?.classList.toggle("is-view", !!view);
      ring.current?.classList.toggle("is-link", !view && !!link);
    };
    const leave = () => { x = y = -100; release(); };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
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
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span>View</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
