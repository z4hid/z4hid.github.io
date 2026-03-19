// Project data curated from GitHub repositories
export interface Project {
    title: string;
    description: string;
    category: 'Agentic AI' | 'AI/ML' | 'Computer Vision' | 'Web Development' | 'Research';
    techStack: string[];
    github: string;
    featured: boolean;
    demo?: string;
}

export const projects: Project[] = [
    {
        title: 'SparkFrame',
        description: 'AI-powered visual storytelling platform that leverages Google\'s Nano Banana model to solve character consistency in narrative visualization.',
        category: 'Agentic AI',
        techStack: ['Python', 'Google Gemini', 'Computer Vision', 'AI'],
        github: 'https://github.com/z4hid/SparkFrame',
        featured: true,
    },
    {
        title: 'PromptXpert',
        description: 'Automated prompt-engineering toolkit built on DSPy that trains programs to optimize any prompt for clarity and effectiveness.',
        category: 'AI/ML',
        techStack: ['Python', 'DSPy', 'LLMs', 'Prompt Engineering'],
        github: 'https://github.com/z4hid/PromptXpert',
        featured: true,
    },
    {
        title: 'MASA',
        description: 'Multi-Modal Adaptive Study Agent — an intelligent AI assistant that transforms studying by handling diverse materials and generating study aids.',
        category: 'Agentic AI',
        techStack: ['Python', 'LLMs', 'RAG', 'Multi-Modal AI'],
        github: 'https://github.com/z4hid/MASA',
        featured: true,
    },
    {
        title: 'SparkBot',
        description: 'Custom AI chatbot for BrainSpark Digital powered by LLMs, enabling automated customer support and intelligent Q&A.',
        category: 'AI/ML',
        techStack: ['Python', 'LangChain', 'OpenAI API', 'FastAPI'],
        github: 'https://github.com/z4hid/sparkbot',
        featured: true,
    },
    {
        title: 'Email Automation Agent',
        description: 'LLM-based system for email classification and automated response using AI agents for streamlined communication workflows.',
        category: 'Agentic AI',
        techStack: ['Python', 'LLMs', 'AI Agents', 'NLP'],
        github: 'https://github.com/z4hid/email-automation',
        featured: true,
    },
    {
        title: 'BrainSpark Agentic Workflow',
        description: 'Agentic AI workflows that automate complex business processes, reducing manual work by 40% for clients.',
        category: 'Agentic AI',
        techStack: ['Python', 'Agno', 'LLMs', 'Automation'],
        github: 'https://github.com/z4hid/brainspark_agentic_workflow',
        featured: true,
    },
    {
        title: 'Beat-Risk',
        description: 'Machine learning application for predicting heart failure using DVC and Dagshub for data versioning and collaboration.',
        category: 'AI/ML',
        techStack: ['Python', 'Scikit-learn', 'DVC', 'Dagshub'],
        github: 'https://github.com/z4hid/beat-risk',
        featured: false,
    },
    {
        title: 'X-Ray Vision',
        description: 'Binary image classification of X-ray images using PyTorch, NumPy, and OpenCV for medical imaging analysis.',
        category: 'Computer Vision',
        techStack: ['Python', 'PyTorch', 'OpenCV', 'NumPy'],
        github: 'https://github.com/z4hid/x-ray-vision',
        featured: false,
    },
    {
        title: 'DumpwareThreatDetector',
        description: 'AI-powered malware detection system that converts binary files into images and classifies them using deep learning.',
        category: 'Research',
        techStack: ['Python', 'TensorFlow', 'Computer Vision', 'Cybersecurity'],
        github: 'https://github.com/z4hid/DumpwareThreatDetector',
        featured: false,
    },
    {
        title: 'Bangla LLM Applications',
        description: 'Bengali NLP toolkit for fine-tuning Large Language Models with notebooks, code examples, and resources.',
        category: 'AI/ML',
        techStack: ['Python', 'LLMs', 'NLP', 'Fine-tuning'],
        github: 'https://github.com/z4hid/bangla-llm-applications',
        featured: false,
    },
    {
        title: 'Observer Classifier',
        description: 'ML-powered application that automatically categorizes news headlines from The Daily Observer into relevant topics.',
        category: 'AI/ML',
        techStack: ['Python', 'NLP', 'Classification', 'ML'],
        github: 'https://github.com/z4hid/observer-classifier',
        featured: false,
    },
    {
        title: 'QuestBot',
        description: 'Telegram bot leveraging LLMs and AI agents for an interactive, conversational user experience.',
        category: 'Agentic AI',
        techStack: ['Python', 'LLMs', 'Telegram API', 'AI Agents'],
        github: 'https://github.com/z4hid/questbot',
        featured: false,
    },
    {
        title: 'Flower Image Classification',
        description: 'Deep learning model for classifying flower species from photographs using convolutional neural networks.',
        category: 'Computer Vision',
        techStack: ['Python', 'Deep Learning', 'CNN', 'Image Classification'],
        github: 'https://github.com/z4hid/flower-image-classification',
        featured: false,
    },
    {
        title: 'ML Development Pipeline',
        description: 'End-to-end ML pipeline guide covering data prep, training, evaluation, and MLOps best practices.',
        category: 'AI/ML',
        techStack: ['Python', 'MLOps', 'ML Pipeline', 'Best Practices'],
        github: 'https://github.com/z4hid/machine-learning-development-pipeline',
        featured: false,
    },
    {
        title: 'byteX',
        description: 'Full-featured e-commerce platform built with Django including authentication, product catalog, cart, and payments.',
        category: 'Web Development',
        techStack: ['Django', 'PostgreSQL', 'JavaScript', 'HTML/CSS'],
        github: 'https://github.com/z4hid/byteX',
        featured: false,
    },
    {
        title: 'GenAI as Brain Applications',
        description: 'Curated collection of notebooks and micro-apps where LLMs serve as the digital brain for intelligent workflows.',
        category: 'AI/ML',
        techStack: ['Python', 'LLMs', 'Notebooks', 'GenAI'],
        github: 'https://github.com/z4hid/genai-as-brain-applications',
        featured: false,
    },
];

export const categories = ['All', 'Agentic AI', 'AI/ML', 'Computer Vision', 'Web Development', 'Research'] as const;
