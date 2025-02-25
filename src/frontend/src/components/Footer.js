import React from "react";

function Footer() {
  return (
    <footer className="page-footer blue darken-3">
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <h5 className="white-text">LMNA-DCM Atlas</h5>
            <p className="grey-text text-lighten-4">
              A comprehensive resource for exploring Lamin A/C-related dilated
              cardiomyopathy through spatial and single-cell transcriptomics.
            </p>
          </div>
          <div className="col s12 m6">
            <h5 className="white-text">Related Resources</h5>
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.heartcellatlas.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Heart Cell Atlas
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.humancellatlas.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Human Cell Atlas
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://cellxgene.cziscience.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CZ CELLxGENE
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://github.com/yourusername/lmna-dcm-atlas"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} LMNA-DCM Atlas
        </div>
      </div>
    </footer>
  );
}

export default Footer;
