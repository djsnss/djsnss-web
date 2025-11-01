import React from "react";
import PropTypes from "prop-types";
import TeamCard from "./TeamCard";

const TeamSection = ({ members }) => {
  return (
    // <div className="px-auto py-8 my-14 mx-auto h-max w-full max-w-4xl rounded-lg shadow-lg text-black bg-white/10 relative">
      <>
      <div className="h-max w-full max-w-full flex flex-row flex-wrap justify-around items-center gap-4">
        {members.map((member, idx) => (
          <TeamCard key={idx} {...member} />
        ))}
        
      </div>
      </>
    // </div>
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
