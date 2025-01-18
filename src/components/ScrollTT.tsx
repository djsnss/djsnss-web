"use client";
import { FaLongArrowAltUp } from 'react-icons/fa';
import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 h-8 w-8 lg:h-12 lg:w-12 bg-slate-700 rounded-full flex justify-center items-center shadow-xl shadow-gray-600 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-black hover:shadow-black ${isVisible ? "opacity-100" : "opacity-75"
        } hover:opacity-100`}
      aria-label="Scroll to Top"
    >
      <FaLongArrowAltUp className='text-gold scale-125 group-hover:translate-x-2 duration-300' />
    </button>
  );
};

export default ScrollToTop;
