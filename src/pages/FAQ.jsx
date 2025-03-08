import { useEffect, useState } from "react";
import "../styles/FAQ.css";
import DJSNSSLogo from "../assets/DJSNSSLogo.png";

import {
  FaEllipsisV,
  FaMicrophoneAlt,
  FaPlus,
} from "react-icons/fa";

const FAQ = () => {
  const [scrollY, setScrollY] = useState(0);

  const faqs = [
    {
      question: "Is Volunteer Registration free?",
      answer:
        "Yes, Volunteer Registration is free. All the NSS events are absolutely free. 🎉",
    },
    {
      question: "How many volunteers will be selected?",
      answer:
        "We take in around 200 volunteers, with 140 spots reserved for second-year students (SEs). Selection is on a first-come, first-served basis, so make sure to register on Friday! Co-com members will be chosen from the 140 SE volunteers. To apply for Co-com, register on Friday and attend interviews on Saturday. Co-com departments include Creatives, Technical, Publicity, and Editorial.",
    },
    {
      question: "What are our flagship events?",
      answer:
        "The Blood Donation Drive 🩸 and the 7-Day Camp 🏕 are our flagship events!",
    },
    {
      question: "Is CSR connected to NSS?",
      answer: "No, CSR and NSS are completely separate entities.",
    },
    {
      question: "How is NSS different from other committees?",
      answer:
        "NSS events push you out of your comfort zone, helping you build connections across various departments. It helps you discover abilities you never knew you had.",
    },
    {
      question:
        "What unique benefits does NSS offer that other committees don’t?",
      answer:
        "After completing 120 hours of service, you earn an additional 10 marks. Complete 240 hours, and you’ll receive a National-level certificate with our emblem, which is great for placements and higher studies, making you stand out from the crowd. 🎓✨",
    },
    {
      question: "How frequently do events happen?",
      answer: "We organize around 3-4 events per month. 📅",
    },
    {
      question: "Is it difficult to complete 120 hours of service?",
      answer:
        "Not at all! The 120 hours can be easily completed throughout your tenure in NSS. 💪",
    },
    {
      question:
        "What’s the difference between a Volunteer and a Co-com member?",
      answer:
        "As a volunteer, you simply participate in events. But as a Co-com member, you have a say in planning and executing events. You can propose new ideas 💡, make decisions, and have your voice heard in shaping the events.",
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
      {/* Second Div: FAQ Section */}
      <div className="faq-content">
        {/* "FAQ" Label */}
        <div className="flex mx-auto mb-2 py-4 pt-16 h-max w-full justify-center items-center text-3xl md:text-7xl text-black">
          FAQ
        </div>
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question">Q. {faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <FaPlus className="chat-icon" />
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
        />
        <FaMicrophoneAlt className="mic-icon" />
      </div>
    </div>
  );
};

export default FAQ;
