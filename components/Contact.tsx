import { site } from "@/content/site";
import Button from "./Button";
import Split from "./Split";

/** Closing contact block, shared by the home and About pages. */
export default function Contact() {
  return (
    <section id="contact" className="section" data-lit>
      <div className="rule" aria-hidden="true" />
      <div className="wrap narrow contact">
        <h2 className="section__title" data-reveal>Contact</h2>
        {/* scattered words come together as you scroll */}
        <p className="contact__big" data-scrub="converge">
          <Split text="Let's work together." scatter />
        </p>
        <a className="contact__email wave" href={`mailto:${site.email}`} data-reveal>
          <Split text={site.email} letters />
        </a>
        <p className="contact__links" data-reveal style={{ ["--i" as string]: 1 }}>
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
