// lib/llm.ts
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Dynamische Zusammenfassung + Keypoints (Chat API + JSON-Output)
 */
export async function summarizeDynamic({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}): Promise<{ summary: string; keypoints: string[]; words: number }> {
  const words = text.trim().split(/\s+/).length;
  const target =
    words < 400 ? "80-140 words" : words < 1200 ? "150-280 words" : "250-450 words";

  const system =
    "You summarize AI news for practitioners. Output STRICT JSON only (no markdown, no prose). Be precise, neutral, non-hype.";
  const user = `
Title: ${title}
Source: ${url}

Write a ${target} neutral summary tailored to article length.
Add 3-6 bullet keypoints with concrete facts/dates if present.
Only use information in the provided text. Return JSON exactly:
{
  "summary": "...",
  "keypoints": ["...", "...", "..."]
}

Text:
${text.slice(0, 9000)}
`.trim();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // oder 'gpt-4.1-mini'
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    response_format: { type: "json_object" as const },
    temperature: 0.2,
    max_tokens: 700,
  });

  const raw = completion.choices[0]?.message?.content ?? "";

  let parsed: { summary: string; keypoints: string[] } = {
    summary: "Summary unavailable.",
    keypoints: ["Key points unavailable."],
  };

  try {
    if (raw) parsed = JSON.parse(raw);
  } catch {
    // bleibt beim Fallback
  }

  return { ...parsed, words };
}
