import fitz  # PyMuPDF

def extract_text_from_file(file_storage):
    filename = file_storage.filename.lower()

    if filename.endswith(".pdf"):
        pdf = fitz.open(stream=file_storage.read(), filetype="pdf")
        text = ""
        for page in pdf:
            text += page.get_text()
        return text

    return file_storage.read().decode("utf-8", errors="ignore")
