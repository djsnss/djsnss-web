import React, { useEffect, useState } from "react";
import CollegeEvents from "./CollegeEvents";
import UniversityEvents from "./UniversityEvents";
import AreaEvents from "./AreaEvents";

const AllPastEvents = () => {
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://djsnss-web.onrender.com/events/past-events"
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

        setEventsData(formattedEvents);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const collegeEvents = eventsData.filter((event) => event.scope === "Local");
  const areaEvents = eventsData.filter(
    (event) => event.scope === "Area" || event.scope === "Area-Level"
  );
  const universityEvents = eventsData.filter(
    (event) => event.scope === "University"
  );

  return (
    <div className="font-roboto">
      <CollegeEvents loading={loading} localEventsData={collegeEvents} />
      <AreaEvents loading={loading} areaEventsData={areaEvents} />
      <UniversityEvents loading={loading} universityEventsData={universityEvents} />
    </div>
  );
};

export default AllPastEvents;
