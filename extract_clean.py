# scripts/1_extract_and_clean.py
import os
from PyPDF2 import PdfReader
import re
from tqdm import tqdm

PDF_DIR = "data"
TEXT_DIR = "processed"

def clean_text(text):
    # Basic cleaning: remove headers/footers, extra whitespace
    text = re.sub(r"\n+", "\n", text)
    text = re.sub(r"Page \d+ of \d+", "", text)
    text = re.sub(r"\s{2,}", " ", text)
    return text.strip()

def extract_all_pdfs():
    os.makedirs(TEXT_DIR, exist_ok=True)
    for filename in tqdm(os.listdir(PDF_DIR)):
        if filename.endswith(".pdf"):
            reader = PdfReader(os.path.join(PDF_DIR, filename))
            text = ""
            for page in reader.pages:
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text += clean_text(page_text) + "\n"
                except:
                    continue
            # Save cleaned text
            base_name = os.path.splitext(filename)[0]
            with open(f"{TEXT_DIR}/{base_name}.txt", "w", encoding="utf-8") as f:
                f.write(text)

if __name__ == "__main__":
    extract_all_pdfs()
