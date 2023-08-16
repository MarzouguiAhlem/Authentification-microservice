import React from 'react'

function Forecast({title}) {
  return (
    <div>
        <div className='flex items-center justify-start mt-2'>
            <p className='text-white font-medium uppercase mb-0'>
                {title}
            </p>
        </div>
        <hr className='py-0 font-light '/>

        <div className='flex flex-rox items-center justify-between text-white '>

            <div className='flex flex-col items-center justify-center  '>
                <p className='font-light text-sm mb-1 mt-0'>
                    4:30 PM
                </p>
                <img 
                src="https://openweathermap.org/img/wn/01d@2x.png"
                alt=''
                className='w-10 my-0'/>
                <p className='font-medium'>22°</p>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <p className='font-light text-sm mb-1 mt-0'>
                    4:30 PM
                </p>
                <img 
                src="https://openweathermap.org/img/wn/01d@2x.png"
                alt=''
                className='w-10 my-0'/>
                <p className='font-medium'>22°</p>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <p className='font-light text-sm mb-1 mt-0'>
                    4:30 PM
                </p>
                <img 
                src="https://openweathermap.org/img/wn/01d@2x.png"
                alt=''
                className='w-10 my-0'/>
                <p className='font-medium'>22°</p>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <p className='font-light text-sm mb-1 mt-0'>
                    4:30 PM
                </p>
                <img 
                src="https://openweathermap.org/img/wn/01d@2x.png"
                alt=''
                className='w-10 my-0'/>
                <p className='font-medium'>22°</p>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <p className='font-light text-sm mb-1 mt-0'>
                    4:30 PM
                </p>
                <img 
                src="https://openweathermap.org/img/wn/01d@2x.png"
                alt=''
                className='w-10 my-0'/>
                <p className='font-medium'>22°</p>
            </div>
        </div>
    </div>
  )
}

export default Forecast