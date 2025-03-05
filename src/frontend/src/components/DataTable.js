import React, { useState, useEffect } from "react";
import M from "materialize-css";

function DataTable() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with dummy data
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          name: "Control",
          description: "Healthy heart tissue control sample",
          links: {
            spatial: "#download-spatial-control",
            scRNA: "#download-scrna-control",
            scATAC: "#download-scatac-control",
            details: "#details-control",
          },
        },
        {
          id: 2,
          name: "Lmna-1",
          description: "LMNA-DCM patient sample 1 (moderate phenotype)",
          links: {
            spatial: "#download-spatial-lmna1",
            scRNA: "#download-scrna-lmna1",
            scATAC: "#download-scatac-lmna1",
            details: "#details-lmna1",
          },
        },
        {
          id: 3,
          name: "Lmna-2",
          description: "LMNA-DCM patient sample 2 (severe phenotype)",
          links: {
            spatial: "#download-spatial-lmna2",
            scRNA: "#download-scrna-lmna2",
            scATAC: "#download-scatac-lmna2",
            details: "#details-lmna2",
          },
        },
      ];

      setDatasets(dummyData);
      setLoading(false);

      // Initialize tooltips after data is loaded
      setTimeout(() => {
        M.Tooltip.init(document.querySelectorAll(".tooltipped"));
      }, 100);
    }, 1000); // Simulate loading delay
  }, []);

  return (
    <section id="data" className="section scrollspy">
      <div className="container">
        <h3 className="section-title">Data Resources</h3>
        <p className="lead-text">
          This portal provides comprehensive datasets for LMNA-DCM, including
          Visium Spatial Transcriptomics, single-cell RNA-seq (scRNA-seq), and
          single-cell ATAC-seq (scATAC-seq). All data is available for download
          in standard formats.
        </p>

        {loading ? (
          <div className="center-align">
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
          <div className="data-table-container">
            <table className="data-resources-table">
              <thead>
                <tr>
                  <th>Sample ID</th>
                  <th>Description</th>
                  <th>Spatial Transcriptomics</th>
                  <th>scRNA-seq</th>
                  <th>scATAC-seq</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {datasets.map((dataset) => (
                  <tr key={dataset.id}>
                    <td>
                      <strong>{dataset.name}</strong>
                    </td>
                    <td>{dataset.description}</td>
                    <td>
                      <a
                        href={dataset.links.spatial}
                        className="download-btn spatial-btn tooltipped"
                        data-position="bottom"
                        data-tooltip="Download Visium spatial transcriptomics data"
                      >
                        <i className="material-icons left">cloud_download</i>
                        DOWNLOAD
                      </a>
                    </td>
                    <td>
                      <a
                        href={dataset.links.scRNA}
                        className="download-btn scrna-btn tooltipped"
                        data-position="bottom"
                        data-tooltip="Download scRNA-seq data"
                      >
                        <i className="material-icons left">cloud_download</i>
                        DOWNLOAD
                      </a>
                    </td>
                    <td>
                      <a
                        href={dataset.links.scATAC}
                        className="download-btn scatac-btn tooltipped"
                        data-position="bottom"
                        data-tooltip="Download scATAC-seq data"
                      >
                        <i className="material-icons left">cloud_download</i>
                        DOWNLOAD
                      </a>
                    </td>
                    <td>
                      <a
                        href={dataset.links.details}
                        className="download-btn details-btn tooltipped"
                        data-position="bottom"
                        data-tooltip="View detailed information about this sample"
                      >
                        <i className="material-icons left">visibility</i>
                        VIEW
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="row methods-section">
          <div className="col s12">
            <h5>Data Processing Methods</h5>
            <p>
              All data was processed using standard bioinformatics pipelines.
              Spatial transcriptomics data was processed using the 10x Genomics
              Visium pipeline, scRNA-seq was analyzed with Seurat v4.0 and
              Scanpy, and scATAC-seq was processed using ArchR. Cell type
              annotation was performed using reference datasets and marker gene
              expression. View data processing and analysis code on{" "}
              <a href="https://github.com/finecwg/LMNA_DCM_Portal">GitHub</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataTable;
