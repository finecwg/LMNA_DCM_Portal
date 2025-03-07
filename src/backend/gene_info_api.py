from gene_info import GeneInfoQA
import re
import pandas as pd
import io
from typing import Union
from fastapi import APIRouter, FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

router = APIRouter(prefix="/api")

class GeneInput(BaseModel):
    gene: str

@router.post("/")
async def gene_info_post(gene_input: GeneInput):
    gene_info_qa = GeneInfoQA()
    response = gene_info_qa.get_result(gene_input.gene)

    return {
        "gene": gene_input.gene,
        "description": response
    }

@router.get("/gene-info")
async def gene_info_get(gene: str):
    try:
        gene_info_qa = GeneInfoQA()
        response = gene_info_qa.get_result(gene)
        return {
            "gene": gene,
            "description": response,
            "status": "success"
        }
    except Exception as e:
        return {
            "gene": gene,
            "description": str(e),
            "status": "error"
        }

app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Your existing router setup
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)