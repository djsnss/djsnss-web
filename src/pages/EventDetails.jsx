import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { localEventsData } from "../data/areaEvents";
import { largeEventsData } from "../data/largeEvents";
// Import other event data arrays
import { universityEventsData } from "../data/universityEvents";
import { TechnicalProjects } from "../data/technicalProjects";
import { useState, useEffect } from "react";

// Combine all event data arrays
const staticEventsData = [
  ...largeEventsData,
  ...universityEventsData,
  ...localEventsData,
  ...TechnicalProjects,
];

const EventDetails = () => {
  const { slug } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const staticEvent = staticEventsData.find((event) => event.slug === slug);

        if (staticEvent) {
          setEventDetail(staticEvent);
          setLoading(false);
          return;
        }

        // If not found in static data, fetch from API
        const [pastEventsResponse, upcomingEventsResponse] = await Promise.all([
          fetch("https://djsnss-web.onrender.com/events/past-events"),
          fetch("https://djsnss-web.onrender.com/events/upcoming-events"),
        ]);

        if (!pastEventsResponse.ok || !upcomingEventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }

        const pastEventsData = await pastEventsResponse.json();
        const upcomingEventsData = await upcomingEventsResponse.json();

        // Handle different response structures
        const pastEvents = Array.isArray(pastEventsData) ? pastEventsData : pastEventsData.events || pastEventsData.data || [];
        const upcomingEvents = Array.isArray(upcomingEventsData) ? upcomingEventsData : upcomingEventsData.events || upcomingEventsData.data || [];

        const allDynamicEvents = [...pastEvents, ...upcomingEvents];

        const transformedEvents = allDynamicEvents.map(event => ({
          title: event.name,
          description: event.description,
          longDescription: event.description, // You might want to add a longDescription field to your API
          scale: event.scope,
          duration: "TBD", // Add duration field to your API if needed
          location: event.location,
          date: new Date(event.date).toLocaleDateString(),
          imageURL: event.photo?.url || '', // Handle the photo object
          slug: event.slug
        }));

        // Find the event in API data
        const foundEvent = transformedEvents.find((event) => event.slug === slug);

        if (foundEvent) {
          setEventDetail(foundEvent);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        setError("Failed to load event details");
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">{error}</h1>
          <Link to="/events" className="text-blue-500 hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        {eventDetail ? (
          <motion.div
            className={`w-full pt-16 p-6 flex flex-col lg:flex-row bg-sky-100 text-black`}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.img
              src={eventDetail.imageURL}
              alt={eventDetail.title}
              className="w-[80vh] h-96 mr-0 lg:mr-6 self-center object-cover rounded-lg shadow-xl shadow-black/50"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {eventDetail.title}
              </h1>
              <p className="text-lg lg:text-xl mb-2">
                {eventDetail.description}
              </p>
              <p className="text-sm text-justify lg:text-base mb-4 opacity-90">
                {eventDetail.longDescription}
              </p>
              <div className="flex flex-col lg:flex-row justify-between mt-4 ">
                <div className="space-y-2 mb-4">
                  <p className="text-base lg:text-lg">
                    <strong>Scale:</strong> {eventDetail.scale}
                  </p>
                  <p className="text-base lg:text-lg">
                    <strong>Location:</strong> {eventDetail.location}
                  </p>
                  <p className="text-base lg:text-lg">
                    <strong>Date:</strong> {eventDetail.date}
                  </p>
                </div>
                <div>
                  <a
                    href="https://djsnss-certificate.streamlit.app"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-gray-800 hover:text-blue-500 px-4 py-2 mt-4 rounded-lg font-bold hover:bg-gray-100 transition-colors no-underline hover:underline"
                  >
                    Generate Certificate &gt;
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-red-500">Event Not Found</h1>
            <Link to="/events" className="ml-4 text-blue-500">
              Back to Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
