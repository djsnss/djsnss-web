import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateCertificate from "../components/events/generateCertificate";
import LargeEvents from "../components/events/LargeEvents";
import CollegeEvents from "../components/events/CollegeEvents";
import UniversityEvents from "../components/events/UniversityEvents";
import AreaEvents from "../components/events/AreaEvents";
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
    <div className="w-full bg-white min-h-screen flex flex-col items-center pt-20">
      <h1 className="mx-auto mb-6 py-4 text-center text-3xl md:text-6xl font-bold text-black">
        EVENTS
      </h1>

      {/* Upcoming Events Section */}
      <div className="w-full px-6 my-6 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Upcoming Events :-
        </h2>

        {loading ? (
          <div className="h-48 flex justify-center items-center">
            <CustomLoader2 />
          </div>
        ) : upcomingEventsData.length === 0 ? (
          <p className="text-2xl md:text-3xl text-center font-bold text-black">
            No Upcoming Events
          </p>
        ) : (
          <CCarousel
            controls={upcomingEventsData.length > 1}
            indicators={upcomingEventsData.length > 1}
            interval={upcomingEventsData.length > 1 ? 5000 : false}
            className="w-full max-w-4xl mx-auto"
          >
            {upcomingEventsData.map((event) => (
              <CCarouselItem key={event._id} className="flex flex-col items-center">
                <CImage
                  className="d-block w-full rounded-lg h-60 sm:h-80 object-cover"
                  src={event.photo.url}
                  alt={event.name}
                />
                <CCarouselCaption className="p-4 bg-white/80 rounded-lg shadow-md backdrop-blur-md w-full max-w-lg mx-auto">
                  <h5
                    onClick={() => navigate(`/eventdetails/${event.slug}`)}
                    className="text-black text-base sm:text-xl font-bold cursor-pointer mb-2 text-center"
                  >
                    {event.name}
                  </h5>
                  <p className="text-black text-xs sm:text-sm text-center">
                    {event.description}
                  </p>
                  <div className="flex justify-center items-center text-xs sm:text-sm text-black mt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="mt-2 flex justify-center items-center text-xs sm:text-sm text-black">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                </CCarouselCaption>
              </CCarouselItem>
            ))}
          </CCarousel>
        )}
      </div>

      {/* Other Event Sections */}
      <div className="w-full flex flex-col gap-6">
        <LargeEvents />
        <GenerateCertificate />
        <CollegeEvents />
        <AreaEvents />
        <UniversityEvents />
      </div>
    </div>
  );
};

export default Events;
