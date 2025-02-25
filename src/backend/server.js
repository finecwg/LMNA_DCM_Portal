const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// 예제 dataset 목록
const datasets = [
  {
    id: 1,
    name: "LMNA-DCM Sample 1",
    links: {
      spatial: "path/to/LMNA-DCM_Sample1_spatial.h5ad",
      scRNA: "path/to/LMNA-DCM_Sample1_scRNAseq.h5ad",
      scATAC: "path/to/LMNA-DCM_Sample1_scATACseq.h5ad",
      details: "/details_sample1",
    },
  },
  {
    id: 2,
    name: "LMNA-DCM Sample 2",
    links: {
      spatial: "path/to/LMNA-DCM_Sample2_spatial.h5ad",
      scRNA: "path/to/LMNA-DCM_Sample2_scRNAseq.h5ad",
      scATAC: "path/to/LMNA-DCM_Sample2_scATACseq.h5ad",
      details: "/details_sample2",
    },
  },
];

app.get("/api/datasets", (req, res) => {
  res.json(datasets);
});

// data 폴더는 프로젝트 루트에 위치하므로 __dirname에서 두 단계 상위로 이동합니다.
const dataDir = path.join(__dirname, "../../data");

// expression_meta.json (유전자 목록, 셀 목록)
app.get("/api/expression_meta", (req, res) => {
  const filePath = path.join(dataDir, "expression_meta.json");
  fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error reading expression_meta.json:", err);
      return res
        .status(500)
        .json({ error: "Failed to load expression meta data" });
    }
    try {
      res.json(JSON.parse(fileData));
    } catch (e) {
      console.error("JSON parse error:", e);
      res
        .status(500)
        .json({ error: "Invalid JSON format in expression_meta.json" });
    }
  });
});

// nonzero.json (sparse matrix의 non-zero 값들)
app.get("/api/nonzero", (req, res) => {
  const filePath = path.join(dataDir, "nonzero.json");
  fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error reading nonzero.json:", err);
      return res
        .status(500)
        .json({ error: "Failed to load nonzero expression data" });
    }
    try {
      res.json(JSON.parse(fileData));
    } catch (e) {
      console.error("JSON parse error:", e);
      res.status(500).json({ error: "Invalid JSON format in nonzero.json" });
    }
  });
});

// meta.json (각 셀의 메타데이터: 클러스터, UMAP 좌표 등)
app.get("/api/meta", (req, res) => {
  const filePath = path.join(dataDir, "meta.json");
  fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error reading meta.json:", err);
      return res.status(500).json({ error: "Failed to load meta data" });
    }
    try {
      res.json(JSON.parse(fileData));
    } catch (e) {
      console.error("JSON parse error:", e);
      res.status(500).json({ error: "Invalid JSON format in meta.json" });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
