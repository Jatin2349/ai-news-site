// app/glossary/page.tsx  (Server Component)
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseGlossaryMD, type GlossaryEntry } from "../../lib/glossary-md";
import GlossaryClient from "../../components/GlossaryClient";

export const metadata = {
  title: "Glossary – AI Mastery Lab",
  description: "A–Z glossary of AI terms.",
};

export default async function GlossaryPage() {
  const file = await readFile(path.join(process.cwd(), "data", "glossary.md"), "utf8");
  const entries: GlossaryEntry[] = parseGlossaryMD(file);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">Glossary</h1>
      <p className="text-gray-600 mb-6">
        Quick, practical definitions you’ll reference often.
      </p>

      {/* Client-Komponente mit Suche + Sticky A–Z */}
      <GlossaryClient entries={entries} />
    </main>
  );
}
