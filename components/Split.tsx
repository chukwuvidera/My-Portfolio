/**
 * Splits text into words (and optionally letters) for the motion effects in
 * globals.css. Screen readers get the plain text once; the split copy is hidden
 * from them.
 *
 * - every word gets --i (its index, offset by `start`) for staggering
 * - with `letters`, every letter gets --c for the hover ripple
 * - with `scatter`, every word gets --x / --y offsets for the "converge" effect
 */
export function wordCount(text: string) {
  return text.trim().split(/\s+/).length;
}

export default function Split({
  text,
  start = 0,
  letters = false,
  scatter = false,
}: {
  text: string;
  start?: number;
  letters?: boolean;
  scatter?: boolean;
}) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, k) => {
          const i = start + k;
          const style: Record<string, string | number> = { "--i": i };
          if (scatter) {
            // fixed pseudo-random offsets, so server and client render the same
            style["--x"] = `${(((i * 97) % 9) - 4) * 9}vw`;
            style["--y"] = `${(((i * 53) % 5) - 2) * 18}vh`;
          }
          return (
            <span key={k}>
              <span className="w" style={style}>
                <span className="w__in">
                  {letters
                    ? [...word].map((ch, c) => (
                        <span key={c} className="ch" style={{ ["--c" as string]: c }}>
                          {ch}
                        </span>
                      ))
                    : word}
                </span>
              </span>
              {k < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
    </>
  );
}
