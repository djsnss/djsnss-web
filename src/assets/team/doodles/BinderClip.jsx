import React from 'react';

export default function BinderClip({ className = "", color = "#5FA8DE" }) {
  return (
    <svg 
      viewBox="0 0 50 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-10 h-8 ${className}`}
    >
      <path 
        d="M 16 18 C 16 8 20 4 25 4 C 30 4 34 8 34 18" 
        stroke="#64748B" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M 10 18 H 40 L 44 34 H 6 Z" 
        fill={color} 
        stroke="#334155" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
      <line x1="12" y1="22" x2="38" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    </svg>
  );
}
