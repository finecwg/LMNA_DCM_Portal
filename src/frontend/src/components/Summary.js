import React from "react";
// Temporarily comment out the image import until you have the file
// import heartImage from "../assets/heart_illustration.png";

function Summary() {
  return (
    <section id="summary" className="section scrollspy">
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <h3 className="section-title"><strong>LMNA-DCM Atlas</strong></h3>
            <p className="lead-text">
              The first comprehensive spatial and single-cell atlas of
              LMNA-related dilated cardiomyopathy, providing unprecedented
              insights into disease mechanisms.
            </p>
            <div className="divider"></div>
            <h5>Research Highlights</h5>
            <ul className="browser-default highlights-list">
              <li>
                First spatial transcriptomic map of LMNA-DCM delineating four zonal tiers of fibrosis and DNA-damage burden.
              </li>
              <li>
                Joint Visium + single-nucleus RNA profiling links cardiomyocyte trajectory states to zone-specific remodeling.
              </li>
              <li>
                Mechanical stress drives nuclear blebbing, γH2AX accumulation, and apoptosis uniquely in LMNA mutant iPSC-CMs—rescued by blebbistatin.
              </li>
              <li>
                PARP1 hyperactivation depletes NAD⁺ as damage progresses, nominating PARP inhibition and NAD⁺ supplementation as therapeutic angles.
              </li>
              <li>
                Spatial heterogeneity arises from mechano-metabolic feedback, reframing LMNA-DCM as a stress-amplified disease amenable to early unloading strategies.
              </li>
            </ul>
          </div>
          <div className="col s12 m6">
            <div className="card-panel z-depth-2">
              {/* Use a placeholder image until you have the actual image */}
              <img
                src={require("../assets/lmna_dcm_masson_trichrome.png")}
                alt="LMNA-DCM Heart" 
                className="responsive-img"
                />
              <p className="caption center-align">
                Cardiac tissue from LMNA-DCM patients (Masson's trichrome staining)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Summary;
