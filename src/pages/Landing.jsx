import { motion } from "framer-motion";
import DJSLogo from "../assets/DJSLogo.png";
import DJSNSSLogo from "../assets/DJSNSSLogo.png";
import NSSLogo from "../assets/NSSLogo.png";
import Background from "../assets/Events/TreePlantation.png";
import About from "../components/home/About";
import { useState, useEffect } from "react";

const data = [
  { src: DJSNSSLogo, alt: "NSS DJSCE Logo", link: "/" },
  { src: DJSLogo, alt: "DJS Logo", link: "https://djsce.ac.in/" },
  { src: NSSLogo, alt: "NSS Logo", link: "https://nss.gov.in/" },
];

const Landing = () => {
  const [loading, setLoading] = useState(true);

  // Handle image loading state
  useEffect(() => {
    const img = new Image();
    img.src = Background;
    img.onload = () => setLoading(false);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Parallax Section */}
      <motion.div
        className={`w-full h-screen bg-cover bg-fixed bg-center ${loading ? "bg-white/100 text-dark-navy" : "text-white"}`}
        style={{ backgroundImage: loading ? "" : `url(${Background})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full bg-black bg-opacity-75 flex flex-col items-center justify-center">
          <div className="flex flex-row justify-evenly items-center">
            {data.map((d, idx) => (
              <motion.a
                key={idx}
                href={d.link}
                target="_blank"
                rel="noreferrer"
                className="bg-white/20 bg-opacity-20 hover:bg-white/40 duration-300 rounded-full p-2 mx-1 md:mr-6 flex backdrop-blur-sm shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <img src={d.src} alt={d.alt} className="h-10 md:h-40" />
              </motion.a>
            ))}
          </div>
          <motion.h1
            className={`text-xl md:text-5xl sm:text-3xl font-bold mx-2 mt-4 text-center ${loading ? "text-dark-navy" : "text-white"}`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            NSS Dwarkadas J. Sanghvi College of Engineering
          </motion.h1>
          <motion.p
            className="text-md md:text-2xl text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="w-full border-white my-5 border-b-4"></div>
            FOR YOU, WITH YOU, ALWAYS!
          </motion.p>
        </div>
      </motion.div>
      <div className="flex flex-col items-center justify-center">
        <About />
      </div>
    </div>
  );
};

export default Landing;
