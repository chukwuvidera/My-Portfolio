"use client";
import { useEffect } from "react";

/**
 * Pointer effects for mouse users who haven't asked for reduced motion:
 * - a thin line that starts at the pointer and fades from its tail
 * - the page grid brightens around the pointer and fades out when it rests
 * - buttons marked [data-magnetic] lean towards the pointer
 * The system cursor is left as it is.
 */
export default function PointerEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const canvas = document.createElement("canvas");
    canvas.className = "cursor-trail";
    canvas.setAttribute("aria-hidden", "true");
    document.body.append(canvas);
    const ctx = canvas.getContext("2d");
    const glow = document.querySelector<HTMLElement>(".grid__glow");

    const TRAIL_MS = 450; // how long a point of the trail stays visible
    const GLOW_IDLE_MS = 500; // how long the grid stays bright after the pointer stops
    const points: { x: number; y: number; t: number }[] = [];
    let trailDrawn = false;
    let raf = 0;
    let idle = 0;
    let lastX = -1, lastY = -1;
    let magnet: HTMLElement | null = null;
    let colour = "";
    let colourTheme: string | undefined = "unset";

    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };
    const placeGlow = () => {
      glow?.style.setProperty("--gx", `${lastX + window.scrollX}px`);
      glow?.style.setProperty("--gy", `${lastY + window.scrollY}px`);
    };

    const move = (e: PointerEvent) => {
      const now = performance.now();
      for (const c of e.getCoalescedEvents?.() ?? [e]) points.push({ x: c.clientX, y: c.clientY, t: now });
      lastX = e.clientX;
      lastY = e.clientY;

      placeGlow();
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
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const scroll = () => {
      if (lastX >= 0) placeGlow();
    };
    const leave = () => {
      points.length = 0;
      glow?.classList.remove("is-on");
      release();
    };

    const draw = () => {
      raf = 0;
      if (!ctx) return;
      const now = performance.now();
      while (points.length && now - points[0].t > TRAIL_MS) points.shift();
      if (!points.length && !trailDrawn) return;

      const theme = document.documentElement.dataset.theme;
      if (theme !== colourTheme) {
        colour = getComputedStyle(document.documentElement).getPropertyValue("--rust").trim() || "#ad5019";
        colourTheme = theme;
      }
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth, h = window.innerHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.strokeStyle = colour;
      // Newest point last, so the line always ends exactly at the pointer
      for (let i = 1; i < points.length; i++) {
        ctx.globalAlpha = Math.max(0, 1 - (now - points[i].t) / TRAIL_MS);
        ctx.beginPath();
        ctx.moveTo(points[i - 1].x, points[i - 1].y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      trailDrawn = points.length > 0;
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      release();
      canvas.remove();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return null;
}
