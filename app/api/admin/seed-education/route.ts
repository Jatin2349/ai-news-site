import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log("🎓 Starting Education Curriculum Seeding (9 Modules)...");

    // 1. Reset: Lösche alle alten Lektionen für einen sauberen Start
    await db.education.deleteMany({});

    const lessons = [
      {
        order: 1,
        title: "AI Fundamentals: The Prediction Engine",
        content: `
# Beyond the Hype: Understanding the Machine

To master AI, you must first stop seeing it as magic. It is math. Specifically, it is statistical probability applied to language on a massive scale.

In this first module, we will deconstruct the Large Language Model (LLM) to understand its capabilities, its limits, and why it behaves the way it does.

## The Core Mechanism: Next-Token Prediction

At its heart, GPT-4 (and every other LLM) has one single job: **Predict the next word.**

It has been trained on petabytes of text—books, websites, code repositories—to learn the statistical patterns of human language.
If you input: *"The quick brown fox jumps over the..."*
The model calculates the probability of every word in its vocabulary appearing next.
* **Dog:** 95% probability
* **Cat:** 2% probability
* **Fence:** 1% probability
* **Galaxy:** 0.00001% probability

It selects "Dog" (usually). This simple mechanism, scaled up to trillions of parameters, results in behavior that *looks* like reasoning, but is actually pattern matching.

### Why does this matter?
Understanding this explains why AI makes mistakes. It doesn't "know" facts. It knows *which words likely follow other words*.
If you ask: *"Who was the CEO of Apple in 1850?"*, the model might invent a name. Why? Because the pattern of your question looks like a biography question, and in biography texts, a name usually follows "CEO of". The model prioritizes **fluency** over **factuality**.

## Tokens: The Atoms of Language

AI does not read words like humans do. It reads **Tokens**.
A token is a chunk of characters.
* Common words like "apple" are single tokens.
* Complex words like "implementation" might be split: "implement" + "ation".
* Code is often split into many tokens.

**Key Concepts:**
1.  **Cost:** You are billed per million tokens (input + output).
2.  **Context Window:** Models have a limited "short-term memory". GPT-4o has a 128k token window. If your conversation exceeds this, the model "forgets" the beginning of the chat.
3.  **Math Blindness:** LLMs are notoriously bad at simple tasks like "spell the word 'Lollipop' backwards". Why? Because to the model, "Lollipop" is a single token ID (e.g., #4592). It doesn't "see" the individual letters L-o-l-l-i-p-o-p.

## The Temperature Parameter

When you use an API (or even ChatGPT settings), you can control the **Temperature** (usually 0.0 to 1.0).
* **0.0 (Deterministic):** The model always picks the most likely next word. Use this for coding, data extraction, and factual answers.
* **1.0 (Creative):** The model sometimes picks less likely words. This creates "creativity" but increases the risk of hallucinations.

**Your First Assignment:**
Go to ChatGPT. Ask it a question with "Temperature 0" (simulated by saying "Be extremely factual and concise"). Then ask the same question with "Be extremely creative and random". Observe the difference.
        `
      },
      {
        order: 2,
        title: "Prompt Engineering: The Art of Instruction",
        content: `
# Programming with English

Prompt Engineering is not just "asking nicely". It is a form of coding where the syntax is natural language. Just like in Python or JavaScript, the way you structure your input drastically changes the output.

If you get a bad answer from an AI, it is almost always a bad prompt.

## The Golden Rule: Specificity

Ambiguity is the enemy of AI.
* **Bad:** "Write a marketing email."
* **Good:** "Act as a Senior Marketing Manager for a B2B SaaS company. Write a cold email to a CTO. The goal is to schedule a 15-minute demo. Tone: Professional but conversational. Max length: 150 words. Do not use buzzwords."

## The Frameworks for Success

### 1. Chain of Thought (CoT)
This is the single most powerful technique for logic and math.
**The Prompt:** *"Solve this math problem. Let's think step by step."*

By forcing the model to generate the intermediate steps ("First, I calculate X... Then, I subtract Y..."), you allow the model to "ground" itself. It reduces logic errors by up to 50%.

### 2. Few-Shot Prompting
Don't just tell; show. Give the model examples of what you want (these examples are called "shots").

**Prompt:**
*"Convert these movie titles into emojis.*
*Star Wars -> ⭐️⚔️*
*The Matrix -> 🕶️💊*
*Titanic -> 🚢🧊*
*Harry Potter -> ?"*

The model will almost certainly answer "⚡️🧙‍♂️" because it sees the pattern. This is often more effective than writing a paragraph of instructions.

### 3. Role Prompting (Personas)
Assigning a persona helps the model narrow down its search space.
*"You are a skeptical senior engineer."* vs. *"You are an enthusiastic junior developer."*
The first will give you a critique; the second will give you encouragement.

## Common Pitfalls to Avoid

* **Negative Constraints:** Don't tell the AI what *not* to do (e.g., "Don't be long"). It's hard for models to process negatives. Instead, say what *to* do (e.g., "Keep it under 50 words").
* **Vague Adjectives:** "Make it funny" is subjective. "Write it in the style of Jerry Seinfeld" is specific.

**Summary:** Treat the AI like a brilliant intern who knows everything but has zero common sense. You must be explicit.
        `
      },
      {
        order: 3,
        title: "RAG Architecture: Giving AI a Brain",
        content: `
# The Knowledge Gap

We learned in Module 1 that LLMs are reasoning engines, not databases. They don't know your private data, your emails, or news that happened today (unless they search the web).
**Retrieval-Augmented Generation (RAG)** is the architecture we use to fix this. It is the standard for 90% of enterprise AI apps.

## How RAG Works

Imagine taking a difficult history test.
* **Standard LLM:** Trying to pass the test from memory (Pre-training).
* **RAG:** Taking the test with an open textbook next to you.

### The 3-Step Process

1.  **Retrieve (The Search):**
    When a user asks *"What is our refund policy?"*, the system does NOT send this to the LLM yet.
    First, it searches your company's database for documents containing "refund policy". It finds the relevant PDF page.

2.  **Augment (The Context):**
    The system combines the user's question with the found data into a new, invisible prompt:
    > *"Context: [Paste content of PDF here]
    > User Question: What is our refund policy?
    > Answer the question using ONLY the context provided above."*

3.  **Generate (The Answer):**
    The LLM reads the context and summarizes the answer. It doesn't need to *know* the policy; it just needs to *read* and *report*.

## Why RAG Wins

* **Zero Hallucinations:** If the answer isn't in the context, the model says "I don't know", rather than inventing a lie.
* **Data Privacy:** You don't need to train a custom model (which is expensive and leaks data). Your data stays in your database and is only sent to the LLM temporarily for inference.
* **Real-Time Updates:** If you change your refund policy today, the RAG system knows it instantly. A fine-tuned model would need to be re-trained (expensive).

## The Tech Stack for RAG
To build this, you need:
1.  **Ingestion:** A script to read your PDFs/Websites.
2.  **Embeddings:** Converting text to numbers (Module 4).
3.  **Vector DB:** Storing those numbers (Module 4).
4.  **LLM:** Generating the answer.
        `
      },
      {
        order: 4,
        title: "Embeddings & Vectors: The Mathematics of Meaning",
        content: `
# How Computers Read Meaning

To a computer, the word "King" is just a string of bytes: \`0x4B 0x69 0x6E 0x67\`. It has no relationship to "Queen" or "Royalty".
To solve this, AI uses **Embeddings**.

## What is a Vector?

An embedding is a long list of numbers (a vector) that represents the *semantic meaning* of a piece of text.
Imagine a 3D coordinate system (X, Y, Z).
* "Apple" might be at [10, 5, 2].
* "Banana" might be at [9, 5, 3].
* "Car" might be at [0, 80, -5].

Because "Apple" and "Banana" are both fruits, their numbers are very close together in this mathematical space. "Car" is far away.

Modern models use thousands of dimensions (not just 3) to capture nuance. They can capture that "Bank" means something different in "River Bank" vs. "Bank Account".

## Vector Databases

A standard SQL database (like Postgres) is great for exact matches.
* *Query:* \`SELECT * FROM users WHERE name = "John"\`

But it's terrible for "meaning". You can't ask SQL: *"Find me all comments that represent anger."*

A **Vector Database** (like Pinecone, Weaviate, or pgvector) stores these number lists. It allows you to perform **Semantic Search**.
* *User Query:* "My internet is broken."
* *Database:* Finds documents about "WiFi outage", "Router reset", "No connection".

It finds these even though the user didn't use the word "WiFi". It understood the *intent* because the vectors for "internet broken" and "WiFi outage" are mathematically close.

This technology is the backbone of RAG and recommendation systems (like Netflix suggesting movies).
        `
      },
      {
        order: 5,
        title: "AI Agents: From Chatbots to Autonomous Workers",
        content: `
# The Shift to Agency

A chatbot (like ChatGPT) is passive. It waits for you to type, and then it replies. It is a brain in a jar.
An **Agent** is active. It has hands. It can browse the web, send emails, run code, and click buttons.

## The Architecture of an Agent

An agent consists of three parts:
1.  **The Brain (LLM):** The reasoning engine that makes plans.
2.  **The Memory:** A log of what it has done so far.
3.  **The Tools:** Functions it can execute.

## The ReAct Loop (Reason + Act)

When you give an agent a task like *"Find the cheapest flight to London and email me"*, it enters a loop:

1.  **Thought:** "I need to find flight prices first. I should use the Google Flights tool."
2.  **Action:** \`Execute Tool: GoogleFlights(to="London")\`
3.  **Observation:** (The tool returns a list of 5 flights). "Okay, the cheapest is $400."
4.  **Thought:** "Now I have the info. I need to email the user."
5.  **Action:** \`Execute Tool: SendEmail(body="Cheapest flight is $400")\`
6.  **Observation:** "Email sent successfully."
7.  **Final Answer:** "I have sent you the flight details."

## Why Agents are Hard

Agents are powerful but fragile.
* **Loops:** Sometimes an agent gets stuck repeating the same error forever.
* **Cost:** Agents consume many tokens because they "think" in loops.
* **Safety:** Giving an AI permission to send emails or delete files requires strict guardrails.

Despite this, Agents are the future of software. We are moving from software where humans click buttons to software where humans state goals, and agents click the buttons.
        `
      },
      {
        order: 6,
        title: "Fine-Tuning: Customizing the Model's Brain",
        content: `
# Teaching New Behavior

We discussed RAG (Module 3) as a way to give the model new *knowledge*.
**Fine-Tuning** is how we give the model new *behavior* or *skills*.

## What is Fine-Tuning?

Fine-tuning involves taking a pre-trained model (like GPT-4) and training it a little bit more on a smaller, specific dataset.

Imagine a general practitioner doctor (Base Model).
* **RAG:** Giving the doctor a medical textbook to look up rare diseases.
* **Fine-Tuning:** Sending the doctor to a 4-year specialization school to become a Neurosurgeon.

## When to Fine-Tune

You should Fine-Tune when:
1.  **Style/Tone:** You want the AI to sound *exactly* like your brand voice, or like a pirate, or use specific legal jargon.
2.  **Format:** You need the AI to output a very complex JSON structure reliably, and prompting isn't working perfectly.
3.  **Efficiency:** A fine-tuned small model (like Llama-8B) can often outperform a generic large model (GPT-4) on a specific task, while being faster and cheaper.

## The Data Requirement

Fine-tuning requires **high-quality data**. You need hundreds or thousands of "perfect examples" (Input -> Desired Output pairs).
If your training data is bad, the model will become worse ("Catastrophic Forgetting").

**Rule of Thumb:** Always start with Prompt Engineering and RAG. Only Fine-Tune if those fail to reach your quality bar.
        `
      },
      {
        order: 7,
        title: "Local AI: Owning the Intelligence",
        content: `
# Breaking Free from the Cloud

Using OpenAI or Anthropic is great, but you are renting intelligence. You send your data to their servers, and you pay rent (API fees).
**Local AI** means running the model on your own hardware (Laptop or On-Premise Server).

## The Open Source Explosion

Meta (Facebook) changed the world by releasing **Llama**. It proved that open-source models could rival proprietary ones. Now we have:
* **Llama 3:** The industry standard open model.
* **Mistral:** Highly efficient European models.
* **Phi (Microsoft):** Tiny models that run on phones.

## How to Run Locally (Ollama)

The easiest way to start is **Ollama**.
1.  Download Ollama from ollama.com.
2.  Open your terminal.
3.  Run \`ollama run llama3\`.
4.  You now have a ChatGPT-like experience running offline on your Mac or PC.

## Why run locally?
1.  **Privacy:** No data ever leaves your device. Perfect for legal, medical, or proprietary code.
2.  **Cost:** It's free. No token costs.
3.  **Latency:** No network lag.
4.  **No Censorship:** Uncensored models exist for research purposes.

## The Trade-off
Hardware. To run a smart model, you need RAM and a GPU.
* 8GB RAM: Runs basic models (okay for summarization).
* 16GB+ RAM: Runs Llama-3-8B (Good reasoning).
* 64GB+ RAM: Runs Llama-3-70B (GPT-4 class intelligence).

Local AI is essential for the future of privacy-focused applications.
        `
      },
      {
        order: 8,
        title: "Multimodality: Vision, Audio, and Beyond",
        content: `
# AI Senses

For decades, AI was text-only. It was blind and deaf.
**Multimodality** is the ability of a model to natively understand and generate Text, Images, Audio, and Video.

## Vision (GPT-4o, Claude 3.5)

Modern models can "see". They don't just use OCR (reading text); they understand context.
* You can upload a photo of your fridge contents and ask for recipes.
* You can screenshot a UI design and ask for the React code (V0.dev does this).
* You can upload a chart and ask for analysis.

## Audio and Voice

OpenAI's latest updates allow for real-time speech-to-speech. The model detects tone of voice (sarcasm, sadness) and can respond with emotion. This enables true voice assistants, not just "Siri 2.0".

## Generation (Diffusion & Transformers)

* **Images:** Midjourney and DALL-E 3 create art from text.
* **Video:** Sora and Runway create video from text.

## The Future: Omni-Models

We are moving towards "Omni-models" that accept any input and produce any output. This opens up massive use cases in robotics (seeing the world), customer support (hearing the voice), and creative industries.
        `
      },
      {
        order: 9,
        title: "The AI Engineering Stack: Tools of the Trade",
        content: `
# Building the Future

If you want to build AI applications, knowing Python isn't enough anymore. A new ecosystem of tools has emerged. Here is your roadmap to becoming an AI Engineer.

## 1. The Model Layer (The Brain)
You need access to models.
* **Proprietary:** OpenAI API, Anthropic API.
* **Open Source:** Hugging Face, Replicate, Ollama.

## 2. The Orchestration Layer (The Glue)
Connecting models to data and tools requires logic.
* **Vercel AI SDK:** The best way to build AI chat interfaces in Next.js. Handles streaming text effortlessly.
* **LangChain:** A massive framework for building complex chains. Good for Python backends.

## 3. The Data Layer (The Memory)
* **Vector Databases:** Pinecone, Supabase (pgvector), Weaviate. This is where you store data for RAG.
* **Unstructured Data:** Tools to parse PDFs and websites (like the one we built for this news site!).

## 4. Observability (The Analytics)
AI is non-deterministic. You need to track what's happening.
* **LangSmith / Helicone:** These tools log every prompt, response, latency, and cost. Essential for debugging.

## How to Start?

Don't get overwhelmed. Start simple:
1.  Build a simple chatbot using **Next.js** and the **Vercel AI SDK**.
2.  Add **RAG** by connecting it to a **Pinecone** database.
3.  Add **Tools** (like weather search) to make it an Agent.

The stack is evolving fast, but the core concepts (Model, Context, Memory) remain the same.
        `
      }
    ];

    // Erstellen
    for (const lesson of lessons) {
      await db.education.create({
        data: lesson,
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully DELETED old lessons and seeded ${lessons.length} comprehensive modules.` 
    });

  } catch (error: any) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}