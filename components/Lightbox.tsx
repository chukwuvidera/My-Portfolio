"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Click any case study screen or portrait to see it full-screen.
 * - click the open image to zoom in further, then move the pointer to pan
 *   (touch: tap to zoom at that spot, or pinch)
 * - ← / → or the buttons step through the page's images; Esc or the backdrop closes
 */

// Images that open in the zoom view (home cards are links, so they're left out)
export const ZOOMABLE = ".gallery img, .case-hero__shot img, .about-hero__portrait img, .about__photo img";
const ZOOM = 2.4;

type Shot = { src: string; alt: string };

export default function Lightbox() {
  const path = usePathname();
  const [shots, setShots] = useState<Shot[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = index !== null;
  const shot = open ? shots[index] : null;

  const close = useCallback(() => {
    setIndex(null);
    setZoomed(false);
    opener.current?.focus?.();
  }, []);
  const step = useCallback(
    (d: number) => {
      setZoomed(false);
      setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length));
    },
    [shots.length]
  );

  // Open on click; make the images keyboard-reachable too
  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(ZOOMABLE));
    setShots(imgs.map((i) => ({ src: i.currentSrc || i.src, alt: i.alt })));
    imgs.forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `View larger: ${img.alt}`);
    });
    const show = (img: HTMLImageElement) => {
      opener.current = img;
      setShots(imgs.map((i) => ({ src: i.currentSrc || i.src, alt: i.alt })));
      setIndex(imgs.indexOf(img));
    };
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest<HTMLImageElement>(ZOOMABLE);
      if (img && imgs.includes(img)) show(img);
    };
    const onKey = (e: KeyboardEvent) => {
      const img = e.target as HTMLImageElement;
      if ((e.key === "Enter" || e.key === " ") && imgs.includes(img)) {
        e.preventDefault();
        show(img);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [path]);

  // While open: keys, no page scroll, focus on the close button
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    document.documentElement.classList.add("lightbox-open");
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.classList.remove("lightbox-open");
    };
  }, [open, close, step]);

  if (!shot) return null;

  const aim = (e: React.MouseEvent<HTMLImageElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={shot.alt} onClick={close}>
      <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
        <p className="lightbox__count">
          {String(index! + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
        </p>
        <p className="lightbox__hint">{zoomed ? "Move to look around · click to zoom out" : "Click the image to zoom in"}</p>
        <button ref={closeRef} type="button" className="lightbox__btn" onClick={close} aria-label="Close">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" /></svg>
        </button>
      </div>

      <figure className={`lightbox__stage${zoomed ? " is-zoomed" : ""}`} onClick={(e) => e.stopPropagation()}>
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          style={{ transformOrigin: origin, transform: zoomed ? `scale(${ZOOM})` : undefined }}
          onPointerMove={zoomed ? aim : undefined}
          onClick={(e) => {
            aim(e);
            setZoomed((z) => !z);
          }}
        />
        <figcaption>{shot.alt}</figcaption>
      </figure>

      {shots.length > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--prev" aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); step(-1); }}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8.1 14.4 3.8 10l4.3-4.4M3.8 10h12.5" /></svg>
          </button>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--next" aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); step(1); }}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M11.9 14.4 16.2 10l-4.3-4.4M16.2 10H3.7" /></svg>
          </button>
        </>
      )}
    </div>
  );
}
