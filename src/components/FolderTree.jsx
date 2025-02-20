import React from "react";
import { motion } from "framer-motion";

const FolderTree = () => {
  const folders = [
    { id: "12qa-XERk8JzCJ2X0ocF3O84fEfv4Sa6f", name: "NSS Data" },
    { id: "1sEtSeeYL-a0P1UCs_Kwl5thgbzIkAHCu", name: "NSS 2021-22" },
    { id: "1bzzElnbii_J72C8O71t96UIe9qnIVPSl", name: "NSS 2022-23" },
  ];

  return (
    <div className="min-h-screen bg-[#cce7ff] p-6 md:p-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-7xl font-bold text-[#003366] mb-10"
      >
        Drive Links
      </motion.h1>

      <div className="space-y-8 max-w-5xl mx-auto">
        {folders.map((folder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-[#003b5c]"
          >
            <h2 className="text-2xl font-semibold text-[#003b5c] mb-4">
              {folder.name}
            </h2>
            <div className="w-full rounded-lg overflow-hidden border border-gray-300">
              <iframe
                src={`https://drive.google.com/embeddedfolderview?id=${folder.id}#grid`}
                width="100%"
                height="450px"
                className="w-full h-[450px] rounded-md"
              ></iframe>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FolderTree;