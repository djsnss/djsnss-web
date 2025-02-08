import React from "react";
import "../../styles/team.css";

const TeamCard = ({ name, position, image }) => (
  <div className="team-card relative flex flex-col items-center justify-center">
    <img
      src={
        image ||
        "https://images.unsplash.com/photo-1678811116814-26372fcfef1b?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
      alt={`${name}`}
      className="team-card-image"
    />
    <div className="team-card-overlay">
      <h3 className="team-card-name">{name}</h3>
    </div>
    <div className="textBox">
      <p className="text head">{position}</p>
      <span>at</span>
      {
        position=="Principal"?(
          <p className="text price">DJSCE</p>
        ):(
          <p className="text price">DJSNSS</p>
        )
      }
    </div>
  </div>
);

export default TeamCard;
