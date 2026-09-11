import React from 'react';
import { motion } from 'framer-motion';
import defaultPhoto from '../../assets/team/placeholder-photo.svg';
import WashiTape from '../../assets/team/doodles/WashiTape';
import BinderClip from '../../assets/team/doodles/BinderClip';
import PinBrad from '../../assets/team/doodles/PinBrad';
import RayBurst from '../../assets/team/doodles/RayBurst';
import SparkleSwirl from '../../assets/team/doodles/SparkleSwirl';
import { FaLinkedin } from 'react-icons/fa';

export default function PolaroidCard({ 
  photo, 
  name, 
  role, 
  linkedin,
  decoration = 'tape', // 'tape' | 'clip' | 'pin' | 'tape-corners' | 'none'
  cornerAccent = 'none', // 'burst-br' | 'swirl-tl' | 'sparkle-tr' | 'none'
  rotate = -3,
  className = ""
}) {
  const imageSrc = photo || defaultPhoto;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ rotate: `${rotate}deg` }}
      className={`relative bg-[#F7F5F0] p-3 md:p-3.5 pb-4 md:pb-5 rounded-xs shadow-polaroid border border-amber-100/50 flex flex-col items-center w-48 sm:w-56 md:w-60 transition-shadow duration-300 hover:shadow-polaroid-hover ${className}`}
    >
      {/* Top Center Decorations */}
      {decoration === 'tape' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <WashiTape />
        </div>
      )}

      {decoration === 'clip' && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <BinderClip />
        </div>
      )}

      {decoration === 'pin' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <PinBrad />
        </div>
      )}

      {/* Tape Corners Decoration */}
      {decoration === 'tape-corners' && (
        <>
          <div className="absolute -top-3 -left-3 z-20 pointer-events-none transform -rotate-45">
            <WashiTape className="w-16 h-5 bg-blue-200/80 border-blue-300/60" />
          </div>
          <div className="absolute -bottom-3 -right-3 z-20 pointer-events-none transform -rotate-45">
            <WashiTape className="w-16 h-5 bg-blue-200/80 border-blue-300/60" />
          </div>
        </>
      )}

      {/* Optional Card Corner Accent Doodles */}
      {cornerAccent === 'burst-br' && (
        <div className="absolute -bottom-5 -right-5 z-20 pointer-events-none transform rotate-12">
          <RayBurst color="#3B4E7C" />
        </div>
      )}

      {cornerAccent === 'swirl-tl' && (
        <div className="absolute -top-5 -left-5 z-20 pointer-events-none">
          <SparkleSwirl color="#7FA88F" className="w-10 h-8" />
        </div>
      )}

      {/* Polaroid Photo Frame Inner */}
      <div className="w-full aspect-[4/5] bg-sky-100/40 rounded-xs overflow-hidden border border-slate-300/40 shadow-inner relative group">
        <img 
          src={imageSrc} 
          alt={name || role || "Team Member"} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            if (e.target.src !== defaultPhoto) {
              e.target.src = defaultPhoto;
            }
          }}
        />
      </div>

      {/* Polaroid Footer / Name Label */}
      <div className="mt-2.5 text-center flex flex-col items-center justify-center min-h-[36px] px-1">
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {name ? (
            <h3 className="font-script text-xl sm:text-2xl font-semibold text-nss-navy tracking-wide leading-tight">
              {name}
            </h3>
          ) : (
            <span className="font-script text-base text-slate-400 italic">
              Member Name
            </span>
          )}
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#0077b5] hover:text-[#005582] transition-colors"
              aria-label={`${name}'s LinkedIn profile`}
            >
              <FaLinkedin className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {role && (
          <p className="font-sans text-[11px] uppercase tracking-wider text-nss-sage-dark font-medium mt-0.5">
            {role}
          </p>
        )}
      </div>
    </motion.div>
  );
}
