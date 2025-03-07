from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import scanpy as sc
import numpy as np

router = APIRouter(prefix="/api")

# Load the h5ad file
try:
    adata = sc.read_h5ad("data/lmna_inhouse.h5ad")
    print("Successfully loaded scRNA-seq data")
except Exception as e:
    print(f"Error loading h5ad file: {e}")
    raise

@router.get("/expression/{gene}")
async def get_gene_expression(gene: str):
    try:
        if gene not in adata.var_names:
            return {"error": f"Gene {gene} not found in dataset"}
        
        # Get expression values for the gene
        expression_values = adata[:, gene].X.toarray().flatten()
        
        # Get UMAP coordinates
        umap_coords = adata.obsm['X_umap']
        
        # Get cell types if available
        cell_types = adata.obs['cell_type'].tolist() if 'cell_type' in adata.obs else None
        
        return {
            "expression": expression_values.tolist(),
            "umap": umap_coords.tolist(),
            "cellTypes": cell_types,
            "min": float(np.min(expression_values)),
            "max": float(np.max(expression_values)),
            "mean": float(np.mean(expression_values)),
            "median": float(np.median(expression_values))
        }
    except Exception as e:
        return {"error": str(e)}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
