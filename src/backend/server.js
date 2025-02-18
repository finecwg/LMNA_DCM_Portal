const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// 예제 dataset 목록 (실제 데이터에 맞게 수정)
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
