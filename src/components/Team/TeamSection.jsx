import React from "react";
import TeamCard from "./TeamCard";
import "../../styles/team.css";

const TeamSection = ({ index, title, members }) => {
  // Dynamically assign a CSS class based on odd/even index
  const sectionClass = index % 2 === 0 ? "section-even" : "section-odd";

  return (
    <div className={`team-section relative ${sectionClass}`}>
      <h2>{title}</h2>
      <div className="team-grid">
        {members.map((member, idx) => (
          <TeamCard key={idx} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
