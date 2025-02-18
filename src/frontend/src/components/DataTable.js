import React from "react";

function DataTable() {
  return (
    <section id="data" className="section">
      <div className="container">
        <h3>Data</h3>
        <p>
          This section provides datasets for Spatial Transcriptomics (ST),
          single-cell RNA-seq (scRNA-seq), and single-cell ATAC-seq
          (scATAC-seq). Please download the data using the buttons below.
        </p>
        <div className="row">
          <div className="col s12 m4">
            <a className="waves-effect waves-light btn" href="/download/st">
              Download ST
            </a>
          </div>
          <div className="col s12 m4">
            <a className="waves-effect waves-light btn" href="/download/scrna">
              Download scRNA-seq
            </a>
          </div>
          <div className="col s12 m4">
            <a className="waves-effect waves-light btn" href="/download/scatac">
              Download scATAC-seq
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataTable;
