import React from "react";
import GenerateCertificate from "../components/events/GenerateCertificate";
import LargeEvents from "../components/events/LargeEvents";
import LocalEvents from "../components/events/LocalEvents";
import UniversityEvents from "../components/events/UniversityEvents";
import { MapPin, CalendarDays } from "lucide-react";
import Pic from "../assets/Core.jpg";
const Events = () => {
  return (
    <div className="h-max w-full font-poppins scroll-smooth">
      <h1 className="flex mx-auto my-2 h-max w-full justify-center items-center text-[6vw] text-white">
        EVENTS
      </h1>

      <div id="upcoming" className='h-[30vh] md:h-[75vh] max-w-full mx-4 my-10 rounded-xl relative z-0 overflow-hidden'>
        <img src={Pic} alt='Recent Event' className='absolute left-0 w-full top-[-20%] -z-10' />

        <div className="h-full w-[30vw] flex flex-col justify-center items-start rounded-l-xl p-6 bg-gradient-to-tr from-white/30 backdrop-blur-sm bg-blend-overlay to-transparent before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:z-0">
          <h1 className="text-2xl md:text-6xl text-white">Event Name</h1>

          <div className="flex items-center mt-2 text-sm md:text-xl text-white">
            <MapPin className="w-4 h-4 mr-2" />
            <span>DJS NSS</span>
          </div>
          <div className="mt-2 flex items-center text-sm md:text-xl text-white">
            <CalendarDays className="w-4 h-4 mr-2" />
            <span>24th November 2024</span>
          </div>
        </div>
      </div>

      <span id="past"></span>
      <LargeEvents />
      
      <GenerateCertificate />

      <LocalEvents />

      <UniversityEvents />
    </div>
  );
};

export default Events;
