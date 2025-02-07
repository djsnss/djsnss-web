import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import CustomLoader2 from "../components/Loaders/CustomLoader2";

const Events = () => {
  const navigate = useNavigate();
  const [upcomingEventsData, setUpcomingEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://djsnss-web.onrender.com/events/upcoming-events");
        const data = await response.json();
        
        const formattedEvents = data.events.map((event) => {
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
        
        setUpcomingEventsData(formattedEvents);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-max w-full font-poppins scroll-smooth bg-white">
      <h1 className="flex mx-auto mb-2 py-4 h-max w-full justify-center items-center text-3xl md:text-7xl text-black">
        EVENTS
      </h1>

      <div className={`${upcomingEventsData.length === 0 ? "h-[30vh]" : "h-[60vh] sm:h-[80vh]"} w-full px-4 mt-12 mb-5`}>
        <h1 className="text-2xl md:text-3xl font-bold text-black">
          Upcoming Events :-
        </h1>

        {loading ? (
          <div className="h-max w-full flex justify-center items-center">
            <CustomLoader2 />
          </div>
        ) : upcomingEventsData.length === 0 ? (
          <p className="text-2xl md:text-3xl w-full text-center font-bold text-black">
            No Upcoming Events
          </p>
        ) : (
          <CCarousel
            controls={upcomingEventsData.length > 1}
            indicators={upcomingEventsData.length > 1}
            interval={upcomingEventsData.length > 1 ? 5000 : false}
          >
            {upcomingEventsData.map((event) => (
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