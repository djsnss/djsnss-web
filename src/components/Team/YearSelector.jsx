import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function YearSelector({ 
  years = [], 
  selectedYear, 
  onSelectYear, 
  className = "" 
}) {
  return (
    <div className={`inline-flex items-center gap-2 bg-[#4E5D78] hover:bg-[#3B4A65] text-white px-5 py-2.5 rounded-full shadow-md border border-slate-400/30 transition-all ${className}`}>
      <span className="font-script text-lg text-blue-100 font-medium tracking-wide whitespace-nowrap">
        Select Year :
      </span>
      <div className="relative flex items-center">
        <select
          value={selectedYear}
          onChange={(e) => onSelectYear(e.target.value)}
          className="appearance-none bg-transparent pr-7 pl-1 py-0.5 text-sm md:text-base font-semibold text-white font-sans focus:outline-none cursor-pointer"
        >
          {years.map((year) => (
            <option key={year} value={year} className="bg-[#4E5D78] text-white">
              {year}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-blue-200 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
