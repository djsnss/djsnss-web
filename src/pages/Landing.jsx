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
          <div className='flex flex-row justify-evenly items-center'>
            {
              data.map((d, idx) => (
                <a href={d.link} target='_blank' rel='noreferrer' key={idx} className='bg-white bg-opacity-30 rounded-full p-2 flex flex-col md:flex-row'>
                  <motion.a
                    key={idx}
                    href={d.link}
                    target='_blank'
                    rel='noreferrer'
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                  >
                    <img src={d.src} alt={d.alt} className="h-10 md:h-40" />
                  </motion.a>
                </a>
              ))
            }
          </div>
          <motion.h1
            className="text-xl md:text-5xl sm:text-3xl font-bold mb-10 mx-2 text-center text-white"
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
            <div className="w-full border-white mb-5 border-b-4"></div>
            FOR YOU, WITH YOU, ALWAYS!
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
