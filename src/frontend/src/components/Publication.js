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
                Lamin A/C cardiomyopathy accounts for a small fraction of DCM
                yet drives early arrhythmias, zonal fibrosis, and sudden death.
                We combine Visium spatial profiling with joint single-nucleus
                RNA/ATAC sequencing to chart four myocardial damage tiers where
                cardiomyocyte stress trajectories, DNA damage response, and ECM
                remodeling rise in concert. Patient-derived LMNA iPSC-CMs reveal
                a mechanosensitive loop—nuclear blebbing, rupture, γH2AX foci increase—that is reversible with blebbistatin unloading.
                The same trajectory exhibits PARP1 hyperactivation and NAD⁺
                depletion, pointing to mechano-metabolic interventions such as
                PARP inhibition, NAD⁺ repletion, and early mechanical unloading.
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
                Zonal fibrosis + DDR coupling
              </h5>
              <p>
                Visium mapping revealed four damage tiers where fibrosis,
                γH2AX, and DDR module scores rise in lockstep from epicardium to
                endocardium.
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel">
              <h5>
                <i className="material-icons left blue-text">lightbulb</i>
                Mechanosensitive nuclear rupture
              </h5>
              <p>
                LMNA iPSC-CMs uniquely exhibit nuclear blebbing, double-strand
                breaks, and apoptosis under mechanical stress, all reversible
                with blebbistatin unloading.
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel">
              <h5>
                <i className="material-icons left blue-text">insights</i>
                PARP1–NAD⁺ therapeutic axis
              </h5>
              <p>
                PARP1 hyperactivation depletes NAD⁺ along the cardiomyocyte
                trajectory, nominating PARP inhibition, NAD⁺ repletion, and early
                unloading as actionable strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Publication;
