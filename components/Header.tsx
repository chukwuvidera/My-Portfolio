"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import Signature from "./Signature";
import ThemeToggle from "./ThemeToggle";

// Until the CV PDF is added in content/site.ts, "Resume" opens LinkedIn
const linkedin = site.socials.find((s) => s.label === "LinkedIn")?.href ?? "/about/";
const nav = [
  { label: "Work", href: "/#work", current: (p: string) => p === "/" || p.startsWith("/work") },
  { label: "Resume", href: site.cv || linkedin, external: true },
  { label: "About", href: "/about/", current: (p: string) => p.startsWith("/about") },
];

/** A 10 × 4 grid of squares that fill in a left-to-right dissolve on hover. */
function Pixels() {
  return (
    <span className="nav__pixels" aria-hidden="true">
      {Array.from({ length: 40 }, (_, i) => {
        const col = i % 10;
        const jitter = ((i * 37) % 11) * 12; // fixed scatter, so server and client match
        return <i key={i} style={{ ["--d" as string]: `${col * 26 + jitter}ms` }} />;
      })}
    </span>
  );
}

function Label({ text }: { text: string }) {
  return (
    <span className="nav__label">
      <span className="nav__roll">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </span>
    </span>
  );
}

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
            {nav.map((n) => (
              <li key={n.label}>
                {n.external ? (
                  <a href={n.href} className="nav__item" target="_blank" rel="noreferrer">
                    <Pixels />
                    <Label text={n.label} />
                  </a>
                ) : (
                  <Link href={n.href} className="nav__item" aria-current={n.current?.(path) ? "page" : undefined}>
                    <Pixels />
                    <Label text={n.label} />
                  </Link>
                )}
              </li>
            ))}
            <li>
              <ThemeToggle className="nav__item nav__item--icon">
                <Pixels />
              </ThemeToggle>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__ruler" aria-hidden="true" />
    </header>
  );
}
