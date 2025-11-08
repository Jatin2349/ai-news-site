// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SocialBar from "../components/SocialBar";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ai-news-site-alpha.vercel.app"),
  title: {
    default: "AI Mastery Lab — News & Guides",
    template: "%s | AI Mastery Lab",
  },
  description:
    "Daily AI news summaries, practical guides from beginner to advanced, and a concise A–Z glossary.",
  openGraph: {
    title: "AI Mastery Lab — News & Guides",
    description:
      "Curated AI news & education: quick summaries, deep-dive guides, and a concise glossary.",
    url: "/",
    siteName: "AI Mastery Lab",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Mastery Lab — News & Guides",
    description:
      "Curated AI news & education: quick summaries, deep-dive guides, and a concise glossary.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Dark default to match the new homepage; individual pages can override */}
      <body className="min-h-screen bg-[#0A0B0F] text-zinc-100 antialiased">
        <Nav />

        {/* WICHTIG: kein containerisierendes <main> hier!
            Die Seiten (z. B. Home) bringen ihr eigenes <main>/<section> + Layout mit. */}
        {children}

        <footer className="border-t border-white/10 mt-12 py-8 text-sm text-zinc-400">
          <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between gap-3">
            <div>© {new Date().getFullYear()} AI Mastery Lab</div>
            <nav className="flex gap-4">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy</a>
            </nav>
            <SocialBar />
          </div>
        </footer>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
