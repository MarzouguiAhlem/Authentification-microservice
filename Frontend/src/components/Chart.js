import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import 'chartjs-adapter-date-fns';

function Chart({feature , chartType }) {
const [chartConfig, setChartConfig] = useState(null);

const tempValues = useSelector((state) => state.temp.tempValues);
const humidityValues = useSelector((state) => state.hum.humValues)
const soilMoistureValues = useSelector((state) => state.SoilMoisture.soilMoistureValues)


function dataToVisualize(feature) {
    let data = [];
    switch (feature) {
      case 'Temperature':
        data = tempValues?.Temperature_Data && Array.isArray(tempValues?.Temperature_Data) && tempValues?.Temperature_Data.map((data) => data.Temperature);
        break;
      case 'Humidity':
        data = humidityValues?.Humidity_Data && Array.isArray(humidityValues?.Humidity_Data) && humidityValues?.Humidity_Data.map((data) => data.Humidity);
        break;
      case 'Soil Moisture':
        data =soilMoistureValues?.Soil_Moisture_Data && Array.isArray(soilMoistureValues?.Soil_Moisture_Data) && soilMoistureValues?.Soil_Moisture_Data.map((data) => data.Soil_Moisture)
        ;
        break;
      default:
        break;
    }
    return {
      labels: tempValues?.Temperature_Data && Array.isArray(tempValues?.Temperature_Data) && tempValues?.Temperature_Data.map((data) => data.Time),
      datasets: [{
        label: feature,
        data: data,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      }],
    };
  }    
  useEffect(() => {
  
    const chartData = dataToVisualize(feature)
    const options = {
          scales: {
            y: {
              scaleLabel: {
                display: true,
                labelString: feature,
              },
            },
            x: {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  // hour: 'MMM d',
                  dayHour: 'MMM d, YYYY',
                },
              },
              scaleLabel: {
                display: true,
                labelString: 'Time',
              },
            },
          },
        };
        
        let chartConfig = null;
switch (chartType) {
    case 'line':
        chartConfig = {
            type: 'line',
            data: chartData,
            options: options,
        };
        break;
    case 'bar':
        chartConfig = {
            type: 'bar',
            data: chartData,
            options: options,
        };
        break;
    default:
        chartConfig = {
            type: '',
            data: null,
            options: null,
        };
        break;
}
  setChartConfig(chartConfig);
  }, [feature, chartType, humidityValues, soilMoistureValues, tempValues]);

  if (!chartConfig) {
    return null;
  }

  return (
      <div>
    {chartConfig && chartType === 'line' && <Line data={chartConfig.data} options={chartConfig.options} />}
    {chartConfig && chartType === 'bar' && <Bar data={chartConfig.data} options={chartConfig.options} />}
  </div>
  );
}
export default Chart