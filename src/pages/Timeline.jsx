// import ReactDOM from "react-dom";
// import { useState, useEffect } from "react";
// import {
//   VerticalTimeline,
//   VerticalTimelineElement,
// } from "react-vertical-timeline-component";
// import { AnimatePresence, motion } from "framer-motion";
// import "react-vertical-timeline-component/style.min.css";
// import { AiOutlinePlus } from "react-icons/ai";
// import "../Timeline.css";
// import TirangaRally from "../assets/Events/TirangaRally/IMG_4530.jpg";
// import GrainAThon from "../assets/Events/GrainAThon.png";
// import BorivaliTP from "../assets/Events/TreePlantation.png";
// import NSSCamp from "../assets/Events/NSSCamp.jpg";
// import AnnualCharity from "../assets/Events/AnnualCharity.png";
// import VoterRegistration from "../assets/Events/VoterRegistration.png";
// import BDD from "../assets/Events/BDD.jpg";
// import NewspaperCollectionDrive from "../assets/Events/NewspaperCollection.png";
// import IndependenceDayRally from "../assets/Events/TirangaRally/IMG_4530.jpg";
// import { largeEventsData } from "../data/largeEvents";

// const TimelineComponent = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false); // Track if the image has loaded

//   const backgroundImages = [
//     TirangaRally,
//     GrainAThon,
//     BorivaliTP,
//     NSSCamp,
//     AnnualCharity,
//     VoterRegistration,
//     BDD,
//     NewspaperCollectionDrive,
//     IndependenceDayRally
//   ];

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setIsTransitioning(true);
//       setTimeout(() => {
//         setCurrentImageIndex((prevIndex) => 
//           (prevIndex + 1) % backgroundImages.length
//         );
//         setIsTransitioning(false);
//       }, 500);
//     }, 4000);

//     return () => clearInterval(intervalId);
//   }, [isTransitioning, backgroundImages.length]);

//   const timelineData = largeEventsData;

//   const [visibleItems, setVisibleItems] = useState(2);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState(null);

//   const loadMore = () => {
//     setVisibleItems((prev) => Math.min(prev + 2, timelineData.length));
//   };

//   const openModal = (data) => {
//     setModalData(data);
//     setIsModalOpen(true);
//   };

//   // Function to handle image load completion
//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentImageIndex}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1 }}
//           className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-all duration-500 ${!imageLoaded ? 'bg-gradient-to-bl from-blue-300 to-gray-300' : ''}`}
//           style={{
//             backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
//           }}
//         >
//           {/* Image will load lazily and update state once loaded */}
//           <img
//             src={backgroundImages[currentImageIndex]}
//             alt="background"
//             loading="lazy"
//             className="hidden"
//             onLoad={handleImageLoad} // Handle image load
//           />
//         </motion.div>
//       </AnimatePresence>

//       <div className="absolute inset-0 backdrop-blur-sm bg-black/75" />

//       <div className="relative overflow-y-scroll py-10">
//         <VerticalTimeline lineColor="rgba(255, 255, 255, 0.2)">
//           {timelineData.slice(0, visibleItems).map((item, index) => (
//             <VerticalTimelineElement
//               key={index}
//               date={item.date}
//               dateClassName="timeline-date"
//               icon={<item.icon />}
//               iconStyle={{
//                 background: item.color,
//                 color: "white",
//                 border: `2px solid ${item.color}`,
//                 backdropFilter: "blur(8px)",
//               }}
//               contentStyle={{
//                 background: "rgba(255, 255, 255, 0.15)",
//                 color: "white",
//                 border: `1px solid rgba(255, 255, 255, 0.2)`,
//                 backdropFilter: "blur(15px)",
//                 borderRadius: "10px",
//               }}
//               contentArrowStyle={{
//                 borderRight: `7px solid rgba(255, 255, 255, 0.15)`,
//               }}
//             >
//               <h3
//                 className="vertical-timeline-element-title pb-0"
//                 style={{ color: item.color }}
//               >
//                 {item.title}
//               </h3>
//               <p>{item.description}</p>
//               <button
//                 onClick={() => openModal(item)}
//                 className="mt-2 px-4 py-2 bg-white/10 backdrop-blur-lg text-white rounded-lg hover:bg-white/20 transition-all block"
//               >
//                 View Details
//               </button>
//             </VerticalTimelineElement>
//           ))}
//         </VerticalTimeline>

