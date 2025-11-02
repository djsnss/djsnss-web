import React from "react";
import PropTypes from "prop-types";
import TeamCard from "./TeamCard";

const TeamSection = ({ members }) => {
  return (
    <div className="w-full flex flex-col items-center py-20 px-4">
      <>
      <div className="h-max w-full max-w-full flex flex-row flex-wrap justify-around items-center gap-4">
        {members.map((member, idx) => (
          <TeamCard key={idx} {...member} />
        ))}
        
      </div>
      </>
    </div>
  );
};
TeamSection.propTypes = {
  title: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TeamSection;
