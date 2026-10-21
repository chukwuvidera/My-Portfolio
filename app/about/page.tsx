import type { Metadata } from "next";
import { site } from "@/content/site";
import Contact from "@/components/Contact";

export const metadata: Metadata = { title: "About", description: site.about.heading };

export default function About() {
  return (
    <>
      {/* Intro with the arms-crossed portrait */}
      <section className="about-hero wrap">
        <div className="about-hero__text">
          <p className="section__title">About</p>
          <h1 className="about-hero__title">{site.about.heading}</h1>
          <p className="about-hero__intro">{site.about.intro}</p>
        </div>
        <figure className="about-hero__portrait" data-lit>
          <img src="/images/victor-portrait.webp" alt="Victor Chukwu, arms folded, in a rust sweater" width={1200} height={1500} />
        </figure>
      </section>

      {/* Story */}
      <section className="section" data-lit>
        <div className="rule" aria-hidden="true" />
        <div className="wrap about">
          <figure className="about__photo" data-lit>
            <img src="/images/victor-about.webp" alt="Victor Chukwu looking up, hands in pockets" loading="lazy" width={1200} height={1500} />
          </figure>
          <div className="about__text">
            <h2 className="section__title">My story</h2>
            {site.about.body.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section" aria-labelledby="experience" data-lit>
        <div className="rule" aria-hidden="true" />
        <div className="wrap narrow">
          <h2 id="experience" className="section__title">Experience</h2>
          <ol className="timeline">
            {site.experience.map((e) => (
              <li key={e.company}>
                <p className="timeline__period">{e.period}</p>
                <div>
                  <p className="timeline__company">{e.company}</p>
                  <p className="timeline__role">{e.role}</p>
                  <p className="timeline__note">
                    {e.note}
                    {e.link && (
                      <>
                        {" "}
                        <a className="inline-link" href={e.link.href} target="_blank" rel="noreferrer">{e.link.label}</a>
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" aria-labelledby="kind-words" data-lit>
        <div className="rule" aria-hidden="true" />
        <div className="wrap narrow">
          <h2 id="kind-words" className="section__title">Kind words</h2>
          <div className="quotes">
            {site.testimonials.map((t) => (
              <figure key={t.name} className="quote">
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="quote__name">{t.name}</span>
                  <span className="quote__role">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
