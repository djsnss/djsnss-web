import React, { useEffect, useState } from "react";
import "../styles/FAQ.css";
import DJSNSSLogo from "../assets/DJSNSSLogo.png";

// Import icons here
import { FaVideo, FaPhoneAlt, FaEllipsisV, FaMicrophoneAlt, FaPlus } from "react-icons/fa";

const FAQ = () => {
  const [scrollY, setScrollY] = useState(0);

  const faqs = [
    {
      question: "What is NSS?",
      answer:
        "NSS is a student body focused on social service and community development.",
    },
    {
      question: "How can I volunteer?",
      answer:
        "You can volunteer by registering on the NSS website or contacting us directly.",
    },
    {
      question: "What events are organized by NSS?",
      answer:
        "NSS organizes various community service events, workshops, and awareness programs.",
    },
  ];

  // Handle scroll event to apply fade and shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="faq-container">
      {/* First Div: Header Section */}
      <div className="faq-header">
        <div className="profile">
          {/* DJSNSS Logo */}
          <img src={DJSNSSLogo} alt="DJSNSS Logo" className="profile-img" />
          <span className="profile-name">DJSNSS</span>
        </div>
        <div className="icons">
          {/* Video Call Icon */}
          <FaVideo className="icon" />
          {/* Phone Call Icon */}
          <FaPhoneAlt className="icon" />
          {/* 3 Dots Icon */}
          <FaEllipsisV className="icon" />
        </div>
      </div>

      {/* Second Div: FAQ Section */}
      <div className="faq-content">
        {/* "FAQ" Label */}
        <div
          className={`faq-date ${scrollY > 10 ? "scrolled" : ""}`}
          style={{
            opacity: 1 - scrollY / 200, // Fade out as user scrolls
          }}
        >
          FAQ
        </div>
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <FaPlus className="chat-icon" />
        <input type="text" className="chat-input" placeholder="Type your message..." />
        <FaMicrophoneAlt className="mic-icon" />
      </div>
    </div>
  );
};

export default FAQ;
