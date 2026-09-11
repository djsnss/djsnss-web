import React from 'react';

export default function LeafBranch({ 
  className = "", 
  color = "#3B4E7C", 
  flipped = false, 
  scale = 1 
}) {
  return (
    <svg 
      viewBox="0 0 120 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
      style={{
        transform: `scale(${scale}) ${flipped ? 'scaleX(-1)' : ''}`,
        transformOrigin: 'center center'
      }}
    >
      <path 
        d="M 20 150 Q 50 100 80 15" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M 35 125 Q 10 120 15 105 Q 35 110 38 120 Z" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={color}
        fillOpacity="0.15" 
      />
      <path 
        d="M 48 95 Q 20 85 25 70 Q 48 78 50 90 Z" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={color}
        fillOpacity="0.15" 
      />
      <path 
        d="M 62 65 Q 35 50 42 38 Q 60 48 64 60 Z" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={color}
        fillOpacity="0.15" 
      />
      <path 
        d="M 45 112 Q 70 105 72 120 Q 50 125 46 114 Z" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={color}
        fillOpacity="0.15" 
      />
      <path 
        d="M 58 82 Q 85 72 88 88 Q 63 92 59 84 Z" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={color}
        fillOpacity="0.15" 
      />
      <path 
        d="M 72 50 Q 95 38 100 52 Q 78 60 73 52 Z" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={color}
        fillOpacity="0.15" 
      />
      <path 
        d="M 80 15 Q 82 0 95 5 Q 92 20 80 15 Z" 
        stroke={color} 
        strokeWidth="1.5" 
        fill={color}
        fillOpacity="0.25" 
      />
    </svg>
  );
}
