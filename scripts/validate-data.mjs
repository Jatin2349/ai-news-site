import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DATA_PATH = path.join(process.cwd(), "data", "news.json");
const ALLOWED = new Set(["news", "education", "guides"]);

const normalize = (s = "") =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

const isISODate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);

function err(msg, i, item) {
  return `✗ [#${i}] ${msg}\n   -> title="${item?.title}"`;
}

try {
  const raw = await readFile(DATA_PATH, "utf8");
  const items = JSON.parse(raw);
  const errors = [];

  if (!Array.isArray(items)) {
    throw new Error("data/news.json muss ein Array sein.");
  }

  items.forEach((it, i) => {
    const title = it?.title;
    const category = String(it?.category || "").toLowerCase();
    const slug = it?.slug ? normalize(it.slug) : normalize(title);
    const url = String(it?.url || "");
    const date = it?.date;

    // Pflichtfelder
    if (!title) errors.push(err("title fehlt", i, it));
    if (!date || !isISODate(date)) errors.push(err("date fehlt/kein ISO-Format (YYYY-MM-DD)", i, it));
    if (!ALLOWED.has(category)) errors.push(err(`category muss eine von ${[...ALLOWED].join(", ")} sein`, i, it));

    // Slug-Form
    if (it?.slug && it.slug !== slug) {
      errors.push(err(`slug nicht kebab-case. Erwartet: "${slug}"`, i, it));
    }
    if (/_/.test(slug)) {
      errors.push(err(`slug enthält Unterstriche. Bitte durch "-" ersetzen: "${slug}"`, i, it));
    }

    // Interne Links: wenn url relativ ist, muss sie zum Typ passen
    const isInternal = url.startsWith("/");
    if (isInternal) {
      const expected =
        category === "news"
          ? `/news/${slug}`
          : category === "education"
          ? `/education/${slug}`
          : `/guides/${slug}`;

      if (url !== expected) {
        errors.push(err(`interne URL passt nicht zur Kategorie. Erwartet: "${expected}" (ist: "${url}")`, i, it));
      }
    }

    // Spezieller Check: Education darf NICHT auf /guides/... verlinken
    if (category === "education" && url.startsWith("/guides/")) {
      errors.push(err(`Education-Item verlinkt fälschlich auf Guides: "${url}"`, i, it));
    }
  });

  if (errors.length) {
    console.error("\n❌ Datenprüfung fehlgeschlagen:\n" + errors.join("\n") + "\n");
    process.exit(1);
  } else {
    console.log("✅ data/news.json ist valide.");
  }
} catch (e) {
  console.error("❌ validate-data.mjs Fehler:", e.message);
  process.exit(1);
}
