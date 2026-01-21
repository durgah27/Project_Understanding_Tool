import ollama

def generate_with_ollama(prompt, model="llama3"):
    """
    Generates a response using the Ollama model.
    """
    response = ollama.generate(model=model, prompt=prompt)
    return response['response']
