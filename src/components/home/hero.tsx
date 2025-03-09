import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Background from '../../assets/Events/TreePlantation.png'
import About from '../components/home/About'
import { useState, useEffect } from 'react'

export default function Hero () {
  return (
    <section className='pb-20 md:pb-32 relative overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-70'></div>
        <div className='absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent'></div>
        <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent'></div>

        {/* Abstract shapes */}
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-1/4 right-1/3 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      <div className='flex flex-col md:flex-row items-center min-h-screen mx-auto mt-20 md:mt-0 px-4 md:px-6 relative z-10 text-center md:text-left w-screen'>
        <motion.div
          className='w-full md:w-1/2 z-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className='text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Empowering Communities Through Service
          </motion.h1>
          <motion.div
            className='text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 mb-6'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            For You, With You, Always!
          </motion.div>
          <motion.p
            className='text-lg md:text-xl text-gray-700 mb-8 leading-relaxed'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            National Service Scheme at DJ Sanghvi College of Engineering — where
            students become catalysts for positive social change.
          </motion.p>
          <motion.div
            className='flex flex-col sm:flex-row gap-4 justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
<a href="/volunteer">
            <button className='shadow-black/40 bg-blue-600 hover:opacity-80 text-lg flex justify-center items-center py-2 px-6 h-12 rounded-full shadow-lg transition-all duration-300'>
              Get Involved <ArrowRight className='ml-2 h-5 w-5' />
            </button>
</a>
<a href="events">
            <button className='border border-blue-600 text-blue-600 hover:bg-blue-100 text-lg px-8 py-2 h-12 flex justify-center items-center rounded-full transition-all duration-300 shodow-black/70 shadow-lg'>
              Learn More <ArrowRight className='ml-2 h-5 w-5' />
            </button>
</a>
          </motion.div>
        </motion.div>
        <motion.img
          src={Background}
          alt='Tree Plantation'
          className='w-full md:w-1/2 h-72 md:h-96 lg:h-[700px] object-cover mt-12 md:mt-0 rounded-2xl shadow-lg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        />
      </div>

      <motion.div
        className='absolute bottom-0 left-0 right-0 h-20 pointer-events-none'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          className='w-full h-full'
        >
          <path
            fill='#ffffff'
            fillOpacity='1'
            d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </svg>
      </motion.div>
    </section>
  )
}
