import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return <Pie  options={{ maintainAspectRatio: false}} data={chartData} />;
}

export default PieChart;