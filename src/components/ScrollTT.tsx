"use client";
import { FaLongArrowAltUp } from 'react-icons/fa';
import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Check scroll position of the scrollable container
    const scrollableElement = document.querySelector('.overflow-y-scroll');
    if (scrollableElement) {
      setIsVisible(scrollableElement.scrollTop > 0);
    }
  };

  useEffect(() => {
    // Find the scrollable container
    const scrollableElement = document.querySelector('.overflow-y-scroll');
    
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
      
      // Initial check
      handleScroll();
      
      return () => {
        scrollableElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const scrollToTop = () => {
    const scrollableElement = document.querySelector('.overflow-y-scroll');
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`group z-[9999] fixed bottom-6 right-6 p-3 h-8 w-8 lg:h-12 lg:w-12 bg-bright-blue hover:bg-white rounded-full flex justify-center items-center shadow-lg shadow-gray-600 transition-transform duration-300 hover:shadow-2xl hover:shadow-black ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } hover:opacity-100`}
      aria-label="Scroll to Top"
    >
      <FaLongArrowAltUp className='text-dark-navy group-hover:-translate-y-1 duration-300' />
    </button>
  );
};

export default ScrollToTop;