import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DATA_PATH = path.join(process.cwd(), "data", "news.json");
const BACKUP_PATH = path.join(process.cwd(), "data", `news.backup.${Date.now()}.json`);

const normalize = (s = "") =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

const ALLOWED = new Set(["news", "education", "guides"]);

try {
  const raw = await readFile(DATA_PATH, "utf8");
  const items = JSON.parse(raw);
  if (!Array.isArray(items)) throw new Error("data/news.json muss ein Array sein.");

  // Backup anlegen
  await copyFile(DATA_PATH, BACKUP_PATH);

  let changed = 0;

  const fixed = items.map((it) => {
    const out = { ...it };

    // Kategorie säubern
    let category = String(out.category || "").toLowerCase().trim();
    if (!ALLOWED.has(category)) {
      // nichts raten – unkannte Kategorien bleiben, werden aber nicht umgelinkt
      out.category = category;
      return out;
    }
    out.category = category;

    // Slug erzwingen (kebab-case)
    const slug = out.slug ? normalize(out.slug) : normalize(out.title || "");
    if (out.slug !== slug) {
      out.slug = slug;
      changed++;
    }

    // Interne URL (falls relativ) passend setzen
    const isInternal = typeof out.url === "string" && out.url.startsWith("/");
    if (isInternal || !out.url) {
      const expected =
        category === "news"
          ? `/news/${slug}`
          : category === "education"
          ? `/education/${slug}`
          : `/guides/${slug}`;

      if (out.url !== expected) {
        out.url = expected;
        changed++;
      }
    }

    // Spezieller Fix: Education darf nicht auf /guides/ zeigen
    if (category === "education" && typeof out.url === "string" && out.url.startsWith("/guides/")) {
      out.url = `/education/${slug}`;
      changed++;
    }

    return out;
  });

  if (changed > 0) {
    await writeFile(DATA_PATH, JSON.stringify(fixed, null, 2) + "\n", "utf8");
    console.log(`✅ Fix angewendet. ${changed} Feld(er) aktualisiert.\nBackup: ${BACKUP_PATH}`);
  } else {
    console.log("✅ Keine Änderungen nötig.");
  }
} catch (e) {
  console.error("❌ fix-data.mjs Fehler:", e.message);
  process.exit(1);
}
