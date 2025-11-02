// components/GlossaryClient.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export type GlossaryEntry = { term: string; definition: string };

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Props = { entries: GlossaryEntry[] };

export default function GlossaryClient({ entries }: Props) {
  const [q, setQ] = useState("");

  const grouped = useMemo(() => {
    // filtern nach Suchbegriff
    const needle = q.trim().toLowerCase();
    const filtered = needle
      ? entries.filter(
          (e) =>
            (e.term + " " + e.definition).toLowerCase().includes(needle)
        )
      : entries;

    // gruppieren A-Z
    const map: Record<string, GlossaryEntry[]> = {};
    for (const e of filtered) {
      const first = (e.term[0] || "#").toUpperCase();
      const key = LETTERS.includes(first) ? first : "#";
      if (!map[key]) map[key] = [];
      map[key].push(e);
    }
    // sortierte Gruppen
    const order = [...LETTERS, "#"];
    return order.map((k) => ({ letter: k, items: map[k] || [] }));
  }, [entries, q]);

  // Refs pro Buchstabe zum Scrollen
  const anchors = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <div className="grid grid-cols-1 md:grid-cols-[160px,1fr] gap-6">
      {/* Sticky A–Z Sidebar */}
      <aside className="md:sticky md:top-20 md:self-start">
        <div className="hidden md:block text-sm">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms…"
            className="w-full mb-3 border rounded-md px-3 py-2"
          />
          <div className="grid grid-cols-2 gap-1">
            {LETTERS.map((L) => (
              <button
                key={L}
                className="px-2 py-1 rounded border hover:bg-gray-50"
                onClick={() => {
                  const el = anchors.current[L];
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {L}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: Suche oben, Alphabet als horizontale Liste */}
        <div className="md:hidden">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms…"
            className="w-full mb-3 border rounded-md px-3 py-2"
          />
          <div className="flex flex-wrap gap-1">
            {LETTERS.map((L) => (
              <button
                key={L}
                className="px-2 py-1 rounded border text-sm"
                onClick={() => {
                  const el = anchors.current[L];
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {L}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Content */}
      <section>
        {grouped.map(({ letter, items }) => (
          <div key={letter} className="mb-8">
            <div
              ref={(el) => {
                anchors.current[letter] = el;
              }}
              className="mb-3 border-b pb-1"
            >
              <h2 className="text-lg font-semibold">{letter}</h2>
            </div>

            <dl className="divide-y">
              {items.length === 0 ? (
                <p className="text-sm text-gray-500">No entries.</p>
              ) : (
                items.map((e) => (
                  <div key={e.term} className="py-3">
                    <dt className="font-semibold">{e.term}</dt>
                    <dd className="prose max-w-none">
                      <ReactMarkdown>{e.definition}</ReactMarkdown>
                    </dd>
                  </div>
                ))
              )}
            </dl>
          </div>
        ))}

        {/* Keine Treffer */}
        {grouped.every((g) => g.items.length === 0) && (
          <p className="mt-6 text-sm text-gray-500">No matches. Try a different keyword.</p>
        )}
      </section>
    </div>
  );
}
