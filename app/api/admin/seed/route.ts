import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log("🌱 Starting Massive Seeding...");

    // Wir löschen alte Glossar-Einträge zuerst, um Duplikate zu vermeiden, 
    // falls du das Skript schonmal ausgeführt hast.
    await db.glossaryEntry.deleteMany({});

    // GLOSSARY: 100+ Terms von A-Z
    await db.glossaryEntry.createMany({
      data: [
        // A
        { term: "A/B Testing", definition: "A method of comparing two versions of a model or prompt against each other to determine which one performs better." },
        { term: "Accuracy", definition: "A metric used to measure the performance of a classification model, representing the percentage of correct predictions." },
        { term: "Activation Function", definition: "A mathematical function applied to a neural network's output (like ReLU or Sigmoid) that determines whether a neuron should be activated." },
        { term: "Agent", definition: "An AI system capable of autonomous action, using tools and reasoning to achieve a goal without continuous human input." },
        { term: "AGI (Artificial General Intelligence)", definition: "Hypothetical AI that possesses the ability to understand, learn, and apply knowledge across a wide variety of tasks, matching human intelligence." },
        { term: "Algorithm", definition: "A set of rules or instructions given to an AI program to help it learn on its own." },
        { term: "Alignment", definition: "The process of encoding human values and goals into AI systems to prevent harmful or unintended behavior (e.g. RLHF)." },
        { term: "ANI (Artificial Narrow Intelligence)", definition: "AI designed to perform a single task extremely well (e.g., chess computers, image recognition), unlike AGI." },
        { term: "Annotation", definition: "The process of labeling data (like images or text) to train machine learning models." },
        { term: "API (Application Programming Interface)", definition: "A way for different software applications to talk to each other. Developers use the OpenAI API to build apps with GPT-4." },
        { term: "Attention Mechanism", definition: "A technique in neural networks (specifically Transformers) that allows the model to focus on specific parts of the input text when generating output." },
        { term: "Auto-GPT", definition: "An open-source experimental application that attempts to make GPT-4 fully autonomous." },
        
        // B
        { term: "Backpropagation", definition: "The core algorithm for training neural networks. It calculates errors and updates the model's weights backwards from the output to the input." },
        { term: "Batch Size", definition: "The number of training examples utilized in one iteration of model training." },
        { term: "Bias (Inductive Bias)", definition: "Systematic errors in an AI model leading to unfair outcomes, often stemming from prejudiced training data." },
        { term: "Big Data", definition: "Extremely large datasets that may be analyzed computationally to reveal patterns, trends, and associations." },
        { term: "Black Box", definition: "An AI system whose internal decision-making process is opaque and not easily understood by humans." },
        
        // C
        { term: "Chain of Thought (CoT)", definition: "A prompting technique where the model is asked to explain its reasoning step-by-step before giving the final answer." },
        { term: "Chatbot", definition: "Software designed to simulate conversation with human users, especially over the Internet." },
        { term: "ChatGPT", definition: "A conversational AI chatbot developed by OpenAI, based on the GPT architecture." },
        { term: "Claude", definition: "A family of LLMs developed by Anthropic, known for its large context window and focus on safety." },
        { term: "Computer Vision", definition: "A field of AI that enables computers to derive meaningful information from digital images and videos." },
        { term: "Context Window", definition: "The limit on the amount of text (measured in tokens) an LLM can consider at one time (input + output)." },
        { term: "Convolutional Neural Network (CNN)", definition: "A class of deep neural networks, most commonly applied to analyzing visual imagery." },
        { term: "Copilot", definition: "AI-powered coding assistant by GitHub that suggests code snippets and functions in real-time." },
        
        // D
        { term: "Data Augmentation", definition: "Techniques used to increase the amount of data by adding slightly modified copies of already existing data." },
        { term: "Deep Learning", definition: "A subset of machine learning based on artificial neural networks with multiple layers (hence 'deep')." },
        { term: "Diffusion Model", definition: "A type of generative model used to generate high-quality images by learning to reverse a gradual noise addition process (e.g. Stable Diffusion)." },
        { term: "Discriminator", definition: "In GANs, the part of the network that tries to distinguish between real data and fake data generated by the generator." },
        
        // E
        { term: "Embedding", definition: "A vector (list of numbers) representation of text or images that captures semantic meaning. Used for search and comparison." },
        { term: "Encoder-Decoder", definition: "A neural network architecture where one part encodes input into a representation and another decodes it into output (used in translation)." },
        { term: "Epoch", definition: "One complete pass of the training dataset through the machine learning algorithm." },
        { term: "Evaluation (Eval)", definition: "Tests designed to measure the performance, safety, and accuracy of AI models." },
        
        // F
        { term: "Few-Shot Learning", definition: "The ability of a model to learn a new task given only a small number of examples (shots) in the prompt." },
        { term: "Fine-Tuning", definition: "Taking a pre-trained model and training it further on a specific dataset to specialize it for a certain task." },
        { term: "Foundation Model", definition: "A large-scale model trained on vast amounts of data that can be adapted (e.g., fine-tuned) to a wide range of downstream tasks." },
        
        // G
        { term: "Generative AI", definition: "AI systems capable of generating new content like text, images, audio, or video in response to prompts." },
        { term: "GPU (Graphics Processing Unit)", definition: "Specialized electronic circuits designed to manipulate memory to accelerate the creation of images, now essential for training AI." },
        { term: "GPT (Generative Pre-trained Transformer)", definition: "A type of LLM developed by OpenAI that uses deep learning to produce human-like text." },
        { term: "Gradient Descent", definition: "An optimization algorithm used to minimize some function by iteratively moving in the direction of steepest descent." },
        { term: "Grounding", definition: "Connecting the AI's generation to verifiable sources or real-world data to prevent hallucinations." },
        
        // H
        { term: "Hallucination", definition: "A phenomenon where an AI generates output that sounds plausible but is factually incorrect or nonsensical." },
        { term: "Hugging Face", definition: "A platform and community for sharing AI models, datasets, and demos. The 'GitHub of AI'." },
        { term: "Hyperparameter", definition: "A configuration that is external to the model and whose value cannot be estimated from data (e.g. learning rate)." },
        
        // I
        { term: "Image Recognition", definition: "The ability of a system to identify objects, people, places, and actions in images." },
        { term: "Inference", definition: "The stage where a trained model is used to make predictions on new, unseen data." },
        { term: "InstructGPT", definition: "Models trained to follow instructions better than base GPT models, using RLHF." },
        
        // J
        { term: "Jailbreak", definition: "A prompt engineering technique designed to bypass the safety filters and ethical guidelines of an AI model." },
        { term: "JSON Mode", definition: "A feature in newer LLMs that guarantees the output will be valid JSON code, useful for programming integration." },
        
        // K
        { term: "Knowledge Graph", definition: "A network of real-world entities—objects, events, situations, or concepts—and the relationships between them." },
        
        // L
        { term: "LangChain", definition: "A framework for developing applications powered by language models, focusing on chaining steps together." },
        { term: "Large Language Model (LLM)", definition: "AI models trained on massive text datasets to understand and generate human language." },
        { term: "Latent Space", definition: "A compressed, abstract representation of data where similar concepts are positioned close to each other." },
        { term: "Llama", definition: "A family of open-source large language models released by Meta (Facebook)." },
        { term: "LoRA (Low-Rank Adaptation)", definition: "A technique for fine-tuning large models efficiently by freezing weights and training small adapter layers." },
        { term: "Loss Function", definition: "A method that evaluates how well your algorithm models your dataset. Lower loss is better." },
        
        // M
        { term: "Machine Learning (ML)", definition: "A subset of AI focused on building systems that learn from data rather than being explicitly programmed." },
        { term: "Midjourney", definition: "A generative artificial intelligence program and service that generates images from natural language descriptions." },
        { term: "Mixture of Experts (MoE)", definition: "An architecture where a model is composed of multiple 'expert' sub-networks, activating only a few for each token." },
        { term: "Model", definition: "A mathematical representation of a real-world process, created by training an algorithm on data." },
        { term: "Multimodal", definition: "The ability of an AI to understand and process different types of inputs simultaneously (e.g. Text + Image)." },
        
        // N
        { term: "Natural Language Processing (NLP)", definition: "A branch of AI that helps computers understand, interpret and manipulate human language." },
        { term: "Neural Network", definition: "A computer system modeled on the human brain and nervous system." },
        { term: "Neuron", definition: "A basic unit of a neural network that processes input and passes it to the next layer." },
        { term: "NVIDIA", definition: "The company that produces the GPUs (like H100) that power almost all modern AI training." },
        
        // O
        { term: "One-Shot Learning", definition: "Learning from a single example." },
        { term: "Open Source AI", definition: "AI models where the weights and architecture are made publicly available (e.g. Llama, Mistral)." },
        { term: "OpenAI", definition: "An AI research and deployment company dedicated to ensuring AGI benefits all of humanity. Creators of ChatGPT." },
        { term: "Overfitting", definition: "When a model learns the training data too well, including noise, and performs poorly on new data." },
        
        // P
        { term: "Parameter", definition: "The internal variables of a model that are adjusted during training. GPT-4 has over a trillion parameters." },
        { term: "Perplexity", definition: "A measurement of how well a probability model predicts a sample. Also a popular AI Search Engine." },
        { term: "Pre-training", definition: "The initial phase of training a model on a massive dataset to learn general patterns (before fine-tuning)." },
        { term: "Prompt Engineering", definition: "The practice of optimizing inputs (prompts) to generative AI models to get the best possible output." },
        { term: "Prompt Injection", definition: "A cyberattack where a user manipulates an AI's input to override its programming or reveal sensitive info." },
        { term: "PyTorch", definition: "An open-source machine learning framework developed by Meta, widely used for deep learning." },
        
        // Q
        { term: "Quantization", definition: "Reducing the precision of a model's numbers (e.g. from 16-bit to 4-bit) to make it smaller and faster with minimal quality loss." },
        
        // R
        { term: "RAG (Retrieval-Augmented Generation)", definition: "Connecting an LLM to external data sources so it can answer questions about private data without hallucinating." },
        { term: "Reinforcement Learning (RL)", definition: "Training an AI through trial and error using rewards and punishments." },
        { term: "RLHF (Reinforcement Learning from Human Feedback)", definition: "Fine-tuning models by using human ratings of their outputs to guide learning towards safer/better answers." },
        { term: "RNN (Recurrent Neural Network)", definition: "A class of neural networks good at processing sequential data like text or speech." },
        
        // S
        { term: "Sam Altman", definition: "CEO of OpenAI." },
        { term: "Seed", definition: "A random number used to initialize the generation process. Using the same seed results in the same output." },
        { term: "Sentiment Analysis", definition: "Using NLP to determine the emotional tone behind a body of text." },
        { term: "Singularity", definition: "A hypothetical future point when technological growth becomes uncontrollable and irreversible, often linked to AGI." },
        { term: "Softmax", definition: "A function that turns a list of numbers into probabilities that sum to 1. Used in the final layer of classifiers." },
        { term: "Stable Diffusion", definition: "An open-source text-to-image model developed by Stability AI." },
        { term: "Supervised Learning", definition: "Training a model on labeled data (input-output pairs)." },
        { term: "Synthetic Data", definition: "Data that is artificially created rather than generated by real-world events, often used to train AI." },
        
        // T
        { term: "Temperature", definition: "A parameter that controls the randomness of an LLM's output. High temp = creative; Low temp = deterministic." },
        { term: "TensorFlow", definition: "An end-to-end open-source platform for machine learning developed by Google." },
        { term: "Token", definition: "The basic unit of text for an LLM. It can be a word, part of a word, or a character. (1000 tokens ≈ 750 words)." },
        { term: "Training Data", definition: "The dataset used to train a machine learning model." },
        { term: "Transformer", definition: "The neural network architecture introduced by Google in 2017 ('Attention is All You Need') that revolutionized NLP." },
        { term: "Turing Test", definition: "A test of a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human." },
        
        // U
        { term: "Unsupervised Learning", definition: "Training a model on data without labels, letting it find patterns on its own." },
        
        // V
        { term: "Validation Set", definition: "A subset of data used to assess the performance of the model during training." },
        { term: "Vanishing Gradient", definition: "A problem in training deep networks where gradients become too small to update weights effectively." },
        { term: "Vector Database", definition: "A database optimized for storing and querying high-dimensional vectors (embeddings). Essential for RAG." },
        
        // W
        { term: "Weights", definition: "The connection strengths between neurons in a neural network, learned during training." },
        { term: "Whisper", definition: "An automatic speech recognition (ASR) system developed by OpenAI." },
        
        // X
        { term: "X-Risk (Existential Risk)", definition: "The potential for AI to pose a threat to the existence of humanity." },
        
        // Y
        { term: "YOLO (You Only Look Once)", definition: "A popular real-time object detection system." },
        
        // Z
        { term: "Zero-Shot Learning", definition: "The ability of a model to complete a task without having seen any specific examples of that task during training." }
      ]
    });

    return NextResponse.json({ success: true, message: "Database seeded with 100+ glossary terms!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}