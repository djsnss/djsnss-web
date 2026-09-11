import React from 'react';

export default function CurvedArrow({ 
  className = "", 
  color = "#3B4E7C",
  direction = "right", // "right" | "left" | "down-left" | "down-right"
}) {
  return (
    <svg 
      viewBox="0 0 100 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-20 h-12 overflow-visible ${className}`}
    >
      {direction === 'right' && (
        <>
          <path 
            d="M 10 40 Q 50 10 85 30" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            fill="none"
          />
          <path 
            d="M 75 22 L 87 31 L 78 38" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      )}
      {direction === 'left' && (
        <>
          <path 
            d="M 90 40 Q 50 10 15 30" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            fill="none"
          />
          <path 
            d="M 25 22 L 13 31 L 22 38" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      )}
      {direction === 'down-left' && (
        <>
          <path 
            d="M 70 10 Q 40 45 20 50" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            fill="none"
          />
          <path 
            d="M 32 44 L 18 51 L 22 36" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      )}
      {direction === 'down-right' && (
        <>
          <path 
            d="M 30 10 Q 60 45 80 50" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            fill="none"
          />
          <path 
            d="M 68 44 L 82 51 L 78 36" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      )}
    </svg>
  );
}
