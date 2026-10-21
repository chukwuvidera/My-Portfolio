import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/hanken-grotesk/index.css";
import "@fontsource-variable/geist-mono/index.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PointerEffects from "@/components/PointerEffects";
import Lighting from "@/components/Lighting";
import Motion from "@/components/Motion";
import Lightbox from "@/components/Lightbox";

export const metadata: Metadata = {
  // The Vercel address until victorchukwu.design is bought and connected
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url
  ),
  title: { default: `${site.name} — Product designer`, template: `%s — ${site.name}` },
  description: `${site.title} Fintech, crypto infrastructure and SaaS products used across Africa.`,
  openGraph: {
    title: `${site.name} — Product designer`,
    description: site.hero.intro,
    images: ["/images/victor-portrait.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#121311" },
  ],
};

// Runs before paint: marks JS as on (so scroll effects never hide content without it) and
// applies the saved theme, or the device setting on a first visit, so there's no flash.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="pointer-glow" aria-hidden="true" />
        <div className="guides" aria-hidden="true" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <PointerEffects />
        <Lighting />
        <Motion />
        <Lightbox />
      </body>
    </html>
  );
}
