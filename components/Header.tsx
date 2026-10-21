"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import Signature from "./Signature";
import ThemeToggle from "./ThemeToggle";
import { FlipLabel, Pixels } from "./Flip";

// Until the CV PDF is added in content/site.ts, "Resume" opens LinkedIn
const linkedin = site.socials.find((s) => s.label === "LinkedIn")?.href ?? "/about/";
const nav = [
  { label: "Work", href: "/#work", current: (p: string) => p === "/" || p.startsWith("/work") },
  { label: "Resume", href: site.cv || linkedin, external: true },
  { label: "About", href: "/about/", current: (p: string) => p.startsWith("/about") },
];

export default function Header() {
  const path = usePathname() ?? "/";
  // Phones: the links move into a menu panel opened from the menu button
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 640 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={`header${open ? " is-menu-open" : ""}`}>
      <div className="header__bar">
        <Link href="/" className="header__logo" aria-label="Victor Chukwu, home">
          <Signature />
        </Link>
        <nav aria-label="Main">
          <ul className="nav">
            <li style={{ ["--i" as string]: 0 }}>
              <ThemeToggle className="nav__item nav__item--icon">
                <Pixels />
              </ThemeToggle>
            </li>
            {nav.map((n, i) => (
              <li key={n.label} className="nav__link" style={{ ["--i" as string]: i + 1 }}>
                {n.external ? (
                  <a href={n.href} className="nav__item" target="_blank" rel="noreferrer">
                    <Pixels />
                    <FlipLabel text={n.label} />
                  </a>
                ) : (
                  <Link href={n.href} className="nav__item" aria-current={n.current?.(path) ? "page" : undefined}>
                    <Pixels />
                    <FlipLabel text={n.label} />
                  </Link>
                )}
              </li>
            ))}
            <li className="nav__menu" style={{ ["--i" as string]: 1 }}>
              <button
                type="button"
                className="nav__item nav__item--icon"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((o) => !o)}
              >
                <span className="burger" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__ruler" aria-hidden="true" />

      <div id="mobile-menu" className="mobile-menu" inert={!open}>
        <ul className="mobile-menu__list">
          {nav.map((n, i) => {
            const inner = (
              <>
                <span className="mobile-menu__index">{String(i + 1).padStart(2, "0")}</span>
                <span className="mobile-menu__label">{n.label}</span>
                <svg className="mobile-menu__arrow" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M11.9 14.4 16.2 10l-4.3-4.4M16.2 10H3.7" />
                </svg>
              </>
            );
            return (
              <li key={n.label} style={{ ["--i" as string]: i }}>
                {n.external ? (
                  <a href={n.href} className="mobile-menu__link" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                    {inner}
                  </a>
                ) : (
                  <Link href={n.href} className="mobile-menu__link" aria-current={n.current?.(path) ? "page" : undefined}
                    onClick={() => setOpen(false)}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mobile-menu__foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>
            {site.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </p>
        </div>
      </div>
    </header>
  );
}
