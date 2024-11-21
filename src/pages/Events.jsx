import React from 'react'
import generateCertificate from '../components/events/generateCertificate'
import LargeEvents from '../components/events/LargeEvents'
import LocalEvents from '../components/events/LocalEvents'
import UniversityEvents from '../components/events/UniversityEvents'
const Events = () => {
  return (
    <div className='h-max w-full '>
      <h1 className='flex mx-auto my-2 h-max w-full justify-center items-center text-[5vw]'>EVENTS</h1>
      
      <div className="min-h-[80vh] w-full m-2 p-4 grid grid-cols-1 grid-rows-6 sm:grid-cols-5 sm:grid-rows-2 gap-4">
        <div className="bg-slate-800 sm:col-span-2 rounded-lg"></div>
        <div className="bg-yellow-400 rounded-lg"></div>
        <div className="bg-black row-span-2 sm:col-span-2 rounded-lg"></div>
        <div className="bg-yellow-400 rounded-lg"></div>
        <div className="bg-slate-800 sm:col-span-2 rounded-lg"></div>
      </div>

      <generateCertificate/>
      <LargeEvents/>
      <LocalEvents/>
      <UniversityEvents/>
    </div>
  )
}

export default Events
