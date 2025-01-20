import { motion } from "framer-motion";
import Initiatives from "./Initiatives";
import DistinguishedAlumni from "./DistinguishedAlumni";
import AboutSection from "./AboutSection";

const About = () => {
  return (
    <div className="bg- text-black">
      <AboutSection />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white min-h-full flex flex-col lg:flex-row items-center justify-center"
      >
        <Initiatives />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <DistinguishedAlumni />
      </motion.div>
    </div>
  );
};

export default About;
