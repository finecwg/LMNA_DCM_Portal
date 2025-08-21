import React from "react";

function Publication() {
  return (
    <section id="publication" className="section scrollspy grey lighten-4">
      <div className="container">
        <h3 className="section-title">Publication</h3>

        <div className="card horizontal z-depth-1">
          <div className="card-stacked">
            <div className="card-content">
              <h5>
                Spatial Transcriptomics Highlights Regional DNA Damage in
                LMNA-Linked Dilated Cardiomyopathy
              </h5>
              <p
                className="publication-authors"
                style={{ marginBottom: "3px" }}
              >
                Siyeon Rhee, Sangkyun Cho, .., Joseph C. Wu
              </p>
              <p
                className="publication-journal"
                style={{ marginBottom: "5px" }}
              >
                <em>Unpublished</em> (2025)
              </p>
              <p
                className="publication-abstract"
                style={{ marginBottom: "10px" }}
              >
                Lamin A/C-related dilated cardiomyopathy (LMNA-DCM) is a
                devastating genetic heart disease with limited treatment
                options. In this study, we present the first comprehensive
                spatial and single-cell transcriptomic atlas of LMNA-DCM,
                providing unprecedented insights into the disease progression
                mechanisms. Our multi-omics approach reveals how cardiomyocyte
                nuclear blebbing leads to rupture and apoptosis, while ECM
                signaling triggers severe fibrosis by activating quiescent
                cardiac fibroblasts.
              </p>
              <div className="publication-links">
                <a
                  href="https://doi.org/xxxxxxx"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-small waves-effect waves-light blue"
                >
                  <i className="material-icons left">launch</i> View Publication
                </a>
                <a href="#" className="btn-small waves-effect waves-light teal">
                  <i className="material-icons left">description</i> Download
                  PDF
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row publication-highlights">
          <div className="col s12 m4">
            <div className="card-panel">
              <h5>
                <i className="material-icons left blue-text">track_changes</i>{" "}
                Key Finding 1
              </h5>
              <p>
                Spatial transcriptomics identified regional progression of
                tissue defects in LMNA-DCM hearts.
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel">
              <h5>
                <i className="material-icons left blue-text">lightbulb</i> Key
                Finding 2
              </h5>
              <p>
                Cardiomyocyte nuclear blebbing and rupture lead to apoptosis in
                a progressive manner.
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel">
              <h5>
                <i className="material-icons left blue-text">insights</i> Key
                Finding 3
              </h5>
              <p>
                ECM signaling transforms quiescent cardiac fibroblasts into
                pro-fibrotic cells.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Publication;
