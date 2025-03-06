import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import "chart.js/auto";

function DataVisualization() {
  const [cellTypeData, setCellTypeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("umap");

  useEffect(() => {
    // Remove API call and always use dummy data
    setCellTypeData(generateDummyData());
    setLoading(false);
  }, []);

  const generateDummyData = () => {
    // More realistic dummy data to showcase the visualization
    const cellTypes = [
      { name: "Cardiomyocytes", color: "rgba(255, 99, 132, 0.6)", count: 150 },
      { name: "Fibroblasts", color: "rgba(54, 162, 235, 0.6)", count: 100 },
      {
        name: "Endothelial Cells",
        color: "rgba(255, 206, 86, 0.6)",
        count: 80,
      },
      { name: "Immune Cells", color: "rgba(75, 192, 192, 0.6)", count: 60 },
      { name: "Pericytes", color: "rgba(153, 102, 255, 0.6)", count: 40 },
      {
        name: "Smooth Muscle Cells",
        color: "rgba(255, 159, 64, 0.6)",
        count: 30,
      },
    ];

    const datasets = [];
    let pointIndex = 0;

    cellTypes.forEach((cellType) => {
      const points = [];
      for (let i = 0; i < cellType.count; i++) {
        // Create clusters in UMAP space
        const angle = (pointIndex / 100) * Math.PI * 2;
        const radius = 2 + Math.random() * 1.5;
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5;
        const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.5;
        points.push({ x, y });
        pointIndex++;
      }

      datasets.push({
        label: cellType.name,
        data: points,
        backgroundColor: cellType.color,
        pointRadius: 3,
      });
    });

    return { datasets };
  };

  const umapOptions = {
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
      legend: {
        position: "right",
        labels: { usePointStyle: true, boxWidth: 10 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}`,
        },
      },
      title: {
        display: true,
        text: "Cell Type Distribution in LMNA-DCM Samples",
        font: { size: 16 },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <section id="visualization" className="section scrollspy">
      <div className="container">
        <h3 className="section-title">Data Visualization</h3>
        <p className="lead-text">
          Explore the cellular landscape of LMNA-DCM through interactive
          visualizations. These plots reveal cell type distributions and their
          spatial organization.
        </p>

        <div className="card z-depth-1">
          <div className="card-tabs">
            <ul className="tabs tabs-fixed-width">
              <li className="tab">
                <a
                  className={activeTab === "umap" ? "active" : ""}
                  href="#umap-tab"
                  onClick={() => setActiveTab("umap")}
                >
                  UMAP Projection
                </a>
              </li>
              <li className="tab">
                <a
                  className={activeTab === "spatial" ? "active" : ""}
                  href="#spatial-tab"
                  onClick={() => setActiveTab("spatial")}
                >
                  Spatial Distribution
                </a>
              </li>
            </ul>
          </div>

          <div className="card-content">
            <div id="umap-tab" className={activeTab === "umap" ? "" : "hide"}>
              {loading ? (
                <div
                  className="center-align"
                  style={{
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="preloader-wrapper big active">
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
              ) : (
                <div style={{ height: "500px" }}>
                  <Scatter data={cellTypeData} options={umapOptions} />
                </div>
              )}
            </div>

            <div
              id="spatial-tab"
              className={activeTab === "spatial" ? "" : "hide"}
            >
              <div className="center-align" style={{ padding: "20px" }}>
                <img
                  src="https://via.placeholder.com/800x500?text=Spatial+Visualization+Coming+Soon"
                  alt="Spatial Visualization"
                  className="responsive-img"
                />
                <p className="caption">
                  Spatial distribution of cell types in LMNA-DCM cardiac tissue.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <div className="card-panel blue lighten-5">
              <h5>Visualization Insights</h5>
              <p>
                Our analysis reveals distinct clustering of cell types in
                LMNA-DCM samples. Cardiomyocytes show significant alterations in
                their transcriptional profiles, while fibroblasts demonstrate
                activation signatures associated with fibrosis. Spatial patterns
                highlight regional disease progression from epicardium to
                endocardium.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataVisualization;
