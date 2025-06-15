import time
import faiss
import pickle
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

class GitaRAGBot:
    def __init__(self):
        self.emb_model = SentenceTransformer("all-MiniLM-L6-v2")
        self.index = faiss.read_index("data/faiss.index")
        with open("data/chunks.pkl", "rb") as f:
            self.chunks = pickle.load(f)
        self.tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
        self.model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = self.model.to(self.device)

    def retrieve_context(self, query, k=4):
        query_vector = self.emb_model.encode([query])
        distances, indices = self.index.search(query_vector, k)
        return "\n\n".join([self.chunks[i] for i in indices[0]])

    def ask(self, query):
        context = self.retrieve_context(query)
        prompt = f"""Answer the question using the context below from the Bhagavad Gita and related lectures.\n\nContext:\n{context}\n\nQuestion: {query}\nAnswer:"""
        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512).to(self.device)
        outputs = self.model.generate(**inputs, max_new_tokens=150)
        result = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return result.strip()
