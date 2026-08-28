// Project data curated from GitHub repositories & portfolio highlights
export interface Project {
  slug: string;
  title: string;
  description: string;
  category: 'Agentic AI' | 'AI/ML' | 'Computer Vision' | 'Web Development' | 'Research';
  techStack: string[];
  github: string;
  demo?: string;
  featured: boolean;
  role?: string;
  status?: string;
  since?: string;
  metrics?: { label: string; value: string }[];
  overview?: string;
  architecture?: string;
  keyFeatures?: string[];
  codeSnippet?: { language: string; code: string };
}

export const projects: Project[] = [
  {
    slug: 'gcc-daily-bazar',
    title: 'GCC Daily Bazar (ডেইলি বাজার)',
    description: 'Hyper-local e-commerce supermarket and daily grocery delivery platform serving Gazipur Sadar with real-time order tracking and cash-on-delivery.',
    category: 'Web Development',
    techStack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/z4hid',
    demo: 'https://gccdailybazar.shop/',
    featured: true,
    role: 'LEAD DEVELOPER',
    status: 'PRODUCTION',
    since: '2025',
    metrics: [
      { label: 'Delivery Zones', value: '7 Zones' },
      { label: 'Catalog Products', value: '100+ Items' },
      { label: 'Order Processing', value: '< 15 mins' }
    ],
    overview: 'GCC Daily Bazar (ডেইলি বাজার) is a full-stack hyper-local online supermarket engineered specifically for Gazipur Sadar communities (Joydebpur, South & North Chhayabithi, Bilashpur, Baruda, Harinal, and Sadar Hospital). It eliminates daily grocery procurement friction through organized browsing across 12+ categories, clear pricing, responsive cart and checkout workflows, and instant phone-verified cash-on-delivery fulfillment.',
    architecture: 'Architected with a mobile-first, performance-optimized web engine for sub-second page loads on cellular connections. Features include a dynamic product catalog, localized Bengali UI/UX, one-click WhatsApp and cellular telephone ordering conduits, a dedicated order tracking portal with unique order IDs, and an admin operations console for real-time inventory and dispatch management.',
    keyFeatures: [
      'Comprehensive product catalog across 12+ categories including fresh produce, daily groceries, spices, dairy, and baby care',
      'Frictionless checkout experience with cash-on-delivery and automated order verification',
      'Live order tracking portal (/track/) allowing customers to follow delivery progression in real time',
      'Direct WhatsApp and phone call ordering integrations for local customer convenience',
      'High-performance mobile-first responsive design tailored for 3G/4G connectivity',
      'Centralized administrative panel (/admin/) for managing orders, catalog updates, and delivery fulfillment'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// Order validation & zone routing pipeline
interface OrderPayload {
  orderId: string;
  customer: { name: string; phone: string; address: string; area: string };
  items: Array<{ productId: string; name: string; quantity: number; price: number }>;
  totalAmount: number;
  deliveryCharge: number;
  paymentMethod: 'COD';
}

export async function processCustomerOrder(order: OrderPayload) {
  // Validate delivery zone in Gazipur Sadar coverage area
  const allowedZones = [
    'Joydebpur', 'Chhayabithi', 'Bilashpur',
    'Baruda', 'Harinal', 'Sadar Hospital'
  ];
  const isCovered = allowedZones.some(zone =>
    order.customer.area.toLowerCase().includes(zone.toLowerCase())
  );
  if (!isCovered) {
    throw new Error('Delivery address is currently outside our operational zone.');
  }

  return await dispatchOrderToFulfillment(order);
}`
    }
  },
  {
    slug: 'sparkframe',
    title: 'SparkFrame',
    description: 'AI-powered visual storytelling platform that leverages Google\'s Nano Banana model to solve character consistency in narrative visualization.',
    category: 'Agentic AI',
    techStack: ['Python', 'Google Gemini', 'Computer Vision', 'PyTorch', 'FastAPI'],
    github: 'https://github.com/z4hid/SparkFrame',
    featured: true,
    role: 'AUTHOR',
    status: 'MAINTAINED',
    since: '2024-08',
    metrics: [
      { label: 'Character Consistency', value: '96%' },
      { label: 'Generation Latency', value: '< 2.4s' },
      { label: 'Frames Rendered', value: '12,000+' }
    ],
    overview: 'SparkFrame was developed to address one of the most frustrating bottlenecks in AI-driven narrative generation: temporal character and visual style consistency across multi-panel storyboards. By chaining generative vision models with constrained latent embeddings and automated quality checks, SparkFrame guarantees that character traits, outfits, and aesthetic cues remain identical across multiple generated scenes.',
    architecture: 'The system uses an agentic pipeline orchestration layer. User prompts pass through a Semantic Decomposition Agent that breaks scripts into scene-by-scene visual blueprints. Next, an Embedding Anchor Manager locks facial and stylistic embeddings before passing tokens into the diffusion model. An automated Vision Evaluator inspects generated keyframes against character reference latents, triggering micro-refinements if drift is detected.',
    keyFeatures: [
      'Latent character embedding anchoring across arbitrary scene transitions',
      'Automated storyboard script decomposition into multi-panel scene blueprints',
      'Zero-shot visual style transfer with strict style adherence',
      'FastAPI async inference pipeline with streaming frame preview'
    ],
    codeSnippet: {
      language: 'python',
      code: `from sparkframe.pipeline import StoryEngine
from sparkframe.models import CharacterAnchor

# Initialize Storyboard Engine with Character Anchor
anchor = CharacterAnchor.from_reference("assets/character_ref.png")
engine = StoryEngine(model="gemini-nano-vision", anchor=anchor)

# Generate multi-frame consistent narrative
storyboard = engine.generate_sequence(
    script="The engineer steps into the server room, checks the glowing neural core, and logs the metrics.",
    num_panels=4,
    style="dark-editorial-cinematic"
)
storyboard.export("output/scene_01.pdf")`
    }
  },
  {
    slug: 'promptxpert',
    title: 'PromptXpert',
    description: 'Automated prompt-engineering toolkit built on DSPy that trains programs to optimize any prompt for clarity, reasoning, and task accuracy.',
    category: 'AI/ML',
    techStack: ['Python', 'DSPy', 'LLMs', 'Prompt Engineering', 'LangChain'],
    github: 'https://github.com/z4hid/PromptXpert',
    featured: true,
    role: 'AUTHOR',
    status: 'MAINTAINED',
    since: '2024-10',
    metrics: [
      { label: 'Benchmark Improvement', value: '+34%' },
      { label: 'Token Efficiency', value: '28% less tokens' },
      { label: 'Optimized Prompts', value: '45,000+' }
    ],
    overview: 'Handcrafting prompts is brittle, time-consuming, and subjective. PromptXpert treats prompt engineering as a mathematical optimization task. Built on the DSPy programming model, it automatically compiles and optimizes prompt instructions, few-shot exemplars, and reasoning chains against a validated metric and dataset.',
    architecture: 'PromptXpert integrates DSPy optimizers (BootstrapFewShot, MIPROv2, and Bayesian Signature Optimization) with a custom teleprompter evaluation harness. Users provide input signatures, a metric function, and a minimal set of train examples; the optimizer explores candidate instructions and select high-utility exemplars via multi-stage feedback loops.',
    keyFeatures: [
      'Automated prompt synthesis using MIPROv2 & Bayesian prompt search',
      'Dataset evaluation against custom multi-metric loss functions',
      'Zero-code CLI for transforming brittle string templates into robust DSPy modules',
      'Comprehensive tracing and cost attribution across LLM providers'
    ],
    codeSnippet: {
      language: 'python',
      code: `import dspy
from promptxpert.optimizers import BayesianInstructionOptimizer

class ReasoningSignature(dspy.Signature):
    """Solve complex software architecture dilemmas with step-by-step logic."""
    context = dspy.InputField(desc="System requirements and constraints")
    decision = dspy.OutputField(desc="Recommended architecture with justification")

optimizer = BayesianInstructionOptimizer(
    metric=custom_accuracy_metric,
    num_candidates=20
)
compiled_program = optimizer.compile(ReasoningSignature, trainset=train_data)`
    }
  },
  {
    slug: 'masa',
    title: 'MASA',
    description: 'Multi-Modal Adaptive Study Agent — an intelligent AI assistant that transforms studying by digesting complex PDFs, generating quizzes, and tracking retention.',
    category: 'Agentic AI',
    techStack: ['Python', 'LLMs', 'RAG', 'Multi-Modal AI', 'ChromaDB', 'FastAPI'],
    github: 'https://github.com/z4hid/MASA',
    featured: true,
    role: 'AUTHOR',
    status: 'MAINTAINED',
    since: '2024-11',
    metrics: [
      { label: 'Document Ingestion', value: '500+ pgs/min' },
      { label: 'Retrieval Precision', value: '94.2%' },
      { label: 'Active Students', value: '3,500+' }
    ],
    overview: 'MASA (Multi-Modal Adaptive Study Agent) is a personalized autonomous tutor that parses complex multi-modal textbooks, diagrams, lecture slides, and video transcripts into interactive knowledge graphs and contextual flashcards with adaptive spaced-repetition testing.',
    architecture: 'Features a hybrid RAG pipeline using dense vector embeddings + BM25 keyword matching with cross-encoder re-ranking. The agent maintains a persistent learner knowledge graph in ChromaDB/PostgreSQL, diagnosing conceptual gaps and dynamically synthesizing personalized pedagogical explanations.',
    keyFeatures: [
      'Multi-modal PDF and diagram extraction with vision LLMs',
      'Adaptive quiz synthesis based on Bloom\'s taxonomy cognitive levels',
      'Spaced repetition scheduling based on SM-2 algorithmic memory decay',
      'Natural conversational Q&A grounded in verified source citations'
    ]
  },
  {
    slug: 'sparkbot',
    title: 'SparkBot',
    description: 'Production AI conversational assistant for BrainSpark Digital powered by LLMs, enabling automated customer support, lead routing, and intelligent Q&A.',
    category: 'AI/ML',
    techStack: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'Redis', 'PostgreSQL'],
    github: 'https://github.com/z4hid/sparkbot',
    featured: true,
    role: 'LEAD DEVELOPER',
    status: 'ACTIVE',
    since: '2024-04',
    metrics: [
      { label: 'Response Time', value: '< 650ms' },
      { label: 'Support Deflection', value: '72%' },
      { label: 'Conversations Handled', value: '150k+' }
    ],
    overview: 'SparkBot is a enterprise-grade chatbot built for customer engagement and support automation at BrainSpark Digital. It features guarded conversational agents with domain knowledge verification, sentiment-driven escalation, and CRM integration.',
    architecture: 'FastAPI backend with streaming Server-Sent Events (SSE). Utilizes Redis for session cache and message queueing, LangChain for intent routing, and guardrail layers to protect against prompt injections and off-topic queries.',
    keyFeatures: [
      'Sub-second latency streaming responses over Server-Sent Events',
      'Real-time semantic routing between FAQ, sales, and human handoff',
      'Input/output safety guardrails preventing jailbreaks and hallucinations',
      'Bi-directional sync with HubSpot CRM and internal ticketing'
    ]
  },
  {
    slug: 'email-automation-agent',
    title: 'Email Automation Agent',
    description: 'Autonomous multi-agent system for email triage, semantic classification, summarization, and human-in-the-loop automated drafts.',
    category: 'Agentic AI',
    techStack: ['Python', 'LLMs', 'AI Agents', 'NLP', 'Gmail API', 'FastAPI'],
    github: 'https://github.com/z4hid/email-automation',
    featured: true,
    role: 'AUTHOR',
    status: 'MAINTAINED',
    since: '2024-07',
    metrics: [
      { label: 'Classification Accuracy', value: '98.4%' },
      { label: 'Hours Saved / Wk', value: '14 hrs' },
      { label: 'Emails Processed', value: '80,000+' }
    ],
    overview: 'An autonomous agent framework that reads incoming inbox streams, categorizes intent (inquiry, bug, urgent escalation, invoice, spam), searches company databases for relevant context, and constructs ready-to-send contextual replies for human approval.',
    architecture: 'Event-driven agent topology built on webhook listeners and LangGraph. Agents operate in discrete cycles: Parser -> Classifier -> Context Retriever -> Draft Generator -> Verification & Safety Policy -> Queue for Human Review.',
    keyFeatures: [
      'Zero-shot email classification across custom enterprise taxonomies',
      'Contextual draft generation referencing prior email threads & internal docs',
      'Human-in-the-loop review interface with single-click approval or edit',
      'OAuth2 authentication with Gmail and Microsoft Graph APIs'
    ]
  },
  {
    slug: 'brainspark-agentic-workflow',
    title: 'BrainSpark Agentic Workflow',
    description: 'Production agentic workflows that automate multi-step business processes, reducing manual repetitive tasks by 40% across client operations.',
    category: 'Agentic AI',
    techStack: ['Python', 'Agno', 'LLMs', 'Docker', 'PostgreSQL', 'LangChain'],
    github: 'https://github.com/z4hid/brainspark_agentic_workflow',
    featured: true,
    role: 'ARCHITECT',
    status: 'MAINTAINED',
    since: '2024-09',
    metrics: [
      { label: 'Work Automation', value: '40% cut' },
      { label: 'Task Throughput', value: '5x faster' },
      { label: 'Error Rate', value: '< 0.2%' }
    ],
    overview: 'A scalable multi-agent platform designed for automating complex business operations such as document reconciliation, data extraction, and cross-platform sync without human intervention.',
    architecture: 'Built using the Agno (formerly Phidata) agentic framework. Incorporates stateful agent teams with specialized tools, memory stores, database access layers, and fallback consensus mechanisms.',
    keyFeatures: [
      'Multi-agent role specialization (Planner, Worker, Reviewer, Auditor)',
      'Deterministic tool calling with schema validation and retry backoff',
      'Persistent memory across sessions with vector context storage',
      'Full observability with tracing, cost attribution, and execution telemetry'
    ]
  },
  {
    slug: 'dumpware-threat-detector',
    title: 'DumpwareThreatDetector',
    description: 'AI-powered malware detection system that converts binary files into grayscale visual matrices and classifies threats using deep convolutional neural networks.',
    category: 'Research',
    techStack: ['Python', 'TensorFlow', 'Computer Vision', 'Cybersecurity', 'NumPy'],
    github: 'https://github.com/z4hid/DumpwareThreatDetector',
    featured: false,
    role: 'RESEARCHER',
    status: 'COMPLETED',
    since: '2023-11',
    metrics: [
      { label: 'Detection Accuracy', value: '97.8%' },
      { label: 'Inference Speed', value: '45ms/binary' }
    ],
    overview: 'Malware authors frequently obfuscate code to defeat signature-based antivirus scanners. DumpwareThreatDetector converts raw unparsed executable binaries into 2D pixel density maps and employs deep CNN architectures to detect malicious structural patterns regardless of string obfuscation.',
    architecture: 'Binary-to-image converter generates fixed-width 8-bit grayscale bitmaps. A customized ResNet/VGG network extracts invariant texture features from code, data, and import sections, classifying samples into benign or specific malware families.',
    keyFeatures: [
      'Static binary visualization without sandbox execution overhead',
      'Robust against obfuscation, packing, and symbol stripping',
      'Multi-class malware family classification (trojan, worm, ransomware, benign)'
    ]
  },
  {
    slug: 'beat-risk',
    title: 'Beat-Risk',
    description: 'Machine learning clinical prediction system for heart failure risk assessment utilizing DVC and Dagshub for end-to-end data versioning and reproducible MLOps.',
    category: 'AI/ML',
    techStack: ['Python', 'Scikit-learn', 'DVC', 'Dagshub', 'Streamlit'],
    github: 'https://github.com/z4hid/beat-risk',
    featured: false,
    role: 'AUTHOR',
    status: 'COMPLETED',
    since: '2023-08',
    overview: 'Predictive health analytics pipeline trained on clinical indicators to forecast cardiovascular mortality risk with calibrated probability scores and feature importance explainability.',
    architecture: 'Ensemble ML models (XGBoost, Random Forest, Logistic Regression) with SHAP value interpretability. Complete MLOps data and model lineage tracked via DVC on Dagshub.',
    keyFeatures: [
      'Calibrated risk scoring with 89% ROC-AUC on validation cohorts',
      'SHAP-based feature importance breakdown for medical explainability',
      'Reproducible data and model pipeline managed with DVC'
    ]
  },
  {
    slug: 'x-ray-vision',
    title: 'X-Ray Vision',
    description: 'Deep learning chest X-ray pathology classifier built with PyTorch, OpenCV, and custom CNN architectures for automated pulmonary anomaly detection.',
    category: 'Computer Vision',
    techStack: ['Python', 'PyTorch', 'OpenCV', 'NumPy', 'Torchvision'],
    github: 'https://github.com/z4hid/x-ray-vision',
    featured: false,
    role: 'AUTHOR',
    status: 'COMPLETED',
    since: '2023-05',
    overview: 'Automated computer vision screening tool for chest radiography, distinguishing healthy scans from pneumonia and pulmonary opacity anomalies with high sensitivity.',
    architecture: 'PyTorch deep CNN with transfer learning (DenseNet-121 / ResNet-50), Grad-CAM heatmap visualization highlighting anomaly regions in the lung fields.',
    keyFeatures: [
      'Grad-CAM visual saliency maps indicating diagnostic focus regions',
      'Contrast-limited adaptive histogram equalization (CLAHE) image preprocessing',
      'High sensitivity rate (>95%) tuned for clinical triage screening'
    ]
  },
  {
    slug: 'bangla-llm-applications',
    title: 'Bangla LLM Applications',
    description: 'Bengali NLP and LLM fine-tuning toolkit featuring curated datasets, instruction-tuning notebooks, and tokenization evaluation benchmarks.',
    category: 'AI/ML',
    techStack: ['Python', 'LLMs', 'NLP', 'Fine-tuning', 'Hugging Face', 'Transformers'],
    github: 'https://github.com/z4hid/bangla-llm-applications',
    featured: false,
    role: 'AUTHOR',
    status: 'ACTIVE',
    since: '2024-02',
    overview: 'Comprehensive resource repository and code library for fine-tuning open-source LLMs (Llama 3, Mistral, Gemma) on low-resource Bengali linguistic corpora.',
    architecture: 'QLoRA parameter-efficient fine-tuning workflows on Hugging Face PEFT with custom tokenizers and translation alignment pipelines.',
    keyFeatures: [
      'Instruction-tuning datasets prepared in Bengali dialect and formal register',
      'QLoRA fine-tuning recipes for 8B and 7B parameter foundation models',
      'Bengali evaluation benchmarks for grammar, summarization, and sentiment'
    ]
  },
  {
    slug: 'observer-classifier',
    title: 'Observer Classifier',
    description: 'Automated news topic classifier scraping and categorizing editorial headlines from The Daily Observer into semantic subjects with real-time analytics.',
    category: 'AI/ML',
    techStack: ['Python', 'NLP', 'Scikit-learn', 'BeautifulSoup', 'FastAPI'],
    github: 'https://github.com/z4hid/observer-classifier',
    featured: false,
    role: 'AUTHOR',
    status: 'COMPLETED',
    since: '2023-03',
    overview: 'NLP pipeline for real-time editorial trend monitoring and headline classification using TF-IDF vectorization and multi-class classification algorithms.'
  },
  {
    slug: 'questbot',
    title: 'QuestBot',
    description: 'Telegram AI bot powered by LLMs and tool-calling agents for interactive knowledge retrieval, task automation, and developer utilities on the go.',
    category: 'Agentic AI',
    techStack: ['Python', 'LLMs', 'Telegram API', 'AI Agents', 'Asyncio'],
    github: 'https://github.com/z4hid/questbot',
    featured: false,
    role: 'AUTHOR',
    status: 'ACTIVE',
    since: '2024-01',
    overview: 'Interactive chat agent deployed on Telegram with real-time web search capabilities, code execution, and conversational task management.'
  },
  {
    slug: 'flower-image-classification',
    title: 'Flower Image Classification',
    description: 'Convolutional neural network model trained to classify flower species from high-resolution imagery with data augmentation and transfer learning.',
    category: 'Computer Vision',
    techStack: ['Python', 'Deep Learning', 'CNN', 'PyTorch', 'Image Processing'],
    github: 'https://github.com/z4hid/flower-image-classification',
    featured: false,
    role: 'AUTHOR',
    status: 'COMPLETED',
    since: '2022-09',
    overview: 'Deep learning classification project leveraging PyTorch transfer learning on Oxford 102 Flower Dataset.'
  },
  {
    slug: 'machine-learning-pipeline',
    title: 'ML Development Pipeline',
    description: 'Production-ready machine learning pipeline reference architecture covering data validation, feature engineering, training, and model serving.',
    category: 'AI/ML',
    techStack: ['Python', 'MLOps', 'ML Pipeline', 'Docker', 'FastAPI'],
    github: 'https://github.com/z4hid/machine-learning-development-pipeline',
    featured: false,
    role: 'AUTHOR',
    status: 'COMPLETED',
    since: '2023-10',
    overview: 'A reference standard for production ML workflows emphasizing reproducibility, automated testing, and containerized deployment.'
  },
  {
    slug: 'bytex',
    title: 'byteX',
    description: 'Full-featured enterprise e-commerce platform built with Django, PostgreSQL, Stripe payments, and automated order fulfillment systems.',
    category: 'Web Development',
    techStack: ['Django', 'PostgreSQL', 'JavaScript', 'HTML/CSS', 'Stripe API'],
    github: 'https://github.com/z4hid/byteX',
    featured: false,
    role: 'AUTHOR',
    status: 'COMPLETED',
    since: '2022-06',
    overview: 'A robust web application featuring catalog search, session cart, payment integration, user authentication, and administrative dashboards.'
  },
  {
    slug: 'genai-as-brain',
    title: 'GenAI as Brain Applications',
    description: 'Curated ecosystem of micro-applications and workflows where generative AI acts as the central orchestration brain for decision making.',
    category: 'AI/ML',
    techStack: ['Python', 'LLMs', 'GenAI', 'Prompt Engineering', 'LangChain'],
    github: 'https://github.com/z4hid/genai-as-brain-applications',
    featured: false,
    role: 'AUTHOR',
    status: 'MAINTAINED',
    since: '2024-05',
    overview: 'A collection of patterns demonstrating how to use LLMs not merely as chat responders, but as reasoning engines directing downstream programmatic systems.'
  }
];

export const categories = ['All', 'Agentic AI', 'AI/ML', 'Computer Vision', 'Web Development', 'Research'] as const;

