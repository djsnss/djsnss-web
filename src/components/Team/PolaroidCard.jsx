import React from 'react';
import { motion } from 'framer-motion';
import defaultPhoto from '../../assets/team/placeholder-photo.svg';
import WashiTape from '../../assets/team/doodles/WashiTape';
import BinderClip from '../../assets/team/doodles/BinderClip';
import PinBrad from '../../assets/team/doodles/PinBrad';
import RayBurst from '../../assets/team/doodles/RayBurst';
import SparkleSwirl from '../../assets/team/doodles/SparkleSwirl';
import { FaLinkedin } from 'react-icons/fa';

// Cache for already-loaded image sources to prevent re-flashing or re-rendering on scroll
const loadedImagesCache = new Set();

function PolaroidCard({ 
  photo, 
  name, 
  role, 
  linkedin,
  decoration = 'tape', // 'tape' | 'clip' | 'pin' | 'tape-corners' | 'none'
  cornerAccent = 'none', // 'burst-br' | 'swirl-tl' | 'sparkle-tr' | 'none'
  rotate = -3,
  className = "",
  size = "default" // 'default' | 'compact'
}) {
  const imageSrc = photo || defaultPhoto;
  const imgRef = React.useRef(null);
  const isCompact = size === 'compact';

  const [isLoaded, setIsLoaded] = React.useState(() => {
    return imageSrc === defaultPhoto || loadedImagesCache.has(imageSrc);
  });

  React.useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      loadedImagesCache.add(imageSrc);
      setIsLoaded(true);
    }
  }, [imageSrc]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ rotate: `${rotate}deg` }}
      className={`relative bg-[#F7F5F0] rounded-xs shadow-polaroid border border-amber-100/50 flex flex-col items-center transition-shadow duration-300 hover:shadow-polaroid-hover ${
        isCompact 
          ? 'w-32 min-[400px]:w-36 sm:w-40 md:w-44 lg:w-48 p-2 sm:p-2.5 md:p-3 pb-2.5 sm:pb-3 md:pb-3.5' 
          : 'w-48 sm:w-56 md:w-60 p-3 md:p-3.5 pb-4 md:pb-5'
      } ${className}`}
    >
      {/* Top Center Decorations */}
      {decoration === 'tape' && (
        <div className={`absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none ${
          isCompact ? '-top-2.5 scale-75 sm:scale-85' : '-top-3'
        }`}>
          <WashiTape />
        </div>
      )}

      {decoration === 'clip' && (
        <div className={`absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none ${
          isCompact ? '-top-3 scale-75 sm:scale-85' : '-top-4'
        }`}>
          <BinderClip />
        </div>
      )}

      {decoration === 'pin' && (
        <div className={`absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none ${
          isCompact ? '-top-2.5 scale-75 sm:scale-85' : '-top-3'
        }`}>
          <PinBrad />
        </div>
      )}

      {/* Tape Corners Decoration */}
      {decoration === 'tape-corners' && (
        <>
          <div className={`absolute z-20 pointer-events-none transform -rotate-45 ${
            isCompact ? '-top-2 -left-2 scale-75 sm:scale-85' : '-top-3 -left-3'
          }`}>
            <WashiTape className="w-16 h-5 bg-blue-200/80 border-blue-300/60" />
          </div>
          <div className={`absolute z-20 pointer-events-none transform -rotate-45 ${
            isCompact ? '-bottom-2 -right-2 scale-75 sm:scale-85' : '-bottom-3 -right-3'
          }`}>
            <WashiTape className="w-16 h-5 bg-blue-200/80 border-blue-300/60" />
          </div>
        </>
      )}

      {/* Optional Card Corner Accent Doodles */}
      {cornerAccent === 'burst-br' && (
        <div className={`absolute pointer-events-none transform rotate-12 ${
          isCompact ? '-bottom-3.5 -right-3.5 scale-75' : '-bottom-5 -right-5'
        } z-20`}>
          <RayBurst color="#3B4E7C" />
        </div>
      )}

      {cornerAccent === 'swirl-tl' && (
        <div className={`absolute pointer-events-none ${
          isCompact ? '-top-3.5 -left-3.5 scale-75' : '-top-5 -left-5'
        } z-20`}>
          <SparkleSwirl color="#7FA88F" className={isCompact ? "w-8 h-6" : "w-10 h-8"} />
        </div>
      )}

      {/* Polaroid Photo Frame Inner */}
      <div className="w-full aspect-[4/5] bg-slate-100 rounded-xs overflow-hidden border border-slate-300/40 shadow-inner relative group">
        {/* Placeholder background sits BEHIND the image (z-0) and fades out once loaded */}
        <div 
          className={`absolute inset-0 bg-sky-100/40 z-0 transition-opacity duration-300 ${
            isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`} 
        />

        <img 
          ref={imgRef}
          src={imageSrc} 
          alt={name || role || "Team Member"} 
          loading="eager"
          decoding="sync"
          onLoad={() => {
            loadedImagesCache.add(imageSrc);
            setIsLoaded(true);
          }}
          className={`relative z-10 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={(e) => {
            if (e.target.src !== defaultPhoto) {
              e.target.src = defaultPhoto;
            }
            setIsLoaded(true);
          }}
        />
      </div>

      {/* Polaroid Footer / Name Label */}
      <div className={`text-center flex flex-col items-center justify-center px-1 ${
        isCompact 
          ? 'mt-1.5 sm:mt-2 min-h-[26px] sm:min-h-[30px]' 
          : 'mt-2.5 min-h-[36px]'
      }`}>
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
          {name ? (
            <h3 className={`font-script font-semibold text-nss-navy tracking-wide leading-tight ${
              isCompact 
                ? 'text-sm sm:text-base md:text-lg lg:text-xl' 
                : 'text-xl sm:text-2xl'
            }`}>
              {name}
            </h3>
          ) : (
            <span className={`font-script text-slate-400 italic ${
              isCompact ? 'text-xs sm:text-sm' : 'text-base'
            }`}>
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
              <FaLinkedin className={isCompact ? "w-2.5 h-2.5 sm:w-3 sm:h-3" : "w-3.5 h-3.5"} />
            </a>
          )}
        </div>

        {role && (
          <p className={`font-sans uppercase tracking-wider text-nss-sage-dark font-medium ${
            isCompact 
              ? 'text-[8px] sm:text-[9px] md:text-[10px] mt-0.5' 
              : 'text-[11px] mt-0.5'
          }`}>
            {role}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default React.memo(PolaroidCard);
