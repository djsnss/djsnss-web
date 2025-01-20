import React from "react";
import { motion } from "framer-motion";
import '../../styles/team.css'

function ProfileCard({ name, imageUrl, link, shortDesc }) {
  return (
    <motion.div
      className="team-card relative flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={imageUrl}
        alt={`${name}`}
        className="object-cover object-center w-full h-80"
      />
      <div className="team-card-overlay">
        <h3 className="team-card-name">{name}</h3>
        <a
          href={link}
          className="no-underline text-xs sm:text-sm text-white bg-dark-navy px-4 py-1 mt-2 rounded-full"
        >
          View Details
        </a>
      </div>
      <div className="textBox">
        <p className="text head p-10">{shortDesc}</p>
      </div>
    </motion.div>
  );
}

export default ProfileCard;
