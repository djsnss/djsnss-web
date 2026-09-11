import React from 'react';

export default function RayBurst({ className = "", color = "#3B4E7C" }) {
  return (
    <svg 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-10 h-10 ${className}`}
    >
      <path d="M 15 45 L 5 55" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M 28 32 L 20 48" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M 45 25 L 35 42" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
