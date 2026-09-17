import React from 'react';

export default function DiamondDoodle({ className = "", color = "#3B4E7C" }) {
  return (
    <svg 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hand-drawn outer diamond silhouette */}
      <path 
        d="M 30 6 L 52 24 L 30 54 L 8 24 Z" 
        stroke={color} 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Upper table/facet horizontal line */}
      <path 
        d="M 14 24 L 46 24" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Upper facet triangles */}
      <path 
        d="M 21 6 L 19 24 L 30 54 L 41 24 L 39 6" 
        stroke={color} 
        strokeWidth="1.6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Little sparkle accent on top right */}
      <path 
        d="M 52 10 L 56 6 M 54 8 L 50 8" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
    </svg>
  );
}
