import React from 'react';
import { motion } from 'framer-motion';
import SlideShell from './SlideShell';
import YearSelector from './YearSelector';
import SparkleSwirl from '../../assets/team/doodles/SparkleSwirl';

export default function CoverSlide({ years = [], selectedYear, onSelectYear }) {
  return (
    <SlideShell id="cover" leafCorner="top-left-bottom-right" showStars={true}>
      <div className="flex flex-col items-center text-center my-auto max-w-3xl">
        {/* Script Header "Meet The" */}
        <motion.span 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-script text-3xl sm:text-4xl md:text-5xl text-nss-navy font-medium tracking-wide mb-1"
        >
          Meet The
        </motion.span>

        {/* Main Title "CORE TEAM" */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-nss-navy tracking-tight leading-none uppercase drop-shadow-sm"
        >
          CORE TEAM
        </motion.h1>

        {/* Tagline "Driven by passion, united by purpose" */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="font-script text-2xl sm:text-3xl md:text-4xl text-nss-sage-dark italic font-medium mt-3 md:mt-5 max-w-xl"
        >
          "Driven by passion, united by purpose"
        </motion.p>

        {/* Year Selector Dropdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 md:mt-10 relative"
        >
          <YearSelector 
            years={years}
            selectedYear={selectedYear} 
            onSelectYear={onSelectYear} 
          />
          
          {/* Sparkle Swirl Accent near YearSelector */}
          <div className="absolute -right-14 -bottom-6 w-16 opacity-80 pointer-events-none">
            <SparkleSwirl color="#7FA88F" />
          </div>
        </motion.div>
      </div>

      {/* Polished Stacked Footer Callout */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-auto mb-0.5 md:mb-1 flex flex-col items-center text-center"
      >
        <span className="font-script text-xl sm:text-2xl md:text-3xl text-nss-navy font-semibold tracking-wide">
          Meet the incredible
        </span>
        <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-nss-navy uppercase tracking-wider leading-none mt-0.5">
          NSS TEAM
        </span>
        <div className="w-12 h-0.5 bg-nss-navy/40 rounded-full mt-1.5" />
      </motion.div>
    </SlideShell>
  );
}
