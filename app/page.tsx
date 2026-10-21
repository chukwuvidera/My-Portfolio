import Link from "next/link";
import { site, projects } from "@/content/site";
import Media from "@/components/Media";

export default function Home() {
  const { headline, accent } = site.hero;
  const lead = headline.endsWith(accent) ? headline.slice(0, -accent.length) : headline;
  return (
    <>
      {/* Hero */}
      <section className="hero wrap">
        <div className="hero__text">
          <p className="hero__eyebrow">
            <span className="hero__name">{site.name}</span>
            <span className="status">{site.availability}</span>
          </p>
          <h1 className="hero__title">
            {lead}
            {lead !== headline && <em>{accent}</em>}
          </h1>
          <p className="hero__intro">{site.hero.intro}</p>
          <p className="hero__actions">
            <a className="button" href="#work" data-magnetic>See my work</a>
            <a className="roll text-link" href={`mailto:${site.email}`}>
              <span data-text="Get in touch">Get in touch</span>
            </a>
          </p>
        </div>
        <figure className="hero__portrait" data-lit>
          <img src="/images/victor-portrait.webp" alt="Victor Chukwu, arms folded, in a rust sweater" width={1200} height={1500} />
        </figure>
      </section>

      {/* Work */}
      <section id="work" className="section" data-lit>
        <div className="rule" aria-hidden="true" />
        <div className="wrap">
          <h2 className="section__title">Selected work</h2>
          <ul className="work-list">
            {projects.map((p, i) => (
              <li key={p.slug} className="work">
                <Link href={`/work/${p.slug}/`} className="work__link" data-cursor="view">
                  <div className="work__media" style={{ ["--tint" as string]: p.tint }}>
                    <Media img={p.cover} cover={{ title: p.title, meta: p.highlight }} />
                  </div>
                  <div className="work__info">
                    <h3 className="work__title">
                      <span className="work__index">{String(i + 1).padStart(2, "0")}</span>
                      {p.title}
                    </h3>
                    <p className="work__summary">{p.summary}</p>
                    <dl className="work__meta">
                      <div><dt>Company</dt><dd>{p.company}</dd></div>
                      <div><dt>Year</dt><dd>{p.year}</dd></div>
                      <div><dt>Result</dt><dd className="work__highlight">{p.highlight}</dd></div>
                    </dl>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section" data-lit>
        <div className="rule" aria-hidden="true" />
        <div className="wrap about">
          <figure className="about__photo" data-lit>
            <img src="/images/victor-about.webp" alt="Victor Chukwu looking up, hands in pockets" loading="lazy" width={1200} height={1500} />
          </figure>
          <div className="about__text">
            <h2 className="section__title">About</h2>
            <p className="about__lead">{site.about.heading}</p>
            {site.about.body.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </div>

        <div className="wrap narrow">
          <h3 className="sub-title">Experience</h3>
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

      {/* Contact */}
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
    </>
  );
}
