import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_pinecone import PineconeVectorStore, PineconeEmbeddings
from langchain_core.prompts import PromptTemplate

load_dotenv()

SYSTEM_PROMPT = """
You are a helpful AI assistant representing Dane's professional portfolio.
Use the following context about Dane's experience to answer the user's questions:

CONTEXT:
{context}

If the answer is not in the context, clearly state that you do not have that specific information, but offer to provide general information about Dane's software development skills. Do not invent facts.

Question: {input}

Answer:
"""

print("Initializing RAG Backend...")

print("1. Loading embeddings model...")
embeddings = PineconeEmbeddings(model=os.getenv("EMBEDDING_MODEL", "llama-text-embed-v2"))

print("2. Connecting to Pinecone vector database...")
vectorstore = PineconeVectorStore.from_existing_index(index_name=os.getenv("PINECONE_INDEX_NAME"), embedding=embeddings)

print("3. Initializing OpenAI ChatGPT model...")
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

print("4. Setting up prompts and retriever...")
prompt = PromptTemplate.from_template(SYSTEM_PROMPT)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

print("RAG Backend Ready!")

async def ask_stream(question: str):
  # 1. Retrieve the relevant documents from Pinecone asynchronously
  docs = await retriever.ainvoke(question)
  
  # 2. Format the context as a single string
  context_text = "\n\n".join(doc.page_content for doc in docs)
  
  # 3. Stream the response directly using the PromptTemplate + ChatOpenAI
  prompt_value = prompt.format(context=context_text, input=question)
  
  async for chunk in llm.astream(prompt_value):
      yield chunk.content