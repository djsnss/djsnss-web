import { motion } from 'framer-motion'
import Image1 from '../../assets/Events/Yaarana/IMG_1628.jpg'

const AboutSection = () => {
  return (
    <>
      {/* Decorative Line
      <div className='h-1 bg-dark-navy m-6'></div> */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center justify-center my-7'
      >
        <img
          src={Image1}
          alt='NSS Event'
          className='w-full md:w-1/2 h-60 md:h-96 object-cover flex-grow rounded-lg mb-4 md:mb-0'
        />
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center lg:space-x-8'>
          <h2 className='text-xl md:text-2xl lg:text-4xl font-semibold text-center mb-4 font-cursive underline -inset-0'>
            About Us
          </h2>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl mb-4'>
            DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of
            Engineering, started in 2005. Our mission is to foster the all-round
            development of society, addressing socio-economic problems and
            sustainability crises caused by global warming. We aim to transform
            individuals into resilient and capable citizens, encouraging both
            technical advancements and societal contributions.
          </p>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl hidden lg:block mb-4'>
            Our activities include regular meetings, organizing events, and
            forging lifelong connections among volunteers. We strive to connect
            with nature and rural areas, providing holistic development and
            opportunities for personal growth.
          </p>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl block lg:hidden mb-4'>
            Our activities include regular meetings, organizing events, and
            forging lifelong connections among volunteers. We strive to connect
            with nature and rural areas, providing holistic development and
            opportunities for personal growth.
          </p>
        </div>
      </motion.div>
      {/* Decorative Line
      <div className='h-1 bg-dark-navy m-6'></div> */}
    </>
  )
}

export default AboutSection
