import React, { useState, useEffect } from "react";
import TeamSection from "../components/Team/TeamSection";
import "../styles/team.css";

const Team = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    fetch("/data/teamData.json")
      .then((response) => response.json())
      .then((data) => setTeamData(data))
      .catch((error) => console.error("Error fetching team data:", error));
  }, []);

  if (!teamData) return <p>Loading...</p>;

  // Keep a global counter for sections
  let sectionIndex = 0;

  return (
    <div className="team-page">
      <h1>Meet Our Team</h1>

      {/* Faculty Section */}
      <div>
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
      <div>
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
      <div>
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
  );
};

export default Team;
