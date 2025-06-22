import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CalendarDays, FileText, Link as LinkIcon } from 'lucide-react';
import CustomLoader2 from '../Loaders/CustomLoader2';

const Announcement = () => {
  const navigate = useNavigate();
  const [upcomingEventsData, setUpcomingEventsData] = useState([]);
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("https://djsnss-web.onrender.com/announcement/get-announcements");
        const data = await response.json();
        
        // Format the dates for announcements
        const formattedAnnouncements = data.announcements?.map(announcement => {
          if (announcement.date) {
            const announcementDate = new Date(announcement.date);
            const formattedDate = announcementDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            });
            return { ...announcement, formattedDate };
          } else {
            return { ...announcement, formattedDate: "Date not specified" };
          }
        }) || [];
        
        setAnnouncementsData(formattedAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements:", error.message);
      } finally {
        setLoading1(false);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://djsnss-web.onrender.com/events/upcoming-events");
        const data = await response.json();

        const formattedEvents = data.events.map((event) => {
          if (event.date) {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .split("/")
              .join("-");
            return { ...event, formattedDate };
          } else {
            return { ...event, formattedDate: "Date to be announced" };
          }
        });
        console.log(formattedEvents);
        setUpcomingEventsData(formattedEvents);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading2(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full bg-blue-50 px-4 md:px-8 py-6 md:py-10">
      <h2 className="text-3xl md:text-4xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 text-center">What's New?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Announcements Column */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-[#0066b2] text-white px-6 py-4">
            <h3 className="text-xl font-bold text-center">Announcements</h3>
          </div>
          
          <div className="h-[350px] overflow-y-auto p-4">
            {loading1 ? (
              <div className="h-48 flex justify-center items-center">
                <CustomLoader2 />
              </div>
            ) : announcementsData.length === 0 ? (
              <p className="text-lg text-center font-medium text-gray-600 py-10">
                No Announcement
              </p>
            ) : (
                <ul className="divide-y divide-gray-200">
                {announcementsData.map((announcement) => (
                    <li key={announcement._id} className="px-6 py-4 hover:bg-gray-50 relative">
                    {announcement.isNew && (
                      <span className="absolute top-2 right-2 bg-[#0066b2] text-white text-xs font-bold px-2 py-0.5 rounded uppercase">
                        New
                      </span>
                    )}
                    <div className="flex items-start">
                        {announcement.typeOfContent === 'pdf' ? (
                          <FileText className="w-5 h-5 text-red-500 mt-1 flex-shrink-0 mr-2" />
                        ) : announcement.typeOfContent === 'link' ? (
                          <LinkIcon className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0 mr-2" />
                        ) : (
                          <div className="w-2 h-2 bg-[#0066b2] rounded-full mt-2 flex-shrink-0 mr-3"></div>
                        )}
                        
                        <div className="flex-1">
                        {announcement.typeOfContent === 'pdf' ? (
                            <a 
                            href={announcement.pdfLink} 
                            className="text-grey-800 font-medium hover:underline"
                            target="_blank"
                            download={`${announcement.title}.pdf`}
                            >
                            {announcement.title}
                            </a>
                        ) : announcement.typeOfContent === 'link' ? (
                            <a 
                            href={announcement.urlLink} 
                            className="text-grey-800 font-medium hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            {announcement.title}
                            </a>
                        ) : (<>
                        <p className="font-medium` text-gray-800">{announcement.title}</p>
                        <p className="font-normal text-gray-800">{announcement.content}</p>
                          </>
                        )}
                        
                        <div className="text-sm text-gray-500 mt-1">
                            {announcement.formattedDate}
                        </div>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            )}
          </div>
        </div>

        {/* Upcoming Events Column */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-[#0066b2] text-white px-6 py-4">
            <h3 className="text-xl font-bold text-center">Upcoming Events</h3>
          </div>
          
          <div className="h-[350px] overflow-y-auto p-4">
            {loading2 ? (
              <div className="h-48 flex justify-center items-center">
                <CustomLoader2 />
              </div>
            ) : upcomingEventsData.length === 0 ? (
              <p className="text-lg text-center font-medium text-gray-600 py-10">
                No Upcoming Events
              </p>
            ) : (
              <ul className="space-y-4">
                {upcomingEventsData.map((event) => (
                  <li key={event._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="relative h-36">
                      <img 
                        src={event.photo?.url || '/placeholder-event.jpg'} 
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 
                        onClick={() => navigate(`/eventdetails/${event.slug}`)}
                        className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
                      >
                        {event.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{event.location || 'Location TBA'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        <span>{event.formattedDate || 'Date to be announced'}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
