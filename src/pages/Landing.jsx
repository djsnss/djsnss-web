import DJSLogo from "../assets/DJSLogo.png";
import DJSNSSLogo from "../assets/DJSNSSLogo.png";
import NSSLogo from "../assets/NSSLogo.png";
import Hero from "../components/home/hero";
import Features from "../components/home/features";
import Activities from "../components/home/activities";
import Impact from "../components/home/impact";
import Team from "../components/home/team";
import Events from "../components/home/events";
import Initiatives from "../components/home/Initiatives";

const data = [
  { src: DJSNSSLogo, alt: "NSS DJSCE Logo", link: "/" },
  { src: DJSLogo, alt: "DJS Logo", link: "https://djsce.ac.in/" },
  { src: NSSLogo, alt: "NSS Logo", link: "https://nss.gov.in/" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Features />
        <Activities />
        <Impact />
        <Team />
        <Events />
      </main>
    </div>
  )
}


// const Landing = () => {
//   const [loading, setLoading] = useState(true);

//   // Handle image loading state
//   useEffect(() => {
//     const img = new Image();
//     img.src = Background;
//     img.onload = () => setLoading(false);
//   }, []);

//   return (
//     <div className="flex flex-col">
//       {/* Parallax Section */}
//       <motion.div
//         className={`w-full h-screen bg-cover bg-fixed bg-center ${loading ? "bg-white/100 text-dark-navy" : "text-white"}`}
//         style={{ backgroundImage: loading ? "" : `url(${Background})` }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//           <motion.h1
//             className={`text-xl md:text-5xl sm:text-3xl font-bold mx-2 mt-4 text-center ${loading ? "text-dark-navy" : "text-white"}`}
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 1.5 }}
//           >
//             NSS Dwarkadas J. Sanghvi College of Engineering
//           </motion.h1>
//           <motion.div
//             className="text-md md:text-2xl text-center"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 1.5 }}
//           >
//             <div className="w-full border-white my-5 border-b-4"></div>
//             FOR YOU, WITH YOU, ALWAYS!
//           </motion.div>
//         </div>
//       </motion.div>
//       <div className="flex flex-col items-center justify-center">
//         <About />
//       </div>
//     </div>
//   );
// };

// export default Landing;
