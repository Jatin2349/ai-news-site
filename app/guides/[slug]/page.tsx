import { redirect, notFound } from "next/navigation";
import news from "../../../data/news.json";

const normalize = (s: string) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export default function GuidePage({ params }: { params: { slug: string } }) {
  const req = normalize(params.slug);

  // Wenn dieser Slug in den Daten als EDUCATION existiert → redirect
  const asEducation = (news as any[]).some((n) => {
    const cat = String(n.category || "").toLowerCase();
    const slug = n.slug ? normalize(n.slug) : normalize(n.title);
    return cat === "education" && slug === req;
  });
  if (asEducation) redirect(`/education/${req}`);

  // TODO: Hier später echte Guide-Logik
  return notFound();
}
