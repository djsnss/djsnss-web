import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const DynamicPage = ({ event }) => {
  return (
    <div
      className={`min-h-screen bg-fixed bg-${event.backgroundColor} text-white`}
      style={{
        backgroundImage: `url(${event.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='bg-black/70 min-h-screen'>
        {/* Header Section */}
        <header className='text-center py-20 h-screen flex flex-col justify-center'>
          <motion.h1
            className={`self-center text-white text-4xl md:text-7xl lg:text-9xl font-extrabold tracking-wide mb-4 pt-16`}
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
            {event.date} | {event.location}
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
                  src={event.featuredImage}
                  alt='Camp highlight'
                  className='rounded-xl shadow-lg'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Memories Section */}
        <section className='bg-white py-10'>
          <h3 className='text-center text-3xl font-bold text-black mb-6'>
            Memories from Previous Years
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12'>
            {event.images.map((image, index) => (
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
