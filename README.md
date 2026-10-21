# Victor Chukwu — Portfolio

Product design portfolio built with Next.js (static export), deployed on Vercel.

## Editing content

All text, links, testimonials, case studies and image paths live in **`content/site.ts`**.
You rarely need to touch anything else.

- **Add a project image:** put the file in `public/images/work/<project-slug>/` and set the
  matching `src` in `content/site.ts` (e.g. `src: "/images/work/flitaa/onboarding.png"`).
  Until `src` is set, the site shows a labelled placeholder.
- **Add the CV:** put the PDF in `public/` and set `cv: "/victor-chukwu-cv.pdf"`.
  The download button appears automatically, and the "Resume" menu item opens the PDF
  (until then it opens LinkedIn).
- **Reorder case studies:** reorder the `projects` array.
- **Hide empty image slots:** set `showImagePlaceholders: false` in `content/site.ts`. Case study
  covers keep their designed placeholder (tint, grid, title) until a cover image is set.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in /out
```

## Structure

- `app/page.tsx` — home (hero, work)
- `app/about/page.tsx` — about (portraits, story, experience, testimonials, contact)
- `app/work/[slug]/page.tsx` — case study template
- `components/` — header (ruled nav cells, theme toggle), footer, contact block, button (pixel-fill hover), pointer effects (brown glow, magnetic buttons), scroll "lighting", media/placeholder
- `app/globals.css` — design tokens (light and dark) and all styles
- `public/images/` — portraits, original signature PNG, project images
- `public/brand/` — vectorised signature logo in charcoal, burnt orange and white (SVG)

## Deploying

Import the GitHub repo in Vercel (framework: Next.js, no settings needed).
Every push to `main` redeploys.
