import React, { useState, useEffect } from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function ExpressionVisualization() {
  const [expMeta, setExpMeta] = useState(null);
  const [nonzero, setNonzero] = useState(null);
  const [meta, setMeta] = useState(null);
  const [selectedGene, setSelectedGene] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expMetaRes, nonzeroRes, metaRes] = await Promise.all([
          axios.get("/api/expression_meta"),
          axios.get("/api/nonzero"),
          axios.get("/api/meta"),
        ]);
        setExpMeta(expMetaRes.data);
        setNonzero(nonzeroRes.data);
        setMeta(metaRes.data);
      } catch (err) {
        console.error("Error fetching expression data", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (expMeta && nonzero && meta && selectedGene) {
      // nonzero 데이터의 i, j 값은 1-indexed라고 가정 (R summary() 결과)
      const geneIndex = expMeta.genes.indexOf(selectedGene) + 1;
      const filtered = nonzero.filter((entry) => entry.i === geneIndex);
      const dataPoints = filtered.map((entry) => {
        const cellId = expMeta.cells[entry.j - 1];
        const cellMeta = meta[cellId];
        const x = cellMeta && cellMeta.UMAP_1 ? cellMeta.UMAP_1 : Math.random() * 2 - 1;
        const y = cellMeta && cellMeta.UMAP_2 ? cellMeta.UMAP_2 : Math.random() * 2 - 1;
        return { x, y, expression: entry.x };
      });

      const chartDataObj = {
        datasets: [
          {
            label: `Expression of ${selectedGene}`,
            data: dataPoints,
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
        ],
      };
      setChartData(chartDataObj);
    }
  }, [expMeta, nonzero, meta, selectedGene]);

  if (!expMeta || !nonzero || !meta) {
    return <div>Loading expression data...</div>;
  }

  return (
    <section className="section">
      <div className="container">
        <h3>CellxGene - Gene Expression Visualization</h3>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="gene-select">Select Gene:</label>
          <select
            id="gene-select"
            value={selectedGene}
            onChange={(e) => setSelectedGene(e.target.value)}
          >
            <option value="">-- Choose a gene --</option>
            {expMeta.genes.map((gene) => (
              <option key={gene} value={gene}>
                {gene}
              </option>
            ))}
          </select>
        </div>
        {selectedGene && chartData ? (
          <Scatter
            data={chartData}
            options={{
              responsive: true,
              scales: {
                x: {
                  type: "linear",
                  position: "bottom",
                  title: { display: true, text: "UMAP 1" },
                },
                y: { title: { display: true, text: "UMAP 2" } },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `Expression: ${context.raw.expression}`,
                  },
                },
                legend: { position: "top" },
              },
            }}
          />
        ) : (
          <p>Please select a gene to visualize its expression.</p>
        )}
      </div>
    </section>
  );
}

export default ExpressionVisualization;