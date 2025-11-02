import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { localEventsData } from "../data/areaEvents";
import { largeEventsData } from "../data/largeEvents";
import { universityEventsData } from "../data/universityEvents";
import { TechnicalProjects } from "../data/technicalProjects";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

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
        const staticEvent = staticEventsData.find(
          (event) => event.slug === slug
        );

        if (staticEvent) {
          setEventDetail(staticEvent);
          setLoading(false);
          return;
        }

        const [pastEventsResponse, upcomingEventsResponse] = await Promise.all([
          fetch("https://djsnss-web.onrender.com/events/past-events"),
          fetch("https://djsnss-web.onrender.com/events/upcoming-events"),
        ]);

        if (!pastEventsResponse.ok || !upcomingEventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }

        const pastEventsData = await pastEventsResponse.json();
        const upcomingEventsData = await upcomingEventsResponse.json();

        const pastEvents = Array.isArray(pastEventsData)
          ? pastEventsData
          : pastEventsData.events || pastEventsData.data || [];
        const upcomingEvents = Array.isArray(upcomingEventsData)
          ? upcomingEventsData
          : upcomingEventsData.events || upcomingEventsData.data || [];

        const allDynamicEvents = [...pastEvents, ...upcomingEvents];

        const transformedEvents = allDynamicEvents.map((event) => ({
          title: event.name,
          _id: event._id,
          description: event.description,
          longDescription: event.longDescription,
          scale: event.scope,
          duration: "TBD",
          location: event.location,
          date: new Date(event.date).toLocaleDateString(),
          imageURL: event.photo?.url || "",
          slug: event.slug,
          status: event.status,
          related_images: event.related_images || [],
        }));

        const foundEvent = transformedEvents.find(
          (event) => event.slug === slug
        );

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

  const handleRegister = async (eventId) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("You need to be logged in to register.");
      return;
    }

    try {
      const response = await fetch(
        `https://djsnss-web.onrender.com/volunteer/events/${eventId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ eventId: eventId }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success(`${result.message}`);
      } else {
        const errorData = await response.json();
        toast.success(`${errorData.message}`);
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-geist font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-geist font-semibold text-red-500 mb-4">
            {error}
          </h1>
          <Link
            to="/events"
            className="text-blue-500 hover:underline font-roboto"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        {eventDetail ? (
          <motion.div
            className="w-full min-h-screen pt-24 p-6 md:p-12 flex flex-col lg:flex-row items-center justify-center bg-primary-blue text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
              <h1 className="text-4xl lg:text-5xl font-geist font-semibold mb-4">
                {eventDetail.title}
              </h1>
              <p className="text-lg lg:text-xl font-roboto mb-2">
                {eventDetail.description}
              </p>
              <p className="text-sm font-roboto text-justify lg:text-base mb-4 opacity-90">
                {eventDetail.longDescription}
              </p>
              <div className="font-roboto flex flex-col lg:flex-row justify-between mt-4">
                <div className="space-y-2 mb-4">
                  <p className="text-base lg:text-lg">
                    <strong className="font-geist font-semibold">
                      Scale:
                    </strong>{" "}
                    {eventDetail.scale}
                  </p>
                  <p className="text-base lg:text-lg">
                    <strong className="font-geist font-semibold">
                      Location:
                    </strong>{" "}
                    {eventDetail.location}
                  </p>
                  <p className="text-base lg:text-lg">
                    <strong className="font-geist font-semibold">
                      Date:
                    </strong>{" "}
                    {eventDetail.date}
                  </p>
                </div>
                <div>
                  {eventDetail.status === "Upcoming" ? (
                    <button
                      onClick={() => handleRegister(eventDetail._id)}
                      className="mt-3 w-full bg-blue-500 text-white font-geist font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                    >
                      Register
                    </button>
                  ) : (
                    <a
                      href="https://djsnss-certificate.streamlit.app"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white text-gray-800 font-geist font-semibold hover:text-blue-500 px-4 py-2 mt-4 rounded-lg hover:bg-gray-100 transition-colors no-underline hover:underline"
                    >
                      Generate Certificate &gt;
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-screen font-roboto">
            <h1 className="text-3xl font-geist font-semibold text-red-500">
              Event Not Found
            </h1>
            <Link to="/events" className="ml-4 text-blue-500 font-roboto">
              Back to Events
            </Link>
          </div>
        )}
      </div>

      {eventDetail?.related_images &&
        eventDetail.related_images.filter((img) => img && img.url).length > 0 && (
          <div className="my-10">
            <h2 className="text-2xl font-geist font-semibold mb-4 px-6 md:px-12">
              Event Related Images
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12">
              {eventDetail.related_images.map(
                (img, idx) =>
                  img &&
                  img.url && (
                    <div
                      key={img._id || idx}
                      className="w-full flex justify-center"
                    >
                      <img
                        src={img.url}
                        alt={`Related Memory ${idx + 1}`}
                        className="rounded-lg shadow-lg w-full max-w-xs md:max-w-sm lg:max-w-md aspect-[3/4] object-cover"
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default EventDetails;
