import React from "react";
import { FaLinkedin } from "react-icons/fa";

const TeamCard = ({ name, position, image, linkedin, title }) => {
  return (
    <div
      className="
        w-[300px] bg-white rounded-[50px] shadow-lg flex flex-col items-center overflow-hidden
        transition-transform duration-200 ease-in-out
        hover:scale-[1.04] hover:-rotate-1
        max-w-full
        sm:w-[350px]
        "
    >
      {/* Image container */}
      <div
        className="
          w-full flex justify-center items-center bg-primary-blue
          p-10 rounded-[50px] overflow-hidden
          sm:p-10
          xs:p-4 xs:rounded-[25px]
        "
      >
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1678811116814-26372fcfef1b?q=80&w=3388&auto=format&fit=crop"
          }
          alt={name}
          className="
            w-full aspect-square rounded-[30px] object-cover
            transition-transform duration-300
            group-hover:scale-110
            xs:rounded-[15px]
          "
        />
      </div>

      {/* Content area */}
      <div className="p-2 w-full text-center xs:p-1">
        <div className="flex justify-center items-center">
          <h3 className="font-geist font-bold text-3xl sm:text-4xl text-black xs:text-[22px]">{name}</h3>
        </div>

        <div className="mt-1 text-[#333]">
          <p className="font-roboto font-bold text-xl sm:text-2xl">{position}</p>
        </div>

        {linkedin && (
          <div className="flex justify-center mt-2">
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl sm:text-3xl text-[#0077b5] hover:text-[#005582] transition-colors duration-200" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
