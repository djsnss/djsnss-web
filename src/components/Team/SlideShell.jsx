import React from 'react';
import LeafBranch from '../../assets/team/doodles/LeafBranch';
import StarCluster from '../../assets/team/doodles/StarCluster';

export default function SlideShell({ 
  id, 
  children, 
  leafCorner = 'top-left-bottom-right',
  showStars = true,
  className = ""
}) {
  return (
    <section 
      id={id} 
      className={`snap-slide relative w-full h-screen flex flex-col justify-between items-center pt-14 md:pt-16 pb-3 md:pb-4 px-4 md:px-12 overflow-hidden select-none ${className}`}
    >
      {/* Corner Leaf Branch Doodles - Positioned safely in extreme corners */}
      {(leafCorner === 'top-left-bottom-right' || leafCorner === 'all-four') && (
        <div className="absolute top-10 left-1 md:top-12 md:left-4 w-14 md:w-24 opacity-80 pointer-events-none z-10">
          <LeafBranch color="#3B4E7C" flipped={false} />
        </div>
      )}

      {(leafCorner === 'top-right-bottom-left' || leafCorner === 'all-four') && (
        <div className="absolute top-10 right-1 md:top-12 md:right-4 w-14 md:w-24 opacity-80 pointer-events-none z-10">
          <LeafBranch color="#3B4E7C" flipped={true} />
        </div>
      )}

      {(leafCorner === 'top-right-bottom-left' || leafCorner === 'all-four') && (
        <div className="absolute bottom-1 left-1 md:bottom-2 md:left-4 w-14 md:w-24 opacity-80 pointer-events-none z-10">
          <LeafBranch color="#3B4E7C" flipped={false} />
        </div>
      )}

      {(leafCorner === 'top-left-bottom-right' || leafCorner === 'all-four') && (
        <div className="absolute bottom-1 right-1 md:bottom-2 md:right-4 w-14 md:w-24 opacity-80 pointer-events-none z-10">
          <LeafBranch color="#3B4E7C" flipped={true} />
        </div>
      )}

      {/* Scattered Stars */}
      {showStars && (
        <>
          <div className="absolute top-16 left-10 md:left-20 w-10 md:w-14 opacity-60 pointer-events-none">
            <StarCluster color="#3B4E7C" />
          </div>
          <div className="absolute bottom-10 right-10 md:right-20 w-10 md:w-12 opacity-50 pointer-events-none rotate-45">
            <StarCluster color="#3B4E7C" />
          </div>
        </>
      )}

      {/* Main Slide Content Container */}
      <div className="w-full max-w-6xl flex-1 flex flex-col justify-center items-center z-20 my-auto -translate-y-4 md:-translate-y-5">
        {children}
      </div>
    </section>
  );
}
