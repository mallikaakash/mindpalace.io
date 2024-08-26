from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llama_cpp import Llama
import logging
from typing import List
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = r"E:\Trabago\ProjectsDev\mindpalace.io\backend\models\llama-7b.ggmlv3.q8_0.bin"
model = Llama(model_path=model_path)

class InferenceRequest(BaseModel):
    prompt: str

class Note(BaseModel):
    content: str

class Bookmark(BaseModel):
    url: str

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@app.get("/")
async def root():
    return {"message": "Welcome to the LLaMa API"}


@app.post("/api/notes")
async def create_note(note: Note):
    # TODO: Save note to database
    return {"message": "Note saved successfully"}

@app.post("/api/bookmarks")
async def create_bookmark(bookmark: Bookmark):
    # TODO: Save bookmark to database
    return {"message": "Bookmark saved successfully"}


@app.post("/api/chat")
@app.get("/api/chat")
async def perform_inference(request: InferenceRequest):
    system_prompt = "Provide accurate and comprehensive answers to this question. Make sure that it is factually correct and the most recent and up to date answer. I would like to know the answer to "
    # full_prompt = f"Human:{system_prompt}.\n \n Query:{request.prompt} \n\n Assisstant:"
    conversation = "\n".join([f"{msg.role}: {msg.content}" for msg in request.messages])
    
    output = model(
        conversation,
        max_tokens=200,
        stop=["Human:", "\n\n"],
        echo=False
    )
    response = output['choices'][0]['text'].strip()
    
    # Remove any leading "Assistant:" if present
    response = response.lstrip("Assistant:").strip()
    
    return {"data":response}

# ... rest of the code ...

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)