import type { Metadata } from "next";
import Button from "@/components/Button";
import Split from "@/components/Split";

export const metadata: Metadata = { title: "Page not found" };

/** Shown for any address that doesn't exist, styled like the home hero. */
export default function NotFound() {
  return (
    <section className="hero wrap">
      <div className="hero__inner">
        <p className="hero__name intro-fade" style={{ ["--delay" as string]: "100ms" }}>404</p>
        <h1 className="hero__title intro wave">
          <Split text="This page doesn't" letters />{" "}
          <em>
            <Split text="exist." start={3} letters />
          </em>
        </h1>
        <p className="hero__intro intro-fade" style={{ ["--delay" as string]: "650ms" }}>
          The link may be old or mistyped. The work and everything about me are a click away.
        </p>
        <p className="hero__actions intro-fade" style={{ ["--delay" as string]: "800ms" }}>
          <Button href="/#work" label="See my work" />
          <Button href="/about/" label="About me" ghost />
        </p>
      </div>
    </section>
  );
}
