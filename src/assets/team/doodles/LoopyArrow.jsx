import React from 'react';

export default function LoopyArrow({ 
  variant = "vice-top-left", // "vice-top-left" | "vice-bottom-right" | "sec-top-left" | "sec-bottom-right"
  color = "#7FA88F",
  className = "" 
}) {
  return (
    <svg 
      viewBox="0 0 160 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-28 md:w-36 h-14 md:h-20 pointer-events-none overflow-visible ${className}`}
    >
      {/* 1. Vice Chairpersons Top Arrow: curves UP and LEFT towards left polaroid */}
      {variant === 'vice-top-left' && (
        <g>
          {/* Loopy spring curve curving up-left */}
          <path 
            d="M 145 65 C 115 50 100 20 115 12 C 125 5 130 25 95 15 C 65 5 35 15 15 28" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none"
          />
          {/* Arrowhead pointing left */}
          <path 
            d="M 28 18 L 12 29 L 26 38" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
      )}

      {/* 2. Vice Chairpersons Bottom Arrow: curves DOWN and RIGHT towards right polaroid */}
      {variant === 'vice-bottom-right' && (
        <g>
          {/* Loopy spring curve curving down-right */}
          <path 
            d="M 15 15 C 45 20 55 55 42 65 C 32 75 25 55 65 62 C 95 68 125 55 145 45" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none"
          />
          {/* Arrowhead pointing right */}
          <path 
            d="M 132 36 L 148 44 L 135 55" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
      )}

      {/* 3. Secretary Top-Left Arrow: curves DOWN-LEFT to left polaroid */}
      {variant === 'sec-top-left' && (
        <g>
          <path 
            d="M 145 15 C 115 20 90 45 105 58 C 115 68 125 50 85 58 C 55 64 30 52 15 42" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none"
          />
          <path 
            d="M 26 34 L 12 41 L 22 53" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
      )}

      {/* 4. Secretary Bottom-Right Arrow: curves DOWN-RIGHT to right polaroid */}
      {variant === 'sec-bottom-right' && (
        <g>
          <path 
            d="M 15 15 C 45 20 60 50 48 62 C 38 72 30 52 70 58 C 100 64 125 52 145 42" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none"
          />
          <path 
            d="M 132 34 L 147 41 L 136 53" 
            stroke={color} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
      )}
    </svg>
  );
}
