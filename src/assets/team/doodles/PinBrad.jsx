import React from 'react';

export default function PinBrad({ className = "", color = "#EAB308" }) {
  return (
    <svg 
      viewBox="0 0 30 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 drop-shadow-sm ${className}`}
    >
      <circle cx="15" cy="15" r="10" fill={color} stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" fill="#FEF08A" opacity="0.8" />
    </svg>
  );
}
