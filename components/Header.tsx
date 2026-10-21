import Link from "next/link";
import Signature from "./Signature";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo" aria-label="Victor Chukwu, home">
          <Signature />
        </Link>
        <nav aria-label="Main">
          <ul className="nav">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="roll">
                  <span data-text={n.label}>{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
