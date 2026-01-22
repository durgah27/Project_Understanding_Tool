import logging
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from flask import Flask, request, jsonify
from flask_cors import CORS

from file_loader import extract_text_from_file

from rag_engine import chunk_text, build_faiss_index, retrieve_chunks

from llm_engine import generate_with_groq

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Memory stores (for demo). Later we can store permanently in DB.
chunks_store = []
faiss_index = None


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "✅ Backend Running: ExplainMySystem API"})


# ✅ Upload files and build RAG index
@app.route("/upload", methods=["POST"])
def upload_files():
    global chunks_store, faiss_index

    files = request.files.getlist("files")
    if not files:
        return jsonify({"error": "No files uploaded"}), 400

    all_text = ""
    for f in files:
        all_text += f"\n\n--- FILE: {f.filename} ---\n"
        all_text += extract_text_from_file(f)

    # Build chunks + FAISS index
    chunks_store = chunk_text(all_text, chunk_size=800, overlap=150)
    faiss_index = build_faiss_index(chunks_store)

    return jsonify({
        "message": "✅ Knowledge Base built successfully",
        "total_chunks": len(chunks_store)
    })


# ✅ Ask question from project (RAG + LLM)
@app.route("/ask", methods=["POST"])
def ask():
    logger.info(f"Request received: {request.method} {request.path}")
    global chunks_store, faiss_index

    if faiss_index is None:
        return jsonify({"error": "Upload project files first using /upload"}), 400

    data = request.get_json()
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"error": "Question is required"}), 400

    retrieved = retrieve_chunks(question, chunks_store, faiss_index, top_k=3)
    context = "\n\n".join(retrieved)

    prompt = f"""
You are a project understanding assistant.
Answer ONLY using the given PROJECT CONTEXT.
If the answer is not found in context, reply: "Not found in uploaded files."

QUESTION:
{question}

PROJECT CONTEXT:
{context}

Answer in simple and clear English.
"""

    answer = generate_with_groq(prompt, model="llama3-8b-8192")
    return jsonify({"answer": answer})


# ✅ One-click report generator (Summary/Modules/Workflow/Viva etc.)
@app.route("/generate", methods=["POST"])
def generate_docs():
    logger.info(f"Request received: {request.method} {request.path}")
    global chunks_store, faiss_index

    if faiss_index is None:
        return jsonify({"error": "Upload project files first using /upload"}), 400

    data = request.get_json()
    task = data.get("task", "").strip()

    if not task:
        return jsonify({"error": "Task is required"}), 400

    retrieved = retrieve_chunks(task, chunks_store, faiss_index, top_k=3)
    context = "\n\n".join(retrieved)

    prompt = f"""
You are an AI assistant for students.
Generate output ONLY from the project context below.

TASK:
{task}

PROJECT CONTEXT:
{context}

Give the answer in structured format with headings and bullet points.
"""

    result = generate_with_groq(prompt, model="llama3-8b-8192")
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
