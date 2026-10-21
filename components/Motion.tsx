"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Drives the motion styles in globals.css:
 * - smooth, inertial wheel scrolling (Lenis)
 * - [data-reveal]: gets .is-in once it scrolls into view
 * - [data-scrub]: gets --p (0 → 1) as it moves through the viewport
 *     "hero"     0 at the top of the page, 1 once scrolled one screen down
 *     "text"     words light up as the block passes the middle of the screen
 *     "converge" scattered words come together
 *     "parallax" 0 entering at the bottom, 1 leaving at the top
 * - [data-count]: the number counts up when it comes into view
 * - [data-tilt]: tilts towards the pointer
 * - [data-depth]: inner layers drift with the pointer (--mx / --my, -1 → 1)
 * With reduced motion, everything shows in its final state and nothing moves.
 */

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = () => window.matchMedia("(pointer: fine)").matches;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function Motion() {
  const path = usePathname();

  // Smooth scrolling, set up once for the whole visit
  useEffect(() => {
    if (reduced() || !fine()) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Per-page effects, re-scanned on every navigation
  useEffect(() => {
    // Next scrolls the window itself on navigation; tell Lenis where it is now
    window.__lenis?.resize();
    window.__lenis?.scrollTo(window.scrollY, { immediate: true, force: true });

    const cleanups: (() => void)[] = [];
    const calm = reduced();

    // Reveals
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (calm || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      // A wipe starts fully clipped, which the browser counts as not visible,
      // so those are triggered by their parent coming into view instead
      const targets = new Map<Element, HTMLElement[]>();
      reveals.forEach((el) => {
        const watch = el.dataset.reveal === "clip" && el.parentElement ? el.parentElement : el;
        targets.set(watch, [...(targets.get(watch) ?? []), el]);
      });
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              targets.get(e.target)?.forEach((el) => el.classList.add("is-in"));
              io.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      targets.forEach((_, watch) => io.observe(watch));
      cleanups.push(() => io.disconnect());
    }

    // Count-ups ("15+", "19,000+", "50k+"); years and words are left alone
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const runCount = (el: HTMLElement) => {
      const m = el.textContent?.match(/^(\D*)(\d[\d,]*)(.*)$/);
      if (!m) return;
      const target = Number(m[2].replace(/,/g, ""));
      if (target >= 1900 && target <= 2100 && !m[2].includes(",")) return; // a year
      const commas = m[2].includes(",");
      const fmt = (n: number) => (commas ? Math.round(n).toLocaleString("en-US") : String(Math.round(n)));
      const t0 = performance.now();
      const step = (t: number) => {
        const k = clamp((t - t0) / 1400);
        el.textContent = m[1] + fmt(target * (1 - Math.pow(1 - k, 3))) + m[3];
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!calm && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              runCount(e.target as HTMLElement);
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.6 }
      );
      counters.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    if (calm) return () => cleanups.forEach((c) => c());

    // Scroll-linked progress
    const scrubs = Array.from(document.querySelectorAll<HTMLElement>("[data-scrub]"));
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of scrubs) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        let p: number;
        switch (el.dataset.scrub) {
          case "hero":
            p = clamp(-r.top / vh);
            break;
          case "text":
            p = clamp((vh * 0.85 - r.top) / (vh * 0.4 + r.height));
            break;
          case "converge":
            p = clamp((vh - r.top) / (vh * 0.5)); // together by the middle of the screen
            break;
          default:
            p = clamp((vh - r.top) / (vh + r.height));
        }
        el.style.setProperty("--p", p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    if (!fine()) return () => cleanups.forEach((c) => c());

    // Tilt towards the pointer
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
      };
      const leave = () => {
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });

    // Layers that drift with the pointer
    const depth = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"));
    if (depth.length) {
      const move = (e: PointerEvent) => {
        const mx = (e.clientX / window.innerWidth - 0.5) * 2;
        const my = (e.clientY / window.innerHeight - 0.5) * 2;
        depth.forEach((el) => {
          el.style.setProperty("--mx", mx.toFixed(3));
          el.style.setProperty("--my", my.toFixed(3));
        });
      };
      window.addEventListener("pointermove", move);
      cleanups.push(() => window.removeEventListener("pointermove", move));
    }

    return () => cleanups.forEach((c) => c());
  }, [path]);

  return null;
}
