import React from 'react';
import { motion } from 'framer-motion';
import SlideShell from './SlideShell';
import PolaroidCard from './PolaroidCard';
import LoopyArrow from '../../assets/team/doodles/LoopyArrow';
import RayBurst from '../../assets/team/doodles/RayBurst';
import SwirlFlourish from '../../assets/team/doodles/SwirlFlourish';

export default function MemberPairSection({ 
  id, 
  sectionTitle = "",
  showTopTitle = false,
  members = [],
  layoutStyle = "centered-title", // "centered-title" (Vice Chair) | "split-roles" (Secretary/Treasurer)
  decoration = 'pin',
  rotations = [-5, 4],
  leafCorner = 'top-left-bottom-right'
}) {
  const member1 = members[0] || { name: '', photo: null, role: '', linkedin: '' };
  const member2 = members[1] || { name: '', photo: null, role: '', linkedin: '' };

  return (
    <SlideShell id={id} leafCorner={leafCorner}>
      <div className="flex flex-col items-center justify-center w-full max-w-5xl my-auto">
        
        {/* Optional Top Section Heading (e.g. TREASURER) */}
        {showTopTitle && sectionTitle && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-2 md:mb-4 z-20"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-nss-navy tracking-tight uppercase">
              {sectionTitle}
            </h2>
          </motion.div>
        )}

        <div className="relative flex items-center justify-center w-full py-1">
          
          {/* Main 2-Card Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 md:gap-8 lg:gap-12 w-full">
            
            {/* Left Polaroid Card */}
            <div className="relative flex flex-col items-center">
              <PolaroidCard 
                photo={member1.photo || member1.image}
                name={member1.name}
                role=""
                linkedin={member1.linkedin}
                decoration={decoration}
                rotate={rotations[0]}
              />
            </div>

            {/* CENTER AREA: Script title + Loopy Arrows + Clean Doodles */}
            <div className="flex flex-col items-center justify-center my-2 sm:my-0 px-2 sm:px-4 z-20 text-center min-w-[200px] md:min-w-[250px] relative">
              
              {/* LAYOUT 1: Centered Title (Vice Chairpersons) */}
              {layoutStyle === 'centered-title' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center py-4"
                >
                  {/* Ray Burst positioned in open space top-right of center title */}
                  <div className="absolute -top-8 -right-16 md:-right-24 pointer-events-none opacity-80 z-10">
                    <RayBurst color="#3B4E7C" />
                  </div>

                  {/* Swirl Flourish positioned in open space bottom-left of center title */}
                  <div className="absolute -bottom-8 -left-16 md:-left-24 pointer-events-none opacity-80 z-10">
                    <SwirlFlourish color="#3B4E7C" />
                  </div>

                  {/* Arrow curving UP and LEFT towards left polaroid */}
                  <div className="absolute -top-8 -left-10 md:-left-14 pointer-events-none z-30">
                    <LoopyArrow variant="vice-top-left" color="#7FA88F" />
                  </div>

                  {/* Hand-drawn Script Title */}
                  <h2 className="font-script text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-nss-navy tracking-wide leading-tight max-w-[220px] text-center my-1 drop-shadow-xs">
                    {sectionTitle}
                  </h2>

                  {/* Arrow curving DOWN and RIGHT towards right polaroid */}
                  <div className="absolute -bottom-8 -right-10 md:-right-14 pointer-events-none z-30">
                    <LoopyArrow variant="vice-bottom-right" color="#7FA88F" />
                  </div>
                </motion.div>
              )}

              {/* LAYOUT 2: Split Roles (Secretary & Joint Secretary / Treasurer & Joint Treasurer) */}
              {layoutStyle === 'split-roles' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col justify-between py-1 gap-8 md:gap-12 w-full relative"
                >
                  {/* Swirl Flourish top-right of title column */}
                  <div className="absolute -top-6 -right-12 md:-right-20 pointer-events-none opacity-80 z-10">
                    <SwirlFlourish color="#3B4E7C" />
                  </div>

                  {/* Ray Burst bottom-left of title column */}
                  <div className="absolute -bottom-6 -left-12 md:-left-20 pointer-events-none opacity-80 z-10">
                    <RayBurst color="#3B4E7C" />
                  </div>

                  {/* Role 1 (Top Left): "Secretary" / "Treasurer" */}
                  <div className="relative flex flex-col items-start -ml-3 sm:-ml-6 md:-ml-8">
                    <span className="font-script text-3xl sm:text-4xl md:text-5xl font-bold text-nss-navy drop-shadow-xs whitespace-nowrap">
                      {member1.role || "Secretary"}
                    </span>
                    <div className="-mt-2 -ml-2 pointer-events-none z-30">
                      <LoopyArrow variant="sec-top-left" color="#7FA88F" />
                    </div>
                  </div>

                  {/* Role 2 (Bottom Right): "Joint Secretary" / "Joint Treasurer" */}
                  <div className="relative flex flex-col items-end -mr-3 sm:-mr-6 md:-mr-8">
                    <span className="font-script text-3xl sm:text-4xl md:text-5xl font-bold text-nss-navy text-right leading-tight drop-shadow-xs whitespace-nowrap">
                      {member2.role || "Joint Secretary"}
                    </span>
                    <div className="-mt-2 -mr-2 pointer-events-none z-30">
                      <LoopyArrow variant="sec-bottom-right" color="#7FA88F" />
                    </div>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Polaroid Card */}
            <div className="relative flex flex-col items-center">
              <PolaroidCard 
                photo={member2.photo || member2.image}
                name={member2.name}
                role=""
                linkedin={member2.linkedin}
                decoration={decoration}
                rotate={rotations[1]}
              />
            </div>

          </div>

        </div>

      </div>
    </SlideShell>
  );
}
