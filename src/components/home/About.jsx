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
      <Initiatives />
      <Activities />
      <DistinguishedAlumni />
      <ContactUs />
    </div>
  );
};

export default About;
