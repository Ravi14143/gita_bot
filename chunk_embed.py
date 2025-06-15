# scripts/2_chunk_and_embed.py
import os
import pickle
import faiss
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from tqdm import tqdm

TEXT_DIR = "processed"
CHUNKS_FILE = "data/chunks.pkl"
FAISS_INDEX_FILE = "data/faiss.index"

def chunk_text(text, chunk_size=500, overlap=50):
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=overlap)
    return splitter.split_text(text)

def build_faiss_index():
    model = SentenceTransformer("all-MiniLM-L6-v2")
    chunks = []
    for file in tqdm(os.listdir(TEXT_DIR)):
        if file.endswith(".txt"):
            with open(os.path.join(TEXT_DIR, file), "r", encoding="utf-8") as f:
                content = f.read()
                chunks.extend(chunk_text(content))

    # Embed all chunks
    embeddings = model.encode(chunks, show_progress_bar=True)

    # Store in FAISS
    dim = embeddings[0].shape[0]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    # Save index + chunks
    os.makedirs("data", exist_ok=True)
    faiss.write_index(index, FAISS_INDEX_FILE)
    with open(CHUNKS_FILE, "wb") as f:
        pickle.dump(chunks, f)

if __name__ == "__main__":
    build_faiss_index()
