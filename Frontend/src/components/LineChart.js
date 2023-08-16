import React from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

function LineChart ({chartData}) {
  
  return <Line options={{ maintainAspectRatio: false}} data={chartData} />
}

export default LineChart

