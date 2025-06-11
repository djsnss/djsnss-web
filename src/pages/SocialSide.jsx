import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { SocialLinks } from '../data/index'

const getIcon = (name) => {
  switch (name.toLowerCase()) {
    case "facebook":
      return <FaFacebook />;
    case "instagram":
      return <FaInstagram />;
    case "twitter":
      return <FaTwitter />;
    case "linkedin":
      return <FaLinkedin />;
    default:
      return null;
  }
};

const SocialSide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed z-40 top-3 right-3 sm:top-6 sm:right-6 flex flex-col items-end">
      {/* Toggle Button - At the top */}
      <button 
        onClick={toggleExpanded}
        className="group z-40 p-2 h-8 w-8 lg:h-10 lg:w-10 bg-[#0066b2] hover:bg-white border-2 border-dark-navy-blue rounded-full flex justify-center items-center transition-all duration-300 hover:scale-110"
        aria-label="Toggle social media links"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-6 w-6 text-white group-hover:text-[#0066b2] transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      
      {/* Social Icons - Shown below the button when expanded */}
      <div className={`flex flex-col gap-3 mt-3 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        {SocialLinks.filter((social)=> social.name === "Instagram" || social.name === "Linkedin").map((socialLink) => (
          <a 
            key={socialLink.id}
            href={socialLink.link}
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 h-8 w-8 lg:h-10 lg:w-10 bg-[#0066b2] hover:bg-white text-white hover:text-[#0066b2] rounded-full flex justify-center items-center border-2 border-dark-navy-blue transition-all duration-300 hover:scale-110"
            aria-label={socialLink.name}
          >
            {getIcon(socialLink.name)}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialSide;
