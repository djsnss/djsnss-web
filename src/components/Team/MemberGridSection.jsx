import React from 'react';
import { motion } from 'framer-motion';
import SlideShell from './SlideShell';
import PolaroidCard from './PolaroidCard';
import DiamondDoodle from '../../assets/team/doodles/DiamondDoodle';

export default function MemberGridSection({ 
  id, 
  sectionTitle = "", // e.g. "Heads"
  subTitle = "",     // e.g. "Event Heads", "Publicity Heads", "Creatives Head", "Technical Heads"
  members = [],
  leafCorner = 'top-left-bottom-right'
}) {
  const cardConfigs = [
    { decoration: 'clip', cornerAccent: 'burst-br', rotate: -3 },
    { decoration: 'tape-corners', cornerAccent: 'diamond-tr', rotate: 2 },
    { decoration: 'pin', cornerAccent: 'swirl-tl', rotate: -2 },
    { decoration: 'tape', cornerAccent: 'heart-tl', rotate: 3 },
    { decoration: 'clip', cornerAccent: 'burst-br', rotate: -3 },
  ];

  // If 5+ members (e.g. Publicity Heads with 5 members), split into 2 separate rows:
  // Row 1 = 3 polaroids, Row 2 = 2 polaroids.
  const isTwoRow = members.length > 4;
  const row1Count = isTwoRow ? Math.ceil(members.length / 2) : members.length;
  const row1 = isTwoRow ? members.slice(0, row1Count) : members;
  const row2 = isTwoRow ? members.slice(row1Count) : [];

  return (
    <SlideShell id={id} leafCorner={leafCorner} contentClassName={isTwoRow ? "-translate-y-1 md:-translate-y-2" : ""}>
      <div className={`flex flex-col items-center justify-center w-full max-w-6xl my-auto ${isTwoRow ? 'py-0.5' : ''}`}>
        
        {/* Section Header with Diamond Accent */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center flex flex-col items-center ${isTwoRow ? 'mb-1 sm:mb-1.5 md:mb-2' : 'mb-2 sm:mb-3 md:mb-4'}`}
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 opacity-75 mb-0.5 pointer-events-none">
            <DiamondDoodle color="#3B4E7C" />
          </div>

          {sectionTitle && (
            <h2 className={`font-serif font-extrabold text-nss-navy tracking-tight mb-0.5 ${
              isTwoRow ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-4xl sm:text-5xl md:text-6xl mb-1'
            }`}>
              {sectionTitle}
            </h2>
          )}

          {subTitle && (
            <p className={`font-script font-bold text-nss-navy tracking-wide ${
              isTwoRow ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'
            }`}>
              {subTitle}
            </p>
          )}
        </motion.div>

        {isTwoRow ? (
          /* 2 Separate Rows for 5+ members (3 on top row, 2 on bottom row) */
          <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 w-full">
            {/* Row 1: 3 polaroids */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6 lg:gap-8 w-full">
              {row1.map((member, index) => {
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
                    size="compact"
                  />
                );
              })}
            </div>

            {/* Row 2: 2 polaroids */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6 lg:gap-8 w-full">
              {row2.map((member, index) => {
                const config = cardConfigs[(index + row1.length) % cardConfigs.length];
                return (
                  <PolaroidCard 
                    key={member.name || (index + row1.length)}
                    photo={member.photo || member.image}
                    name={member.name}
                    role={member.role || member.position || ''}
                    linkedin={member.linkedin}
                    decoration={config.decoration}
                    cornerAccent={config.cornerAccent}
                    rotate={config.rotate}
                    size="compact"
                  />
                );
              })}
            </div>
          </div>
        ) : (
          /* Single Row of Polaroid Cards for 1-4 members */
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full my-auto">
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
        )}

      </div>
    </SlideShell>
  );
}
