import React from 'react';
import { motion } from 'framer-motion';
import SlideShell from './SlideShell';
import PolaroidCard from './PolaroidCard';
import HeartDoodle from '../../assets/team/doodles/HeartDoodle';
import CurvedArrow from '../../assets/team/doodles/CurvedArrow';

export default function SingleMemberSection({ 
  id = "chairperson",
  sectionTitle = "Upper Core",
  roleTitle = "Chairperson",
  member,
  decoration = 'tape'
}) {
  return (
    <SlideShell id={id} leafCorner="all-four">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl my-auto">
        
        {/* Section Header with Heart Accent */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-6 md:mb-10 text-center"
        >
          <div className="w-8 h-8 -mb-1 text-nss-navy opacity-80">
            <HeartDoodle color="#3B4E7C" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-nss-navy tracking-tight uppercase drop-shadow-xs">
            {sectionTitle}
          </h2>
        </motion.div>

        {/* Main Card Wrapper */}
        <div className="relative flex items-center justify-center">
          
          {/* Role Label anchored to the left of the centered card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex flex-col items-end absolute right-full mr-6 lg:mr-10 top-1/2 -translate-y-1/2 z-30 whitespace-nowrap"
          >
            <span className="font-script text-4xl lg:text-5xl text-nss-navy font-bold tracking-wide">
              {roleTitle}
            </span>
            <div className="mt-1 -mr-2 transform rotate-6">
              <CurvedArrow direction="right" color="#3B4E7C" className="w-16 h-10" />
            </div>
          </motion.div>

          {/* Mobile Role Label */}
          <div className="md:hidden mb-3 text-center">
            <span className="font-script text-3xl text-nss-navy font-bold tracking-wide">
              {roleTitle}
            </span>
          </div>

          {/* Perfectly Centered Polaroid Card */}
          <PolaroidCard 
            photo={member?.photo || member?.image}
            name={member?.name}
            role=""
            linkedin={member?.linkedin}
            decoration={decoration}
            rotate={-3}
          />
        </div>

      </div>
    </SlideShell>
  );
}
