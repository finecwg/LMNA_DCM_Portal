import React from "react";
import Summary from "./Summary";
import DataTable from "./DataTable";
import DataVisualization from "./DataVisualization";
import ExpressionVisualization from "./ExpressionVisualization";
import Publication from "./Publication";
import CellxGeneEmbed from "./CellxGeneEmbed";

function HomePage() {
  return (
    <main>
      <Summary />
      <DataTable />
      <DataVisualization />
      <ExpressionVisualization />
      <CellxGeneEmbed />
      <Publication />
    </main>
  );
}

export default HomePage;
