import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { localEventsData } from '../data/localEvents';
import { largeEventsData } from '../data/largeEvents';
// Import other event data arrays
import { universityEventsData } from '../data/universityEvents';
// Combine all event data arrays
const allEventsData = [...largeEventsData, ...universityEventsData, ...localEventsData /* Add more arrays as needed */];

const EventDetails = () => {
  const { slug } = useParams();
  const eventDetail = allEventsData.find((event) => event.slug === slug);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div>
        {eventDetail ? (
          <motion.div
            className={`w-full p-6 flex flex-col lg:flex-row ${eventDetail.background} text-white`}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.img
              src={eventDetail.imageURL}
              alt={eventDetail.title}
              className="w-[80vh] h-96 mr-0 lg:mr-6 self-center object-cover rounded-lg"
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
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{eventDetail.title}</h1>
              <p className="text-lg lg:text-xl mb-2">{eventDetail.description}</p>
              <p className="text-sm text-justify lg:text-base mb-4 opacity-90">{eventDetail.longDescription}</p>
              <div className="flex flex-col lg:flex-row justify-between mt-4 ">
                <div className="space-y-2 mb-4">
                  <p className="text-base lg:text-lg"><strong>Scale:</strong> {eventDetail.scale}</p>
                  <p className="text-base lg:text-lg"><strong>Duration:</strong> {eventDetail.duration}</p>
                  <p className="text-base lg:text-lg"><strong>Location:</strong> {eventDetail.location}</p>
                  <p className="text-base lg:text-lg"><strong>Date:</strong> {eventDetail.date}</p>
                </div>
                <div>
                  <a
                    href="https://nsss-certificate.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-gray-800 hover:text-blue-500 px-4 py-2 mt-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
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
                <Link to="/events" className="ml-4 text-blue-500">Back to Events</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;