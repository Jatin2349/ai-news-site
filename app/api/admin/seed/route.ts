import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Sicherheit: Nur im Development oder mit Secret ausführbar (optional)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log("🌱 Starting Database Seeding...");

    // 1. TOOLS (Wichtige Werkzeuge für AI Engineers & Power User)
    await db.tool.createMany({
      skipDuplicates: true,
      data: [
        // --- LLMs & Chat ---
        {
          name: "ChatGPT (OpenAI)",
          description: "The industry standard for conversational AI. Best for reasoning, coding, and general tasks via GPT-4o.",
          url: "https://chat.openai.com",
          category: "LLM",
          pricing: "Freemium"
        },
        {
          name: "Claude 3.5 Sonnet (Anthropic)",
          description: "Known for its natural writing style, large context window, and exceptional coding abilities via 'Artifacts'.",
          url: "https://claude.ai",
          category: "LLM",
          pricing: "Freemium"
        },
        {
          name: "Perplexity AI",
          description: "An AI-powered search engine that provides cited answers instead of just links. Great for research.",
          url: "https://perplexity.ai",
          category: "Search",
          pricing: "Freemium"
        },
        
        // --- Automation (No-Code/Low-Code) ---
        {
          name: "n8n",
          description: "The best workflow automation tool for technical users. Self-hostable, powerful, and fair pricing. Perfect for building AI agents.",
          url: "https://n8n.io",
          category: "Automation",
          pricing: "Open Source / Paid"
        },
        {
          name: "Make (formerly Integromat)",
          description: "Visual automation platform. Great for connecting apps (Gmail, Slack, Notion) with OpenAI API.",
          url: "https://make.com",
          category: "Automation",
          pricing: "Freemium"
        },
        {
          name: "Zapier",
          description: "The most user-friendly automation tool with the largest library of integrations. Good for simple tasks.",
          url: "https://zapier.com",
          category: "Automation",
          pricing: "Freemium"
        },

        // --- Coding & Dev ---
        {
          name: "Cursor",
          description: "An AI-first code editor (fork of VS Code). It understands your entire codebase and writes code faster than Copilot.",
          url: "https://cursor.sh",
          category: "Development",
          pricing: "Freemium"
        },
        {
          name: "V0.dev",
          description: "Generative UI system by Vercel. Describe an interface, and it generates React/Tailwind code instantly.",
          url: "https://v0.dev",
          category: "Development",
          pricing: "Freemium"
        },
        {
          name: "Hugging Face",
          description: "The 'GitHub of AI'. The central hub for hosting open-source models, datasets, and demos.",
          url: "https://huggingface.co",
          category: "Platform",
          pricing: "Free"
        }
      ]
    });

    // 2. GLOSSARY (Wichtige Begriffe von A-Z)
    await db.glossaryEntry.createMany({
      skipDuplicates: true,
      data: [
        { term: "Agent", definition: "An AI system that can use tools (like web search or calculators) and perform multiple steps autonomously to achieve a goal." },
        { term: "Alignment", definition: "The field of research dedicated to ensuring AI systems achieve their intended goals without harmful side effects." },
        { term: "Context Window", definition: "The amount of text (tokens) an AI model can 'remember' or process at one time in a conversation." },
        { term: "Embedding", definition: "Turning text into a list of numbers (vectors) so that computers can understand the semantic meaning and relationship between words." },
        { term: "Fine-tuning", definition: "The process of training a pre-existing model on a specific dataset to make it better at a particular task." },
        { term: "Hallucination", definition: "When an AI confidently generates false or nonsensical information that isn't based on its training data." },
        { term: "Inference", definition: "The process of using a trained model to make predictions or generate text based on new input." },
        { term: "LLM (Large Language Model)", definition: "A deep learning algorithm that can recognize, summarize, translate, predict, and generate text based on knowledge gained from massive datasets." },
        { term: "Multimodal", definition: "AI models that can understand and generate multiple types of media, such as text, images, and audio, simultaneously." },
        { term: "Parameters", definition: "The internal variables learned by the model during training. Roughly equates to the 'brain size' of the model (e.g., GPT-4 has trillions)." },
        { term: "Prompt Engineering", definition: "The art of crafting inputs (prompts) to guide AI models to produce the best possible outputs." },
        { term: "RAG (Retrieval-Augmented Generation)", definition: "A technique where an AI retrieves relevant facts from an external database (like your company wiki) before answering a question, reducing hallucinations." },
        { term: "Temperature", definition: "A setting that controls the randomness of AI output. High temperature = creative/random; Low temperature = focused/deterministic." },
        { term: "Token", definition: "The basic unit of text for an LLM. Roughly 0.75 words. 'Hamburger' might be 3 tokens." },
        { term: "Transformer", definition: "The neural network architecture introduced by Google in 2017 that made modern LLMs (like GPT) possible." },
        { term: "Zero-shot Learning", definition: "The ability of a model to perform a task it wasn't explicitly trained to do, just by following instructions." }
      ]
    });

    // 3. EDUCATION (Grundlagen für Einsteiger)
    await db.education.createMany({
      skipDuplicates: true,
      data: [
        {
          title: "AI Fundamentals: What is an LLM?",
          order: 1,
          content: "Imagine a Large Language Model (LLM) not as a database of facts, but as a 'reasoning engine' that predicts the next word. It has read almost the entire internet. It doesn't 'know' things like a human, but it understands statistical relationships between words. When you ask it a question, it's calculating the most probable series of words that follow your input. This is why it can be incredibly smart but also confidently wrong (hallucination)."
        },
        {
          title: "Understanding Tokens: How AI Reads",
          order: 2,
          content: "AI doesn't read words like we do; it reads 'tokens'. A token can be a word, part of a word, or even a space. For example, the word 'ingestion' might be split into 'ing' and 'estion'. This matters because models charge by the token (approx. 750 words = 1000 tokens) and have a limited 'Context Window' (how much conversation they can hold in working memory)."
        },
        {
          title: "RAG: Giving AI a Brain",
          order: 3,
          content: "Retrieval-Augmented Generation (RAG) is the industry standard for making AI useful in business. Instead of relying on the AI's internal training data (which might be outdated), RAG connects the AI to your live documents. 1. You ask a question. 2. The system searches your PDF/Database. 3. It pastes the relevant text into the prompt. 4. The AI answers using ONLY that text. This stops hallucinations."
        },
        {
          title: "Agents: From Chatbots to Workers",
          order: 4,
          content: "The next wave of AI is 'Agents'. A chatbot just talks. An Agent *does*. An agent has access to 'Tools' (like a Calculator, Google Search, or Email API). It can reason: 'To answer this user, I first need to search Google, then calculate the difference, then send an email.' It loops until the task is done."
        }
      ]
    });

    // 4. GUIDES (Step-by-Step Anleitungen)
    await db.guide.createMany({
      skipDuplicates: true,
      data: [
        {
          title: "The Perfect Prompt Structure",
          slug: "perfect-prompt-structure",
          summary: "Stop guessing. Use this framework to get perfect results from ChatGPT and Claude every time.",
          content: "To get the best out of an LLM, use the 'CO-STAR' framework:\n\n1. **C**ontext: Give background information (I am a senior developer...).\n2. **O**bjective: Clearly state the goal (Write a Python script to...).\n3. **S**tyle: Define the tone (Professional, concise, witty...).\n4. **T**one: (Similar to style, optional).\n5. **A**udience: Who is this for? (For a 5-year-old vs. for a CEO).\n6. **R**esponse: Format required (JSON, Markdown table, Bullet points).\n\nExample: 'Act as a Senior Editor (Context). Write a summary of this text (Objective) for a tech-savvy audience (Audience). Use bullet points (Response).'"
        },
        {
          title: "Building your first AI Automation",
          slug: "first-ai-automation",
          summary: "How to connect a Typeform to OpenAI and Slack using Make.com without writing code.",
          content: "Automation is the biggest leverage point for AI. Here is a simple recipe using Make.com:\n\n1. **Trigger:** Watch for new responses in a Typeform (e.g., Customer Feedback).\n2. **Action (OpenAI):** Send the feedback text to GPT-4o with the prompt: 'Analyze the sentiment of this feedback and summarize it in one sentence.'\n3. **Router:** If Sentiment = Negative -> Send Slack message to Support Team. If Sentiment = Positive -> Add to 'Testimonials' Notion database.\n\nThis simple flow replaces hours of manual sorting."
        }
      ]
    });

    return NextResponse.json({ success: true, message: "Database seeded successfully with premium content!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}