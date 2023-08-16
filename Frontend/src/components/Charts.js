import React, { useState } from 'react';
import Chart from './Chart';

function Charts() {
  const features = [
    { id: 1, name: "Temperature" },
    { id: 2, name: "Humidity" },
    { id: 3, name: "Soil Moisture" },
  ];
  const types = [
    { id: 1, name: "line" },
    { id: 2, name: "bar" },
  ];

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState([]);

  const handleShowChart = () => {
    setShowChart(true);
    setChartData([]);
  };

  return (
    <div>
      <div className='flex flex-row '>
        <select
          className="w-1/2 mx-1 block py-2 px-4 border border-cyan-600 bg-white rounded-md shadow-sm focus:outline-none"
          value={selectedFeature}
          onChange={(e) => setSelectedFeature(e.target.value)}
        >
          <option value="">Select a Feature</option>
          {features.map((feature) => (
            <option
              key={feature.id}
              value={feature.name}
              onClick={() => setSelectedFeature(feature.name)}
              className="hover:bg-cyan-600"
            >
              {feature.name}
            </option>
          ))}
        </select>
        <select
          className="w-1/2 mx-2 block py-2 px-4 border border-cyan-600 bg-white rounded-md shadow-sm focus:outline-none"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select a Chart Type</option>
          {types.map((type) => (
            <option
              key={type.id}
              value={type.name}
              onClick={() => setSelectedType(type.name)}
              className="hover:bg-cyan-600"
            >
              {type.name}
            </option>
          ))}
        </select>
        <button
          className="px-5 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          onClick={handleShowChart}
          disabled={!selectedFeature || !selectedType}
        >
          Chart
        </button>
      </div>
      {showChart && <Chart feature={selectedFeature} chartType={selectedType} />}
    </div>
  );
}

export default Charts;
