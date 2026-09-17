import React from 'react';

export default function TwinHeartDoodle({ className = "", color = "#3B4E7C" }) {
  return (
    <svg 
      viewBox="0 0 70 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Primary Heart */}
      <path 
        d="M 28 42 C 12 30 5 18 13 8 C 19 0 27 4 29 12 C 32 4 40 0 46 8 C 54 18 46 30 28 42 Z" 
        stroke={color} 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Intertwined/Companion Little Heart on the right */}
      <path 
        d="M 48 30 C 40 22 36 14 41 8 C 45 3 50 6 51 10 C 53 6 58 3 62 8 C 67 14 62 22 48 30 Z" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Small floating sparkle accent */}
      <path 
        d="M 60 36 L 64 40 M 62 38 L 62 42" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
}
