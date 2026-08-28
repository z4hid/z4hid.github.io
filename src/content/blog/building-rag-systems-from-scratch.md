---
title: 'Building Production-Ready RAG Systems from Scratch'
description: 'A step-by-step guide to building production RAG pipelines with Python, ChromaDB, and LangChain.'
pubDate: 2025-11-20
updatedDate: 2026-03-19
tags: ['RAG', 'LLMs', 'Python', 'Vector Search']
---

Retrieval-Augmented Generation (RAG) is the technique of grounding LLM responses in external data by retrieving relevant documents at query time and passing them as context. Instead of relying on what the model memorized during training, RAG feeds it real, up-to-date information from your own data sources — making responses accurate, verifiable, and far less prone to hallucination.

A 2024 study by Microsoft Research found that RAG reduced hallucination rates by 42% compared to vanilla LLM calls across knowledge-intensive tasks. For enterprise applications dealing with proprietary data, RAG is often the only viable approach — fine-tuning an LLM on your company's documents is expensive, slow, and creates a model that can't be updated without retraining.

I've built multiple RAG systems in production — from internal knowledge bases that replaced clunky FAQ pages to customer support bots that pull answers from thousands of product documents. This guide walks through the full pipeline, from raw documents to deployed system, with the practical lessons I learned along the way.

## Why RAG Matters

LLMs are remarkable at language understanding and generation, but they have three fundamental limitations that RAG directly addresses:

**Knowledge cutoff.** Every model has a training data cutoff date. GPT-4o's training data ends in late 2023. Claude's in early 2024. They literally don't know about anything that happened after that date. RAG lets you inject current information at query time.

**Hallucination.** When an LLM doesn't have the answer, it doesn't say "I don't know" — it fabricates a plausible-sounding response. With RAG, the model generates answers _from retrieved documents_, and you can trace every claim back to its source.

**No access to private data.** Your company's internal documentation, customer records, product specs, and proprietary research don't exist in any public LLM. RAG connects the model to your specific data without exposing that data during training.

| Problem                     | Without RAG                            | With RAG                             |
| --------------------------- | -------------------------------------- | ------------------------------------ |
| "What's our refund policy?" | Makes up a policy                      | Retrieves the actual policy document |
| "Summarize Q4 2025 revenue" | Can't — data doesn't exist in training | Pulls from your financial reports    |
| "What changed in v3.2?"     | Hallucinates release notes             | Retrieves real changelog             |

## The RAG Pipeline

The full pipeline has two phases: **indexing** (done once or periodically) and **querying** (done per user request).

```
INDEXING:   Documents → Load → Chunk → Embed → Store in Vector DB
QUERYING:   User Query → Embed → Search Vector DB → Retrieve Top-K → Generate Response
```

Let's walk through each step.

## Step 1: Document Loading

Before you can search your documents, you need to get them into a processable format. Real-world data comes in messy forms — PDFs, Word documents, web pages, Markdown files, Confluence wikis, Notion databases.

```python
from langchain_community.document_loaders import (
    PyPDFLoader,
    UnstructuredMarkdownLoader,
    WebBaseLoader,
)

# Load from multiple sources
pdf_docs = PyPDFLoader("product_manual.pdf").load()
md_docs = UnstructuredMarkdownLoader("docs/api.md").load()
web_docs = WebBaseLoader("https://docs.example.com/guide").load()

all_docs = pdf_docs + md_docs + web_docs
```

A few things I learned the hard way:

- **PDF extraction quality varies wildly.** Scanned PDFs need OCR. Tables in PDFs rarely extract cleanly. Always inspect a sample of loaded documents before building the rest of the pipeline.
- **Preserve metadata.** Every document should carry its source URL, filename, and section heading. You'll need this later for citations and debugging.
- **Clean the data.** Remove headers, footers, page numbers, and boilerplate text. Noise in your documents becomes noise in your retrieval results.

## Step 2: Chunking

LLMs have context windows, and vector search works on chunks — not entire documents. You need to break your documents into pieces that are small enough to be relevant but large enough to carry meaningful context.

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=200,
    separators=["\n\n", "\n", ". ", " "],
    length_function=len,
)

chunks = splitter.split_documents(all_docs)
print(f"Split {len(all_docs)} documents into {len(chunks)} chunks")
```

### Chunking Strategy Matters More Than You Think

Chunk size is the single most impactful parameter in a RAG system. I've seen it make or break retrieval quality.

| Chunk Size          | Pros                                  | Cons                           | Best For                          |
| ------------------- | ------------------------------------- | ------------------------------ | --------------------------------- |
| **200–400 tokens**  | Precise retrieval, less noise         | May lose context around answer | FAQ-style Q&A, short answers      |
| **500–800 tokens**  | Good balance of context and precision | Standard trade-off             | General knowledge bases           |
| **800–1500 tokens** | Rich context per chunk                | Retrieval may be less focused  | Long-form analysis, summarization |

**My default:** 800 characters with 200 character overlap. This gives enough context per chunk while keeping retrieval focused. Adjust based on your content — if your documents have short, self-contained sections (like API docs), go smaller. If they have long, flowing arguments (like research papers), go larger.

**Semantic chunking** is an alternative that splits based on meaning rather than fixed character counts. It uses embeddings to detect topic shifts and creates chunks at natural boundaries. Libraries like LangChain's `SemanticChunker` support this, though it's slower and requires more tuning.

## Step 3: Embedding

Embedding converts text into dense vector representations — numerical arrays that capture semantic meaning. Similar texts produce similar vectors, which is how retrieval works.

```python
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

