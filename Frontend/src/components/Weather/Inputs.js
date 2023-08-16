import React from 'react'
import { UilSearch , UilLocationPoint ,UilEllipsisV } from '@iconscout/react-unicons'

export default function Inputs() {
  return (
    <div className='flex flex-row justify-center ny-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
          <input 
            type='text' 
            placeholder='search for city...'
            className='text-xl font-light p-2 w-4/5 shadow-xl focus:outline-none capitalize placeholder:lowercase'/>
        <UilSearch  size={20} className = 'text-white cursor-pointer transition ease-out hover:scale-125' />
        <UilLocationPoint size={20} className = 'text-white cursor-pointertransition ease-out hover:scale-125' />
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='metric' className='text-xl text-white font-light '>°C</button>
            <UilEllipsisV size={20} className='text-xl text-white font-light mx-1 inline-flex '/>
            {/* <p className='text-xl  text-white mx-1 inline-flex'>|</p> */}
            <button name="imperial"className='text-xl text-white font-light '>°F</button>
        </div>

    </div>
  )
}
