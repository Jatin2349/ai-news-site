# AI Agents & Automation — Thinking in Systems
*From “chat” to reliable workflows: plan, tool, guardrail, monitor.*

> **Thesis:** Agents aren’t magic. They are loops that plan, call tools, evaluate results, and repeat until a goal is met. Start small, measure outcomes, and scale only the stable parts.

---

## 1) What is an agent, really?
An **agent** is a controller that:
1) interprets a goal,  
2) plans a step,  
3) calls a tool (function/API),  
4) evaluates the result, and  
5) decides the next step—until “done.”

Add **memory** (short/long term), **policies** (what’s allowed), and **monitors** (for safety/cost), and you have a production‑ready agent.

Agents are useful when steps are clear, tools are narrow, and success can be **verified**.

---

## 2) When to use agents vs. simple pipelines
- **Use a simple pipeline** when steps never change: e.g., “paste text → summarize → send email.” It’s faster and cheaper.
- **Use an agent** when the path is conditional: e.g., “if calendar is full, propose 3 alternates; else schedule; if invite fails, alert human.”

**Rule:** Start with a pipeline. Promote to an agent only if conditions and branching justify the overhead.

---

## 3) Basic architecture (one agent, one tool)
- **Planner:** converts the goal into an action.
- **Tool:** typed function with input/output validation.
- **Judge:** checks the tool result against success criteria.
- **Memory:** keeps context across steps.
- **Policy:** what the agent may/may not do.

This minimal design is enough to deliver real value (e.g., “create a calendar event” reliably).

---

## 4) Typed tools: the backbone of reliability
Define tools with **clear schemas**. Avoid “string in, string out” where possible.

**Example (pseudo‑types):**
```
create_event(title: string, start_iso: string, end_iso: string, attendees: [email], location?: string) -> {event_id: string}
```

**Guardrails:**
- Validate inputs (dates in the future, non‑empty title).
- Confirm side‑effects (read‑after‑write: fetch event by id).
- Rate‑limit and retry with backoff.

Typed tools reduce hallucinations because the agent must **fill a shape** before acting.

---

## 5) Planning patterns (without overfitting)
Avoid grand plans. Favor **micro‑planning**:

```
Given the goal and tool inventory, propose the **next single action** and why.
If multiple actions are plausible, propose 2 options and choose one with rationale.
```

This keeps the loop flexible while preventing run‑away wandering.

---

## 6) A supervisor loop (self‑check that actually works)
Before the agent accepts a step as “done,” run a short **judge**:

```
Check the latest result against the success criteria:
- Was the intended state change observed? (e.g., event exists with correct fields)
- Any policy or safety issues?
- Any missing confirmations or notifications?
If not “done,” propose the next action.
```

This reduces silent failures.

---

## 7) Small patterns to start with
1) **Single‑tool agent:** one narrow job (e.g., calendar insert). Make it 99% reliable.
2) **Two‑tool chain:** research → summarize; or fetch table → compute snapshot.
3) **Supervisor‑enhanced:** judge checks outputs; retries or asks for human help.

Ship each as a **feature**. Measure outcomes.

---

## 8) Risks and mitigations
- **Hallucinated actions:** Use typed tools; verify with read‑after‑write; never act on free‑text instructions alone.
- **Prompt‑injection:** Sanitize inputs; restrict tools per step; keep an allow‑list of domains.
- **Cost/latency runaway:** Bound loop steps; hard timeouts; monitor tokens and calls.
- **State drift:** Restate goals/constraints periodically; snapshot memory on key turns.
- **Security/PII:** redact inputs; sign tool calls; log access; apply least privilege.

---

## 9) Long‑form blueprints you can copy

### 9.1 Scheduling Agent (single‑tool, production‑ready)

