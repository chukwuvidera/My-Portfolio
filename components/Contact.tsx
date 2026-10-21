import { site } from "@/content/site";
import Button from "./Button";

/** Closing contact block, shared by the home and About pages. */
export default function Contact() {
  return (
    <section id="contact" className="section" data-lit>
      <div className="rule" aria-hidden="true" />
      <div className="wrap narrow contact">
        <h2 className="section__title">Contact</h2>
        <p className="contact__lead">
          I'm open to full-time product design roles at startups, fintech and SaaS companies: local, remote or international.
        </p>
        <a className="contact__email" href={`mailto:${site.email}`}>{site.email}</a>
        <p className="contact__links">
          {site.socials.map((s) => (
            <Button key={s.href} href={s.href} label={s.label} ghost external />
          ))}
          {site.cv && (
            <Button href={site.cv} label="Download CV" download />
          )}
        </p>
      </div>
    </section>
  );
}
