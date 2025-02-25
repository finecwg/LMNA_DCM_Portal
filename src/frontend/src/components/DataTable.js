import React, { useState, useEffect } from "react";
import axios from "axios";
import M from "materialize-css";

function DataTable() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/datasets");
        setDatasets(response.data);
        setLoading(false);

        // Initialize tooltips after data is loaded
        setTimeout(() => {
          M.Tooltip.init(document.querySelectorAll(".tooltipped"));
        }, 100);
      } catch (error) {
        console.error("Error fetching datasets:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="data" className="section scrollspy">
      <div className="container">
        <h3 className="section-title">Data Resources</h3>
        <p className="lead-text">
          This portal provides comprehensive datasets for Spatial
          Transcriptomics (ST) and single-cell RNA-seq (scRNA-seq) from LMNA-DCM
          patient samples. All data is available for download in standard h5ad
          format.
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
          <div className="card z-depth-1">
            <div className="card-content">
              <table className="highlight responsive-table">
                <thead>
                  <tr>
                    <th>Sample ID</th>
                    <th>Description</th>
                    <th>Spatial Transcriptomics</th>
                    <th>scRNA-seq</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {datasets.map((dataset) => (
                    <tr key={dataset.id}>
                      <td>
                        <strong>{dataset.name}</strong>
                      </td>
                      <td>{dataset.description || "Patient sample"}</td>
                      <td>
                        <a
                          href={dataset.links.spatial}
                          className="btn-small waves-effect waves-light blue tooltipped"
                          data-position="bottom"
                          data-tooltip="Download spatial transcriptomics data (h5ad format)"
                        >
                          <i className="material-icons left">cloud_download</i>
                          Download
                        </a>
                      </td>
                      <td>
                        <a
                          href={dataset.links.scRNA}
                          className="btn-small waves-effect waves-light blue tooltipped"
                          data-position="bottom"
                          data-tooltip="Download scRNA-seq data (h5ad format)"
                        >
                          <i className="material-icons left">cloud_download</i>
                          Download
                        </a>
                      </td>
                      <td>
                        <a
                          href={dataset.links.details}
                          className="btn-small waves-effect waves-light teal tooltipped"
                          data-position="bottom"
                          data-tooltip="View detailed information about this sample"
                        >
                          <i className="material-icons left">visibility</i>
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="row methods-section">
          <div className="col s12">
            <h5>Data Processing Methods</h5>
            <p>
              All data was processed using standard bioinformatics pipelines.
              Spatial transcriptomics data was processed using the 10x Genomics
              Visium pipeline, and scRNA-seq data was processed using Seurat
              v4.0 and Scanpy. For detailed methods, please refer to our
              publication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataTable;
