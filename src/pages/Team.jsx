import React from "react";
import TeamSection from "../components/Team/TeamSection";
import teamData from "../data/teamData";
import Loader from "../components/Loaders/CustomLoader2"

const Team = () => {
  if (!teamData) return <div><Loader /></div>;
  let sectionIndex = 0;

  return (
    <div>
      <div className="h-full w-full text-center px-5 py-8 md:py-10 relative">
        <h1 className="flex mx-auto mb-2 h-max w-full justify-center font-bold sm:font-semibold items-center text-3xl md:text-7xl text-black">Meet Our Team</h1>

        {/* Faculty Section */}
        <div className="relative">
          <h2 className="text-2xl md:text-4xl font-bold uppercase text-center my-4 sm:my-12 text-black underline">Faculty</h2>
          {Object.entries(teamData.faculty).map(([title, members]) => {
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

        {/* Upper Core Section */}
        <div className="relative">
          <h2 className="text-2xl md:text-4xl font-bold uppercase text-center my-4 sm:my-12 text-black underline">Upper Core</h2>
          {Object.entries(teamData.upperCore).map(([title, members]) => {
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
          {teamData.heads.departments.map((department) => {
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