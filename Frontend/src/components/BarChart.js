import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ chartData }) {
  return <Bar  options={{ maintainAspectRatio: false}} data={chartData} />;
}

export default BarChart;