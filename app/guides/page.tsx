// app/guides/page.tsx  ← komplette Datei ersetzen
import Link from "next/link";
import guides from "../../data/guides.json";

type Guide = {
  slug?: string;
  title: string;
  summary: string;
  date: string;
  url?: string;
};

const norm = (s: string) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export const metadata = {
  title: "Guides – AI Mastery Lab",
  description: "Deep-dive guides on core AI concepts and workflows.",
};

export default function GuidesIndex() {
  const list = (guides as Guide[]).map((g) => ({
    ...g,
    _slug: g.slug ? norm(g.slug) : norm(g.title), // immer ein sauberer slug
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Guides</h1>
      <p className="text-gray-600 mb-4">
        Deep-dive guides on core AI concepts and workflows.
      </p>

      <ul className="grid gap-6 md:grid-cols-2">
        {list.map((g) => (
          <li key={g._slug} className="border rounded-xl p-4">
            <div className="text-xs uppercase text-gray-500">Guide</div>
            <Link
              className="font-semibold hover:underline"
              href={`/guides/${g._slug}`} // ← HIER: interner Link auf /guides/<slug>
            >
              {g.title}
            </Link>
            <p className="text-sm text-gray-600 mt-2">{g.summary}</p>
            <div className="text-xs text-gray-500 mt-3">{g.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
