import React from "react";
import TeamSection from "../components/Team/TeamSection";
import teamData from "../data/teamData";
import Loader from "../components/Loaders/CustomLoader2"
import "../styles/team.css";

const Team = () => {
  if (!teamData) return <div><Loader /></div>;
  let sectionIndex = 0;

  return (
    <div>
      <div className="team-page-bg h-full w-full"></div>
      <div className="team-page relative">
        <h1>Meet Our Team</h1>

        {/* Faculty Section */}
        <div className="relative">
          <h2 className="team-heading">Faculty</h2>
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
          <h2 className="team-heading">Upper Core</h2>
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
          <h2 className="team-heading">Heads</h2>
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