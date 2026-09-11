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
  roleGroups = null,
  layoutStyle = "centered-title", // "centered-title" (Vice Chair) | "split-roles" (Secretary/Treasurer)
  decoration = 'pin',
  rotations = [-5, 4],
  leafCorner = 'top-left-bottom-right'
}) {
  // Determine role groups if passed, or fallback to legacy members array
  const primaryRole = roleGroups?.primary?.role || members[0]?.role || "Secretary";
  const primaryMembers = roleGroups?.primary?.members || (members[0] ? [members[0]] : []);

  const secondaryRole = roleGroups?.secondary?.role || members[1]?.role || "Joint Secretary";
  const secondaryMembers = roleGroups?.secondary?.members || (members[1] ? [members[1]] : []);

  // For centered-title (Vice Chairpersons), keep member1 & member2:
  const flatMembers = members.length > 0 ? members : [...primaryMembers, ...secondaryMembers];
  const member1 = flatMembers[0] || { name: '', photo: null, role: '', linkedin: '' };
  const member2 = flatMembers[1] || { name: '', photo: null, role: '', linkedin: '' };

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
          
          {/* Main Card Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 md:gap-8 lg:gap-12 w-full">
            
            {/* Left Column: Primary Role (or member1 in centered-title) */}
            <div className="relative flex items-center justify-center">
              {layoutStyle === 'centered-title' ? (
                <PolaroidCard 
                  photo={member1.photo || member1.image}
                  name={member1.name}
                  role=""
                  linkedin={member1.linkedin}
                  decoration={decoration}
                  rotate={rotations[0]}
                />
              ) : primaryMembers.length > 1 ? (
                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
                  {primaryMembers.map((m, idx) => (
                    <PolaroidCard 
                      key={m.name || idx}
                      photo={m.photo || m.image}
                      name={m.name}
                      role=""
                      linkedin={m.linkedin}
                      decoration={decoration}
                      rotate={idx % 2 === 0 ? rotations[0] : -rotations[0]}
                      size="compact"
                    />
                  ))}
                </div>
              ) : (
                <PolaroidCard 
                  photo={primaryMembers[0]?.photo || primaryMembers[0]?.image}
                  name={primaryMembers[0]?.name}
                  role=""
                  linkedin={primaryMembers[0]?.linkedin}
                  decoration={decoration}
                  rotate={rotations[0]}
                />
              )}
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
                      {primaryRole}
                    </span>
                    <div className="-mt-2 -ml-2 pointer-events-none z-30">
                      <LoopyArrow variant="sec-top-left" color="#7FA88F" />
                    </div>
                  </div>

                  {/* Role 2 (Bottom Right): "Joint Secretary" / "Joint Treasurer" */}
                  <div className="relative flex flex-col items-end -mr-3 sm:-mr-6 md:-mr-8">
                    <span className="font-script text-3xl sm:text-4xl md:text-5xl font-bold text-nss-navy text-right leading-tight drop-shadow-xs whitespace-nowrap">
                      {secondaryRole}
                    </span>
                    <div className="-mt-2 -mr-2 pointer-events-none z-30">
                      <LoopyArrow variant="sec-bottom-right" color="#7FA88F" />
                    </div>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Column: Secondary Role (or member2 in centered-title) */}
            <div className="relative flex items-center justify-center">
              {layoutStyle === 'centered-title' ? (
                <PolaroidCard 
                  photo={member2.photo || member2.image}
                  name={member2.name}
                  role=""
                  linkedin={member2.linkedin}
                  decoration={decoration}
                  rotate={rotations[1]}
                />
              ) : secondaryMembers.length > 1 ? (
                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
                  {secondaryMembers.map((m, idx) => (
                    <PolaroidCard 
                      key={m.name || idx}
                      photo={m.photo || m.image}
                      name={m.name}
                      role=""
                      linkedin={m.linkedin}
                      decoration={decoration}
                      rotate={idx % 2 === 0 ? -3 : rotations[1]}
                      size="compact"
                    />
                  ))}
                </div>
              ) : (
                <PolaroidCard 
                  photo={secondaryMembers[0]?.photo || secondaryMembers[0]?.image}
                  name={secondaryMembers[0]?.name}
                  role=""
                  linkedin={secondaryMembers[0]?.linkedin}
                  decoration={decoration}
                  rotate={rotations[1]}
                />
              )}
            </div>

          </div>

        </div>

      </div>
    </SlideShell>
  );
}
