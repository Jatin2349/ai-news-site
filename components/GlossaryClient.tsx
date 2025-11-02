// components/GlossaryClient.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import BackToTop from "./BackToTop";

export type GlossaryEntry = { term: string; definition: string };

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Props = { entries: GlossaryEntry[] };

export default function GlossaryClient({ entries }: Props) {
  const [q, setQ] = useState("");

  // gruppieren + filtern
  const grouped = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = needle
      ? entries.filter((e) => (e.term + " " + e.definition).toLowerCase().includes(needle))
      : entries;

    const map: Record<string, GlossaryEntry[]> = {};
    for (const e of filtered) {
      const first = (e.term[0] || "#").toUpperCase();
      const key = LETTERS.includes(first) ? first : "#";
      if (!map[key]) map[key] = [];
      map[key].push(e);
    }
    const order = [...LETTERS, "#"];
    return order.map((k) => ({ letter: k, items: map[k] || [] }));
  }, [entries, q]);

  // disabled info pro Buchstabe
  const hasForLetter: Record<string, boolean> = useMemo(() => {
    const m: Record<string, boolean> = {};
    for (const g of grouped) m[g.letter] = g.items.length > 0;
    return m;
  }, [grouped]);

  // Jump-Refs
  const anchors = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <div className="mx-auto max-w-5xl">
      {/* Suche oben */}
      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms…"
          className="w-full md:w-2/3 border rounded-md px-3 py-2"
        />
      </div>

      {/* A–Z Leiste oben */}
      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        {LETTERS.map((L) => {
          const enabled = hasForLetter[L];
          return (
            <button
              key={L}
              className={`px-2 py-1 rounded border ${
                enabled ? "hover:bg-gray-50" : "opacity-40 cursor-not-allowed"
              }`}
              disabled={!enabled}
              onClick={() => {
                if (!enabled) return;
                const el = anchors.current[L];
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {L}
            </button>
          );
        })}
      </div>

      {/* Inhalt */}
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

            {items.length === 0 ? (
              <p className="text-sm text-gray-500">No entries.</p>
            ) : (
              <dl className="divide-y">
                {items.map((e) => (
                  <div key={e.term} className="py-3">
                    <dt className="font-semibold">{e.term}</dt>
                    <dd className="prose max-w-none">
                      <ReactMarkdown>{e.definition}</ReactMarkdown>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        ))}

        {grouped.every((g) => g.items.length === 0) && (
          <p className="mt-6 text-sm text-gray-500">No matches. Try a different keyword.</p>
        )}
      </section>

      {/* Back to top */}
      <BackToTop />
    </div>
  );
}
