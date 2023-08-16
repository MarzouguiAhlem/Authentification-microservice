import React from 'react'

function TimeAndLocation() {
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-'>
            Tuesday, 19 april 2023 | Local time 23:20
            </p> 
        </div>     
        <div className='flex items-center justify-center my-4 '>    
           <p className='text-white text-2xl mb-0 font-medium'>
            Berlin
           </p>

        </div>
    </div>
  )
}

export default TimeAndLocation