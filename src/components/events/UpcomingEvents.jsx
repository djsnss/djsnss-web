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
import "./UpcomingEvents.css";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const [upcomingEventsData, setUpcomingEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://djsnss-web.onrender.com/events/upcoming-events"
        );
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
    <div className="h-[60vh] sm:h-[80vh] w-full px-4 my-5 sm:my-10 font-roboto">
      <h1 className="text-2xl md:text-3xl font-geist font-semibold text-black mb-3">
        Upcoming Events :
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CustomLoader2 />
        </div>
      ) : upcomingEventsData.length === 0 ? (
        <p className="text-2xl md:text-3xl w-full text-center font-geist font-semibold text-black">
          No Upcoming Events Available
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
                className="d-block w-100 rounded-lg h-[60vh] sm:h-[65vh] bg-center object-cover"
                src={event.photo.url}
                alt={event.name}
              />
              <CCarouselCaption className="text-shadow p-4 bg-white/70 rounded-lg shadow-md">
                <h5
                  onClick={() => navigate(`/eventdetails/${event.slug}`)}
                  className="text-black text-base sm:text-xl font-geist font-semibold cursor-pointer mb-2"
                >
                  {event.name}
                </h5>
                <p className="text-black text-xs sm:text-sm font-roboto mb-1">
                  {event.description}
                </p>
                <div className="flex justify-center items-center text-xs sm:text-sm text-black font-roboto">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="mt-2 flex justify-center items-center text-xs sm:text-sm text-black font-roboto">
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

export default UpcomingEvents;
