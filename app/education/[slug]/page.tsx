import { notFound } from "next/navigation";

const posts = [
  {
    slug: "automation-playbook",
    title: "Automation Playbook: Connect LLMs to Your Stack",
    date: "2025-10-27",
    body: (
      <p>
        Combine LLMs with automation platforms (Zapier, Make, n8n) → trigger → context/RAG → model → postprocess → route.
      </p>
    ),
  },
  { slug: "evaluations", title: "Evaluations: How to Measure What Matters", date: "2025-10-27", body: <p>Start small with a rubric…</p> },
  { slug: "function-calling", title: "Function Calling & Tool Use", date: "2025-10-27", body: <p>Define schemas, validate IO…</p> },
];

export default function Page({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase opacity-60">Education</p>
      <h1 className="mt-1 text-3xl font-semibold">{post.title}</h1>
      <div className="mt-1 text-sm opacity-70">{post.date}</div>
      <article className="prose mt-6">{post.body}</article>
    </main>
  );
}
