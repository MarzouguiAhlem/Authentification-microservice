import React from "react"
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import Inputs from "./Inputs";
import TimeAndLocation from "./TimeAndLocation";
import TemperatureAndDetails from "./TemperatureAndDetails";
import Forecast from "./Forecast";
import getWeatherData from "../../services/WeatherService";


function Weather() {

  // const fetchWeather = async () =>{
  //   const data = await getWeatherData('weather' , {q: "london"});
  //   console.log(data);
  // };

  // fetchWeather();

return(
  <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ">
    <Inputs/>
    <TimeAndLocation/>
    <TemperatureAndDetails/>
    <Forecast title="Hourly Forecast"/>
    <Forecast title="Daily Forecast"/>
  </div>  
)
}
export default Weather;