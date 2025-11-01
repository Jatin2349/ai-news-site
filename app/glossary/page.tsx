// app/glossary/page.tsx  ← komplette Datei ersetzen
import { readFile } from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";

export const metadata = {
  title: "Glossary – AI Mastery Lab",
  description: "A–Z glossary of AI terms.",
};

export default async function GlossaryPage() {
  const file = await readFile(path.join(process.cwd(), "data", "glossary.md"), "utf8");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Glossary</h1>
      <p className="text-gray-600 mb-4">Quick, practical definitions you’ll reference often.</p>

      <article className="prose max-w-none">
        <ReactMarkdown>{file}</ReactMarkdown>
      </article>
    </main>
  );
}
