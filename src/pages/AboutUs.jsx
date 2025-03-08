import { motion } from "framer-motion";
import Aboutusimg from "../assets/Events/IndependenceDay.png";
import Card from "../components/aboutus/Card";
import HariVasudevan from "../assets/Faculty/Hari Vasudevan.jpg";
import VyankateshBagal from "../assets/Faculty/Vyankatesh Bagal.jpg";
import AlishaBanz from "../assets/Faculty/Alisha Banz.jpg";
import RahulTaware from "../assets/Faculty/Rahul Taware.jpg";

const AboutUs = () => {
  const principal = [
    {
      index: 1,
      link: "/messages/dr-hari-vasudevan",
      name: "Dr. Hari Vasudevan",
      role: "Principal",
      image: HariVasudevan,
    },
  ]
  const desks = [
    {
      index: 2,
      link: "/messages/prof-alisha-banz",
      name: "Prof. Alisha Banz",
      role: "Program Officer",
      image: AlishaBanz,
    },
    {
      index: 3,
      link: "/messages/prof-vyankatesh-bagal",
      name: "Prof. Vyankatesh Bagal",
      role: "Program Officer",
      image: VyankateshBagal,
    },
    {
      index: 4,
      link: "/messages/prof-rahul-taware",
      name: "Prof. Rahul Taware",
      role: "Program Officer",
      image: RahulTaware,
    },
  ];

  const departments = [
    {
      title: "Creatives",
      description:
        "Creatives are the imaginative minds behind NSS's visual identity. Whether it's designing posters or creating engaging social media content, their artistic contributions bring every project to life. Their efforts, like those of the other departments, are crucial in making sure NSS stands out in every aspect.",
    },
    {
      title: "Technical",
      description:
        "The Technical team manages the digital and tech needs of NSS along with coveted outhouses software and hardware projects to shine on your resume, ensuring that all platforms run efficiently. Whether it's handling the website or tech setups for events, their contribution is as critical as any other, enabling NSS to operate seamlessly.",
    },
    {
      title: "Events",
      description:
        "The Events team is responsible for planning and executing all NSS events, making sure everything runs smoothly. From logistics to coordination, they ensure that every initiative is impactful. Like the other departments, their work is fundamental in achieving NSS's goals.",
    },
    {
      title: "Publicity",
      description:
        "The Publicity team works to ensure that all NSS events and initiatives reach the maximum audience. Their efforts in promotion and outreach help NSS build a strong presence. As with every department, their role is integral to the committee's success.",
    },
    {
      title: "Editorial",
      description:
        "The Editorial team ensures that all written communication for NSS, from articles to reports, is clear, engaging, and well-crafted. They play a key role in shaping the public narrative of NSS and ensuring that every story is told effectively. Their work is as vital as any other, contributing significantly to the overall communication and reputation of the committee.",
    },
  ];

  return (
    <div className="w-full min-h-full">
      {/* About Us Section */}
      <section
        className="relative flex flex-col items-center justify-start w-full min-h-screen bg-black/70 p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${Aboutusimg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
        {/* Overlay for darkening the background */}
        {/* Overlay for darkening the background */}
        <h1 className="text-3xl md:text-7xl text-white z-40 my-10 sm:mb-20">
          <strong>ABOUT US</strong>
        </h1>
        <div className="min-h-[70vh] w-full flex flex-col justify-start items-center px-4">
          <div className="bg-gray-600/40 p-6 rounded-lg shadow-[0_0_4px_rgba(255,255,255,0.7),0_0_4px_rgba(200,239,255,0.7)] backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-300 hover:shadow-[0_0_4px_rgb(171,249,236),0_0_5px_rgba(183,244,255,0.8)] max-w-4xl w-full">
            <h2 className="text-2xl md:text-4xl text-white mb-4 text-center">
              Our Mission and Vision
            </h2>
            <p className="text-[15px] md:text-lg text-white leading-relaxed">
              DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of Engineering, started in 2005. Our mission is to foster the all-round development of society, addressing socio-economic problems and sustainability crises caused by global warming. We aim to transform individuals into resilient and capable citizens, encouraging both technical advancements and societal contributions.
            </p>
            <br />
            <p className="text-[15px] md:text-lg text-white leading-relaxed">
              Our activities include regular meetings, organizing events, and forging lifelong connections among volunteers. We strive to connect with nature and rural areas, providing holistic development and opportunities for personal growth.
            </p>
          </div>
        </div>
      </section>
      <div className="h-1 bg-dark-navy m-6"></div>

      {/* Principal's Desk Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full px-10 bg-white"
      >
        <h2 className="text-2xl md:text-4xl text-dark-navy justify-self-center my-4 font-poppins">
          Message from Head Office
        </h2>
        <div className="flex flex-wrap justify-center gap-8 w-full mx-auto font-poppins">
          {principal.map((desk, index) => (
            <Card key={index} desk={desk} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-8 w-full mx-auto font-poppins">
          {desks.map((desk, index) => (
            <Card key={index} desk={desk} />
          ))}
        </div>
      </motion.section>
      <div className="h-1 bg-dark-navy m-6"></div>

      {/* Departments Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-10 p-10 bg-[#cbf6ff] text-center min-h-screen"
      >
        <h2 className="text-2xl md:text-4xl text-black mb-8 mt-5 font-poppins">
          Our Departments
        </h2>
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-[1200px] mx-auto">
          {departments.map((dept, index) => {
            const totalItems = departments.length;
            const itemsPerRow = 3; // Maximum 3 cards per row
            const totalRows = Math.ceil(totalItems / itemsPerRow);
            const currentRow = Math.ceil((index + 1) / itemsPerRow);

            // Determine if the card is in the first row or last row
            const isFirstRow = currentRow === 1;
            const isLastRow = currentRow === totalRows;

            // Apply rounded corners conditionally for the top and bottom rows
            return (
              <div
                key={index}
                className={`group flex flex-col items-center justify-start bg-white w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-30px)] min-w-[300px] md:min-h-[370px] p-8
                shadow-md border border-gray-200 transition-transform duration-300 hover:shadow-lg transform hover:-translate-y-1
                ${isFirstRow ? "lg:rounded-t-full" : ""} 
                ${isLastRow ? "lg:rounded-b-full" : ""}`}
              >
                <div className="top-0 text-pretty">
                  <h3 className="text-lg sm:text-xl md:text-2xl justify-start font-bold uppercase text-gray-800 mb-3">
                    {dept.title}
                  </h3>
                  <p className="text-md sm:text-base text-gray-600">
                    {dept.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
