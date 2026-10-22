import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site, projects } from "@/content/site";
import Media from "@/components/Media";
import Button from "@/components/Button";
import { Pixels } from "@/components/Flip";
import Split, { wordCount } from "@/components/Split";

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
      <header className="case-hero" style={{ ["--tint" as string]: p.tint }} data-scrub="hero">
        <div className="case-hero__inner">
          <Link href="/#work" className="back back--light intro-fade" style={{ ["--delay" as string]: "50ms" }}>
            <svg className="back__arrow" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M8.1 14.4 3.8 10l4.3-4.4M3.8 10h12.5" />
            </svg>
            All work
          </Link>
          <p className="case-hero__eyebrow intro-fade" style={{ ["--delay" as string]: "100ms" }}>{p.company}</p>
          <h1 className="case-hero__title intro">
            <Split text={p.headline} />
          </h1>
          <ul className="case-hero__tags">
            {p.tags.map((t, k) => (
              <li key={t} className="intro-fade" style={{ ["--delay" as string]: `${600 + k * 80}ms` }}>{t}</li>
            ))}
          </ul>
          <div className="case-hero__shot intro-fade" data-cursor="light" style={{ ["--delay" as string]: "750ms" }}>
            <Media img={p.cover} cover={{ title: p.title, meta: "Case study" }} />
          </div>
        </div>
      </header>

      {/* Overview cards */}
      <section className="overview" aria-label="Overview">
        <div className="overview__grid">
          <div className="overview__col">
            <div className="card" data-reveal>
              <h2 className="card__title">
                Product <span>{p.title}</span>
              </h2>
              <p className="card__text">{p.overview}</p>
            </div>
            <div className="card" data-reveal style={{ ["--i" as string]: 2 }}>
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
                  <Button href={p.link.href} label={p.link.label} external />
                </p>
              )}
            </div>
          </div>
          <div className="card card--rows" data-reveal style={{ ["--i" as string]: 1 }}>
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
        <div className="card impact" data-reveal>
          <h2 className="card__title">Impact</h2>
          <ul className="impact__list">
            {p.impact.map((m, k) => (
              <li key={m.label} data-reveal style={{ ["--i" as string]: k + 1 }}>
                <p className="impact__value" data-count>{m.value}</p>
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
            <h2 className="block__label" data-reveal>{b.label}</h2>
            {b.heading && (
              <p className="block__heading" data-scrub="text" style={{ ["--n" as string]: wordCount(b.heading) }}>
                <Split text={b.heading} />
              </p>
            )}
            {b.body?.map((t, k) => (
              <p key={k} data-reveal style={{ ["--i" as string]: k }}>{t}</p>
            ))}
            {b.list && (
              <ul className={`points ${b.list.some((l) => l.text) ? "points--rich" : ""}`}>
                {b.list.map((l, k) => (
                  <li key={l.title} data-reveal style={{ ["--i" as string]: k % 4 }}>
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
                <Media key={img.label} img={img} reveal tilt />
              ))}
            </div>
          )}
        </section>
      ))}

      <section className="block next">
        <div className="rule" aria-hidden="true" />
        <div className="wrap narrow">
          <p className="block__label" data-reveal>Next case study</p>
          <Link href={`/work/${next.slug}/`} className="next__link" data-reveal>
            <span className="next__text">
              <span className="next__title wave">
                <Split text={next.title} letters />
              </span>
              <span className="next__summary">{next.summary}</span>
            </span>
            <span className="next__arrow" aria-hidden="true">
              <Pixels />
              <svg viewBox="0 0 20 20">
                <path d="M11.9 14.4 16.2 10l-4.3-4.4M16.2 10H3.7" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </article>
  );
}
