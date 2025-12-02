import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar"; // <--- Importieren

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
        
        {/* Die Navbar ist jetzt auf jeder Seite fixiert oben */}
        <Navbar />
        
        {/* pt-16 sorgt dafür, dass der Inhalt nicht unter der fixierten Navbar verschwindet */}
        <div className="pt-16">
          {children}
        </div>
        
      </body>
    </html>
  );
}