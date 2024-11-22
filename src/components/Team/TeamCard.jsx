import React from "react";
import '../../styles/team.css';

const TeamCard = ({ name, position, image }) => (
  <div className="team-card flex flex-col items-center">
    <img
      src={image || "https://via.placeholder.com/150"}
      alt={`${name}'s portrait`}
    />
    <h3>{name}</h3>
    <p>{position}</p>
  </div>
);

export default TeamCard;
