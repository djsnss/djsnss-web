import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { largeEventsData } from '../../data/largeEvents';
const Features = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Triggers when 10% of the component is in view
    triggerOnce: false, // Allows it to trigger multiple times
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const getWidthClasses = (index, length) => {
    if (index === length - 1 && length % 2 !== 0) {
      return 'w-full';
    }
    return index % 4 === 0 || index % 4 === 3 ? 'w-full md:w-2/3' : 'w-full md:w-1/3';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Features Section */}
      <div className="w-full">
        <motion.div
          className="flex flex-wrap"
          ref={ref} // Hooking the ref to observe the section
          initial="hidden"
          animate={controls}
          transition={{ staggerChildren: 0.2 }}
        >
          {largeEventsData.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={`${getWidthClasses(index, largeEventsData.length)} relative py-24 flex flex-col justify-center items-center transition-all duration-500 ease-in-out group`}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Background image with dark overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 opacity-70 group-hover:opacity-100"
                style={{
                  backgroundImage: `url(${feature.imageURL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>

              {/* Color overlay that fades out on hover */}
              <div
                className={`absolute inset-0 ${feature.background} opacity-50 group-hover:opacity-0 transition-opacity duration-500`}
              ></div>

              {/* Content with hover effect for background */}
              <div className="relative z-10 text-center text-slate-800 group-hover:bg-white group-hover:bg-opacity-50 p-5 transition duration-500">
                <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
                <div className="w-full mx-auto border-slate-800 mb-2 border-b-4"></div>
                <p className="mb-1">{feature.description}</p>
                <Link to={feature.link} className="hover:text-blue-500 font-semibold">
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
