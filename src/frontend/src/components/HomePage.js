import React from "react";
import Summary from "./Summary";
import DataTable from "./DataTable";
import DataVisualization from "./DataVisualization";
import ExpressionVisualization from "./ExpressionVisualization";
import CellxGeneEmbed from "./CellxGeneEmbed";
import Publication from "./Publication";
import Funders from "./Funders";
import Team from "./Team";
import featureFlags from "../config/featureFlags";

function HomePage() {
  const { dataVisualization, geneExpression, cellAtlas } = featureFlags;

  return (
    <div className="home-page">
      <main>
        <Summary />
        <DataTable />
        {dataVisualization && <DataVisualization />}
        {geneExpression && <ExpressionVisualization />}
        {cellAtlas && <CellxGeneEmbed />}
        <Publication />
        <Funders />
        <Team />
      </main>
    </div>
  );
}

export default HomePage;