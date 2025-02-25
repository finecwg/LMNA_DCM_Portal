import React from "react";

function CellxGeneEmbed() {
  return (
    <section className="section">
      <div className="container">
        <h3>CellxGene Viewer</h3>
        <iframe
          src="http://localhost:5001"
          title="cellxgene"
          style={{ width: "100%", height: "800px", border: "none" }}
        />
      </div>
    </section>
  );
}

export default CellxGeneEmbed;