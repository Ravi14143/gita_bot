import time
import faiss
import pickle
from tqdm import tqdm
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import torch

class GitaRAGBot:
    def __init__(self):
        print("🔄 Loading embedding model...")
        self.emb_model = SentenceTransformer("all-MiniLM-L6-v2")

        print("🔄 Loading FAISS index and chunks...")
        self.index = faiss.read_index("data/faiss.index")
        with open("data/chunks.pkl", "rb") as f:
            self.chunks = pickle.load(f)

        print("🔄 Loading language model (Flan-T5-Base)...")
        self.tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
        self.model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")

        # Auto-detect device
        self.device = 0 if torch.cuda.is_available() else -1
        self.generator = pipeline("text2text-generation", model=self.model, tokenizer=self.tokenizer, device=self.device)

        print("✅ Bot is ready!")

    def retrieve_context(self, query, k=4):
        query_vector = self.emb_model.encode([query])
        distances, indices = self.index.search(query_vector, k)
        return "\n\n".join([self.chunks[i] for i in indices[0]])

    def ask(self, query):
        print("📚 Retrieving context...", end="", flush=True)
        start_retrieve = time.time()
        context = self.retrieve_context(query)
        print(f" done ({time.time() - start_retrieve:.2f}s)")

        # Create prompt
        prompt = f"""Answer the question using the context below from the Bhagavad Gita and related lectures.

Context:
{context}

Question: {query}
Answer:"""

        # Truncate the prompt if it exceeds model limits (max input = 512 tokens)
        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)

        print("🧠 Generating response...")
        start_gen = time.time()
        outputs = self.model.generate(**inputs, max_new_tokens=150)
        result = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        print(f"⏱️ Generation time: {time.time() - start_gen:.2f}s")

        return result.strip()

if __name__ == "__main__":
    bot = GitaRAGBot()
    print("\n🕉️ Welcome to the Bhagavad Gita Terminal Chatbot!")
    print("Type your question below. Type 'exit' to quit.\n")

    while True:
        query = input("🧘 You: ")
        if query.strip().lower() in {"exit", "quit"}:
            print("👋 Goodbye! May knowledge guide your path.")
            break

        total_start = time.time()
        response = bot.ask(query)
        print(f"\n📜 GitaBot: {response}")
        print(f"⏱️ Total time taken: {time.time() - total_start:.2f}s\n")
