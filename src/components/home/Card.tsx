import React from "react";
import { motion } from "framer-motion";
import '../../styles/team.css'

function ProfileCard({ name, imageUrl, link, shortDesc }) {
  return (
    <motion.div
      className="team-card relative flex flex-col w-[17vw] bg-white shadow-lg rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={
          imageUrl ||
          "https://images.unsplash.com/photo-1678811116814-26372fcfef1b?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt={`${name}`}
        className="team-card-image"
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