```
System: You are a scheduling agent. You may only call create_event(). You must confirm success by reading the created id.

Inventory:
- Tool: create_event(title, start_iso, end_iso, attendees[], location?) -> {event_id}

Policy:
- Only schedule during business hours unless user explicitly approves otherwise.
- Never invite external domains without user confirmation.
- Do not create overlapping events for the same attendees.

Process:
1) Propose a draft event with fields (title, start, end, attendees, location). Ask clarifying questions if needed.
2) On approval, call create_event().
3) Verify success: fetch the event and confirm fields.
4) Return a confirmation message and a follow‑up prompt (e.g., draft the email invite).

Criteria:
- Time zone explicit in ISO.
- Title starts with a verb (e.g., “Review Q4 metrics”).
- Attendees deduplicated; location set or “VC link TBA”.
```

### 9.2 Research‑to‑Brief Agent (two tools + supervisor)

```
System: You are a research agent that writes a brief based on grounded sources.

Inventory:
- search_web(query) -> [{title, url, snippet}]
- fetch_article(url) -> {title, url, content}
(no other tools allowed)

Policy:
- Use only fetched content. No unsourced claims.
- Tag each claim with [1], [2], … referencing sources.
- If sources conflict, note the conflict and pick the conservative view.

Process:
1) Plan: propose 2–3 queries; choose one.
2) Call search_web(); pick 3 promising links.
3) Call fetch_article() on each; extract 5–7 key facts per article.
4) Draft a brief (TL;DR + 6 bullets + 3 risks) with citations.
5) Supervisor check: each claim has [n]? any speculation? too long?
6) Return the brief + bibliography.

Criteria:
- Factual, concise, auditable.
- No more than 450 words.
```

### 9.3 Table‑to‑Insight Agent (typed input/output)

```
System: You convert a pasted CSV into insights with a schema‑checked JSON result.

Inventory: none (no external tools)

Input: CSV columns = date, revenue, margin_pct, users
Output JSON schema:
{
  "highlights": ["string"],
  "risks": ["string"],
  "follow_ups": ["string"]
}

Policy:
- No external claims; if a column is missing, surface [MISSING].
- Keep numbers exact; show units.

Process:
1) Parse the CSV; validate columns.
2) Compute trends (QoQ/YoY where possible).
3) Return only valid JSON with highlights, risks, follow_ups (3–5 each).
4) Self‑check: valid JSON? units consistent?

Criteria:
- Precise, non‑promotional phrasing.
- Actionable follow‑ups tied to the data.
```

---

## 10) Monitoring and ops
- **Logging:** prompts, tool calls, inputs/outputs, errors, latencies, costs.
- **Metrics:** success rate per task, retries per step, human handoffs, budget usage.
- **Alerts:** thresholds for failures and timeouts.
- **Versioning:** pin model/tool versions; annotate releases; roll back on regressions.

Treat agents like software, not magic tricks.

---

## 11) A phased rollout plan
- **Phase 1:** Manual pipeline (no agent). Document the steps, measure time saved.
- **Phase 2:** Single‑tool agent for a narrow task. Ship to a small group.
- **Phase 3:** Add a supervisor check and one more tool. Watch cost/latency.
- **Phase 4:** Expand inventory carefully; add monitoring and guardrails.
- **Phase 5:** Integrate with your systems (queues, CRMs, calendars) once reliability is proven.

Each phase should have a **success metric** and a rollback plan.

---

## 12) Checklists (print these)

**Agent readiness**
- [ ] Clear success metric (“what counts as done”)
- [ ] Typed tools with validation
- [ ] Self‑check/supervisor step
- [ ] Timeouts and retry policy
- [ ] Logging + error alerts
- [ ] Human handoff path

**Security**
- [ ] PII redaction
- [ ] Tool allow‑list and least privilege
- [ ] Domain allow‑list for browsing
- [ ] Rate limits, quotas, budgets

**UX**
- [ ] Ask clarifying questions before acting
- [ ] Confirm high‑impact steps
- [ ] Return concise, structured summaries

---

## 13) Final take
Agents shine when they do **narrow jobs** with **typed tools**, **verifiable outcomes**, and **steady supervision**. Start tiny, keep receipts, and expand only what’s stable. The result isn’t “AI magic”—it’s a system you can trust.
