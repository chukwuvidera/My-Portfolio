import { site } from "@/content/site";
import Signature from "./Signature";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <p>
          <a className="roll" href={`mailto:${site.email}`}>
            <span data-text={site.email}>{site.email}</span>
          </a>
        </p>
        <ul className="footer__links">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a className="roll" href={s.href} target="_blank" rel="noreferrer">
                <span data-text={s.label}>{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer__name" data-lit>
        <Signature />
      </div>
      <div className="wrap footer__legal">
        <p>© {new Date().getFullYear()} Victor Chukwu</p>
        <p>
          <a className="roll" href="#main">
            <span data-text="Back to top">Back to top</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
