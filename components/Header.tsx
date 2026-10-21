"use client";
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
  return (
    <header className="header">
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
              <li key={n.label} style={{ ["--i" as string]: i + 1 }}>
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
          </ul>
        </nav>
      </div>
      <div className="header__ruler" aria-hidden="true" />
    </header>
  );
}
