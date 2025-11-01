### Activation Function
A non-linear function applied to a neuron's output; enables neural networks to learn complex patterns. Matters because without it, networks collapse to linear models.

### Active Learning
Strategy where models query humans for labels on uncertain samples. Matters to reduce labeling costs and improve data efficiency.

### Agentic AI
Systems that plan, act, and use tools across steps. Matters for automations and complex workflows.

### Alignment
Ensuring model behavior follows human values and goals. Matters for safety, trust, and compliance.

### Alpha
Initial release or experimental version of a model/system. Matters for early testing before stability.

### Anonymization
Removing personal identifiers from data. Matters for privacy laws and safe data use.

### AR (Autoregressive) Model
Generates the next token from previous tokens. Matters as the core of most LLMs.

### Attention
Mechanism that weighs token-token interactions. Matters because it powers Transformers.

### Augmentation (Data)
Creating synthetic or modified data to improve training. Matters to fight overfitting and class imbalance.

### Autoencoder
Neural net that compresses and reconstructs data. Matters for denoising, embeddings, and anomaly detection.

### Backpropagation
Algorithm to compute gradients and update weights. Matters because it trains deep nets.

### Batch Normalization
Normalizes activations within a mini-batch. Matters for faster, more stable training.

### Beam Search
Heuristic search over next-token sequences. Matters for improving generation quality.

### Benchmark
Standardized tests to compare models. Matters for choosing and tracking progress.

### Bias (Model)
Systematic error that skews predictions. Matters for fairness, legality, and accuracy.

### BLEU
Score for machine translation based on n-gram overlap. Matters as a classic MT metric.

### Calibration
Agreement between predicted probabilities and outcomes. Matters to trust model confidence.

### Checkpoint
Saved model parameters at a training step. Matters for resuming and versioning.

### Class Imbalance
Uneven label distribution in data. Matters as it hurts accuracy on rare cases.

### Compression (Model)
Reducing model size via pruning/quantization. Matters for latency and edge deployment.

### Concept Drift
Data/label distribution changes over time. Matters for production reliability.

### Confusion Matrix
Table of TP/FP/TN/FN. Matters for diagnosing classification performance.

### Context Window
Max tokens the model can attend to. Matters for prompt length and long docs.

### Contrastive Learning
Brings similar items closer in embedding space. Matters for retrieval and representations.

### Corpus
A collection of texts used for training/eval. Matters for coverage and bias.

### Cross-Entropy
Loss comparing predicted and true distributions. Matters for training classifiers and LLMs.

### CUDA
NVIDIA’s parallel computing platform for GPUs. Matters for training/inference speed.

### Curriculum Learning
Training from easier to harder examples. Matters for stability and speed.

### Data Governance
Policies for data quality, access, and compliance. Matters for audits and risk control.

### Data Lake
Centralized storage for raw, varied data. Matters for analytics and ML pipelines.

### Data Pipeline
Steps that move/transform data to models. Matters for reproducibility and scale.

### Dataset
A structured collection of examples. Matters as the foundation of model quality.

### Decoder-Only
Transformer that generates outputs autoregressively. Matters because it's the dominant LLM architecture.

### Diffusion Model
Generative model that denoises from noise. Matters for images, audio, and video generation.

### Distillation
Training a smaller model to mimic a larger one. Matters for cheaper, faster inference.

### Embedding
Vector representation of text or images. Matters for search, clustering, and RAG.

### Epoch
One full pass over the training data. Matters for tracking training progress.

### Evaluation (Eval)
Systematic measurement of model quality. Matters for release gates and regressions.

### Experiment Tracking
Logging runs, metrics, and configs. Matters for reproducibility and team work.

### Few-Shot Learning
Using a handful of examples in-context. Matters when labeled data is scarce.

### Fine-Tuning
Adapting a pre-trained model on new data. Matters for style, domain, or private knowledge.

### Foundational Model
Large pre-trained model used as a base. Matters for transfer and generality.

