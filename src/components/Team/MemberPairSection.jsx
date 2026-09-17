import React from 'react';
import { motion } from 'framer-motion';
import SlideShell from './SlideShell';
import PolaroidCard from './PolaroidCard';
import LoopyArrow from '../../assets/team/doodles/LoopyArrow';
import CurvedArrow from '../../assets/team/doodles/CurvedArrow';
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
        
        {/* Optional Top Section Heading */}
        {showTopTitle && sectionTitle && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-1 sm:mb-2 z-20"
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-nss-navy tracking-tight uppercase">
              {sectionTitle}
            </h2>
          </motion.div>
        )}

        {layoutStyle === 'centered-title' ? (
          /* ============================================================ */
          /* LAYOUT 1: Vice Chairpersons (Horizontal Side-by-Side + Center Title) */
          /* ============================================================ */
          <div className="relative flex items-center justify-center w-full py-1">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 md:gap-8 lg:gap-12 w-full">
              
              {/* Left Column: Vice Chairperson 1 */}
              <div className="relative flex items-center justify-center">
                <PolaroidCard 
                  photo={member1.photo || member1.image}
                  name={member1.name}
                  role=""
                  linkedin={member1.linkedin}
                  decoration={decoration}
                  rotate={rotations[0]}
                />
              </div>

              {/* Center Script Title + Prominent Loopy Arrows Pointing to Both VCPs */}
              <div className="flex flex-col items-center justify-center my-2 sm:my-0 px-2 sm:px-4 z-20 text-center min-w-[200px] md:min-w-[250px] relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center py-4 sm:py-6"
                >
                  {/* Ray Burst positioned in open space top-right of center title */}
                  <div className="absolute -top-8 -right-8 sm:-right-14 md:-right-20 pointer-events-none opacity-80 z-10">
                    <RayBurst color="#3B4E7C" />
                  </div>

                  {/* Swirl Flourish positioned in open space bottom-left of center title */}
                  <div className="absolute -bottom-8 -left-8 sm:-left-14 md:-left-20 pointer-events-none opacity-80 z-10">
                    <SwirlFlourish color="#3B4E7C" />
                  </div>

                  {/* Top Arrow Pointing to Left Vice Chairperson (or Top VCP on mobile) */}
                  <div className="absolute -top-7 sm:-top-9 -left-8 sm:-left-12 md:-left-16 pointer-events-none z-30">
                    <LoopyArrow variant="vice-top-left" color="#7FA88F" className="w-24 sm:w-28 md:w-36 h-12 sm:h-14 md:h-18" />
                  </div>

                  {/* Hand-drawn Script Title */}
                  <h2 className="font-script text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-nss-navy tracking-wide leading-tight max-w-[220px] text-center my-1 drop-shadow-xs">
                    {sectionTitle}
                  </h2>

                  {/* Bottom Arrow Pointing to Right Vice Chairperson (or Bottom VCP on mobile) */}
                  <div className="absolute -bottom-7 sm:-bottom-9 -right-8 sm:-right-12 md:-right-16 pointer-events-none z-30">
                    <LoopyArrow variant="vice-bottom-right" color="#7FA88F" className="w-24 sm:w-28 md:w-36 h-12 sm:h-14 md:h-18" />
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Vice Chairperson 2 */}
              <div className="relative flex items-center justify-center">
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
        ) : (
          /* ============================================================ */
          /* LAYOUT 2: Split Roles (Vertical Stack: Secretary on Top, Joint Sec Below) */
          /* ============================================================ */
          <div className="flex flex-col items-center justify-center w-full max-w-4xl py-0 sm:py-0.5 gap-2 sm:gap-3 md:gap-3.5">
            
            {/* Top Tier: Primary Role (Secretary / Treasurer) */}
            <div className="relative flex flex-col items-center">
              {/* Script Title for Primary Role with its dedicated LoopyArrow */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-2 mb-1 sm:mb-1.5 relative z-20"
              >
                <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 transform -rotate-12 pointer-events-none">
                  <RayBurst color="#3B4E7C" className="w-7 h-7" />
                </div>
                
                <span className="font-script text-3xl sm:text-4xl md:text-5xl font-bold text-nss-navy tracking-wide drop-shadow-xs">
                  {primaryRole}
                </span>

                {/* Vertical LoopyArrow pointing from Secretary label directly DOWNWARD into the Secretary polaroid */}
                <div className="-mt-1 pointer-events-none z-30">
                  <LoopyArrow variant="vertical-down-right" color="#7FA88F" className="w-16 sm:w-20 md:w-24 h-10 sm:h-12 md:h-14" />
                </div>
              </motion.div>

              {/* Primary Card(s) */}
              <div className="relative flex items-center justify-center gap-4">
                {primaryMembers.map((m, idx) => (
                  <PolaroidCard 
                    key={m.name || idx}
                    photo={m.photo || m.image}
                    name={m.name}
                    role=""
                    linkedin={m.linkedin}
                    decoration={decoration}
                    rotate={idx % 2 === 0 ? rotations[0] : -rotations[0]}
                    size="default"
                  />
                ))}
              </div>
            </div>

            {/* Bottom Tier: Secondary Role (Joint Secretary / Joint Treasurer) */}
            <div className="relative flex flex-col items-center mt-1 sm:mt-1.5">
              {/* Script Title for Secondary Role with its dedicated LoopyArrow */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-2 mb-1 sm:mb-1.5 relative z-20"
              >
                {/* Vertical LoopyArrow pointing from Joint Secretary label directly DOWNWARD into the Joint Secretary polaroid(s) */}
                <div className="-mt-1 pointer-events-none z-30">
                  <LoopyArrow variant="vertical-down-left" color="#7FA88F" className="w-16 sm:w-20 md:w-24 h-10 sm:h-12 md:h-14" />
                </div>

                <span className="font-script text-2xl sm:text-3xl md:text-4xl font-bold text-nss-navy tracking-wide drop-shadow-xs">
                  {secondaryRole}
                </span>

                <div className="hidden sm:block absolute left-full ml-3 top-1/2 -translate-y-1/2 transform rotate-12 pointer-events-none">
                  <SwirlFlourish color="#3B4E7C" className="w-7 h-6" />
                </div>
              </motion.div>

              {/* Secondary Card(s) - Side-by-Side if 2+, Centered if 1 */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-5 md:gap-8">
                {secondaryMembers.map((m, idx) => (
                  <PolaroidCard 
                    key={m.name || idx}
                    photo={m.photo || m.image}
                    name={m.name}
                    role=""
                    linkedin={m.linkedin}
                    decoration={decoration}
                    rotate={idx % 2 === 0 ? -2 : rotations[1]}
                    size="medium"
                  />
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </SlideShell>
  );
}

