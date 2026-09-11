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
    { decoration: 'clip', cornerAccent: 'burst-br', rotate: -3 },
    { decoration: 'tape-corners', cornerAccent: 'none', rotate: 2 },
    { decoration: 'pin', cornerAccent: 'swirl-tl', rotate: -2 },
    { decoration: 'tape', cornerAccent: 'none', rotate: 3 },
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
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center ${isTwoRow ? 'mb-2 sm:mb-2.5 md:mb-3' : 'mb-4 md:mb-6'}`}
        >
          {sectionTitle && (
            <h2 className={`font-serif font-extrabold text-nss-navy tracking-tight mb-0.5 ${
              isTwoRow ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-5xl sm:text-6xl md:text-7xl mb-1'
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
          <div className="flex flex-col items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4 w-full">
            {/* Row 1: 3 polaroids */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 lg:gap-8 w-full">
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
            <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 lg:gap-8 w-full">
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
        )}

      </div>
    </SlideShell>
  );
}
