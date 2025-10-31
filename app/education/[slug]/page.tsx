import { notFound } from "next/navigation";

const educationPosts = [
  {
    slug: "automation-playbook",
    title: "Automation Playbook: Connect LLMs to Your Stack",
    date: "2025-10-27",
    content: (
      <>
        <p>
          Combine LLMs with automation platforms (Zapier, Make, n8n) to build real workflows.
          Pattern: trigger → enrich with context/RAG → call model → postprocess → route outputs.
        </p>
      </>
    ),
  },
  {
    slug: "evaluations",
    title: "Evaluations: How to Measure What Matters",
    date: "2025-10-27",
    content: <p>Start with a small rubric; focus on correctness, clarity, safety.</p>,
  },
  {
    slug: "function-calling",
    title: "Function Calling & Tool Use: Reliable Integrations",
    date: "2025-10-27",
    content: <p>Define clear schemas, handle errors, validate tool IO.</p>,
  },
];

export default function Page({ params }: { params: { slug: string } }) {
  const post = educationPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase opacity-60">Education</p>
      <h1 className="mt-1 text-3xl font-semibold">{post.title}</h1>
      <div className="mt-1 text-sm opacity-70">{post.date}</div>
      <article className="prose mt-6">{post.content}</article>
    </main>
  );
}
