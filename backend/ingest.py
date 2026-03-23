import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_pinecone import PineconeVectorStore, PineconeEmbeddings
from langchain_core.documents import Document

load_dotenv()

# DATA_DIR = Path(__file__).parent / "data"
DOCS_DIR = Path("../docs")

if not DOCS_DIR.exists():
    DOCS_DIR.mkdir()

print(f"Docs directory: {DOCS_DIR}")

# 1. Load documents
def load_docs():
  documents = []
  for md_file in DOCS_DIR.rglob("*.md"):
      with open(md_file, "r", encoding="utf-8") as f:
          content = f.read()
          source_path = str(md_file.relative_to(DOCS_DIR))
          documents.append(Document(page_content=content, metadata={"source": source_path}))
  return documents

def clear_index():
    from pinecone import Pinecone
    print("Clearing all existing records from Pinecone...")
    
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index = pc.Index(os.getenv("PINECONE_INDEX_NAME"))
    
    try:
        # Serverless Pinecone indexes require the explicit namespace="" to delete all
        index.delete(delete_all=True, namespace="")
        print("Index successfully cleared!")
    except Exception as e:
        print(f"Note: {e}")

def ingest():
  clear_index()
  print("Loading documents...")
  documents = load_docs()
  print(f"Loaded {len(documents)} documents")

  embeddings = PineconeEmbeddings(model=os.getenv("EMBEDDING_MODEL", "llama-text-embed-v2"))
  print("Embeddings created")

  print("Upserting to Pinecone...")
  # Assign the file's relative path as the document ID to prevent duplicates
  doc_ids = [doc.metadata["source"] for doc in documents]
  
  vectorstore = PineconeVectorStore.from_documents(
      documents, 
      embeddings, 
      index_name=os.getenv("PINECONE_INDEX_NAME"),
      ids=doc_ids
  )
  print("Done! All docs ingested")

if __name__ == "__main__":
  ingest()