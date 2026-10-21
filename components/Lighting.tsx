"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Elements marked with [data-lit] start muted (black and white) and
 * come into full colour as they scroll into the middle of the screen.
 */
export default function Lighting() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-lit]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-lit"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-lit");
        });
      },
      { rootMargin: "-18% 0px -18% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
