import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer"; // <--- Importieren

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Mastery Lab",
  description: "Master AI. Build leverage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0B0F] text-zinc-100 antialiased`}>
        
        {/* Navbar immer oben */}
        <Navbar />
        
        {/* Hauptinhalt der Seite */}
        <div className="pt-16 min-h-screen">
          {children}
        </div>

        {/* Footer immer unten */}
        <Footer />
        
      </body>
    </html>
  );
}