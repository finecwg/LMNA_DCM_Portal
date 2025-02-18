import React from "react";
import Summary from "./Summary";
import DataTable from "./DataTable";
import DataVisualization from "./DataVisualization";
import Publication from "./Publication";

function HomePage() {
  return (
    <main>
      <Summary />
      <DataTable />
      <DataVisualization />
      <Publication />
    </main>
  );
}

export default HomePage;
