import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log("🎓 Starting Education Curriculum Seeding...");

    // 1. Reset: Lösche alle alten Lektionen für einen sauberen Start
    await db.education.deleteMany({});

    const lessons = [
      {
        order: 1,
        title: "AI Fundamentals: How LLMs Actually Think",
        content: `
# Beyond the Magic Trick

To master AI, you first need to stop seeing it as magic. It is math. Specifically, it is statistical probability applied to language.

In this first module, we will deconstruct the Large Language Model (LLM) to understand its capabilities, its limits, and why it behaves the way it does.

## The Prediction Engine

At its core, GPT-4 is a **next-token prediction engine**. It has been trained on petabytes of text (books, websites, code) with one simple goal: *Given a sequence of words, predict what comes next.*

If you input: *"The quick brown fox jumps over the..."*
The model calculates the probability of every word in its vocabulary.
* **Dog:** 95%
* **Cat:** 2%
* **Fence:** 1%
* **Galaxy:** 0.00001%

It selects "Dog" (usually). This simple mechanism, scaled up to trillions of parameters, results in behavior that *looks* like reasoning.

## Tokens vs. Words

AI does not read words like humans. It reads **Tokens**.
A token is a chunk of characters.
* Common words like "apple" are single tokens.
* Complex words like "implementation" might be split: "implement" + "ation".
* Code is often split into many tokens.

**Why this matters:**
1.  **Cost:** You pay per million tokens.
2.  **Context Window:** Models have a limited memory. GPT-4o has a 128k token window. If your conversation exceeds this, the model "forgets" the beginning.
3.  **Math limitations:** LLMs are bad at math (e.g., spelling words backwards) because they don't see letters; they see token IDs.

## The Temperature Parameter

When you use an API, you can control the **Temperature** (0.0 to 1.0).
* **0.0 (Deterministic):** The model always picks the most likely next word. Use this for coding, data extraction, and factual answers.
* **1.0 (Creative):** The model sometimes picks less likely words. This creates "creativity" but increases the risk of hallucinations.

## Hallucinations: Feature or Bug?

A "hallucination" is when the model confidently states a fact that isn't true.
From the model's perspective, it isn't lying. It is just predicting a pattern. If you ask about a court case that doesn't exist, it might invent one because the *pattern* of a legal text usually includes citations.

**Key Takeaway:** LLMs are reasoning engines, not knowledge databases. Never trust them for facts without verification (or RAG, which we will cover in Module 3).
        `
      },
      {
        order: 2,
        title: "Prompt Engineering: Speaking Machine",
        content: `
# Programming with English

Prompt Engineering is not just "asking nicely". It is a form of coding where the syntax is natural language. Just like in Python or JavaScript, the way you structure your input drastically changes the output.

## The Golden Rule: Be Specific

Ambiguity is the enemy of AI.
* **Bad:** "Write a marketing email."
* **Good:** "Act as a Senior Marketing Manager for a B2B SaaS company. Write a cold email to a CTO. The goal is to schedule a demo. Tone: Professional but conversational. Max length: 150 words."

## Frameworks for Success

### 1. Chain of Thought (CoT)
For complex logical tasks, force the model to show its work.
**Prompt:** *"Solve this math problem. Let's think step by step."*
By generating the intermediate steps, the model grounds itself and reduces logic errors significantly.

### 2. Few-Shot Prompting
Don't just tell; show. Give the model examples of what you want.
**Prompt:**
*"Convert these movie titles into emojis.*
*Star Wars -> ⭐️⚔️*
*The Matrix -> 🕶️💊*
*Titanic -> 🚢🧊*
*Harry Potter -> ?"*

This is often more effective than writing a paragraph of instructions.

### 3. System Prompts
If you are building an app, use the **System Prompt** to define the AI's behavior globally.
*"You are a helpful coding assistant that only answers in JSON format."*
This ensures consistency across the entire conversation.

## Common Pitfalls to Avoid

* **Negative Constraints:** Don't tell the AI what *not* to do (e.g., "Don't be long"). It's hard for models to process negatives. Instead, say what *to* do (e.g., "Keep it under 50 words").
* **Vague Adjectives:** "Make it funny" is subjective. "Write it in the style of Jerry Seinfeld" is specific.

Mastering prompts is the highest ROI skill you can learn today. It bridges the gap between a mediocre output and a magical one.
        `
      },
      {
        order: 3,
        title: "RAG Architecture: Grounding AI in Reality",
        content: `
# The Knowledge Gap

We learned in Module 1 that LLMs are reasoning engines, not databases. They don't know your private data, your emails, or news that happened today.
**Retrieval-Augmented Generation (RAG)** is the architecture we use to fix this.

## How RAG Works

Imagine taking a test.
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
* **Data Privacy:** You don't need to train a model on your sensitive data. The data stays in your database and is only sent to the LLM temporarily for inference.
* **Real-Time Updates:** If you change your refund policy today, the RAG system knows it instantly. A fine-tuned model would need to be re-trained (expensive).

## Building a RAG Pipeline
To build this, you need:
1.  **Ingestion:** A script to read your PDFs/Websites.
2.  **Embeddings:** Converting text to numbers (Module 4).
3.  **Vector DB:** Storing those numbers (Module 4).
4.  **LLM:** Generating the answer.

This is the standard architecture for 90% of enterprise AI applications today.
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

Standard databases (SQL) search for exact matches.
* Query: "Shoes". Result: "Shoes".
* It won't find "Sneakers" or "Boots".

**Vector Databases** (like Pinecone, Weaviate, pgvector) search for *similarity*.
* User asks: *"I need something to run in."*
* The system converts this query into numbers.
* It looks for documents with similar numbers.
* It finds "Sneakers", "Running Shoes", and "Athletic Gear".

## Semantic Search

This capability—finding things based on *intent* rather than *keywords*—is called Semantic Search. It is the engine that powers RAG (Module 3). Without embeddings, AI would just be a fancy keyword search. With embeddings, it understands concepts.
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
        title: "7. Local AI: Privacy, Control, and No API Bills",
        order: 7,
        content: `
# Owning the Brain

Using OpenAI or Anthropic is great, but you are renting intelligence. You send your data to their servers, and you pay rent (API fees).
**Local AI** means running the model on your own hardware (Laptop or On-Premise Server).

## The Open Source Explosion

Meta (Facebook) changed the world by releasing **Llama**. It proved that open-source models could rival proprietary ones. Now we have:
* **Llama 3:** The industry standard open model.
* **Mistral:** Highly efficient European models.
* **Phi (Microsoft):** Tiny models that run on phones.

## How to Run Locally (Ollama)

The easiest way to start is **Ollama**.
1.  Download Ollama.
2.  Run \`ollama run llama3\`.
3.  You now have a ChatGPT-like experience running offline on your Mac or PC.

## Benefits
1.  **Privacy:** No data ever leaves your device. Perfect for legal, medical, or proprietary code.
2.  **Cost:** Free. No token costs.
3.  **Latency:** No network lag.

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

OpenAI's latest models handle audio natively. This allows for:
* **Emotion detection:** The AI hears if you are sad or angry.
* **Interruption:** You can talk over the AI, and it stops, just like a human conversation.
* **Latency:** Responses are near-instant (<300ms), enabling real-time translation.

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