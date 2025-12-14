import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// HIER IST DAS UPDATE: Professionelle SEO-Basis
export const metadata: Metadata = {
  metadataBase: new URL('https://ai-news-site-alpha.vercel.app'), // Deine Vercel URL
  title: {
    default: "AI Mastery Lab - Master Artificial Intelligence",
    template: "%s | AI Mastery Lab", // Automatisch "Guide Titel | AI Mastery Lab"
  },
  description: "Your daily source for AI news, tools, and education. We filter the noise so you can build leverage.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-news-site-alpha.vercel.app',
    siteName: 'AI Mastery Lab',
    title: 'AI Mastery Lab - Master AI. Build Leverage.',
    description: 'Stop drowning in noise. Curated AI news, tools, and guides for engineers.',
    // images: ['/og-image.jpg'], // Das fügen wir später hinzu, wenn wir ein Bild haben
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Mastery Lab',
    description: 'Master AI. Build Leverage.',
    // images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0B0F] text-zinc-100 antialiased`}>
        <Navbar />
        <div className="pt-16 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}