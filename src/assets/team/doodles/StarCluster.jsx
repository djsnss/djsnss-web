import React from 'react';

export default function StarCluster({ className = "", color = "#3B4E7C" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M 30 20 L 33 32 L 45 35 L 33 38 L 30 50 L 27 38 L 15 35 L 27 32 Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 70 50 L 72 58 L 80 60 L 72 62 L 70 70 L 68 62 L 60 60 L 68 58 Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 25 75 L 26 79 L 30 80 L 26 81 L 25 85 L 24 81 L 20 80 L 24 79 Z" 
        stroke={color} 
        strokeWidth="1.2" 
        strokeLinejoin="round" 
      />
      <circle cx="65" cy="25" r="2" fill={color} opacity="0.6" />
      <circle cx="85" cy="35" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}
