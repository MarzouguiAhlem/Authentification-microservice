import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTempData } from '../features/redux/tempSlice';
import { absolutePaths } from '../navigation';
import io from 'socket.io-client';
import { getHumidityData } from '../features/redux/humSlice';
import { getMoistureData } from '../features/redux/SoilMoistureSlice';

const socket = io('http://localhost:5000'); // Replace with your server URL

function SensorValue() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sensorData, setSensorData] = useState(null);
//   .sensor?.gateway_id
const gateway_id = useSelector(state => state.sensor.sensors.Sensor_values?.gateway_id);
//console.log(gateway_id);
  useEffect(() => {
    socket.emit('update_sensor_data', gateway_id);
    socket.on('sensor_data', data => {
    const jsonData = JSON.parse(data);
    // console.log(jsonData);
    setSensorData(jsonData);
    });

    return () => {
      socket.off('sensor_data');
    };
  });

  const displayChart=(id)=>{
    dispatch(getTempData(id))
    dispatch(getHumidityData(id))
    dispatch(getMoistureData(id))
    // SensorValue.socket.emit('update_sensor_data', id);
    navigate(absolutePaths.charts)
  }

  if (!sensorData) {
    return <p>Loading...</p>;
  }else{
    return(
    <div>
           <div className='flex flex-row'>
             {sensorData?.Soil_Moisture && ( 
            <div className=" w-1/3 mx-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className='p-4'>
                  <p className="text-cyan-600 text-lg font-semibold mb-2">
                    Soil Moisture:
                  </p>
                  <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400 text-2xl text-center p-4">
                    {sensorData.Soil_Moisture} %
                  </p>
                  <p className=" font-thin text-gray-700 dark:text-gray-400 text-sm mb-0 ">
                    Last updated: {sensorData.Time}
                  </p>
              {/* <div className=' mt-2 py-4 right-0' >
                      <button class= "bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-3 rounded h-15  absolute">
                      <UilChartLine onClick={()=>displayChart(sensorData.gateway_id)}/>
                      </button>
                  </div>    */}
             </div>    
              </div>
              )}
              {sensorData?.Temperature && (
              <div className="w-1/3 mx-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className='p-4'>
                  <p className="text-cyan-600 text-lg font-semibold mb-2">
                    Temperature:
                  </p>
                  <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400 text-2xl text-center p-4">
                    {sensorData.Temperature} °C
                  </p>
                  <p className=" font-thin text-gray-700 dark:text-gray-400 text-sm ">
                    Last updated: {sensorData.Time}
                  </p>
              </div>    
              </div>
              )}
              {sensorData?.Humidity &&(
              <div className=" w-1/3 mx-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className='p-4'>
                  <p className="text-cyan-600 text-lg font-semibold mb-2">
                    Humidity:
                  </p>
                  <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400 text-2xl text-center p-4">
                    {sensorData.Humidity} %
                  </p>
                  <p className=" font-thin text-gray-700 dark:text-gray-400 text-sm ">
                    Last updated: {sensorData.Time}
                  </p>
              </div>    
              </div>
              )}
              
              </div>
                <div className=' flex flex-col mt-3'>
                  <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded h-15" onClick={()=>displayChart(sensorData.gateway_id)}>
                    Charts
                  </button>
              </div>
        </div>
      );}
}

export default SensorValue;

