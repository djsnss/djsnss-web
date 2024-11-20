import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { localEventsData } from '../../data/localEvents';

const Features = () => {
  const [dragConstraint, setDragConstraint] = useState(0);
  const containerRef = useRef(null);

  const cardVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.8 },
  };

  const cardWidth = 320; // Adjust card width to match the actual width
  const gap = 16; // Gap between cards

  useEffect(() => {
    const calculateDragConstraint = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const totalWidth = localEventsData.length * (cardWidth + gap + 70);
      const constraint = -(totalWidth - containerWidth + gap);
      setDragConstraint(constraint);
    };

    // Calculate on mount and when window resizes
    calculateDragConstraint();
    window.addEventListener('resize', calculateDragConstraint);

    return () => {
      window.removeEventListener('resize', calculateDragConstraint);
    };
  }, [cardWidth, gap]);

  return (
    <div className="relative w-full bg-transparent py-8 overflow-hidden">
      {/* Container for the cards */}
      <div className="flex overflow-x-scroll snap-end snap-mandatory space-x-4 px-4 md:px-8 scrollbar-hide" ref={containerRef}>
        <motion.div
          className="flex space-x-4"
          drag="x"
          dragConstraints={{ right: 0, left: dragConstraint }}
          style={{ cursor: 'grab' }}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          {localEventsData.map((event) => (
            <motion.div
              key={event.id}
              className="snap-start flex-shrink-0 w-64 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 p-4 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg relative"
              variants={cardVariants}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center rounded-lg opacity-70"
                style={{
                  backgroundImage: `url(${event.imageURL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 text-center p-4 bg-opacity-75 bg-white rounded-lg">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{event.title}</h2>
                <p className="mb-4 text-sm sm:text-base">{event.description}</p>
                <Link
                  to={event.link}
                  className="inline-block mt-4 text-blue-500 font-semibold hover:underline"
                >
                  View Details &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
