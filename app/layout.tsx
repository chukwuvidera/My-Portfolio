import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/hanken-grotesk/index.css";
import "./globals.css";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Lighting from "@/components/Lighting";

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

export const viewport: Viewport = { themeColor: "#f7f7f5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Marks the page as JS-enabled before paint, so scroll effects never hide content for no-JS visitors */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="guides" aria-hidden="true" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
        <Lighting />
      </body>
    </html>
  );
}
