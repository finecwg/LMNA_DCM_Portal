import React from "react";
// Temporarily comment out the image import until you have the file
// import heartImage from "../assets/heart_illustration.png";

function Summary() {
  return (
    <section id="summary" className="section scrollspy">
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <h3 className="section-title">LMNA-DCM Atlas</h3>
            <p className="lead-text">
              The first comprehensive spatial and single-cell atlas of
              LMNA-related dilated cardiomyopathy, providing unprecedented
              insights into disease mechanisms.
            </p>
            <div className="divider"></div>
            <h5>Research Highlights</h5>
            <ul className="browser-default highlights-list">
              <li>
                First integration of spatial transcriptomics with scRNA-seq for
                LMNA-DCM
              </li>
              <li>Identification of regional progression of tissue defects</li>
              <li>
                Elucidation of disease progression mechanism in human tissue and
                iPSC-CM
              </li>
              <li>
                Discovery of cardiomyocyte nuclear blebbing and rupture leading
                to apoptosis
              </li>
              <li>
                Identification of ECM signaling pathways in cardiac fibrosis
                development
              </li>
            </ul>
          </div>
          <div className="col s12 m6">
            <div className="card-panel z-depth-2">
              {/* Use a placeholder image until you have the actual image */}
              <img
                src="https://placehold.co/600x400?text=LMNA-DCM+Heart"
                alt="LMNA-DCM Heart"
                className="responsive-img"
              />
              <p className="caption center-align">
                Spatial transcriptomics analysis of cardiac tissue in LMNA-DCM
                patients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Summary;
