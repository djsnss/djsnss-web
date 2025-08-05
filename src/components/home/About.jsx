import { motion } from "framer-motion";
import Initiatives from "../../components/home/Initiatives";
import DistinguishedAlumni from "../../pages/alumni/DistinguishedAlumni";
import AboutSection from "./AboutSection";
import Impact from "../../components/home/impact";
import Activities from "../../components/home/activities";
import Announcement from "../../components/home/Announcement";
import ContactUs from "../../components/home/ContactUs";

const About = () => {
  return (
    <div className=" text-black">
      <AboutSection />
      <Announcement />
      <Impact />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white min-h-full flex flex-col lg:flex-row items-center justify-center"
      >
        <Initiatives />
      </motion.div>
      <Activities />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <DistinguishedAlumni />
      </motion.div>
      <ContactUs />
    </div>
  );
};

export default About;
