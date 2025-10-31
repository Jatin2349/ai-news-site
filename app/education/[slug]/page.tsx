import news from "../../../data/news.json";
import { notFound } from "next/navigation";

const normalize = (s: string) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export default function EducationDetail({ params }: { params: { slug: string } }) {
  const slug = normalize(params.slug);

  // Finde den Education-Post aus den JSON-Daten
  const post = (news as any[]).find((n) => {
    const isEdu = String(n.category || "").toLowerCase() === "education";
    const s = n.slug ? normalize(n.slug) : normalize(n.title);
    return isEdu && s === slug;
  });

  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase opacity-60">Education</p>
      <h1 className="mt-1 text-3xl font-semibold">{post.title}</h1>
      <div className="mt-1 text-sm opacity-70">{post.date}</div>

      {/* Inhalt: wir zeigen mindestens die Summary */}
      <article className="prose mt-6">
        <p>{post.summary}</p>
        {/* Falls du später ein Feld `content` in der JSON hast, kannst du es hier rendern */}
        {/* {post.content && <div dangerouslySetInnerHTML={{ __html: post.content }} />} */}
      </article>
    </main>
  );
}
