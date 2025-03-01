import React from "react";
import Summary from "./Summary";
import DataTable from "./DataTable";
import DataVisualization from "./DataVisualization";
import ExpressionVisualization from "./ExpressionVisualization";
import CellxGeneEmbed from "./CellxGeneEmbed";
import Publication from "./Publication";
import Funders from "./Funders";
import Team from "./Team";

function HomePage() {
  return (
    <div className="home-page">
      <main>
        <Summary />
        <DataTable />
        <DataVisualization />
        <ExpressionVisualization />
        <CellxGeneEmbed />
        <Publication />
        <Funders />
        <Team />
      </main>
    </div>
  );
}

export default HomePage;