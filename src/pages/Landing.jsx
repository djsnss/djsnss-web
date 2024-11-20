import { motion } from 'framer-motion';
import DJSLogo from '../assets/DJSLogo.png';
import DJSNSSLogo from '../assets/DJSNSSLogo.png';
import NSSLogo from '../assets/NSSLogo.png';
import Background from '../assets/Events/TreePlantation.png';

const data = [
  { src: DJSNSSLogo, alt: 'NSS DJSCE Logo', link: '/' },
  { src: DJSLogo, alt: 'DJS Logo', link: 'https://djsce.ac.in/' },
  { src: NSSLogo, alt: 'NSS Logo', link: 'https://nss.gov.in/' },
];

const Landing = () => {
  return (
    <div className="flex flex-col">
      {/* Parallax Section */}
      <motion.div
        className="w-full h-screen bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${Background})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full bg-black bg-opacity-55 flex flex-col items-center justify-center">
          <div className="flex flex-row justify-evenly items-center">
            {data.map((d, idx) => (
              <motion.a
                key={idx}
                href={d.link}
                target="_blank"
                rel="noreferrer"
                className="bg-white bg-opacity-30 rounded-full p-2 flex"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <img src={d.src} alt={d.alt} className="h-10 md:h-40" />
              </motion.a>
            ))}
          </div>
          <motion.h1
            className="text-xl md:text-5xl sm:text-3xl font-bold mx-2 mt-4 text-center text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            NSS Dwarkadas J. Sanghvi College of Engineering
          </motion.h1>
          <motion.p
            className="text-md md:text-2xl text-center text-white"
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
        <motion.h1
          className="text-2xl md:text-4xl font-bold my-5"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="text-md md:text-2xl text-center my-5"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          The National Service Scheme (NSS) is an Indian government-sponsored
          public service program conducted by the Ministry of Youth Affairs and
          Sports of the Government of India. The NSS unit of Dwarkadas J.
          Sanghvi College of Engineering was established in 2003. Since then,
          the unit has been actively participating in various social service
          activities.
        </motion.p>
      </div>
    </div>
  );
};

export default Landing;
