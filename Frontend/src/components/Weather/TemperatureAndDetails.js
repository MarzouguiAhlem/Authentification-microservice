import React from 'react'
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from '@iconscout/react-unicons'

function TemperatureAndDetails() {
  return (
  <div>
      <div className='flex items-center justify-center py-1 text-xl text-cyan-300' >
        <p>Sunny</p>
      </div>
      <div className='flex flex-row items-center justify-between text-white py-1'>
          <img 
            src=' https://openweathermap.org/img/wn/01d@2x.png'
            alt=''
            className='w-20'      
          />
          <p className='text-4xl'>34°</p>
          <div className='flex flex-col space-y-2'>
              <div className='flex font-light text-sm items-center justify-center'>
                <UilTemperature size={18} className='mr-1'/>
                Real fell:
                <span className='font-medium ml-1'>32°</span>
              </div>
              <div className='flex font-light text-sm items-center justify-center'>
                <UilTear size={18} className='mr-1'/>
                Humidity:
                <span className='font-medium ml-1'>65%</span>
              </div>
              <div className='flex font-light text-sm items-center justify-center'>
                <UilWind size={18} className='mr-1'/>
                Wind:
                <span className='font-medium ml-1'>11 km/h</span>
              </div>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-1'>
        <UilSun/>
        <p className='font-light mt-3'>
        Rise: <span className='font-medium ml-1'>6:45 AM </span>
        </p>
        <p className='font-light mt-3'>|</p>
        <UilSunset/>
        <p className='font-light mt-3'>
        Set: <span className='font-medium ml-1'>7:45 PM </span>
        </p>
        <p className='font-light mt-3'>|</p>
        <UilArrowUp/>
        <p className='font-light mt-3'>
        High: <span className='font-medium ml-1'>45° </span>
        </p>
        <p className='font-light mt-3'>|</p>
        <UilArrowDown/>
        <p className='font-light mt-3'>
        Low: <span className='font-medium ml-1'>40°</span>
        </p>

      </div>

  </div>
  )
}

export default TemperatureAndDetails