sample_text = "How do I reset my password?"
vector = embeddings.embed_query(sample_text)
print(f"Dimension: {len(vector)}")  # 1536 for text-embedding-3-small
```

### Choosing an Embedding Model

The embedding model determines how well your system understands query-to-document relevance. The wrong model means relevant documents won't surface, no matter how good the rest of your pipeline is.

| Model                               | Dimensions | Cost               | Quality | Best For                          |
| ----------------------------------- | ---------- | ------------------ | ------- | --------------------------------- |
| **text-embedding-3-small** (OpenAI) | 1536       | $0.02/1M tokens    | Good    | Most applications, cost-sensitive |
| **text-embedding-3-large** (OpenAI) | 3072       | $0.13/1M tokens    | Better  | Higher accuracy requirements      |
| **all-MiniLM-L6-v2** (open source)  | 384        | Free (self-hosted) | Decent  | Privacy requirements, low budget  |
| **BGE-large-en-v1.5** (BAAI)        | 1024       | Free (self-hosted) | Strong  | Self-hosted, competitive quality  |
| **Cohere embed-v3**                 | 1024       | $0.10/1M tokens    | Strong  | Multi-language support            |

For most projects, I start with `text-embedding-3-small` — it's cheap, fast, and good enough. If retrieval accuracy is critical and budget allows, `text-embedding-3-large` is worth the upgrade.

## Step 4: Vector Storage

Vectors need a home. A vector database stores your embeddings and enables fast similarity search across millions of vectors.

```python
from langchain_community.vectorstores import Chroma

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    collection_name="knowledge_base",
    persist_directory="./chroma_db",
)
```

### Picking a Vector Database

| Database     | Type                 | Max Vectors | Best For                        |
| ------------ | -------------------- | ----------- | ------------------------------- |
| **Chroma**   | Embedded (local)     | ~1M         | Prototyping, small projects     |
| **FAISS**    | In-memory library    | Millions    | Research, offline search        |
| **Pinecone** | Managed cloud        | Billions    | Production, zero-ops            |
| **Weaviate** | Self-hosted/cloud    | Billions    | Hybrid search, filters          |
| **Qdrant**   | Self-hosted/cloud    | Billions    | Performance-critical, filtering |
| **pgvector** | PostgreSQL extension | Millions    | Already using PostgreSQL        |

**My recommendation:** Start with **Chroma** for prototyping. Move to **Pinecone** or **Qdrant** when you need reliability, scale, and real-time updates in production. If your team already runs PostgreSQL, **pgvector** avoids adding another service to your infrastructure.

## Step 5: Retrieval

When a user asks a question, you embed their query and search for the most similar chunks in your vector store.

```python
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 5},
)

query = "How do I handle authentication in the API?"
relevant_docs = retriever.invoke(query)

for i, doc in enumerate(relevant_docs):
    print(f"\n--- Chunk {i+1} ---")
    print(f"Source: {doc.metadata.get('source', 'unknown')}")
    print(doc.page_content[:200])
```

### Beyond Basic Similarity Search

Vanilla similarity search works, but production RAG systems benefit from several improvements:

**Hybrid search** combines semantic search (embeddings) with keyword search (BM25). Some queries need exact term matching ("error code ERR_AUTH_429") while others need semantic understanding ("why can't users log in"). Hybrid search gives you both.

```python
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever

bm25_retriever = BM25Retriever.from_documents(chunks, k=5)
vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

hybrid_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, vector_retriever],
    weights=[0.3, 0.7],
)
```

**Re-ranking** scores the retrieved documents by actual relevance to the query, rather than just vector similarity. Cohere's re-ranker and cross-encoder models from Sentence Transformers are popular choices. In my experience, re-ranking improves answer quality by 15–25% with minimal latency overhead.

**Metadata filtering** narrows the search space before similarity matching. If a user asks about "API v3 authentication," you can filter to only chunks from the v3 documentation rather than searching across all versions.

## Step 6: Generation

The final step combines the retrieved context with the user's question and passes both to the LLM for answer generation.

```python
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain

llm = ChatOpenAI(model="gpt-4o", temperature=0)

prompt = ChatPromptTemplate.from_template("""
Answer the question based only on the provided context.
If the context doesn't contain enough information, say so honestly.
Always cite which source document your answer comes from.

Context:
{context}

Question: {input}

Answer:
""")

chain = create_stuff_documents_chain(llm, prompt)

response = chain.invoke({
    "input": "How do I handle authentication?",
    "context": relevant_docs,
})

