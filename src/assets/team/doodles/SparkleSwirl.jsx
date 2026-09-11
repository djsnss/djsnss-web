import React from 'react';

export default function SparkleSwirl({ className = "", color = "#7FA88F" }) {
  return (
    <svg 
      viewBox="0 0 100 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M 15 50 Q 35 15 55 45 T 85 30" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path d="M 45 15 L 45 27 M 39 21 L 51 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 75 55 L 75 65 M 70 60 L 80 60" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="20" cy="25" r="2" fill={color} />
      <circle cx="90" cy="45" r="1.5" fill={color} />
    </svg>
  );
}
