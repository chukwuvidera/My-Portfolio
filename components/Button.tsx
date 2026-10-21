import Link from "next/link";
import { FlipLabel, Pixels } from "./Flip";

type Props = {
  href: string;
  label: string;
  ghost?: boolean; // outlined instead of filled
  external?: boolean; // opens in a new tab
  download?: boolean;
};

/** Square button with the nav's pixel-fill and rolling-label hover. */
export default function Button({ href, label, ghost, external, download }: Props) {
  const className = `button${ghost ? " button--ghost" : ""}`;
  const inner = (
    <>
      <Pixels />
      <FlipLabel text={label} />
    </>
  );
  if (external || download || href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a className={className} href={href} data-magnetic download={download || undefined}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={className} href={href} data-magnetic>
      {inner}
    </Link>
  );
}
