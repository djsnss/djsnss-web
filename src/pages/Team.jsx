import React, { useState } from "react";
import { motion } from "framer-motion";
import TeamSection from "../components/Team/TeamSection";
import teamData from "../data/teamData";
import Loader from "../components/Loaders/CustomLoader2";
import "../styles/team.css";

const Team = () => {
  // State to handle the selected year
  const [selectedYear, setSelectedYear] = useState("2025-26");

  // Handler for the dropdown change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Check if team data exists for the selected year
  const currentYearData = teamData[selectedYear];
  if (!currentYearData)
    return (
      <div className="min-h-screen max-w-screen flex items-center justify-center bg-cream">
        <Loader />
      </div>
    );

  let sectionIndex = 0;

  return (
    <div className="bg-secondary-blue overflow-y-scroll w-full min-h-screen relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="h-full w-full text-center pt-20 px-5 pb-8 md:pb-10 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-geist text-[#041877] drop-shadow-lg mb-6">
            OUR TEAM
          </h1>
          <p className="text-lg md:text-2xl text-gray-800 font-roboto max-w-3xl mx-auto leading-relaxed font-semibold">
            Meet the incredible minds behind NSS - Driven by passion, united by purpose
          </p>
        </motion.div>

        {/* Year Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="my-8 flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <label
            htmlFor="year-select"
            className="text-xl sm:text-2xl font-bold uppercase text-black tracking-wider"
          >
            Select Year:
          </label>
          <div className="relative">
            <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              className="text-lg sm:text-2xl font-bold uppercase text-white bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl px-8 py-4 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 appearance-none pr-12 hover:scale-105 transform"
            >
              {Object.keys(teamData).map((year) => (
                <option key={year} value={year} className="text-black bg-white">
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Upper Core Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16"
        >
          <div className="relative inline-block mb-8">
            <h2 className="text-4xl md:text-6xl font-geist font-bold uppercase text-dark-blue drop-shadow-md">
              Upper Core
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-dark-blue to-transparent rounded-full"></div>
          </div>
          {Object.entries(currentYearData.upperCore).map(([title, members]) => {
            sectionIndex++;
            return (
              <TeamSection
                key={sectionIndex}
                index={sectionIndex}
                title={title}
                members={members}
              />
            );
          })}
        </motion.div>

        {/* Student Leader Section */}
        {currentYearData.leader && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mb-16"
          >
            <div className="relative inline-block mb-8">
            <h2 className="text-4xl md:text-6xl font-geist font-bold uppercase text-dark-blue drop-shadow-md">
              Student Leader
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-dark-blue to-transparent rounded-full"></div>
            </div>
            {Object.entries(currentYearData.leader).map(([title, members]) => {
              sectionIndex++;
              return (
                <TeamSection
                  key={sectionIndex}
                  index={sectionIndex}
                  title={title}
                  members={members}
                />
              );
            })}
          </motion.div>
        )}

        {/* Heads Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16"
        >
          <div className="relative inline-block mb-8">
            <h2 className="text-4xl md:text-6xl font-geist font-bold uppercase text-dark-blue drop-shadow-md">
              Heads
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-dark-blue to-transparent rounded-full"></div>
          </div>
          {currentYearData.heads.departments.map((department) => {
            sectionIndex++;
            return (
              <TeamSection
                key={sectionIndex}
                index={sectionIndex}
                title={department.name}
                members={department.members}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
