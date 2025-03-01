 from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import scanpy as sc
import pandas as pd
import numpy as np
from pydantic import BaseModel
import os
from typing import List, Dict, Any, Optional

app = FastAPI()

# Add CORS middleware to allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load datasets
spatial_data_path = "data/lmna_Zone_mod.h5ad"
scrna_data_path = "data/lmna_inhouse.h5ad"

# Check if data files exist
if not os.path.exists(spatial_data_path) or not os.path.exists(scrna_data_path):
    raise FileNotFoundError(f"Data files not found: {spatial_data_path} or {scrna_data_path}")

try:
    # Load data
    spatial_data = sc.read_h5ad(spatial_data_path)
    scrna_data = sc.read_h5ad(scrna_data_path)
    print("Data loaded successfully")
except Exception as e:
    print(f"Error loading data: {e}")
    raise

@app.get("/")
def read_root():
    return {"message": "LMNA-DCM Atlas API is running"}

@app.get("/api/datasets")
def get_datasets():
    """Return metadata about available datasets"""
    datasets = [
        {
            "id": "spatial",
            "name": "Spatial Transcriptomics",
            "description": "Spatial gene expression data from LMNA-DCM heart tissue",
            "samples": len(spatial_data.obs["sample"].unique()),
            "spots": spatial_data.n_obs,
            "genes": spatial_data.n_vars,
            "dataType": "10x Visium"
        },
        {
            "id": "scrna",
            "name": "Single-cell RNA-seq",
            "description": "Single-cell transcriptomics from LMNA-DCM samples",
            "samples": len(scrna_data.obs["sample"].unique()) if "sample" in scrna_data.obs else "N/A",
            "cells": scrna_data.n_obs,
            "genes": scrna_data.n_vars,
            "dataType": "10x Chromium"
        }
    ]
    return datasets

@app.get("/api/spatial/metadata")
def get_spatial_metadata():
    """Return metadata for spatial dataset"""
    try:
        # Extract relevant metadata
        obs_columns = spatial_data.obs.columns.tolist()
        var_columns = spatial_data.var.columns.tolist()
        
        # Get sample info
        samples = spatial_data.obs["sample"].unique().tolist() if "sample" in spatial_data.obs else []
        
        # Get cell type info if available
        cell_types = spatial_data.obs["cell_type"].unique().tolist() if "cell_type" in spatial_data.obs else []
        
        return {
            "observationColumns": obs_columns,
            "variableColumns": var_columns,
            "samples": samples,
            "cellTypes": cell_types,
            "totalSpots": spatial_data.n_obs,
            "totalGenes": spatial_data.n_vars
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching spatial metadata: {str(e)}")

@app.get("/api/scrna/metadata")
def get_scrna_metadata():
    """Return metadata for scRNA-seq dataset"""
    try:
        # Extract relevant metadata
        obs_columns = scrna_data.obs.columns.tolist()
        var_columns = scrna_data.var.columns.tolist()
        
        # Get sample info
        samples = scrna_data.obs["sample"].unique().tolist() if "sample" in scrna_data.obs else []
        
        # Get cell type info if available
        cell_types = scrna_data.obs["cell_type"].unique().tolist() if "cell_type" in scrna_data.obs else []
        
        return {
            "observationColumns": obs_columns,
            "variableColumns": var_columns,
            "samples": samples,
            "cellTypes": cell_types,
            "totalCells": scrna_data.n_obs,
            "totalGenes": scrna_data.n_vars
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching scRNA-seq metadata: {str(e)}")

@app.get("/api/expression/{dataset}/{gene}")
def get_gene_expression(dataset: str, gene: str):
    """Return expression data for a specific gene"""
    try:
        if dataset == "spatial":
            data = spatial_data
        elif dataset == "scrna":
            data = scrna_data
        else:
            raise HTTPException(status_code=404, detail=f"Dataset {dataset} not found")
        
        # Check if gene exists
        if gene not in data.var_names:
            return {"error": f"Gene {gene} not found in dataset"}
        
        # Get expression data
        expr_values = data[:, gene].X.toarray().flatten() if isinstance(data[:, gene].X, np.ndarray) else data[:, gene].X.flatten()
        
        # Get UMAP coordinates if available
        umap_coords = None
        if "X_umap" in data.obsm:
            umap_coords = data.obsm["X_umap"].tolist()
        
        # Get cell type annotations if available
        cell_types = None
        if "cell_type" in data.obs:
            cell_types = data.obs["cell_type"].tolist()
        
        return {
            "gene": gene,
            "dataset": dataset,
            "expression": expr_values.tolist(),
            "mean": float(np.mean(expr_values)),
            "median": float(np.median(expr_values)),
            "min": float(np.min(expr_values)),
            "max": float(np.max(expr_values)),
            "umap": umap_coords,
            "cellTypes": cell_types
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching gene expression: {str(e)}")

@app.get("/api/visualizations/celltypes")
def get_cell_type_visualization():
    """Return cell type UMAP visualization data"""
    try:
        # Get UMAP coordinates
        if "X_umap" not in scrna_data.obsm:
            raise HTTPException(status_code=404, detail="UMAP coordinates not found in dataset")
        
        umap_coords = scrna_data.obsm["X_umap"]
        
        # Get cell type annotations
        if "cell_type" not in scrna_data.obs:
            raise HTTPException(status_code=404, detail="Cell type annotations not found in dataset")
        
        cell_types = scrna_data.obs["cell_type"].tolist()
        
        # Get unique cell types for coloring
        unique_cell_types = scrna_data.obs["cell_type"].unique().tolist()
        
        # Create result
        result = {
            "coordinateSystem": "UMAP",
            "points": [
                {
                    "x": float(umap_coords[i, 0]),
                    "y": float(umap_coords[i, 1]),
                    "cellType": cell_types[i]
                } for i in range(len(cell_types))
            ],
            "cellTypes": unique_cell_types
        }
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching cell type visualization: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)