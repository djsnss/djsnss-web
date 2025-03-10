import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CardNew from "./CardNew";
import alumni from "../../data/alumniData";

const RandomAlumni = () => {
  const [randomAlumni, setRandomAlumni] = useState([]);

  useEffect(() => {
    // Shuffle and pick 3 random alumni
    const shuffled = [...alumni].sort(() => 0.5 - Math.random());
    setRandomAlumni(shuffled.slice(0, 5));
  }, []);

  return (
    <section id="impact" className="py-4 bg-blue-50">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Featured Alumni</h2>
        <p className="text-gray-700 mt-2 text-lg">
          Get inspired by some of our outstanding alumni.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-8 p-6"
      >
        {randomAlumni.map((alumnus, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <CardNew
              name={alumnus.name}
              imageUrl={alumnus.image}
              url={alumnus.url}
              linkedin={alumnus.linkedin}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default RandomAlumni;
