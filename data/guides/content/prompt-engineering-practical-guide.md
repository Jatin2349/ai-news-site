# Prompt Engineering — A Practical Guide
*How to get consistently better results from LLMs with structure, iteration, and quality bars.*

> **Promise:** After this guide, you’ll own a **repeatable prompt system** that works across models, teammates, and use‑cases. No magic words. Just clear structure, tight constraints, and fast feedback loops.

---

## 1) First principles
- **Prompts are work instructions.** Describe the job, the audience, the format, and the criteria for “good.”
- **Structure beats cleverness.** Role → Goal → Context → Format → Length → Process → Criteria.
- **Short cycles win.** Outline → draft → refine → self‑check.

If a result is weak, don’t switch models first. **Tighten the prompt.**

---

## 2) The canonical scaffold (use everywhere)
This is your default. Paste it, fill in brackets, and run.

```
Role: You are my [role] for [audience].
Goal: [clear deliverable + purpose].
Context: [facts, constraints, pasted excerpts/links].
Format: [bullets/markdown/table/JSON schema].
Length: [e.g., 200–300 words or 6 bullets].
Process: propose an outline; wait for approval; then write the draft; then self‑check.
Criteria: [truthful; mark uncertainty; concise; no filler; respect constraints].
```

**Why it works:** It removes guesswork, forces steps, and bakes in quality.

**Pro tip:** Save this as a text snippet. Create variants for email, analysis, content, and code.

---

## 3) Make the model think before it talks
LLMs often jump to fluent text. Force planning first.

```
Process:
1) Propose an outline with 5–7 bullets. Ask 2–3 clarifying questions.
2) After approval, write the draft.
3) Self‑check against the criteria and return a revised version.
```

**Benefits:**
- You catch misalignment early.
- The model exposes assumptions.
- Drafts are tighter and easier to review.

---

## 4) Control the shape of outputs
You can pre‑shape answers into **tables** or **JSON** so downstream steps are easy.

**Table synthesis**
```
Format (markdown table):
| Feature | Vendor A | Vendor B | Gap | Note |
Populate only with facts from the pasted materials. If unknown, write [MISSING].
```

**JSON mode**
```
Return **only** valid JSON with fields:
{
  "summary": "string",
  "risks": ["string"],
  "next_steps": ["string"]
}
```

Typed outputs give you **repeatability** and enable validation.

---

## 5) Grounding for truth
When facts matter, provide them—or ask for citations.

**Light grounding**
- Paste the relevant paragraph or table rows.
- Forbid outside knowledge: “Use only the provided materials; mark unknowns as [MISSING].”
- Tag claims with `[DOC] [TABLE] [LINK]`.

**Self‑check for truth**
```
List 3 claims that could be wrong. For each, state how you would verify it.
```

---

## 6) Iteration patterns that raise quality
**Targeted feedback**
- “Keep A and C. Rewrite B for execs in 5 bullets.”
- “Give me a concise variant (120–150 words).”

**Variants on purpose**
- “Create 2 versions: one formal, one conversational.”

**Prompt improvement**
- “Improve my prompt for clarity and completeness; then wait for approval.”

**Rubric prompts**
```
Score the draft on:
- Clarity (0–5)
- Specificity (0–5)
- Factuality (0–5)
List 3 concrete edits to raise each weak score, then return a revised version.
```

---

## 7) Anti‑patterns (and fixes)
- **Vague asks.** *Fix:* add audience, goal, format, and length.
- **No steps.** *Fix:* outline → draft → refine with a self‑check.
- **Overstuffing.** *Fix:* prioritize constraints; drop the rest.
- **No grounding.** *Fix:* paste sources or demand citations.
- **Chasing models.** *Fix:* stabilize your prompt system first.

---

## 8) Long‑form recipes you can reuse (Business, Creator, Finance)

### 8.1 Business — Strategy Brief (with risks and recommendation)

