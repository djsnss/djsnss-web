import React from 'react'
import GenerateCertificate from '../components/events/GenerateCertificate'
import LargeEvents from '../components/events/LargeEvents'
import LocalEvents from '../components/events/LocalEvents'
import UniversityEvents from '../components/events/UniversityEvents'
import { MapPin, CalendarDays } from 'lucide-react';
import Pic from '../assets/Core.jpg'
const Events = () => {
  return (
    <div className='h-max w-full font-poppins'>
      <h1 className='flex mx-auto my-2 h-max w-full justify-center items-center text-[6vw]'>EVENTS</h1>

      <div className='h-[50vh] max-h-max w-[95%] mx-auto my-6 rounded-xl relative z-0 overflow-hidden'>
        <img src={Pic} alt='Recent Event' className='absolute top-0 left-0 h-full w-full bg-cover bg-no-repeat bg-center -z-10'/>

        <div className='h-full w-[40vw] sm:w-[20vw] flex flex-col justify-center items-start rounded-xl border-2 border-white/20 backdrop-blur-lg bg-while/50 p-6'>
          
          <h1 className='text-xl w-full max-w-full md:text-4xl text-white'>Event Name</h1>
          
          <div className="flex flex-wrap w-full max-w-full items-center mt-2 text-sm text-white">
            <MapPin className="w-4 h-4 mr-2" />
            <span>DJS NSS</span>
          </div>
          <div className="flex flex-wrap w-full max-w-full items-center mt-2 text-sm text-white">
            <CalendarDays className="w-4 h-4 mr-2" />
            <span>24th November 2024</span>
          </div>
        </div>
      </div>
      
      <div className="min-h-[80vh] w-full mx-auto my-2 p-4 grid grid-cols-1 grid-rows-6 sm:grid-cols-5 sm:grid-rows-2 gap-4">
        <div className="bg-lightblue sm:col-span-2 rounded-lg"></div>
        <div className="bg-bright-yellow rounded-lg"></div>
        <div className="bg-black row-span-2 sm:col-span-2 rounded-lg"></div>
        <div className="bg-bright-yellow rounded-lg"></div>
        <div className="bg-lightblue sm:col-span-2 rounded-lg"></div>
      </div>

      <GenerateCertificate/>

      <LargeEvents/>

      <LocalEvents/>

      <UniversityEvents/>
    </div>
  )
}

export default Events
