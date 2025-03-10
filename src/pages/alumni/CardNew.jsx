import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./../../styles/homeCard.css";
import { FaLinkedin } from "react-icons/fa";
function ProfileCard({ name, imageUrl, url, linkedin }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(url); // Dynamically navigate to the URL
  };

  return (
    <motion.div
      className="team-card relative flex flex-col bg-shadow-lg rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={imageUrl}
        alt={`${name}`}
        className="object-cover object-center w-80 h-80"
      />
      <div className="team-card-overlay">
        <h3 className="team-card-name">{name}</h3>
        <div className="flex justify-center items-center mt-2">
          <button
            onClick={handleViewDetails}
            className="no-underline text-xs sm:text-sm text-white bg-dark-navy px-4 py-1 rounded-full"
          >
            View Details
          </button>
          <a href={`https://${linkedin}`} target="_blank" rel="noopener">
            <FaLinkedin className="text-2xl text-white ml-2" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCard;
