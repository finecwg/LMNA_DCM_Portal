import React from "react";

function CellxGeneEmbed() {
  return (
    <section className="section">
      <div className="container">
        <h3>Interactive Cell Atlas Explorer</h3>
        <p className="lead-text">
          Explore LMNA-DCM single-cell data using our interactive CellxGene
          viewer. Visualize different cell types, gene expression patterns, and
          tissue regions.
        </p>
        <div className="cellxgene-container">
          <iframe
            src="https://your-cellxgene-server.com"
            title="LMNA-DCM Cell Atlas"
            className="cellxgene-frame"
          />
        </div>
        <div className="cellxgene-instructions">
          <h5>Usage Instructions</h5>
          <ul className="browser-default">
            <li>Select cell types from the dropdown menu</li>
            <li>Search for genes of interest in the search box</li>
            <li>Hover over cells to view expression data</li>
            <li>
              Use the colorization options to highlight different features
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CellxGeneEmbed;
