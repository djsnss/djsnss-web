import { motion } from "framer-motion";
import Aboutusimg from "../assets/Events/IndependenceDay.png";
import HariVasudevan from "../assets/Faculty/Hari Vasudevan.jpg";
import VyankateshBagal from "../assets/Faculty/Vyankatesh Bagal new.jpg";
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
       message: [
                'DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of Engineering commenced their journey in the year 2005 towards making each member of the unit a better citizen and therefore making India a better nation. It is a proud moment for all of us to witness the participation of students in various activities that are undertaken by NSS volunteers. We have been striving towards the social upliftment and well-being of society.',
                'The NSS unit has been actively involved in numerous activities such as health camps, tree plantations, education programs for underprivileged children, and disaster management training. These activities have shaped the lives of our students, making them more socially aware and responsible citizens. I am proud of the progress that our students continue to make, and I look forward to seeing their efforts bring about a positive change in the world.',
                'We have always believed in making a difference through action, and I am confident that the NSS unit will continue to grow and contribute to our nation\'s development in the years to come.',
            ],
    },
  ]
  const desks = [
    {
      index: 2,
      link: "/messages/prof-alisha-banz",
      name: "Prof. Alisha Banz",
      role: "Program Officer",
      image: AlishaBanz,
       message: [
                'Dear Students, As the Program Officer of the NSS unit at Dwarkadas J. Sanghvi College of Engineering, I am honored to address the profound ethos encapsulated in our motto: "Not Me But You." The activities of NSS are',
                'The volunteers of NSS play a crucial role in the implementation of various social programs and projects. From organizing blood donation camps to participating in awareness drives, our students consistently work towards the well-being of the society. The true spirit of volunteering lies in the desire to make a positive impact on the community, and it is truly heartening to see our students display this commitment.',
                'As a Program Officer, my role is to guide and support these volunteers, ensuring they make the most of their experiences. Together, we will continue to strive for excellence in service and work towards a society that is just, equitable, and compassionate.',
            ],
    },
    {
      index: 3,
      link: "/messages/prof-vyankatesh-bagal",
      name: "Prof. Vyankatesh Bagal",
      role: "Program Officer",
      image: VyankateshBagal,
      message: [
                'It gives me immense pleasure to be a part of the National Service Scheme (NSS) wing of our institute. DJS NSS has been an integral part of our institution\'s commitment to community service and social responsibility. Over the years, our NSS volunteers have actively participated in various community development programs, environmental initiatives, and social welfare activities like the solar lights installation at Narpad and the Blood Donation drive in DJSCE.',
                'Their dedication and enthusiasm have not only benefited the communities around us but have also enriched their own lives with valuable experiences and life lessons of living at a campsite with bare essentials and thriving. I encourage all students to actively',
                'I extend my heartfelt appreciation to all NSS volunteers, past and present, for their unwavering commitment to the service of others.',
            ],
    },
    {
      index: 4,
      link: "/messages/prof-rahul-taware",
      name: "Prof. Rahul Taware",
      role: "Program Officer",
      image: RahulTaware,
      message: [
                'NSS is an extraordinary experience that allows students to contribute meaningfully to society while developing themselves as leaders. As the Program Officer for the NSS unit, it has been a privilege to guide young minds who are eager to make a difference.',
                'Through our activities, such as environmental sustainability campaigns, education drives, and community outreach programs, students engage with social issues and work toward their resolution. We encourage participation in national and international events, fostering global citizenship among our volunteers.',
                'It is truly fulfilling to witness the transformation in our volunteers as they embrace leadership roles and develop a strong sense of social responsibility. I look forward to their continued growth and contributions to society.',
            ],
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

  const defaultMsg =
    "DJS NSS - The NSS unit of Dwarkadas J. Sanghvi College of Engineering began its journey in 2005. Through activities like rallies, tree plantations, education for underprivileged children and disaster management training, we work towards building socially responsible citizens and giving back to the community.";

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
        <h1 className="text-3xl md:text-7xl text-white z-40 my-10 sm:mb-20 font-geist font-semibold text-center pt-6">
          <strong>ABOUT US</strong>
        </h1>
        <div className="min-h-[70vh] w-full flex flex-col justify-start items-center px-4">
          <div className="bg-gray-600/40 p-6 rounded-lg shadow-[0_0_4px_rgba(255,255,255,0.7),0_0_4px_rgba(200,239,255,0.7)] backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-300 hover:shadow-[0_0_4px_rgb(171,249,236),0_0_5px_rgba(183,244,255,0.8)] max-w-4xl w-full">
            <h2 className="text-2xl md:text-5xl text-white mb-4 text-center font-lateef">
              Our Mission and Vision
            </h2>
            <p className="text-[15px] md:text-lg text-white leading-relaxed font-roboto">
              DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of Engineering, started in 2005. Our mission is to foster the all-round development of society, addressing socio-economic problems and sustainability crises caused by global warming. We aim to transform individuals into resilient and capable citizens, encouraging both technical advancements and societal contributions.
            </p>
            <br />
            <p className="text-[15px] md:text-lg text-white leading-relaxed font-roboto">
              Our activities include regular meetings, organizing events, and forging lifelong connections among volunteers. We strive to connect with nature and rural areas, providing holistic development and opportunities for personal growth.
            </p>
          </div>
        </div>
      </section>
      
      <div className="h-1  bg-black m-6"></div>
      

      {/* Principal's Desk Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full px-6 lg:px-10 bg-secondary-blue py-6"
      >
        {/* Head Office */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="inline-block w-full font-semibold px-6 py-2 font-geist text-dark text-xl md:text-3xl shadow-sm border-b-2 border-black ">
              MESSAGE FROM PRINCIPAL
            </h2>
          </div>

          {/* Desktop / Laptop layout */}
          <div className="hidden lg:block">
            {principal.map((desk, idx) => (
              <div key={idx} className="max-w-6xl mx-auto mb-8">
                {/* name/role above the row (left aligned) */}
                <div className="mb-6">
                  <h3 className="text-4xl font-bold text-black">{desk.name}</h3>
                  <p className="text-2xl text-black font-semibold">{desk.role}</p>
                </div>

                {/* row: image and message box — aligned at the same top */}
                <div className=" w-full flex items-start gap-10">
                  <div className="w-72 h-72 flex-shrink-0">
                    <div className="w-72 h-72 rounded-lg overflow-hidden border-4 border-black bg-white shadow-sm">
                      <img src={desk.image} alt={desk.name} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="w-full min-h-72 bg-[#E7F2FF] rounded-xl p-6 border border-gray-300 shadow-sm overflow-auto">
                      <p className="text-xl text-black leading-relaxed font-roboto text-justify">
                        {desk.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col gap-6 lg:hidden">
            {principal.map((desk, idx) => (
              <div key={idx} className="bg-[#E7F2FF] rounded-lg p-4 border border-black shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-28 h-28 rounded-lg overflow-hidden border-black border-2 flex-shrink-0">
                    <img src={desk.image} alt={desk.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 font-geist">
                    <h3 className="text-lg md:text-xl font-bold text-black">{desk.name}</h3>
                    <p className="text-sm md:text-base text-black font-medium">{desk.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-base text-black leading-relaxed font-roboto">{desk.message ?? defaultMsg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Program Officers */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="text-center mb-10">
            <h2 className="inline-block w-full font-semibold px-6 py-2 font-geist text-dark text-xl md:text-3xl shadow-sm border-b-2 border-black">
              MESSAGE FROM PROGRAM OFFICERS
            </h2>
          </div>

          {/* Desktop / Laptop layout */}
          <div className="hidden lg:block">
            {desks.map((desk, idx) => (
              <div key={idx} className="max-w-6xl mx-auto mb-8">
                <div className="mb-4 ">
                  <h3 className="text-4xl font-bold text-black">{desk.name}</h3>
                  <p className="text-2xl text-black font-semibold">{desk.role}</p>
                </div>

                <div className="w-full flex items-start gap-10">
                  <div className="w-72 h-72 flex-shrink-0">
                    <div className="w-72 h-72 rounded-lg overflow-hidden border-4 border-black bg-white shadow-sm">
                      <img src={desk.image} alt={desk.name} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 ">
                    <div className="w-full min-h-72 bg-[#E7F2FF] rounded-xl p-6 border border-gray-300 shadow-sm overflow-auto">
                      <p className="text-xl text-black leading-relaxed font-roboto text-justify">
                        {desk.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col gap-6 lg:hidden">
            {desks.map((desk, idx) => (
              <div key={idx} className="bg-[#E7F2FF] rounded-lg p-4 shadow-md border border-blue-100">
                <div className="flex gap-4 items-start">
                  <div className="w-28 h-28 rounded-lg overflow-hidden border-black border-2 flex-shrink-0">
                    <img src={desk.image} alt={desk.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-black font-geist">{desk.name}</h3>
                    <p className="text-sm md:text-base text-black font-medium font-geist">{desk.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-base text-black leading-relaxed font-roboto">{desk.message ?? defaultMsg}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="h-1 bg-black m-6"></div>

      {/* Departments Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-10 p-10 bg-[#CBE3FF] text-center min-h-screen"
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
                className={`group flex flex-col items-center justify-start bg-[#E7F2FF] w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-30px)] min-w-[300px] md:min-h-[370px] p-8
                shadow-md border border-gray-200 transition-transform duration-300 hover:shadow-lg transform hover:-translate-y-1
                ${isFirstRow ? "lg:rounded-t-full" : ""} 
                ${isLastRow ? "lg:rounded-b-full" : ""}`}
              >
                <div className="top-0 text-pretty">
                  <h3 className="text-lg sm:text-xl md:text-2xl justify-start font-bold uppercase text-black mb-3">
                    {dept.title}
                  </h3>
                  <p className="text-md sm:text-base text-black font-roboto">
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
