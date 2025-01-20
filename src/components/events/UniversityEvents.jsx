// import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { universityEventsData } from '../../data/universityEvents';

// const Features = () => {
//   const [dragConstraint, setDragConstraint] = useState(0);
//   const containerRef = useRef(null);

//   const cardVariants = {
//     visible: { opacity: 1, scale: 1 },
//     hidden: { opacity: 0, scale: 0.8 },
//   };

//   const cardWidth = 320; // Adjust card width to match the actual width
//   const gap = 16; // Gap between cards

//   useEffect(() => {
//     const calculateDragConstraint = () => {
//       const containerWidth = containerRef.current.offsetWidth;
//       const totalWidth = universityEventsData.length * (cardWidth + gap + 70);
//       const constraint = -(totalWidth - containerWidth + gap);
//       setDragConstraint(constraint);
//     };

//     // Calculate on mount and when window resizes
//     calculateDragConstraint();
//     window.addEventListener('resize', calculateDragConstraint);

//     return () => {
//       window.removeEventListener('resize', calculateDragConstraint);
//     };
//   }, [cardWidth, gap]);

//   return (
//     <div className="relative w-full bg-transparent py-8 overflow-hidden">
//       {/* Container for the cards */}
//       <div className="flex overflow-x-scroll snap-end snap-mandatory space-x-4 px-4 md:px-8 scrollbar-hide" ref={containerRef}>
//         <motion.div
//           className="flex space-x-4"
//           drag="x"
//           dragConstraints={{ right: 0, left: dragConstraint }}
//           style={{ cursor: 'grab' }}
//           initial="hidden"
//           animate="visible"
//           transition={{ staggerChildren: 0.2 }}
//         >
//           {universityEventsData.map((event) => (
//             <motion.div
//               key={event.id}
//               className="snap-start flex-shrink-0 w-64 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 p-4 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg relative"
//               variants={cardVariants}
//               transition={{ duration: 0.8, ease: 'easeInOut' }}
//             >
//               {/* Background image */}
//               <div
//                 className="absolute inset-0 bg-cover bg-center rounded-lg opacity-70"
//                 style={{
//                   backgroundImage: `url(${event.imageURL})`,
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                 }}
//               ></div>

//               {/* Content */}
//               <div className="relative z-10 text-center p-4 bg-opacity-75 bg-white rounded-lg">
//                 <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{event.title}</h2>
//                 <p className="mb-4 text-sm sm:text-base">{event.description}</p>
//                 <Link
//                   to={event.link}
//                   className="inline-block mt-4 text-blue-500 font-semibold hover:underline"
//                 >
//                   View Details &rarr;
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Features;

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, MapPin, CalendarDays } from 'lucide-react';
// import { universityEventsData } from '../../data/universityEvents';
// import { useNavigate } from 'react-router-dom';

// const LocalEvents = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visiblePosts, setVisiblePosts] = useState(3);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setVisiblePosts(
//         width < 640 ? 1 :
//         width < 1024 ? 2 : 3
//       );
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const nextSlide = () => {
//     setCurrentIndex((prev) =>
//       Math.min(prev + 1, universityEventsData.length - visiblePosts)
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => Math.max(prev - 1, 0));
//   };

//   return (
//     <section className="bg-neutral-100 py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4 md:mb-0">
//             University Events
//           </h2>
//           <div className="flex space-x-2">
//             <button
//               onClick={prevSlide}
//               disabled={currentIndex === 0}
//               className={`
//                 p-2 rounded-lg border border-neutral-300
//                 ${currentIndex === 0
//                   ? 'opacity-50 cursor-not-allowed'
//                   : 'hover:bg-neutral-200 transition-colors'}
//               `}
//             >
//               <ChevronLeft className="text-neutral-700" />
//             </button>
//             <button
//               onClick={nextSlide}
//               disabled={currentIndex >= universityEventsData.length - visiblePosts}
//               className={`
//                 p-2 rounded-lg border border-neutral-300
//                 ${currentIndex >= universityEventsData.length - visiblePosts
//                   ? 'opacity-50 cursor-not-allowed'
//                   : 'hover:bg-neutral-200 transition-colors'}
//               `}
//             >
//               <ChevronRight className="text-neutral-700" />
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-hidden">
//           <div
//             className="flex gap-4 transition-transform duration-500 ease-in-out"
//             style={{
//               transform: `translateX(-${(currentIndex * 100) / visiblePosts}%)`
//             }}
//           >
//             {universityEventsData.map((event) => (
//               <div
//                 key={event.id}
//                 className={`
//                   flex-shrink-0 w-full
//                   ${visiblePosts === 1 ? 'md:w-full' :
//                     visiblePosts === 2 ? 'md:w-1/2' : 'lg:w-1/3'}
//                   mb-4
//                 `}
//                 style={{
//                   width: visiblePosts === 1 ? '100%' :
//                          visiblePosts === 2 ? 'calc(50% - 1rem)' :
//                          'calc(33.333% - 1.33rem)'
//                 }}
//               >
//                 <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
//                   <div className="relative">
//                     <img
//                       src={event.imageURL}
//                       alt={event.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="absolute top-2 right-2 bg-white/80 rounded-full p-2">
//                       <CalendarDays className="w-5 h-5 text-neutral-700" />
//                     </div>
//                   </div>
//                   <div className="p-4 flex-grow flex flex-col">
//                     <h3
//                       onClick={() => navigate(`/eventdetails/${event.slug}`)}
//                       className="text-lg font-semibold text-neutral-800 mb-2 flex-grow hover:cursor-pointer">
//                       {event.title}
//                     </h3>
//                     <p className="text-neutral-600 text-sm mb-3">
//                       {event.description}
//                     </p>
//                     <div className="flex items-center text-sm text-neutral-500">
//                       <MapPin className="w-4 h-4 mr-2" />
//                       <span>{event.location}</span>
//                     </div>
//                     <div className="mt-2 flex items-center text-sm text-neutral-500">
//                       <CalendarDays className="w-4 h-4 mr-2" />
//                       <span>{event.date}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LocalEvents;

import React, {useState,useEffect} from "react";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import { MapPin, CalendarDays } from "lucide-react";
import "./UniversityEvents.css";

const UniversityEvents = () => {
  const navigate = useNavigate();
  const [universityEventsData, setUniversityEventsData] = useState([]);
    
      useEffect(()=>{
        const fetchData = async()=>{
          const response = await fetch("https://djsnss-web.onrender.com/events/past-events")
          .then((data)=>data.json())
          .catch((error)=>{
            console.log(error.message);
          })
    
          const formattedEvents = response.events
          .filter((event) => event.scope === "University")
          .map((event) => {
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
          
          setUniversityEventsData(formattedEvents)
        };
        
        fetchData();
      }, [] )

  return (
    <div className="h-[60vh] sm:h-[80vh] w-full px-4 my-5 sm:my-10">
      <h1 className="text-2xl md:text-3xl font-bold text-black">University Events :-</h1>

      <CCarousel controls={universityEventsData.length > 1}
          indicators={universityEventsData.length > 1}
          interval={universityEventsData.length > 1 ? 5000 : false}>
        {universityEventsData.map((event) => (
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
    </div>
  );
};

export default UniversityEvents;
