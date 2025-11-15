// lib/tagging-llm.ts
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Feinschliff für Category/Tags/Keywords via LLM (Chat API + JSON-Output)
 */
export async function refineTags({
  title,
  text,
}: {
  title: string;
  text: string;
}): Promise<null | { category: string; tags: string[]; keywords: string[] }> {
  const system =
    "You are a concise AI news classifier. Always respond with STRICT JSON only (no prose).";
  const user = `
Title: ${title}

Excerpt (truncated to 6k chars):
${text.slice(0, 6000)}

Allowed categories:
- CURRENT_NEWS
- NEW_TOOLS
- MODEL_INFRA_UPDATES
- POLICY_SAFETY
- RESEARCH
- BUSINESS_MARKET

Return JSON EXACTLY:
{
  "category": "ONE_OF_ALLOWED",
  "tags": ["short", "topic-tags"],
  "keywords": ["5-12", "lowercase", "keywords"]
}
`.trim();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // oder 'gpt-4.1-mini' wenn verfügbar
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    // Chat-API unterstützt json_object (nicht Schema)
    response_format: { type: "json_object" as const },
    temperature: 0.1,
    max_tokens: 300,
  });

  const raw = completion.choices[0]?.message?.content ?? "";
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
