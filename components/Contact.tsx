import { site } from "@/content/site";

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
            <a key={s.href} className="button button--ghost" href={s.href} target="_blank" rel="noreferrer" data-magnetic>{s.label}</a>
          ))}
          {site.cv && (
            <a className="button" href={site.cv} download data-magnetic>Download CV</a>
          )}
        </p>
      </div>
    </section>
  );
}
