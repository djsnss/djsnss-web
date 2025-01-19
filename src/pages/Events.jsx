import React, { useEffect, useState } from "react";
import GenerateCertificate from "../components/events/GenerateCertificate";
import LargeEvents from "../components/events/LargeEvents";
import LocalEvents from "../components/events/LocalEvents";
import UniversityEvents from "../components/events/UniversityEvents";
import { MapPin, CalendarDays } from "lucide-react";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";

const Events = () => {
  const [upcomingEventsData, setUpcomingEventsData] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetch("https://djsnss-web.onrender.com/events/upcoming-events")
      .then((data)=>data.json())
      .catch((error)=>{
        console.log(error.message);
      })

      const formattedEvents = response.events.map((event) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .split("/")
          .join("-");
        return { ...event, date: formattedDate };
      });
      
      setUpcomingEventsData(formattedEvents)
    };
    
    fetchData();
  }, [] )

  return (
    <div className="h-max w-full font-poppins scroll-smooth bg-white">
      <h1 className="flex mx-auto mb-2 py-2 h-max w-full justify-center items-center text-[6vw] text-black">
        EVENTS
      </h1>

      <div className="h-[60vh] sm:h-[80vh] w-full px-4 mt-12 mb-5">
        <h1 className="text-2xl md:text-3xl font-bold text-black">
          Upcoming Events :-
        </h1>

        {upcomingEventsData.length === 0 ? (
          <p className="text-2xl md:text-3xl w-full text-center font-bold text-white">
            No Upcoming Events
          </p>
        ) : (
          <CCarousel  controls={upcomingEventsData.length > 1}
          indicators={upcomingEventsData.length > 1}
          interval={upcomingEventsData.length > 1 ? 5000 : false}>
            {upcomingEventsData.map((event) => (
              <CCarouselItem key={event._id}>
                <CImage
                  className="d-block w-100 rounded-lg h-[50vh] sm:h-[60vh] bg-center object-cover"
                  src={event.imageURL}
                  alt={event.name}
                />
                <CCarouselCaption className="text-shadow p-4 bg-white/70 rounded-lg shadow-md">
                  <h5
                    // onClick={() => navigate(`/eventdetails/${event.slug}`)}
                    className="text-black text-base sm:text-xl font-bold cursor-pointer mb-2"
                  >
                    {event.name}
                  </h5>
                  <p className="text-black text-xs sm:text-sm">
                    {event.description}
                  </p>
                  <div className="flex justify-center text-xs sm:text-sm text-black">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="mt-2 flex justify-center text-xs sm:text-sm  text-black">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                </CCarouselCaption>
              </CCarouselItem>
            ))}
          </CCarousel>
        )}
      </div>

      <LargeEvents />

      <GenerateCertificate />

      <LocalEvents />

      <UniversityEvents />
    </div>
  );
};

export default Events;
