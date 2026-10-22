"use client";
import { useEffect, useRef } from "react";

/**
 * Pointer effects for mouse users who haven't asked for reduced motion:
 * - the cursor: a dot on the pointer and a ring that trails after it,
 *   swelling over anything clickable and turning light over dark surfaces
 * - a soft brown glow sits under the pointer and fades out when it rests
 * - buttons marked [data-magnetic] lean towards the pointer
 * Touch screens and reduced motion keep the system cursor.
 */

// Anything that responds to a click swells the ring
const INTERACTIVE = 'a, button, summary, input, select, textarea, label, [role="button"], .lightbox__stage img';
// Dark images paint no background colour for the check below to read, so they're marked
const DARK = '[data-cursor="light"]';
const RING_LAG = 0.18; // how far the ring closes the gap per 60fps frame (kept the same at any frame rate)

const channel = (c: number) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

// Walk up to the first element that paints a background and read how dark it is
function onDark(node: Element | null) {
  for (let n = node; n; n = n.parentElement) {
    if (n.matches(DARK)) return true;
    if (n.matches("img, video, canvas")) continue; // their background is only a loading placeholder
    // buttons and nav items fill with a grid of pixels on hover, not a background
    const pixel = n.matches(":hover, :focus-visible") ? n.querySelector(":scope > .pixels i") : null;
    const m = /rgba?\(([^)]+)\)/.exec(getComputedStyle(pixel ?? n).backgroundColor);
    if (!m) continue;
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    if (p.length > 3 && p[3] < 0.5) continue; // see-through: whatever's behind decides
    return 0.2126 * channel(p[0]) + 0.7152 * channel(p[1]) + 0.0722 * channel(p[2]) < 0.18;
  }
  return false;
}

export default function PointerEffects() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const root = document.documentElement;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    root.classList.add("has-custom-cursor");

    const glow = document.querySelector<HTMLElement>(".pointer-glow");
    const GLOW_IDLE_MS = 700; // how long the glow stays after the pointer stops
    let idle = 0;
    let magnet: HTMLElement | null = null;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;
    let last = 0;
    let started = false;

    // Position goes through `translate`, so the hover `scale` swells the ring about its centre
    const follow = (t: number) => {
      const k = 1 - Math.pow(1 - RING_LAG, Math.min(4, (t - (last || t - 16.7)) / 16.7));
      last = t;
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      ring.style.translate = `${rx.toFixed(1)}px ${ry.toFixed(1)}px`;
      raf = Math.abs(mx - rx) + Math.abs(my - ry) > 0.1 ? requestAnimationFrame(follow) : (last = 0);
    };

    // What's under the pointer: clickable? dark?
    const read = (target: Element | null) => {
      if (!target) return;
      ring.classList.toggle("is-hovering", !!target.closest(INTERACTIVE));
      root.classList.toggle("cursor-on-dark", onDark(target));
    };
    // Scrolling, the theme switch and the zoom view change what's under a still pointer
    const reread = () => requestAnimationFrame(() => started && read(document.elementFromPoint(mx, my)));
    // Hover states fade their colours in, so look again once they've settled
    let settle = 0;
    const recheck = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(reread, 400);
    };

    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.translate = `${mx}px ${my}px`;
      if (!started) {
        // drop the ring onto the pointer rather than flying in from the corner
        started = true;
        rx = mx;
        ry = my;
        root.classList.add("cursor-ready");
      }
      if (!raf) raf = requestAnimationFrame(follow);

      glow?.style.setProperty("--gx", `${e.clientX}px`);
      glow?.style.setProperty("--gy", `${e.clientY}px`);
      glow?.classList.add("is-on");
      window.clearTimeout(idle);
      idle = window.setTimeout(() => glow?.classList.remove("is-on"), GLOW_IDLE_MS);

      const m = (e.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      }
    };
    const over = (e: MouseEvent) => {
      read(e.target as Element);
      recheck();
    };
    const down = () => root.classList.add("cursor-down");
    const up = () => {
      root.classList.remove("cursor-down");
      reread();
      recheck();
    };
    const leave = () => {
      root.classList.add("cursor-out");
      glow?.classList.remove("is-on");
      release();
    };
    const enter = () => root.classList.remove("cursor-out");

    window.addEventListener("pointermove", move);
    document.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("scroll", reread, { passive: true });
    window.addEventListener("keyup", reread);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      window.clearTimeout(settle);
      release();
      root.classList.remove("has-custom-cursor", "cursor-ready", "cursor-on-dark", "cursor-down", "cursor-out");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("scroll", reread);
      window.removeEventListener("keyup", reread);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
