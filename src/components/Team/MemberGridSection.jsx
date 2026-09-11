import React from 'react';
import { motion } from 'framer-motion';
import SlideShell from './SlideShell';
import PolaroidCard from './PolaroidCard';

export default function MemberGridSection({ 
  id, 
  sectionTitle = "", // e.g. "Heads"
  subTitle = "",     // e.g. "Event Heads", "Publicity Heads", "Creatives Head", "Technical Heads"
  members = [],
  leafCorner = 'top-left-bottom-right'
}) {
  const cardConfigs = [
    { decoration: 'clip', cornerAccent: 'burst-br', rotate: -5 },
    { decoration: 'tape-corners', cornerAccent: 'none', rotate: 3 },
    { decoration: 'clip', cornerAccent: 'swirl-tl', rotate: -3 },
    { decoration: 'pin', cornerAccent: 'none', rotate: 4 },
    { decoration: 'tape', cornerAccent: 'burst-br', rotate: -4 },
  ];

  return (
    <SlideShell id={id} leafCorner={leafCorner}>
      <div className="flex flex-col items-center justify-center w-full max-w-6xl my-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-6"
        >
          {sectionTitle && (
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-extrabold text-nss-navy tracking-tight mb-1">
              {sectionTitle}
            </h2>
          )}

          {subTitle && (
            <p className="font-script text-3xl sm:text-4xl md:text-5xl font-bold text-nss-navy tracking-wide">
              {subTitle}
            </p>
          )}
        </motion.div>

        {/* Grid / Row of Polaroid Cards */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-14 w-full my-auto">
          {members.map((member, index) => {
            const config = cardConfigs[index % cardConfigs.length];
            return (
              <PolaroidCard 
                key={member.name || index}
                photo={member.photo || member.image}
                name={member.name}
                role={member.role || member.position || ''}
                linkedin={member.linkedin}
                decoration={config.decoration}
                cornerAccent={config.cornerAccent}
                rotate={config.rotate}
              />
            );
          })}
        </div>

      </div>
    </SlideShell>
  );
}
