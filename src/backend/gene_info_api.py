from gene_info import GeneInfoQA
import re
import pandas as pd
import io
from typing import Union
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

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

@router.get("/")
async def gene_info_get(gene: str):
    gene_info_qa = GeneInfoQA()
    response = gene_info_qa.get_result(gene)

    return {
        "gene": gene,
        "description": response
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(router, host="0.0.0.0", port=8000)