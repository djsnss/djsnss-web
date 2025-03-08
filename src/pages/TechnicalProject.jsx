import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TechnicalProjects } from "../data/technicalProjects";

const TechnicalProject = () => {
  const navigate = useNavigate();
  return (
    <div className="h-max w-full font-poppins bg-[#003366]">
      <h1 className="flex mx-auto mb-2 py-4 h-max w-full justify-center items-center text-3xl md:text-7xl text-white">
        TECHNICAL PROJECTS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center place-items-stretch w-full">
        {TechnicalProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="m-2 bg-[#cce7ff] p-6 md:p-12 transition-colors duration-300"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#003366] mb-6 hover:cursor-pointer underline"
              onClick={() => navigate(`/eventdetails/${project.slug}`)}
            >
              {project.title}
            </h3>
            <div className="aspect-square bg-[#387fa8] overflow-hidden">
              <img
                src={project.imageURL}
                alt="Why Volunteer"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-[#003b5c] my-6">
              {project.longDescription}
            </p>
            <div className="text-[#003b5c] space-y-3">
              <p>Location: {project.location}</p>
              <p>Date: {project.date}</p>
              <p>Duration: {project.duration}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalProject;
