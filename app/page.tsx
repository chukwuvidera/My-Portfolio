import Link from "next/link";
import { site, projects } from "@/content/site";
import Media from "@/components/Media";
import Button from "@/components/Button";
import Split, { wordCount } from "@/components/Split";

export default function Home() {
  const { headline, accent } = site.hero;
  const lead = headline.endsWith(accent) ? headline.slice(0, -accent.length) : headline;
  return (
    <>
      {/* Hero: words rise in on load, letters ripple on hover, layers drift with the pointer,
          and the whole block eases back as you scroll away */}
      <section className="hero wrap" data-scrub="hero" data-depth>
        <div className="hero__inner">
          <p className="hero__name intro-fade" style={{ ["--delay" as string]: "100ms" }}>{site.name}</p>
          <h1 className="hero__title intro wave">
            <Split text={lead} letters />
            {lead !== headline && (
              <>
                {" "}
                <em>
                  <Split text={accent} start={wordCount(lead)} letters />
                </em>
              </>
            )}
          </h1>
          <p className="hero__intro intro-fade" style={{ ["--delay" as string]: "650ms" }}>{site.hero.intro}</p>
          <p className="hero__actions intro-fade" style={{ ["--delay" as string]: "800ms" }}>
            <Button href="#work" label="See my work" />
            <Link className="roll text-link" href="/about/#contact">
              <span data-text="Get in touch">Get in touch</span>
            </Link>
          </p>
        </div>
        <a className="hero__scroll intro-fade" href="#work" style={{ ["--delay" as string]: "1100ms" }} aria-label="Scroll to work">
          <span />
        </a>
      </section>

      {/* Work */}
      <section id="work" className="section" data-lit>
        <div className="rule" aria-hidden="true" />
        <div className="wrap">
          <h2 className="section__title" data-reveal>Selected work</h2>
          <p className="work__statement" data-scrub="text" style={{ ["--n" as string]: wordCount(site.workIntro) }}>
            <Split text={site.workIntro} />
          </p>
          <ul className="work-list">
            {projects.map((p, i) => (
              <li key={p.slug} className="work">
                <Link href={`/work/${p.slug}/`} className="work__link">
                  <div className="work__frame" data-tilt>
                    <div
                      className="work__media"
                      style={{ ["--tint" as string]: p.tint }}
                      data-reveal="clip"
                      data-scrub="parallax"
                      data-cursor="light"
                    >
                      <Media img={p.cover} cover={{ title: p.title, meta: p.highlight }} />
                      <div className={`work__reveal${p.coverText === "light" ? " work__reveal--light-text" : ""}`} aria-hidden="true">
                        <span className="work__reveal-title">{p.title}</span>
                        <span className="work__reveal-cta">View case study →</span>
                      </div>
                    </div>
                  </div>
                  <div className="work__info" data-reveal style={{ ["--i" as string]: 1 }}>
                    <h3 className="work__title">
                      <span className="work__index">{String(i + 1).padStart(2, "0")}</span>
                      {p.title}
                    </h3>
                    <p className="work__summary">{p.summary}</p>
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
