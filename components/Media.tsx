import { site, type Img } from "@/content/site";

/**
 * Shows the image if `src` is set. Otherwise:
 * - covers get a designed placeholder (tint, grid, grain and the project title)
 * - other slots get a labelled placeholder, or nothing if placeholders are switched off
 */
export default function Media({ img, cover }: { img: Img; cover?: { title: string; meta: string } }) {
  const style = { aspectRatio: img.ratio ?? "16 / 10" };
  if (!img.src && !cover && !site.showImagePlaceholders) return null;
  return (
    <figure className="media" data-lit>
      {img.src ? (
        <img src={img.src} alt={img.label} loading="lazy" style={style} />
      ) : cover ? (
        <div className="media__placeholder cover" style={style} role="img" aria-label={img.label}>
          <span className="cover__meta">{cover.meta}</span>
          <span className="cover__title">{cover.title}</span>
        </div>
      ) : (
        <div className="media__placeholder" style={style} role="img" aria-label={img.label}>
          <span>{img.label}</span>
        </div>
      )}
      {img.caption && <figcaption>{img.caption}</figcaption>}
    </figure>
  );
}
