"use client";
import { FaLongArrowAltUp } from 'react-icons/fa';
import React, { useState, useEffect, useCallback } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollableElement, setScrollableElement] = useState<Element | null>(null);

  // Find scrollable element after component mounts
  useEffect(() => {
    const findScrollableElement = () => {
      const element = document.querySelector('.overflow-y-scroll');
      setScrollableElement(element);
    };

    // Initial find
    findScrollableElement();

    // Retry a few times in case of dynamic loading
    const retryTimes = [100, 500, 1000]; // Retry after 100ms, 500ms, and 1000ms
    retryTimes.forEach(delay => {
      setTimeout(findScrollableElement, delay);
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollableElement) {
      setIsVisible(scrollableElement.scrollTop > 100);
    }
  }, [scrollableElement]);

  // Set up scroll listener
  useEffect(() => {
    if (scrollableElement) {
      // Initial check
      handleScroll();
      
      scrollableElement.addEventListener("scroll", handleScroll);
      
      return () => {
        scrollableElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollableElement, handleScroll]);

  const scrollToTop = () => {
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  if (!scrollableElement) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`group z-40 fixed bottom-6 right-6 p-3 h-8 w-8 lg:h-12 lg:w-12 bg-bright-blue hover:bg-white rounded-full flex justify-center items-center shadow-sm shadow-dark-navy-blue transition-transform duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to Top"
    >
      <FaLongArrowAltUp className='text-dark-navy group-hover:-translate-y-1 duration-300' />
    </button>
  );
};

export default ScrollToTop;