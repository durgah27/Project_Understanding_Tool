import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_with_groq(prompt, model="llama3-8b-8192"):
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful AI project assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=800
    )
    return response.choices[0].message.content.strip()
