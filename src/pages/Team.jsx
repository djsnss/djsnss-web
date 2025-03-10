import React, { useState } from "react";
import TeamSection from "../components/Team/TeamSection";
import teamData from "../data/teamData";
import Loader from "../components/Loaders/CustomLoader2";
import '../styles/team.css';

const Team = () => {
  // State to handle the selected year
  const [selectedYear, setSelectedYear] = useState("2024-25");

  // Handler for the dropdown change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Check if team data exists for the selected year
  const currentYearData = teamData[selectedYear];
  if (!currentYearData) return <div><Loader /></div>;

  let sectionIndex = 0;

  return (
    <div className="team-page-bg overflow-y-scroll w-full min-h-screen">
      <div className="h-full w-full text-center px-5 pb-8 md:pb-10 relative">
        <h1 className="flex mx-auto mb-2 h-max w-full justify-center font-bold items-center text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 pt-16">MEET OUR TEAM</h1>
        <p className="text-lg md:text-2xl text-black">The team that makes it all happen. Our dedicated members work tirelessly to ensure the success of our projects and initiatives. From planning to execution, each team member plays a crucial role in driving our mission forward. Get to know the talented individuals behind our achievements. </p>
        <a href="/alumni" className="text-blue-500 text-lg md:text-2xl">Meet our Alumni</a>
        {/* Dropdown to select the year */}
          <div className="my-4 flex justify-center items-center">
            <label htmlFor="year-select" className="mr-2 text-lg font-semibold text-black">Select Year:</label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              className="bg-gray-100 text-black border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {/* List all years */}
              {Object.keys(teamData).map((year) => (
                <option key={year} value={year}>
            {year}
                </option>
              ))}
            </select>
          </div>

          {/* Faculty Section */}
        {/* <div className="relative">
          <h2 className="text-2xl md:text-4xl font-bold uppercase text-center my-4 sm:my-12 text-black underline">Faculty</h2>
          {Object.entries(currentYearData.faculty).map(([title, members]) => {
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
        </div> */}

        {/* Upper Core Section */}
        <div className="relative">
          <h2 className="text-2xl md:text-4xl font-bold uppercase text-center my-4 sm:my-12 text-black underline">Upper Core</h2>
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
        </div>

        {/* Heads Section */}
        <div className="relative">
          <h2 className="text-2xl md:text-4xl font-bold uppercase text-center my-4 sm:my-12 text-black underline">Heads</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Team;
