from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json
import os
from typing import List, Optional
import asyncio

# --- MOCK IMPORTS FOR ILLUSTRATION ---
# In a real scenario, you'd install these via pip:
# pip install openai pinecone-client uvicorn fastapi python-dotenv
# import openai
# from pinecone import Pinecone

app = FastAPI(title="Portfolio RAG AI Backend")

# Allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://dcam25.github.io"], # Add your frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

# --- RAG configuration placeholders ---
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
# PINECONE_INDEX_NAME = "portfolio-resume-index"

# Initialize Pinecone and OpenAI here when ready
# pc = Pinecone(api_key=PINECONE_API_KEY)
# index = pc.Index(PINECONE_INDEX_NAME)
# client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)

async def search_pinecone_context(query: str) -> str:
    """
    Mock function to simulate querying Pinecone for RAG context.
    Replace with actual Pinecone vector search.
    """
    # 1. Embed the query using OpenAI embeddings
    # query_embedding = await client.embeddings.create(input=query, model="text-embedding-3-small")
    # 2. Query Pinecone
    # results = index.query(vector=query_embedding.data[0].embedding, top_k=3, include_metadata=True)
    # 3. Concatenate text from metadata
    # context = "\n".join([match.metadata["text"] for match in results.matches])
    
    # Mocking standard resume knowledge for the portfolio
    return """
    Dane is a Full-Stack Developer specializing in Next.js, Node.js, CMS Solutions, and E-commerce.
    He works on major projects like PropEdge AI (Real Estate predictive analytics) and Multi-Tenant E-commerce platforms.
    His primary stack includes React, TypeScript, FastAPI, Tailwind CSS, PostgreSQL, and Pinecone.
    Dane's focus is on building scalable, reliable, and testable applications.
    """

async def generate_chat_stream(messages: List[Message]):
    """
    Generator function to stream chunks back to the client in Vercel AI SDK format.
    """
    # Extract the user's latest query
    latest_query = messages[-1].content if messages else ""
    
    # Retrieve RAG context
    context = await search_pinecone_context(latest_query)
    
    # System prompt injecting the RAG context
    system_prompt = f"""You are a helpful AI assistant representing Dane's professional portfolio.
    Use the following context about Dane's experience to answer the user's questions:
    
    CONTEXT:
    {context}
    
    If the answer is not in the context, clearly state that you do not have that specific information, but offer to provide general information about Dane's software development skills. Do not invent facts.
    """
    
    # In a real environment, uncomment this to call OpenAI:
    """
    openai_messages = [{"role": "system", "content": system_prompt}] + [{"role": m.role, "content": m.content} for m in messages]
    
    try:
        stream = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=openai_messages,
            stream=True,
        )
        async for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                # Format exactly as Vercel AI SDK expects `useChat` plain text stream:
                yield f"0:{json.dumps(chunk.choices[0].delta.content)}\n"
    except Exception as e:
        yield f"3:{json.dumps(str(e))}\n"
    """
    
    # --- MOCK STREAM RESPONSE FOR LOCAL TESTING ---
    # Delete this block when actually plugging in your API keys
    yield f"0:{json.dumps('Based on my knowledge base, ')}\n"
    await asyncio.sleep(0.1)
    yield f"0:{json.dumps('Dane is a Full-Stack developer specializing in ')}\n"
    await asyncio.sleep(0.1)
    yield f"0:{json.dumps('Next.js, Node.js, and FastAPI. ')}\n"
    await asyncio.sleep(0.1)
    yield f"0:{json.dumps('He built PropEdge AI and a multi-tenant platform. He uses Pinecone for vector indexing. ')}\n"
    await asyncio.sleep(0.1)
    yield f"0:{json.dumps(f'You just asked: \"{latest_query}\"')}\n"
    

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """
    This endpoint mimics the Next.js App Router streaming endpoint.
    It returns a StreamingResponse using `text/plain` or `text/x-unknown` per Vercel AI specification.
    """
    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages list cannot be empty")
        
    return StreamingResponse(
        generate_chat_stream(request.messages), 
        media_type="text/plain" # The Vercel SDK parses lines starting with 0: as text chunks
    )

if __name__ == "__main__":
    import uvicorn
    # Make sure to run the server on port 8000
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
