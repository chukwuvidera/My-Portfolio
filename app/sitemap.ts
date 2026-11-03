import type { MetadataRoute } from "next";
import { site, projects } from "@/content/site";

export const dynamic = "force-static";

// Same address the page metadata uses: the production domain on Vercel
const base = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/about/`, priority: 0.8 },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}/`, priority: 0.9 })),
  ];
}
