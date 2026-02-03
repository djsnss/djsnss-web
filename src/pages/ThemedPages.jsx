import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const DynamicPage = ({ event }) => {
  if (!event) return null

  // Check if event.year is an array, otherwise convert the object for backward compatibility
  const yearEntries = Array.isArray(event.year)
    ? event.year
    : Object.entries(event.year || {}).map(([year, data]) => ({ year, ...data }))

  // Default to the index of the first '2025' entry, else the first item
  const initialIndex = Math.max(0, yearEntries.findIndex(entry => entry.year === event.defaultYear));
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // Re-evaluate default when the event prop changes
  useEffect(() => {
    const nextDefaultIndex = Math.max(0, yearEntries.findIndex(entry => entry.year === event.defaultYear));
    setSelectedIndex(nextDefaultIndex);
  }, [event]);

  const handleYearChange = (e) => setSelectedIndex(parseInt(e.target.value, 10));

  const selectedData = yearEntries[selectedIndex] || {};

  return (
    <div
      className={`min-h-screen bg-fixed bg-${event.backgroundColor} text-white`}
      style={{
        backgroundImage: `url(${selectedData.bgImage || event.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='bg-black/70 min-h-screen'>
        {/* Header Section */}
        <header className='text-center py-20 h-screen flex flex-col justify-center'>
          <motion.h1
            className={` font-geist self-center text-white text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-wide mb-5 pt-16`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {event.title}
          </motion.h1>
          <motion.div
            className='text-md md:text-2xl text-center self-center '
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <span className='w-full border-white my-5 border-b-4'></span>
            
            {yearEntries.length > 0 ? (
              <div className='flex flex-col items-center p-2'>
                <div className='flex items-end justify-center flex-wrap gap-2 border-b-2 border-white'>
                  <label htmlFor='year-select' className='sr-only'>Select Year</label>
                  <select
                    id='year-select'
                    value={selectedIndex}
                    onChange={handleYearChange}
                    className='text-white bg-transparent  text-[1.4rem] sm:text-[1.7rem]  rounded-lg text-robot shadow-sm focus:outline-none '
                  >
                    {yearEntries.map((entry, index) => (
                      <option
                        key={index}
                        value={index}
                        className="text-black text-center bg-secondary-blue"
                      >
                        {entry.date} {entry.year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='mt-2 text-white/90 font-roboto'>{selectedData.location}</div>
              </div>
            ) : (
              <>
                {selectedData.date} | {selectedData.location}
              </>
            )}
          </motion.div>
        </header>

        {/* "What is Camp?" Section */}
        <section className={`bg-${event.backgroundColor} bg-opacity-75 py-16`}>
          <div className='max-w-7xl mx-auto px-6 md:px-12'>
            <h2 className='text-3xl font-bold mb-8 font-geist'>
              Event Overview 
            </h2>
            <div className='md:flex items-center'>
              <p className='text-sm sm:text-lg text-justify leading-relaxed text-white md:w-2/3 md:mr-6 font-roboto'>
                {/* year-wise description */}
                {selectedData?.description ? (
                  <span dangerouslySetInnerHTML={{ __html: selectedData.description }} />
                ) : (
                  <span>No description available for this year.</span>
                )}
              </p>
              <div className='mt-6 md:mt-0 md:w-1/3'>
                <img
                  src={selectedData.featuredImage || event.featuredImage}
                  alt='Camp highlight'
                  className='rounded-xl shadow-lg'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Memories Section */}
        <section className='bg-secondary-blue py-10'>
          <h3 className='text-center text-4xl font-bold text-black mb-8'>
            Memories from Previous Years
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12'>
            {(selectedData.images || []).map((image, index) => (
              <div key={index} className="w-full flex justify-center">
                <img
                  src={image}
                  alt={`Memory ${index + 1}`}
                  className='rounded-lg shadow-lg w-full max-w-xs md:max-w-sm lg:max-w-md aspect-[3/4] object-cover'
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

// Update PropTypes to accept an array for the 'year' property
DynamicPage.propTypes = {
  event: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    bgImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    featuredImage: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  }).isRequired,
}

export default DynamicPage
