from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
import httpx
import json
from typing import Optional
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Groq API key from environment variable
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
if not GROQ_API_KEY:
    print("Warning: GROQ_API_KEY is not set. Gene info feature will not work.")

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

class GeneInfoRequest(BaseModel):
    gene: str

class GeneInfoResponse(BaseModel):
    gene: str
    description: str
    source: str = "Groq LLM"

async def get_gene_information(gene: str) -> str:
    """Query Groq LLM API to get information about a gene"""
    if not GROQ_API_KEY:
        return "Gene information unavailable. API key not configured."
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Construct the prompt
    prompt = f"""Provide a concise 1-2 sentence description of the gene {gene} in the context of cardiac function or disease. 
    Focus only on its role, function, and relevance to heart conditions especially cardiomyopathy if relevant.
    Keep the response under 100 words and be factual."""
    
    data = {
        "model": "llama3-70b-8192",  # Or specify your preferred Groq model
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.2,
        "max_tokens": 150
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                GROQ_API_URL,
                headers=headers,
                json=data,
                timeout=30.0
            )
            
            if response.status_code != 200:
                return f"Error retrieving gene information. API returned status {response.status_code}"
            
            result = response.json()
            gene_info = result["choices"][0]["message"]["content"].strip()
            return gene_info
    except Exception as e:
        return f"Error retrieving gene information: {str(e)}"

@app.get("/api/gene-info/{gene}")
async def gene_info(gene: str):
    """Get information about a specific gene"""
    try:
        description = await get_gene_information(gene)
        return {"gene": gene, "description": description}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching gene information: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("gene_info:app", host="0.0.0.0", port=5001, reload=True)
