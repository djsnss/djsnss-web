import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function SectionNav({ sections = [], activeSection, onNavigate }) {
  const currentIndex = sections.findIndex(s => s.id === activeSection);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(sections[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      onNavigate(sections[currentIndex + 1].id);
    }
  };

  return (
    <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 md:gap-3 bg-white/50 backdrop-blur-md p-2 md:p-2.5 rounded-full border border-slate-400/20 shadow-lg">
      <button
        onClick={handlePrev}
        disabled={currentIndex <= 0}
        aria-label="Previous Slide"
        className="p-1 rounded-full text-nss-navy hover:bg-nss-navy/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      <div className="flex flex-col gap-2 my-1">
        {sections.map((section) => {
          const isActive = section.id === activeSection;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              title={section.title}
              aria-label={`Go to section ${section.title}`}
              className="relative group p-1 focus:outline-none"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3 h-3 bg-nss-navy shadow-sm'
                    : 'w-2 h-2 bg-slate-400/60 group-hover:bg-nss-navy/60'
                }`}
              />
              {/* Tooltip popup on hover */}
              <span className="absolute right-7 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-nss-navy text-white text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-sans font-medium">
                {section.title}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentIndex >= sections.length - 1}
        aria-label="Next Slide"
        className="p-1 rounded-full text-nss-navy hover:bg-nss-navy/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}
