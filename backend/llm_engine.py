import os
import requests
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def pick_working_model():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("❌ GROQ_API_KEY not set")

    url = "https://api.groq.com/openai/v1/models"
    headers = {"Authorization": f"Bearer {api_key}"}

    r = requests.get(url, headers=headers, timeout=20)
    r.raise_for_status()

    models = [m["id"] for m in r.json().get("data", [])]

    # ✅ Pick the best available model automatically
    preferred = [
        "llama-3.1-8b-instant",
        "llama-3.1-70b-versatile",
        "mixtral-8x7b-32768",
        "gemma2-9b-it",
    ]

    for m in preferred:
        if m in models:
            return m

    if models:
        return models[0]

    raise RuntimeError("❌ No Groq models found")


def generate_with_groq(prompt):
    model = pick_working_model()

    res = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful AI project assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=800,
    )

    return res.choices[0].message.content.strip()
