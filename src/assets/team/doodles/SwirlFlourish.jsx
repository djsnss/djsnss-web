import React from 'react';

export default function SwirlFlourish({ className = "", color = "#3B4E7C" }) {
  return (
    <svg 
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-12 h-12 ${className}`}
    >
      <path 
        d="M 15 25 C 25 10 35 30 25 45 C 18 55 35 60 48 45 C 55 35 68 55 58 68" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
      <circle cx="20" cy="65" r="2.5" fill="#7FA88F" />
      <circle cx="68" cy="30" r="2" fill="#7FA88F" />
    </svg>
  );
}
