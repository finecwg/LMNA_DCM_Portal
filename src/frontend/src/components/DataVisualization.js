import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function DataVisualization() {
  // 더미 UMAP 데이터 (Scatter 차트 예시)
  const data = {
    datasets: [
      {
        label: "UMAP Plot Dummy",
        data: [
          { x: -2, y: -1 },
          { x: -1.5, y: 0.5 },
          { x: -1, y: 1 },
          { x: 0, y: 0 },
          { x: 1, y: -0.5 },
          { x: 1.5, y: 1.2 },
          { x: 2, y: 0 },
        ],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { type: "linear", position: "bottom" },
    },
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
  };

  return (
    <section className="section">
      <div className="container">
        <h3>UMAP Plot (Dummy)</h3>
        <Scatter data={data} options={options} />
      </div>
    </section>
  );
}

export default DataVisualization;
