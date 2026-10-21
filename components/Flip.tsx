/**
 * The hover effect shared by the nav cells and buttons: a 10 × 4 grid of
 * squares that fills in a left-to-right dissolve, and a label that rolls up.
 * The parent needs position: relative and overflow: hidden (see .nav__item, .button).
 */
export function Pixels() {
  return (
    <span className="pixels" aria-hidden="true">
      {Array.from({ length: 40 }, (_, i) => {
        const col = i % 10;
        const jitter = ((i * 37) % 11) * 12; // fixed scatter, so server and client match
        return <i key={i} style={{ ["--d" as string]: `${col * 26 + jitter}ms` }} />;
      })}
    </span>
  );
}

export function FlipLabel({ text }: { text: string }) {
  return (
    <span className="flip">
      <span className="flip__roll">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </span>
    </span>
  );
}