### Function Calling
LLM invokes tools/APIs via structured args. Matters for reliability and integration.

### Generative AI
Models that produce new text, images, etc. Matters for content creation and automation.

### Gradient Descent
Optimization method to minimize loss. Matters for virtually all deep learning.

### Guardrails
Policies/filters to constrain model outputs. Matters for safety and compliance.

### Hallucination
Confident but incorrect model output. Matters for credibility and risk.

### Hardware Accelerator
GPUs/TPUs/NPUs that speed ML. Matters for cost and throughput.

### Hyperparameter
Configurable training settings (lr, batch). Matters for performance and stability.

### Inference
Using a trained model to get outputs. Matters for user-facing latency and cost.

### JSON Mode
Constrained generation to valid JSON. Matters for tool use and APIs.

### Knowledge Base
Curated facts/docs for retrieval. Matters for RAG quality.

### Label Noise
Incorrect or inconsistent labels. Matters because it degrades training.

### Latency
Time to get a model response. Matters for UX and throughput.

### Layer Normalization
Normalizes across features in a layer. Matters in Transformer stability.

### Leaderboard
Public ranking of models on benchmarks. Matters for comparisons (with caveats).

### LLM
Large Language Model. Matters as the engine behind modern assistants.

### LoRA
Low-Rank Adaptation technique for finetuning. Matters for cheap, modular updates.

### Loss Function
Objective minimized during training. Matters for learning signal.

### Masking
Hiding tokens during training to predict them. Matters in BERT-style pretraining.

### Memory (Agent)
Persistent state an agent uses across steps. Matters for multi-step tasks.

### Metric (Eval)
A numerical measure of performance. Matters to compare models and runs.

### Mixture of Experts (MoE)
Routing to specialized sub-models. Matters for scaling with efficiency.

### Model Card
Document summarizing model data, uses, risks. Matters for transparency.

### Monitoring (ML)
Tracking drift, quality, and costs in prod. Matters to keep systems healthy.

### Multi-Modal
Handling text, image, audio, video. Matters for richer applications.

### N-gram
Sequence of N tokens. Matters in classic NLP and some metrics.

### Objective Function
The target a model optimizes. Matters for desired behavior.

### On-Device Inference
Running models on phones/edge. Matters for privacy and latency.

### Overfitting
Model memorizes noise instead of patterns. Matters for poor generalization.

### Parameter
A learned weight in the model. Matters as scale and capacity indicator.

### PEFT
Parameter-Efficient Fine-Tuning methods like LoRA. Matters for cost-effective adaptation.

### Perplexity
Exponentiated average surprisal; lower is better. Matters as a language-model metric.

### Pipeline (ML)
End-to-end steps from data to deployment. Matters for reliability.

### Post-Training
Safety/reliability tuning after pretraining. Matters for alignment and UX.

### Precision/Recall
Measures of correctness and coverage. Matters to understand errors.

### Pretraining
Training on broad data before fine-tuning. Matters for general ability.

### Prompt
Instruction + context given to a model. Matters for quality of outputs.

### Prompt Injection
Malicious text that subverts instructions. Matters for security in RAG/agents.

### Quantization
Representing weights/activations with fewer bits. Matters to shrink models and speed up.

### RAG
Retrieval-Augmented Generation combines search with generation. Matters to ground answers.

### Rate Limiting
Restricting request rates. Matters for stability and abuse prevention.

### Regression (ML)
Predicting continuous values. Matters in forecasting and analytics.

### Reinforcement Learning
Learning via reward signals from actions. Matters for control and agents.

### RLHF
Reinforcement Learning from Human Feedback. Matters for helpful, harmless behavior.

### Robustness
Model's resilience to noise and shifts. Matters for reliability.

### Rollout (Prod)
Deploying changes safely. Matters for uptime and risk control.

### Sampling (Decoding)
Strategy to pick next tokens (temp/top‑p). Matters for style vs. determinism.

