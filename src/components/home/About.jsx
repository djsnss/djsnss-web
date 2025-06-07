import { motion } from "framer-motion";
import Initiatives from "../../components/home/Initiatives";
import DistinguishedAlumni from "../../pages/alumni/DistinguishedAlumni";
import AboutSection from "./AboutSection";
import Impact from "../../components/home/Impact";
import Events from "../../components/home/Events";

const About = () => {
  return (
    <div className=" text-black">
      <AboutSection />
      <Impact />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white min-h-full flex flex-col lg:flex-row items-center justify-center"
      >
        <Initiatives />
      </motion.div>
      <Events />
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
