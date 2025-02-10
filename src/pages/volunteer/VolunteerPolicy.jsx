import React from "react";
import { motion } from "framer-motion";
import PolicyImg from "../../assets/policy.png"; 

const sectionColors = [
  "#a2b9d8", 
  "#387fa8", 
  "#cce7ff", 
  "#003b5c", 
  "#003366", 
  "#005a8e", 
];

const volunteerPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content:
        "The National Service Scheme (NSS) is a program designed to develop the personality and leadership qualities of students through community service. Volunteers are expected to dedicate their time to meaningful work that impacts local communities directly, fostering a sense of social responsibility.",
    },
    {
      title: "Hours Allotment",
      content: `
        - Each NSS volunteer must complete a minimum of 120 hours per year for two years.
        - Activities include work in villages or slums, either after study hours or weekends.
        - Participation in a 7-day Special Camp is mandatory once in two years.
        - Volunteers may assist in additional community-driven events as needed.
      `,
    },
    {
      title: "Key Responsibilities",
      content: `
        - Conduct surveys in adopted villages/slums to identify and address issues.
        - Implement programs related to literacy, health, nutrition, and environmental conservation.
        - Support disaster relief and rescue operations during national calamities.
        - Promote community engagement to enhance public awareness.
      `,
    },
    {
      title: "Volunteer Benefits",
      content: `
        - Develop leadership and teamwork skills.
        - Enhance personal and professional growth.
        - Build connections with community members and fellow volunteers.
        - Receive recognition and certificates for outstanding contributions.
      `,
    },
    {
      title: "Volunteer Impact",
      content:
        "NSS volunteers contribute to better living conditions, improved public health, and awareness of critical issues. Their efforts bring personal growth and a sense of accomplishment.",
    },
    {
      title: "Application Process",
      content:
        "Interested candidates can apply online through our website or visit the NSS office at their respective institutions. The process includes filling out a form, attending an orientation session, and a brief interview.",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      {/* Left Half - Volunteer Policy Title */}
      <section
        className="relative w-full md:w-1/2 min-h-[60vh] md:min-h-screen bg-black/60 p-4 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${PolicyImg})` }} 
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-7xl font-bold tracking-wide">Volunteer Policy</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            NSS aims to instill a sense of responsibility, leadership, and community development among volunteers.
            Learn about our mission and impact below.
          </p>
        </div>
      </section>

      {/* Right Half - Scrollable Grid (Fixes Nested Scroll Issue) */}
      <section className="w-full md:w-1/2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col justify-center items-center p-6 border-none transform transition-all duration-300 ease-in-out hover:scale-105"
              style={{
                backgroundColor: sectionColors[index % sectionColors.length],
              }}
            >
              <h2 className="text-white text-xl font-semibold text-center">{section.title}</h2>
              <div className="w-full h-full mt-3">
                {section.content.includes("-") ? (
                  <ul className="list-disc pl-5 text-white">
                    {section.content
                      .split("\n")
                      .filter((item) => item.trim() !== "")
                      .map((item, i) => (
                        <li key={i} className="mb-2">{item.replace("-", "").trim()}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-white">{section.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default volunteerPolicy;