### Self-Consistency
Ensembling multiple reasoning paths. Matters for accuracy on hard tasks.

### Self-Supervised Learning
Learning from unlabeled data with proxy tasks. Matters for scale and cost.

### Semantic Search
Search using embeddings and meaning. Matters for retrieval quality.

### Serve (Model Serving)
Hosting models behind an API. Matters for latency and scaling.

### Session Window
Scope of conversation memory. Matters for agent UX.

### SGD (Stochastic Gradient Descent)
Gradient descent on mini-batches. Matters for efficiency.

### Sharding (Model/Inference)
Splitting model or data across devices. Matters for large-scale serving.

### Shot (k-shot)
Number of examples in prompt. Matters for few-shot performance.

### SLA/SLO
Availability and performance targets. Matters in production guarantees.

### Softmax
Turns logits into probabilities. Matters for classification and decoding.

### Speculative Decoding
Draft model proposes tokens, target model verifies. Matters for lower latency/cost.

### SSE/WS Streaming
Server-Sent Events/WebSockets to stream tokens. Matters for responsive UIs.

### Temperature
Controls randomness in sampling. Matters for creativity vs. determinism.

### Tensor
Multi-dimensional array used in ML. Matters as the basic data structure.

### Token
Smallest unit a model reads/writes. Matters for cost and limits.

### Tokenization
Splitting text into tokens. Matters for efficiency and vocab coverage.

### Top‑k/Top‑p
Sampling methods limiting candidate tokens. Matters for output quality.

### Transformer
Neural architecture using attention. Matters as the backbone of LLMs.

### Truncation
Cutting prompts/outputs to fit context. Matters to avoid loss of info.

### Tuning Data
Examples used for adapting models. Matters for behavior and IP risk.

### Two‑Tower Model
Dual encoders for retrieval/ranking. Matters for scalable search.

### Underfitting
Model too simple to learn the pattern. Matters for low accuracy.

### Vector Database
Stores embeddings for similarity search. Matters for RAG systems.

### Vector Index
Data structure (HNSW, IVF) to speed NN search. Matters for scalability.

### Zero‑Shot
Using a model without examples. Matters for rapid prototyping.

### A/B Test
Experiment comparing variants. Matters for product decisions.

### API Rate Limit
Max requests per time window. Matters to avoid throttling.

### Content Filter
System to block unsafe outputs. Matters for policy compliance.

### Cost per Token
Monetary cost per token processed. Matters for budgeting.

### Data Residency
Where data is stored geographically. Matters for legal compliance.

### Deduplication
Removing duplicate records/text. Matters for quality and size.

### Embodied AI
Agents that sense and act in the physical world. Matters for robotics.

### Explainability (XAI)
Techniques to interpret model decisions. Matters for trust and regulation.

### HTTP Callback (Webhook)
Server URL to receive async events. Matters for automations.

### Incremental Indexing
Updating a vector index without rebuild. Matters for freshness.

### Jailbreak
Prompt that bypasses model restrictions. Matters for safety.

### Knowledge Cutoff
Date after which a model lacks training data. Matters for recency expectations.

### Latency Budget
Time you can spend per request. Matters to design pipelines.

### Model Garden
Catalog of available models. Matters to choose the right fit.

### Observability
Logs/metrics/traces to debug systems. Matters for ops and reliability.

### Open Weight Model
Model with downloadable weights. Matters for self-hosting and control.

### PEP (Prompt Engineering Pattern)
Reusable prompt structure for tasks. Matters for consistency.

### PII
Personally Identifiable Information. Matters for privacy handling.

### Safety Spec
Documented dos/don’ts for a system. Matters to align teams and audits.

### System Prompt
Hidden instruction guiding an assistant. Matters for behavior control.

### Toolformer
Method to teach LLMs to call tools. Matters for stronger tool use.

### Trace (LangSmith-style)
Record of steps/tools/latency per run. Matters for debugging and QA.
