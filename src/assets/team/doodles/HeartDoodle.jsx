import React from 'react';

export default function HeartDoodle({ className = "", color = "#3B4E7C" }) {
  return (
    <svg 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M 30 50 C 12 38 4 25 12 14 C 18 5 27 9 30 18 C 33 9 42 5 48 14 C 56 25 48 38 30 50 Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 28 48 C 24 53 18 55 12 52" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
}