```
Role: You are a strategy analyst writing for time‑poor executives.
Goal: Produce a one‑page brief on [topic] aligned to [company/team] goals.
Context:
- Audience: C‑level; prefers crisp trade‑offs and next steps.
- Materials (use only these excerpts; otherwise tag [MISSING]):
  - Internal policy: “…paste…”
  - KPI table (cost, latency, uptime, roadmap): [paste rows]
  - External links/excerpts: [paste]
Format:
- Title (one line)
- TL;DR (3 bullets, <50 words total)
- Situation (3 bullets)
- Analysis (5 bullets; each cites [POLICY]/[KPI]/[LINK]/[MISSING])
- Options (3), Risks (3), Recommendation (one short paragraph)
Length: 300–450 words total.
Process:
1) Outline + 2–3 clarifying questions.
2) Draft.
3) Self‑check (remove redundancy; verify each claim has a tag).
Criteria:
- Concise, factual, no hype.
- Surface tensions in data; prefer conservative interpretations.
- Zero fabrication of figures.
```

### 8.2 Creator — Multi‑Platform Pack (Carousel + Thread + Hooks)

```
Role: You are a content editor optimizing for saves and shares.
Goal: Create an Instagram carousel + matching X thread on [topic].
Context:
- Audience: [beginner/intermediate] creators.
- Constraint: value‑first; practical examples; avoid clickbait.
Format:
- Hooks: 5 options (<= 12 words each)
- Carousel: 8 slides (S1 hook; S2–S7 value; S8 CTA), <= 20 words/slide
- Thread: 7 tweets (T1 hook; T2–T6 value; T7 CTA), <= 240 chars each
- Summary: 5 bullets of “what to do now”
Process:
1) Propose hooks + outlines; wait for approval.
2) Write final carousel + thread + summary.
3) Self‑check readability (aim “easy”), remove jargon, offer 1 alternate S1/T1.
Criteria:
- Screenshot‑worthy; standalone value.
- Specific, not vague; numbers/examples when possible.
- Zero filler.
```

### 8.3 Finance — Table → Snapshot (with follow‑ups)

```
Role: You are a financial analyst generating a quick snapshot from a pasted table.
Goal: Turn the table into a 6‑bullet snapshot + a 3‑bullet risk view.
Context:
- Use only pasted rows; unknowns as [MISSING].
Format:
- Snapshot: revenue trend, margins, FCF, leverage, drivers, watch list (6 bullets)
- Risks: 3 bullets (likelihood × impact)
- Follow‑ups: 2 bullets (specific missing data)
Length: 180–220 words.
Process:
1) Outline: list metrics you’ll cover.
2) Draft snapshot + risks.
3) Self‑check: numbers consistent? units clear? gaps surfaced?
Criteria:
- No speculation; cite exactly what is known.
- Keep phrasing precise and non‑promotional.
```

---

## 9) A team‑ready prompt library (how to operationalize)
Create a shared doc or folder with your **canonical scaffold** and 10–15 recipes. For each recipe:

- **Name** (e.g., “Exec Brief v2”)  
- **When to use** (decision rules)  
- **Prompt text** (ready to paste)  
- **Example input/output** (tiny)  
- **Owner + last updated** (who improves it)

This turns prompts into **assets**, not folklore.

---

## 10) Measuring quality
- **Readability:** shorter sentences, concrete nouns, fewer hedges.
- **Factuality:** percent of claims with sources; number of [MISSING] surfaced.
- **Format compliance:** JSON/table validity; rubric score improvements.
- **Cycle time:** time from outline to approved final.

Track these over a week. Your system will visibly get better.

---

## 11) Troubleshooting quicksheet
- **Too generic?** Add audience + purpose + tone; demand an outline first; show a mini example.
- **Too long?** Set hard word limits; use bullets; ask to “remove redundancy.”
- **Wrong facts?** Provide sources; forbid outside knowledge; tag unknowns [MISSING].
- **Messy structure?** Specify headings and number of bullets; ask for tables/JSON.
- **Inconsistent style?** Reuse the scaffold and seed a style sample.

---

## 12) Final checklist
- [ ] Scaffold saved as a snippet
- [ ] 5–10 recipes for your common tasks
- [ ] Grounding template ready
- [ ] Rubric self‑check ready
- [ ] Weekly retro scheduled

Prompts aren’t incantations. They’re **systems**. Make yours clear, testable, and collaborative—and your outputs will stop being surprises and start being assets.