//         {visibleItems < timelineData.length && (
//           <div className="text-center mt-5">
//             <div
//               onClick={loadMore}
//               className="w-12 h-12 bg-[rgba(255,255,255,0.15)] text-white border border-[rgba(255,255,255,0.2)] backdrop-blur-md rounded-full flex items-center justify-center mx-auto cursor-pointer shadow-md transition-transform duration-200 hover:scale-110"
//             >
//               <AiOutlinePlus size={24} />
//             </div>
//           </div>
//         )}
//       </div>

//       {ReactDOM.createPortal(
//         <EventModal
//           isOpen={isModalOpen}
//           setIsOpen={setIsModalOpen}
//           data={modalData}
//         />,
//         document.body
//       )}
//     </div>
//   );
// };

// import PropTypes from 'prop-types';

// const EventModal = ({ isOpen, setIsOpen, data }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setIsOpen(false)}
//           className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md grid place-items-center cursor-pointer select-none"
//         >
//           <motion.div
//             initial={{ scale: 0.8, rotate: "10deg" }}
//             animate={{ scale: 1, rotate: "0deg" }}
//             exit={{ scale: 0, rotate: "0deg" }}
//             onClick={(e) => e.stopPropagation()}
//             className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-6 rounded-2xl w-full max-w-6xl lg:max-w-5xl md:max-w-4xl sm:max-w-3xl shadow-xl cursor-default relative overflow-hidden"
//           >
//             <div className="relative flex flex-col lg:flex-row">
//               <img
//                 src={data?.imageURL}
//                 alt={data?.title}
//                 className="w-full lg:w-1/2 lg:h-[300px] object-cover rounded-lg mb-4 lg:mb-0"
//               />
//               <div className="relative z-10 text-center flex flex-col justify-center lg:pl-6 lg:text-left">
//                 <h3 className="text-2xl font-bold mb-2">{data?.title}</h3>
//                 <p className="mb-6 text-sm lg:text-base">{data?.longDescription}</p>
//                 <div className="flex justify-center">
//                   <button
//                     onClick={() => setIsOpen(false)}
//                     className="w-1/2 lg:w-[25%] py-2 rounded font-semibold text-white transition-all"
//                     style={{
//                       background: data?.color,
//                       borderColor: data?.color,
//                     }}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
// EventModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   setIsOpen: PropTypes.func.isRequired,
//   data: PropTypes.shape({
//     imageURL: PropTypes.string,
//     title: PropTypes.string,
//     longDescription: PropTypes.string,
//     color: PropTypes.string,
//   }),
// };

// export default TimelineComponent;


import React, { useState, useEffect } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { AnimatePresence, motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { Clock, Plus } from "lucide-react";
import { largeEventsData } from "../data/largeEvents";

const TimelineComponent = () => {
  const timelineData = largeEventsData;

  const [visibleItems, setVisibleItems] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % timelineData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 2, timelineData.length));
  };

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center" />
      
      <div className="relative py-12">
        <h1 className="text-4xl font-bold text-center text-white mb-12 font-sans">
          Our Journey
        </h1>
        
        <VerticalTimeline lineColor="rgba(255, 255, 255, 0.1)">
          {timelineData.slice(0, visibleItems).map((item, index) => (
            <VerticalTimelineElement
              key={index}
              date={item.date}
              dateClassName="text-gray-300 font-medium absolute bottom-0 left-4"
              icon={<item.icon className="w-6 h-6" />}
              iconStyle={{
                background: item.color,
                boxShadow: `0 0 0 4px ${item.color}40, inset 0 2px 0 rgb(0 0 0 / 8%), 0 3px 0 4px rgb(0 0 0 / 5%)`,
              }}
              contentStyle={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              }}
              contentArrowStyle={{
                borderRight: "7px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <h3 className="text-lg sm:text-xl font-bold" style={{ color: item.color }}>
                {item.title}
              </h3>
              <h1 className="text-base sm:text-lg text-gray-300">{item.description}</h1>
              <button
                onClick={() => openModal(item)}
                className="px-4 sm:px-6 py-2 mt-2 mb-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-white/20"
              >
                Learn More
              </button>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        {visibleItems < timelineData.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={loadMore}
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all duration-300 hover:border-white/20"
            >
              <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span>Load More</span>
            </button>
          </motion.div>
        )}
      </div>

      <EventModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        data={modalData}
      />
    </div>
  );
};

const EventModal = ({ isOpen, setIsOpen, data }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 grid place-items-start justify-items-center m-6 rounded-2xl overflow-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-max bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-auto"
          >
            <img
              src={data.imageURL}
              alt={data.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-3 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                {data.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-6">
                {data.longDescription}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: data.color,
                    boxShadow: `0 0 20px ${data.color}40`,
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimelineComponent;