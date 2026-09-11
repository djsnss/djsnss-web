import React from 'react';

export default function WashiTape({ className = "", color = "bg-amber-100/80 border-amber-200/60" }) {
  return (
    <div 
      className={`h-6 w-20 shadow-sm border border-dashed rounded-sm opacity-90 backdrop-blur-[1px] ${color} ${className}`}
      style={{
        clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)',
        backgroundSize: '12px 12px'
      }}
    />
  );
}
