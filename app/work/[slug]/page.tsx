import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site, projects } from "@/content/site";
import Media from "@/components/Media";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="case">
      {/* Full-width hero: tint, grain and the cover, cropped by the bottom edge */}
      <header className="case-hero" style={{ ["--tint" as string]: p.tint }}>
        <div className="case-hero__inner">
          <Link href="/#work" className="back back--light">
            All work
          </Link>
          <p className="case-hero__eyebrow">{p.company}</p>
          <h1 className="case-hero__title">{p.headline}</h1>
          <ul className="case-hero__tags">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="case-hero__shot">
            <Media img={p.cover} cover={{ title: p.title, meta: "Case study" }} />
          </div>
        </div>
      </header>

      {/* Overview cards */}
      <section className="overview" aria-label="Overview">
        <div className="overview__grid">
          <div className="overview__col">
            <div className="card">
              <h2 className="card__title">
                Product <span>{p.title}</span>
              </h2>
              <p className="card__text">{p.overview}</p>
            </div>
            <div className="card">
              <h2 className="card__title">Details</h2>
              <dl className="facts">
                {p.details.map((d) => (
                  <div key={d.label}>
                    <dt>{d.label}</dt>
                    <dd>{d.value}</dd>
                  </div>
                ))}
              </dl>
              {p.link && (
                <p className="card__action">
                  <a className="button" href={p.link.href} target="_blank" rel="noreferrer" data-magnetic>{p.link.label}</a>
                </p>
              )}
            </div>
          </div>
          <div className="card card--rows">
            {(["problem", "solution", "result"] as const).map((k) => (
              <div key={k} className="card__row">
                <h2 className="card__title">
                  {k[0].toUpperCase() + k.slice(1)} <span>{p.summaryCards[k].title}</span>
                </h2>
                <p className="card__text">{p.summaryCards[k].text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card impact">
          <h2 className="card__title">Impact</h2>
          <ul className="impact__list">
            {p.impact.map((m) => (
              <li key={m.label}>
                <p className="impact__value">{m.value}</p>
                <p className="impact__label">{m.label}</p>
                <p className="impact__caption">{m.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {p.blocks.map((b) => (
        <section key={b.label} className="block" data-lit>
          <div className="rule" aria-hidden="true" />
          <div className="wrap narrow block__text">
            <h2 className="block__label">{b.label}</h2>
            {b.heading && <p className="block__heading">{b.heading}</p>}
            {b.body?.map((t, k) => <p key={k}>{t}</p>)}
            {b.list && (
              <ul className={`points ${b.list.some((l) => l.text) ? "points--rich" : ""}`}>
                {b.list.map((l) => (
                  <li key={l.title}>
                    <strong>{l.title}</strong>
                    {l.text && <span> {l.text}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {b.images && (site.showImagePlaceholders || b.images.some((img) => img.src)) && (
            <div className={`wrap gallery ${b.images.length > 1 ? "gallery--grid" : ""}`}>
              {b.images.map((img) => (
                <Media key={img.label} img={img} />
              ))}
            </div>
          )}
        </section>
      ))}

      <section className="block next">
        <div className="rule" aria-hidden="true" />
        <div className="wrap narrow">
          <p className="block__label">Next case study</p>
          <Link href={`/work/${next.slug}/`} className="next__link" data-cursor="view">
            <span className="next__title">{next.title}</span>
            <span className="next__summary">{next.summary}</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