print(response)
```

The prompt design matters a lot here. A few principles I follow:

- **Tell the model to only use the provided context.** This dramatically reduces hallucination.
- **Ask for source citations.** If the model can point to which document it used, you get verifiability for free.
- **Set temperature to 0 for factual Q&A.** You want deterministic, consistent answers — not creative riffs.
- **Handle the "I don't know" case explicitly.** If the retrieved context doesn't answer the question, the model should say so rather than guessing.

## Evaluating Your RAG System

Building a RAG pipeline is one thing. Knowing whether it actually works well is another. You need metrics for both retrieval quality and generation quality.

### Retrieval Metrics

- **Recall@K** — Out of all relevant chunks, how many did you retrieve in the top K results? Aim for >80%.
- **Precision@K** — Of the K chunks retrieved, how many were actually relevant? Higher is better, but some noise is normal.
- **Mean Reciprocal Rank (MRR)** — How high did the first relevant result appear? 1.0 means the top result was relevant.

### Generation Metrics

- **Faithfulness** — Does the generated answer match the retrieved context? (Not hallucinated.)
- **Relevance** — Does the answer actually address the user's question?
- **Completeness** — Does the answer cover all aspects of the question?

Tools like [RAGAS](https://docs.ragas.io/) automate much of this evaluation and produce scores for faithfulness, answer relevance, and context precision.

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision

result = evaluate(
    dataset=eval_dataset,
    metrics=[faithfulness, answer_relevancy, context_precision],
)
print(result)
```

## Production Deployment Tips

After deploying several RAG systems, here are the patterns that separate demos from reliable products:

**1. Index updates need a strategy.** Your source documents change. Set up a pipeline to detect changes, re-embed affected chunks, and update the vector store. For most applications, a nightly batch job works. For real-time requirements, use an event-driven pipeline triggered by document changes.

**2. Cache frequent queries.** If 50 users ask the same question in an hour, you don't need to run retrieval and generation 50 times. A semantic cache (matching similar-but-not-identical queries) reduces latency and cost.

**3. Log everything.** For each request, log the query, retrieved chunks, re-ranking scores, final prompt, generated answer, and latency. When a user reports a wrong answer, you need to diagnose whether the problem was retrieval (wrong documents found), generation (right documents, wrong answer), or data (the source document itself was wrong).

**4. Set context length limits.** Stuffing 20 chunks into the LLM's context window is expensive and counterproductive. More context doesn't always mean better answers — it can confuse the model. I typically pass 3–5 chunks of ~800 characters each.

**5. Handle edge cases.** What happens when no relevant documents are found? When the user asks something completely outside your knowledge base? When the vector store is temporarily unavailable? Define fallback behaviors for all of these.

## Putting It Together

RAG is one of the most practical ways to make LLMs useful for real business problems. The technology is mature, the tooling is solid, and the architecture is well-understood.

Start with the simplest pipeline that works — load documents, chunk them, embed and store them, retrieve on query, and generate answers. Measure retrieval quality with recall@K and generation quality with faithfulness scores. Then iterate: tune chunk sizes, add hybrid search, implement re-ranking, and build caching.

If you're building AI agents that need knowledge access, RAG is typically how you give them long-term memory. Check out my guide on [Getting Started with Agentic AI](/blog/getting-started-with-agentic-ai) for the full picture on building intelligent systems that plan, reason, and act.

## Frequently Asked Questions

**What is RAG in simple terms?**
RAG (Retrieval-Augmented Generation) is a technique that makes AI models smarter by letting them look up information from your documents before answering a question. Instead of relying on what the model memorized during training, it searches your data for relevant context and uses that to generate accurate, grounded responses.

**How is RAG different from fine-tuning an LLM?**
Fine-tuning changes the model's weights by training on your data — it's expensive, slow, and the model can't be updated without retraining. RAG keeps the model as-is and retrieves relevant information at query time from an external database. RAG is cheaper, faster to set up, easier to update, and the data sources are transparent. Most production applications start with RAG; fine-tuning is reserved for cases where you need the model to learn a specific style or behavior that RAG can't provide.

**What chunk size should I use for RAG?**
There's no universal answer. Start with 500–800 characters with 150–200 character overlap. If your content is structured (API docs, FAQs), try smaller chunks of 200–400 characters. If your content is long-form (research papers, reports), try 800–1500 characters. The best approach is to test multiple sizes against your evaluation dataset and measure recall@K and answer quality.

**Which vector database should I use?**
For prototyping, use Chroma (runs locally, no setup). For production, Pinecone or Qdrant offer managed hosting, high reliability, and real-time updates. If you already run PostgreSQL, pgvector avoids adding infrastructure. The right choice depends on your scale requirements, team expertise, and existing tech stack.

**How do I know if my RAG system is working well?**
Measure two things: retrieval quality (are the right documents being found?) and generation quality (are the answers accurate and faithful to the source documents?). Use recall@K for retrieval and faithfulness scores for generation. The RAGAS library automates both. Aim for >80% recall@5 and >0.85 faithfulness score as starting benchmarks.
