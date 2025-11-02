import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const DynamicPage = ({ event }) => {
  if (!event) return null

  const years = event.year ? Object.keys(event.year) : []

  // Default to 2025 if available, else first year
  const initialYear = years.includes('2025') ? '2025' : (years[0] || '')
  const [selectedYear, setSelectedYear] = useState(initialYear)

  // Re-evaluate default when years list changes (e.g., route change)
  useEffect(() => {
    const nextDefault = years.includes('2025') ? '2025' : (years[0] || '')
    setSelectedYear(nextDefault)
  }, [JSON.stringify(years)])

  const handleYearChange = (e) => setSelectedYear(e.target.value)

  const selectedData = event.year && selectedYear ? event.year[selectedYear] : {
    bgImage: event.bgImage,
    featuredImage: event.featuredImage,
    location: event.location,
    date: event.date,
    images: event.images || []
  }

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
            
            {years.length > 0 ? (
              <div className='flex flex-col items-center'>
                <div className='flex items-center justify-center flex-wrap gap-3'>
                  {selectedData.date && (
                    <span className='text-white font-roboto text-3xl '>{selectedData.date}</span>
                  )}
                  <label htmlFor='year-select' className='sr-only'>Select Year</label>
                  <select
                    id='year-select'
                    value={selectedYear}
                    onChange={handleYearChange}
                    className='text-white bg-transparent text-2xl rounded-lg text-roboto py-2 shadow-sm focus:outline-none '
                  >
                    {years.map((year) => (
                      <option
                        key={year}
                        value={year}
                        className="text-black bg-secondary-blue"
                      >
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='mt-2 text-white/90'>{selectedData.location}</div>
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
            <h2 className='text-3xl font-bold mb-8'>What is {event.title}?</h2>
            <div className='md:flex items-center'>
              <p className='text-sm sm:text-lg text-justify leading-relaxed text-gray-300 md:w-2/3 md:mr-6'>
                <span dangerouslySetInnerHTML={{ __html: event.description }} />
              </p>
              <div className='mt-6 md:mt-0 md:w-1/3'>
                <img
                  src={selectedData.featuredImage}
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
            {selectedData.images.map((image, index) => (
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

DynamicPage.propTypes = {
  event: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    bgImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    featuredImage: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}

export default DynamicPage
