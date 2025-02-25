import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import M from "materialize-css";

function ExpressionVisualization() {
  const [expMeta, setExpMeta] = useState(null);
  const [nonzero, setNonzero] = useState(null);
  const [meta, setMeta] = useState(null);
  const [selectedGene, setSelectedGene] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedGenes, setSuggestedGenes] = useState([
    "LMNA",
    "MYH7",
    "ACTA1",
    "TNNT2",
    "COL1A1",
    "NPPA",
    "TTN",
  ]);

  useEffect(() => {
    // Initialize Select dropdown
    const selectElems = document.querySelectorAll("select");
    M.FormSelect.init(selectElems);

    // Initialize tooltips
    const tooltipElems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(tooltipElems);

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
        setLoading(false);
      } catch (err) {
        console.error("Error fetching expression data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (expMeta && nonzero && meta && selectedGene) {
      setLoading(true);

      // Process data for visualization
      const geneIndex = expMeta.genes.indexOf(selectedGene) + 1;
      const filtered = nonzero.filter((entry) => entry.i === geneIndex);

      // Create colorscale based on expression values
      const expressionValues = filtered.map((entry) => entry.x);
      const minExp = Math.min(...expressionValues);
      const maxExp = Math.max(...expressionValues);

      const dataPoints = filtered.map((entry) => {
        const cellId = expMeta.cells[entry.j - 1];
        const cellMeta = meta[cellId];
        const x =
          cellMeta && cellMeta.UMAP_1 ? cellMeta.UMAP_1 : Math.random() * 2 - 1;
        const y =
          cellMeta && cellMeta.UMAP_2 ? cellMeta.UMAP_2 : Math.random() * 2 - 1;

        // Normalize expression for coloring
        const normalizedExp = (entry.x - minExp) / (maxExp - minExp);

        // Create color scale from blue to red based on expression
        const r = Math.floor(normalizedExp * 255);
        const b = Math.floor((1 - normalizedExp) * 255);
        const g = 0;

        return {
          x,
          y,
          expression: entry.x,
          cellType: cellMeta?.cell_type || "Unknown",
          backgroundColor: `rgba(${r}, ${g}, ${b}, 0.7)`,
        };
      });

      const chartDataObj = {
        datasets: [
          {
            label: `${selectedGene} Expression`,
            data: dataPoints,
            backgroundColor: dataPoints.map((point) => point.backgroundColor),
            pointRadius: 4,
            pointHoverRadius: 7,
          },
        ],
      };

      setChartData(chartDataObj);
      setLoading(false);
    }
  }, [expMeta, nonzero, meta, selectedGene]);

  const handleGeneSelect = (gene) => {
    setSelectedGene(gene);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: "UMAP 1" },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
      y: {
        title: { display: true, text: "UMAP 2" },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => [
            `Expression: ${context.raw.expression.toFixed(2)}`,
            `Cell Type: ${context.raw.cellType}`,
          ],
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 10,
      },
      title: {
        display: true,
        text: selectedGene
          ? `${selectedGene} Expression in LMNA-DCM Cells`
          : "Gene Expression Visualization",
        font: { size: 16, weight: "bold" },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuad",
    },
  };

  if (loading && !chartData) {
    return (
      <section className="section">
        <div className="container">
          <h3 className="section-title">Gene Expression Analysis</h3>
          <div className="center-align" style={{ padding: "50px 0" }}>
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            <p>Loading expression data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section scrollspy" id="gene-expression">
      <div className="container">
        <h3 className="section-title">Gene Expression Analysis</h3>
        <p className="lead-text">
          Explore gene expression patterns across different cell types in
          LMNA-DCM samples. Visualize how key genes are expressed in the
          cellular landscape.
        </p>

        <div className="card z-depth-1">
          <div className="card-content">
            <div className="row">
              <div className="col s12 m8">
                <div className="input-field">
                  <select
                    id="gene-select"
                    value={selectedGene}
                    onChange={(e) => setSelectedGene(e.target.value)}
                    className="browser-default"
                  >
                    <option value="" disabled>
                      Select a gene to visualize
                    </option>
                    {expMeta?.genes?.map((gene) => (
                      <option key={gene} value={gene}>
                        {gene}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="gene-select" className="active">
                    Search or select a gene:
                  </label>
                </div>
              </div>
              <div className="col s12 m4">
                <p>Suggested genes:</p>
                <div className="gene-chips">
                  {suggestedGenes.map((gene) => (
                    <div
                      key={gene}
                      className={`chip clickable ${
                        selectedGene === gene ? "blue white-text" : ""
                      }`}
                      onClick={() => handleGeneSelect(gene)}
                    >
                      {gene}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div
              className="visualization-container"
              style={{ height: "500px", position: "relative" }}
            >
              {loading ? (
                <div className="center-align" style={{ padding: "100px 0" }}>
                  <div className="preloader-wrapper active">
                    <div className="spinner-layer spinner-blue-only">
                      <div className="circle-clipper left">
                        <div className="circle"></div>
                      </div>
                      <div className="gap-patch">
                        <div className="circle"></div>
                      </div>
                      <div className="circle-clipper right">
                        <div className="circle"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedGene && chartData ? (
                <Scatter data={chartData} options={chartOptions} />
              ) : (
                <div
                  className="center-align empty-state"
                  style={{ padding: "100px 0" }}
                >
                  <i className="material-icons large blue-text text-lighten-1">
                    equalizer
                  </i>
                  <p>
                    Please select a gene to visualize its expression pattern.
                  </p>
                </div>
              )}
            </div>

            {selectedGene && (
              <div className="expression-legend">
                <div className="legend-gradient"></div>
                <div className="legend-labels">
                  <span>Low</span>
                  <span>Expression Level</span>
                  <span>High</span>
                </div>
              </div>
            )}
          </div>

          {selectedGene && (
            <div className="card-action">
              <p>
                <strong>{selectedGene}</strong> is{" "}
                {getGeneDescription(selectedGene)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Helper function to provide descriptions for key genes
function getGeneDescription(gene) {
  const descriptions = {
    LMNA: "the gene encoding Lamin A/C, a structural protein of the nuclear lamina. Mutations in this gene cause LMNA-DCM.",
    MYH7: "a key cardiac myosin heavy chain gene essential for heart muscle contraction.",
    ACTA1:
      "an actin gene expressed in cardiac muscle cells involved in contraction.",
    TNNT2:
      "encoding cardiac troponin T, a critical regulator of muscle contraction.",
    COL1A1:
      "a collagen gene highly expressed in fibroblasts during cardiac fibrosis.",
    NPPA: "encoding atrial natriuretic peptide, a marker of cardiac stress.",
    TTN: "encoding titin, a giant protein essential for sarcomere assembly and function.",
  };

  return descriptions[gene] || "a gene of interest in LMNA-DCM pathology";
}

export default ExpressionVisualization;
