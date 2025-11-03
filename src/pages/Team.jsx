import React, { useState } from "react";
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
    <div className="bg-secondary-blue overflow-y-scroll w-full min-h-screen">
      <div className="h-full w-full text-center pt-20 px-5 pb-8 md:pb-10 relative">
        <h1 className="mx-auto py-2 lg:py-4 text-center text-4xl md:text-5xl lg:text-6xl font-bold font-geist text-black">
        TEAM
        </h1>
        {/* Dropdown to select the year */}
        <div className="my-3 flex justify-center items-center">
          <label
            htmlFor="year-select"
            className="text-lg sm:text-2xl font-bold uppercase text-black"
          >
            Select Year:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            className="text-lg sm:text-2xl font-bold uppercase text-black bg-transparent rounded-md px-3  py-2 cursor-pointer focus:outline-none"
          >
            {Object.keys(teamData).map((year) => (
              <option key={year} value={year} className="text-black bg-white">
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
          <h2 className="text-2xl md:text-4xl font-geist font-bold uppercase text-center mt-6 mb-2 sm:mt-8 text-dark-blue">
            Upper Core
          </h2>
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

        {/* Student Leader Section */}
        {currentYearData.leader && (
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-geist font-bold uppercase text-center mt-6 mb-2 sm:mt-8 text-dark-blue">
              Student Leader
            </h2>
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
          </div>
        )}

        {/* Heads Section */}
        <div className="relative">
          <h2 className="text-2xl md:text-4xl font-geist font-bold uppercase text-center mt-6 mb-2 sm:mt-8 text-dark-blue">
            Heads
          </h2>
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
