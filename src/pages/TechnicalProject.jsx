import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TechnicalProjects } from "../data/technicalProjects";

const TechnicalProject = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full font-poppins bg-gradient-to-b from-[#041877] to-[#0a2d9e] pt-16 pb-20">
      {/* Header Section */}
      <div className="text-center mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-block mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-geist text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 drop-shadow-2xl mb-4">
            TECHNICAL PROJECTS
          </h1>
          <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full animate-pulse"></div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base md:text-lg text-blue-100 font-roboto max-w-3xl mx-auto leading-relaxed"
        >
          Innovation meets community service through our technology-driven initiatives
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TechnicalProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden bg-gray-900">
                <img
                  src={project.imageURL}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <p className="text-sm font-semibold text-[#041877]">{project.date}</p>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow p-6">
                {/* Title */}
                <h3 
                  className="text-xl md:text-2xl font-bold text-[#041877] mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                  onClick={() => navigate(`/eventdetails/${project.slug}`)}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-700 mb-4 line-clamp-3 flex-grow leading-relaxed">
                  {project.description}
                </p>

                {/* Info Grid */}
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{project.duration}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => navigate(`/eventdetails/${project.slug}`)}
                  className="w-full bg-gradient-to-r from-[#041877] to-[#0a2d9e] text-white py-3 rounded-lg font-semibold hover:from-[#0a2d9e] hover:to-[#041877] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalProject;
