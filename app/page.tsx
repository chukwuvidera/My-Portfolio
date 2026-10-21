import Link from "next/link";
import { site, projects } from "@/content/site";
import Media from "@/components/Media";
import Button from "@/components/Button";

export default function Home() {
  const { headline, accent } = site.hero;
  const lead = headline.endsWith(accent) ? headline.slice(0, -accent.length) : headline;
  return (
    <>
      {/* Hero */}
      <section className="hero wrap">
        <p className="hero__name">{site.name}</p>
        <h1 className="hero__title">
          {lead}
          {lead !== headline && <em>{accent}</em>}
        </h1>
        <p className="hero__intro">{site.hero.intro}</p>
        <p className="hero__actions">
          <Button href="#work" label="See my work" />
          <Link className="roll text-link" href="/about/#contact">
            <span data-text="Get in touch">Get in touch</span>
          </Link>
        </p>
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
                    <div className="work__reveal" aria-hidden="true">
                      <span className="work__reveal-title">{p.title}</span>
                      <span className="work__reveal-cta">View case study →</span>
                    </div>
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

    </>
  );
}
