import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import M from "materialize-css";

const API_BASE_URL = "https://lmnadcm.siyeonrhee.com"; // http -> https

function ExpressionVisualization() {
  const [expMeta, setExpMeta] = useState(null);
  const [nonzero, setNonzero] = useState(null);
  const [meta, setMeta] = useState(null);
  const [selectedGene, setSelectedGene] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geneInfo, setGeneInfo] = useState("");
  const [suggestedGenes, setSuggestedGenes] = useState([
    "LMNA",
    "MYH7",
    "ACTA1",
    "TNNT2",
    "COL1A1",
    "NPPA",
    "TTN",
  ]);
  const [selectedDataset, setSelectedDataset] = useState("scrna");

  useEffect(() => {
    // Initialize Select dropdown
    const selectElems = document.querySelectorAll("select");
    M.FormSelect.init(selectElems);
  }, []);

  const fetchGeneInfo = async (gene) => {
    if (!gene) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/gene-info?gene=${gene}`
      );
      setGeneInfo(response.data.description.description);
    } catch (error) {
      console.error("Error fetching gene info:", error);
      setGeneInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchGeneExpression = async (gene) => {
    if (!gene) return;

    try {
      setLoading(true);

      // Gene info 먼저 가져오기
      fetchGeneInfo(gene);

      // Expression data 가져오기
      const response = await axios.get(
        `${API_BASE_URL}/api/expression/${gene}`
      );

      if (response.data.error) {
        M.toast({ html: response.data.error, classes: "red" });
        // Error가 있더라도 여기서 return하지 않음
        setChartData(null);
        setExpMeta(null);
      } else {
        const data = response.data;

        // Create chart data
        const chartData = {
          datasets: [
            {
              label: `${gene} Expression`,
              data: data.umap.map((coords, i) => ({
                x: coords[0],
                y: coords[1],
                expression: data.expression[i],
                cellType: data.cellTypes ? data.cellTypes[i] : "Unknown",
              })),
              backgroundColor: data.expression.map((value) => {
                const normalized = (value - data.min) / (data.max - data.min);
                return `rgba(${255 * normalized}, 0, ${
                  255 * (1 - normalized)
                }, 0.7)`;
              }),
              pointRadius: 3,
              pointHoverRadius: 5,
            },
          ],
        };

        setChartData(chartData);
        setExpMeta(data);
      }
    } catch (error) {
      console.error("Error fetching gene expression:", error);
      M.toast({ html: "Error fetching expression data", classes: "red" });
      setChartData(null);
      setExpMeta(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneSearch = (e) => {
    e.preventDefault();
    const geneInput = selectedGene.trim().toUpperCase();
    if (geneInput) {
      fetchGeneExpression(geneInput);
    }
  };

  const handleSuggestedGene = (gene) => {
    setSelectedGene(gene);
    fetchGeneExpression(gene);
  };

  const handleDatasetChange = (e) => {
    setSelectedDataset(e.target.value);
    // Clear existing data
    setChartData(null);
    setExpMeta(null);
    setGeneInfo("");

    if (selectedGene) {
      fetchGeneExpression(selectedGene);
    }
  };

  return (
    <section id="expression" className="section scrollspy">
      <div className="container">
        <h3 className="section-title">Gene Expression</h3>

        <div className="row">
          <div className="col s12 m4">
            <div className="input-field">
              <select value={selectedDataset} onChange={handleDatasetChange}>
                <option value="scrna">Single-cell RNA-seq</option>
                <option value="spatial">Spatial Transcriptomics</option>
              </select>
              <label>Dataset</label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m8">
            <form onSubmit={handleGeneSearch}>
              <div className="input-field">
                <input
                  id="gene-search"
                  type="text"
                  value={selectedGene}
                  onChange={(e) => setSelectedGene(e.target.value)}
                  placeholder="Enter a gene symbol (e.g., LMNA)"
                />
                <label
                  htmlFor="gene-search"
                  className={selectedGene ? "active" : ""}
                >
                  Search for a gene
                </label>
              </div>
              <button
                className="btn waves-effect waves-light"
                type="submit"
                disabled={loading}
              >
                <i className="material-icons left">search</i>
                Search
              </button>
            </form>
          </div>

          <div className="col s12 m4">
            <p>Suggested genes:</p>
            <div className="chip-container">
              {suggestedGenes.map((gene) => (
                <div
                  key={gene}
                  className="chip clickable"
                  onClick={() => handleSuggestedGene(gene)}
                >
                  {gene}
                </div>
              ))}
            </div>
          </div>
        </div>

        {loading && (
          <div className="center-align" style={{ padding: "30px" }}>
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
          </div>
        )}

        {geneInfo && (
          <div className="row">
            <div className="col s12">
              <div className="card gene-info-card">
                <div className="card-content">
                  <span className="card-title">{selectedGene} Information</span>

                  <div style={{ marginBottom: "25px" }}>
                    <h6
                      className="blue-text text-darken-2"
                      style={{ marginBottom: "10px" }}
                    >
                      Basic Information
                    </h6>
                    <p style={{ margin: "0" }}>{geneInfo.basic_info}</p>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h6
                      className="blue-text text-darken-2"
                      style={{ marginBottom: "10px" }}
                    >
                      Disease Relevance
                    </h6>
                    <p style={{ margin: "0" }}>{geneInfo.disease_relevance}</p>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h6
                      className="blue-text text-darken-2"
                      style={{ marginBottom: "10px" }}
                    >
                      Therapeutic Potential
                    </h6>
                    <p style={{ margin: "0" }}>
                      {geneInfo.therapeutic_potential}
                    </p>
                  </div>

                  <p
                    style={{
                      color: "#9e9e9e",
                      fontSize: "0.9em",
                      marginTop: "15px",
                      fontStyle: "italic",
                      borderTop: "1px solid #eee",
                      paddingTop: "10px",
                    }}
                  >
                    This information is generated by AI and should be verified
                    against current scientific literature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {chartData && (
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">
                    {selectedGene} Expression in{" "}
                    {selectedDataset === "scrna"
                      ? "Single-cell RNA-seq"
                      : "Spatial Transcriptomics"}
                  </span>
                  <div style={{ height: "500px" }}>
                    <Scatter
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          tooltip: {
                            callbacks: {
                              label: function (context) {
                                const dataPoint = context.raw;
                                return [
                                  `Expression: ${dataPoint.expression.toFixed(
                                    2
                                  )}`,
                                  `Cell Type: ${dataPoint.cellType}`,
                                ];
                              },
                            },
                          },
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: "UMAP_1",
                            },
                          },
                          y: {
                            title: {
                              display: true,
                              text: "UMAP_2",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                {expMeta && (
                  <div className="card-action">
                    <p>
                      <strong>Expression Statistics:</strong> Mean:{" "}
                      {expMeta.mean.toFixed(2)}, Median:{" "}
                      {expMeta.median.toFixed(2)}, Range:{" "}
                      {expMeta.min.toFixed(2)} - {expMeta.max.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExpressionVisualization;
