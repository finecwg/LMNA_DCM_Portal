import React, { useState, useEffect, useRef } from "react";
import M from "materialize-css";

function DataTable() {
  const [loading, setLoading] = useState(true);
  const tooltipInstances = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      const elems = document.querySelectorAll(".tooltipped");
      const instances = M.Tooltip.init(elems, {
        exitDelay: 100,
        enterDelay: 200,
      });
      tooltipInstances.current = Array.isArray(instances)
        ? instances
        : instances
        ? [instances]
        : [];
    }, 500);

    return () => {
      clearTimeout(timer);
      tooltipInstances.current.forEach((instance) => instance.destroy());
    };
  }, []);

  const snrnaDownloads = [
    {
      label: "Annotated .RDS",
      href: "https://www.dropbox.com/scl/fi/87zyvuhi696ccibxjqu8d/LMNA_snRNA_human_mouse_Atlas_annotated_DK_250710.rds?rlkey=txnmpdov9ep1xu7qko4jijgjx&dl=0",
      tooltip: "Download cross-species Seurat object (.rds)",
    },
    {
      label: "Annotated .H5AD",
      href: "https://www.dropbox.com/scl/fi/ljruvsgxcgurz2irjfcjt/LMNA_snRNA_human_mouse_Atlas_annotated_DK_250710.h5ad?rlkey=jrir23rwhuupu2dvkgw6f4tan&dl=0",
      tooltip: "Download cross-species AnnData object (.h5ad)",
    },
  ];

  const integrationStudies = [
    "Reichart et al., Science 377 (2022)",
    "En et al., Cell Reports 43 (2024)",
    "Yamada et al., Sci. Adv. 9 (2023)",
  ];

  const snrnaHighlights = [
    "Zone-resolved LMNA-DCM cardiomyocytes harmonized with published human/mouse datasets",
    "Seurat v5 + Harmony batch correction with shared stress-state annotations",
    "Exports include curated metadata (zonal labels, pseudotime, DDR module scores)",
  ];

  const spatialSamples = [
    {
      id: "Control-0",
      cohort: "Control",
      heImage:
        "https://www.dropbox.com/scl/fi/voxj5ue1ektpjwieu904h/Control-0_V12U21-403-A1.tif?rlkey=2fnrpmfdhbz9hpszfsteaajh4&dl=0",
      visium:
        "https://www.dropbox.com/scl/fo/596e1tl5lafdpdfma7sic/ANWLhuAZeI-O423EmDiFTQ8?rlkey=nf2qcxpks6rdyyua5p7nry37r&dl=0",
      note: "V12U21-403-A1",
    },
    {
      id: "Control-1",
      cohort: "Control",
      heImage:
        "https://www.dropbox.com/scl/fi/77g3m2s5zpqufogc5f2vo/Control-1_V12U21-403-B1.tif?rlkey=zm5z5efx1hof9w77ydk7vc0me&dl=0",
      visium:
        "https://www.dropbox.com/scl/fo/osmmln9ky17uqr6cn0h0m/APn1Op96_R88rAEJtDJsfBY?rlkey=45rjihmwo9ie05hngya4sq4tb&dl=0",
      note: "V12U21-403-B1",
    },
    {
      id: "LMNA-1",
      cohort: "LMNA-DCM",
      heImage:
        "https://www.dropbox.com/scl/fi/g41gnyv1upsvbo098dj2k/LMNA-1_V12U21-403-C1.tif?rlkey=2vcyfol56fy2l44t0vx94xukc&dl=0",
      visium:
        "https://www.dropbox.com/scl/fo/y2psllbywwe4i1sqiekds/AKNdX_mYQZdGujyXjJMvMw0?rlkey=qhkslia1l98myk5atxcgj2lgw&dl=0",
      note: "V12U21-403-C1",
    },
    {
      id: "LMNA-2",
      cohort: "LMNA-DCM",
      heImage:
        "https://www.dropbox.com/scl/fi/sstxw7n3oyeyjgpmiboxb/LMNA-2_V12U21-403-D1.tif?rlkey=9r3vy8nh2nd8nnzt7oypyykxf&dl=0",
      visium:
        "https://www.dropbox.com/scl/fo/djqwur7f0tfc0nlaqrb5d/AMvmAEojlVFM_ZrNdkLmDHQ?rlkey=9wk151vlhg7zhopeg6bi7aap3&dl=0",
      note: "V12U21-403-D1",
    },
  ];

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
          <>
            <div className="data-card snrna-card atlas-card">
              <div className="atlas-header">
                <div className="atlas-heading">
                  <span className="atlas-tag">snRNA multi-cohort</span>
                  <h4>Cross-Species snRNA-seq Atlas</h4>
                  <p className="secondary-text">
                    LMNA-DCM nuclei from Stanford patients harmonized with
                    published human and mouse laminopathy datasets to map
                    cardiomyocyte stress trajectories.
                  </p>
                </div>
                <div className="atlas-actions">
                  {snrnaDownloads.map((file) => (
                    <a
                      key={file.href}
                      href={file.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-pill tooltipped"
                      data-position="bottom"
                      data-tooltip={file.tooltip}
                    >
                      <i className="material-icons">cloud_download</i>
                      {file.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="atlas-body">
                <div className="atlas-column">
                  <h6>Highlights</h6>
                  <ul className="atlas-list">
                    {snrnaHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="atlas-column">
                  <h6>Integrated cohorts</h6>
                  <ul className="atlas-list">
                    {integrationStudies.map((study) => (
                      <li key={study}>{study}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="data-table-container">
              <div className="table-header">
                <div>
                  <h5>Spatial Transcriptomics (10x Visium)</h5>
                  <p className="secondary-text">
                    Clinical metadata and histopathology summaries are detailed
                    in the accompanying manuscript.
                  </p>
                </div>
              </div>
              <table className="data-resources-table">
                <thead>
                  <tr>
                    <th>Sample ID</th>
                    <th>Cohort</th>
                    <th>H&amp;E Image</th>
                    <th>10x Outputs</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {spatialSamples.map((sample) => (
                    <tr key={sample.id}>
                      <td>
                        <strong>{sample.id}</strong>
                      </td>
                      <td>{sample.cohort}</td>
                      <td>
                        <a
                          href={sample.heImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="download-btn spatial-btn tooltipped"
                          data-position="bottom"
                          data-tooltip="View H&E reference image"
                        >
                          <i className="material-icons left">image</i>
                          H&amp;E
                        </a>
                      </td>
                      <td>
                        <a
                          href={sample.visium}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="download-btn details-btn tooltipped"
                          data-position="bottom"
                          data-tooltip="Download 10x Genomics Visium outputs"
                        >
                          <i className="material-icons left">description</i>
                          Outputs
                        </a>
                      </td>
                      <td>{sample.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-panel pending-card">
              <div className="pending-header">
                <h5>scATAC-seq Release</h5>
              </div>
              <p className="secondary-text">
                Processed peak/barcode matrices and ArchR project files will be released soon.
              </p>
            </div>
          </>
        )}

        <div className="row methods-section">
          <div className="col s12">
            <h5>Data Processing Methods</h5>
            <p>
              Spatial transcriptomics data were processed with the 10x Genomics
              Visium pipeline (Space Ranger v2) followed by zone-aware
              normalization and Cell2location mapping. The cross-species
              single-nucleus RNA atlas was harmonized in Seurat v5 + Harmony,
              integrating Stanford LMNA-DCM nuclei with published human/mouse
              laminopathy datasets (Reichart et al., En et al., Yamada et al.).
              scATAC-seq objects are being finalized in ArchR and will be
              deposited alongside fragments files. Cell-state annotations rely
              on curated marker panels and trajectory analysis.
              View processing notebooks and QC reports on{" "}
              <a href="https://github.com/finecwg/LMNA_DCM_Portal">GitHub</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataTable;
