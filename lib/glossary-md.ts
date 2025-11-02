// lib/glossary-md.ts
export type GlossaryEntry = { term: string; definition: string };

/**
 * Erwartet ein Markdown mit Blöcken:
 * ### Term
 * Definition (Markdown)...
 */
export function parseGlossaryMD(md: string): GlossaryEntry[] {
  const lines = md.split(/\r?\n/);
  const entries: GlossaryEntry[] = [];

  let currentTerm: string | null = null;
  let buf: string[] = [];

  const flush = () => {
    if (currentTerm) {
      const definition = buf.join("\n").trim();
      entries.push({ term: currentTerm, definition });
    }
    currentTerm = null;
    buf = [];
  };

  for (const line of lines) {
    const m = /^###\s+(.+)$/.exec(line.trim());
    if (m) {
      flush();
      currentTerm = m[1].trim();
    } else {
      if (currentTerm) buf.push(line);
    }
  }
  flush();

  // sortiert A-Z
  entries.sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }));
  return entries;
}
