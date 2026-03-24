from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json
import os
from typing import List, Optional
import asyncio

from rag import ask_stream

from mangum import Mangum

app = FastAPI(title="Portfolio RAG AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://dcam25.github.io", os.getenv("FRONT_END_URL")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

async def generate_chat_stream(messages: List[Message]):
    # Extract the last user message to pass to our RAG system
    last_user_message = [m for m in messages if m.role == 'user'][-1].content
    
    # Asynchronously iterate over the true text chunks as they are generated
    async for text_chunk in ask_stream(last_user_message):
        if text_chunk:
            yield f'0:{json.dumps(text_chunk)}\n'

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages cannot be empty")
        
    return StreamingResponse(
        generate_chat_stream(request.messages), 
        media_type="text/plain"
    )

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

handler = Mangum(app)