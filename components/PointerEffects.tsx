"use client";
import { useEffect } from "react";

/**
 * Pointer effects for mouse users who haven't asked for reduced motion:
 * - a soft brown glow sits under the pointer and fades out when it rests
 * - buttons marked [data-magnetic] lean towards the pointer
 * The system cursor is left as it is.
 */
export default function PointerEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const glow = document.querySelector<HTMLElement>(".pointer-glow");
    const GLOW_IDLE_MS = 700; // how long the glow stays after the pointer stops
    let idle = 0;
    let magnet: HTMLElement | null = null;

    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const move = (e: PointerEvent) => {
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
    const leave = () => {
      glow?.classList.remove("is-on");
      release();
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.clearTimeout(idle);
      release();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return null;
}
