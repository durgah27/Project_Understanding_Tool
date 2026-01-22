import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Fast CPU embedding model
embedder = SentenceTransformer("all-MiniLM-L6-v2")

def chunk_text(text, chunk_size=800, overlap=150):
    """
    Splits large text into overlapping chunks for RAG.
    """
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - overlap

        if start < 0:
            start = 0

    return chunks

def build_faiss_index(chunks):
    """
    Creates a FAISS vector index from chunk embeddings.
    """
    embeddings = embedder.encode(chunks, convert_to_numpy=True).astype("float32")

    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    return index

def retrieve_chunks(query, chunks, index, top_k=5):
    """
    Retrieves top_k relevant chunks for a given query.
    """
    q_emb = embedder.encode([query], convert_to_numpy=True).astype("float32")
    distances, indices = index.search(q_emb, top_k)

    results = []
    for i in indices[0]:
        if 0 <= i < len(chunks):
            results.append(chunks[i])

    return results
