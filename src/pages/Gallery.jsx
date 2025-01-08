import React from "react";
import { localEventsData } from "../data/localEvents";
import { largeEventsData } from "../data/largeEvents";
import { universityEventsData } from "../data/universityEvents";

// Combine all event data arrays
const allEventsData = [
  ...largeEventsData,
  ...universityEventsData,
  ...localEventsData,
];

const Gallery = () => {
  return (
    <div className="h-max w-full font-poppins">
        <h1 className="flex mx-auto my-2 h-max w-full justify-center items-center text-[6vw] text-white">
            NSS MEMORIES
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
            {allEventsData.map((event, index) => (
                <div
                key={event.id}
                className={`relative overflow-hidden rounded-lg group ${
                    index % 3 === 0
                    ? "col-span-2"
                    : index % 3 === 3
                    ? ""
                    : "row-span-2"
                }`}
                style={{background: event.background}}
                >
                {/* Image Container */}
                <div className="relative w-full h-full overflow-hidden">
                    <img
                    src={event.imageURL}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-0" 
                    />
                    
                    {/* Hover Overlay with Description */}
                    {/* <div className="absolute inset-0 bottom-0 left-0 right-0 bg-black/70 flex flex-col justify-center items-center text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40">
                        <h3 className="text-sm font-bold mb-2">{event.title}</h3>
                        <p className="text-xs">{event.longDescription}</p>
                    </div> */}
                </div>

                {/* Permanent Title */}
                <div className="absolute top-0 left-0 right-0 h-max w-full 
                    flex flex-col justify-center items-center 
                    bg-black/40 text-white p-2 z-20">
                    <h3 className="text-xs sm:text-lg font-bold text-center">
                        {event.title}
                    </h3>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Gallery;