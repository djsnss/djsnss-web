import React, { useState, useEffect } from "react";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import { MapPin, CalendarDays } from "lucide-react";
import CustomLoader2 from "../Loaders/CustomLoader2";
import "./UniversityEvents.css";

const AreaEvents = ({loading, areaEventsData}) => {
  const navigate = useNavigate();

  return (
    <div className="h-[60vh] sm:h-[80vh] w-full px-4 my-5 sm:my-10">
      <h1 className="text-2xl md:text-3xl font-bold text-black">Area Events :</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CustomLoader2 />
        </div>
      ) : areaEventsData.length === 0 ? (
        <p className="text-2xl md:text-3xl w-full text-center font-bold text-black">
          No Area Events Available
        </p>
      ) : (
        <CCarousel
          controls={areaEventsData.length > 1}
          indicators={areaEventsData.length > 1}
          interval={areaEventsData.length > 1 ? 5000 : false}
        >
          {areaEventsData.map((event) => (
            <CCarouselItem key={event._id}>
              <CImage
                className="d-block w-100 rounded-lg h-[50vh] sm:h-[60vh] bg-center object-cover"
                src={event.photo.url}
                alt={event.name}
              />
              <CCarouselCaption className="text-shadow p-4 bg-white/70 rounded-lg shadow-md">
                <h5
                  onClick={() => navigate(`/eventdetails/${event.slug}`)}
                  className="text-black text-base sm:text-xl font-bold cursor-pointer mb-2"
                >
                  {event.name}
                </h5>
                <p className="text-black text-xs sm:text-sm">{event.description}</p>
                <div className="flex justify-center text-xs sm:text-sm text-black">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="mt-2 flex justify-center text-xs sm:text-sm text-black">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>{event.date}</span>
                </div>
              </CCarouselCaption>
            </CCarouselItem>
          ))}
        </CCarousel>
      )}
    </div>
  );
};

export default AreaEvents;
