import React from 'react';
import { motion } from 'framer-motion';
import Aboutusimg from '../../assets/aboutus.jpg'

const AboutUs = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
      {/* About Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative flex flex-col items-center justify-center w-full h-screen bg-black/60 p-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${Aboutusimg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay for darkening the background */}
        <h1 className="text-7xl text-white mt-16 mb-10">ABOUT US</h1> {/* Increased margin-top */}
        <div className="flex justify-between items-center gap-5 mx-40">
          <div className="relative bg-gray-600/40 p-5 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.7),0_0_20px_rgba(200,239,255,0.7)] transition-all duration-300 hover:shadow-[0_0_20px_rgb(171,249,236),0_0_30px_rgba(183,244,255,0.8)] hover:bg-black/80 w-[50rem]">
            <h2 className="text-4xl text-white mb-5">Our Mission and Vision</h2>
            <p className="text-lg text-white leading-relaxed">
              DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of Engineering, started in 2005. Our mission is to foster the all-round development of society, addressing socio-economic problems and sustainability crises caused by global warming. We aim to transform individuals into resilient and capable citizens, encouraging both technical advancements and societal contributions.
            </p>
            <br />
            <p className="text-lg text-white leading-relaxed">
              Our activities include regular meetings, organizing events, and forging lifelong connections among volunteers. We strive to connect with nature and rural areas, providing holistic development and opportunities for personal growth.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Principal's Desk Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col justify-center items-center h-screen bg-[#001725] p-5"
      >
        <div className="w-3/4 flex flex-col items-center gap-5">
          <h2 className="text-4xl text-white mt-16">From Principal's Desk</h2> {/* Increased margin-top */}
          <div className="flex items-center justify-between w-full h-auto bg-[#e8fffb] rounded-xl p-10 transition-shadow duration-300 shadow-[0_0_20px_rgba(105,222,255,0.7)] hover:shadow-[0_0_10px_rgba(255,255,255,0.6),0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.4)]">
            <div className="w-[200px] h-[200px] rounded-full shadow-[0_0_5px_rgba(255,255,255,0.6),0_0_15px_rgba(255,255,255,0.4)] flex justify-center items-center"> {/* Flexbox for centering image */}
              <img src="src/principal-image.jpg" alt="Dr. Hari Vasudevan" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="text-lg text-black leading-relaxed flex-1 pl-5 max-w-[70%] overflow-y-auto">
              <h2 className="text-2xl text-black mb-3 font-bold">Dr. Hari Vasudevan</h2>
              <p className="text-base mb-4">Principal, DJSCE</p>
              <p className="text-base mb-4 leading-relaxed">
                DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of Engineering commenced their journey in the year 2005 towards making each member of the unit a better citizen and therefore making India a better nation. It is a proud moment for all of us to witness the participation of students in various activities that are undertaken by NSS volunteers. We have been striving towards the social upliftment and well-being of society.
              </p>
              <p className="text-base mb-4 leading-relaxed">
                The NSS unit has been actively involved in numerous activities such as health camps, tree plantations, education programs for underprivileged children, and disaster management training. These activities have shaped the lives of our students, making them more socially aware and responsible citizens. I am proud of the progress that our students continue to make, and I look forward to seeing their efforts bring about a positive change in the world.
              </p>
              <p className="text-base mb-4 leading-relaxed">
                We have always believed in making a difference through action, and I am confident that the NSS unit will continue to grow and contribute to our nation's development in the years to come.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Program Officer's Desk Section - Vyankatesh Bagal */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col justify-center items-center h-screen bg-[#001725] p-5"
      >
        <div className="w-3/4 flex flex-col items-center gap-5">
          <h2 className="text-4xl text-white mt-16">From Program Officer's Desk</h2> {/* Increased margin-top */}
          <div className="flex items-center justify-between w-full h-auto bg-[#e8fffb] rounded-xl p-10 transition-shadow duration-300 shadow-[0_0_20px_rgba(105,222,255,0.7)] hover:shadow-[0_0_10px_rgba(255,255,255,0.6),0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.4)]">
            <div className="text-lg text-black leading-relaxed flex-1 pl-5 max-w-[70%] overflow-y-auto">
              <h2 className="text-2xl text-black mb-3 font-bold">Prof. Vyankatesh Bagal</h2>
              <p className="text-base mb-4">Program Officer, DJS NSS</p>
              <p className="text-base mb-4 leading-relaxed">
                Dear Students, As the Program Officer of the NSS unit at Dwarkadas J. Sanghvi College of Engineering, I am honored to address the profound ethos encapsulated in our motto: "Not Me But You." The activities of NSS are an excellent platform for students to develop their character and realize the importance of social service. Our aim is to inspire students to serve society selflessly and become change agents for a better world.
              </p>
              <p className="text-base mb-4 leading-relaxed">
                The volunteers of NSS play a crucial role in the implementation of various social programs and projects. From organizing blood donation camps to participating in awareness drives, our students consistently work towards the well-being of the society. The true spirit of volunteering lies in the desire to make a positive impact on the community, and it is truly heartening to see our students display this commitment.
              </p>
              <p className="text-base mb-4 leading-relaxed">
                As a Program Officer, my role is to guide and support these volunteers, ensuring they make the most of their experiences. Together, we will continue to strive for excellence in service and work towards a society that is just, equitable, and compassionate.
              </p>
            </div>
            <div className="w-[200px] h-[200px] rounded-full shadow-[0_0_5px_rgba(255,255,255,0.6),0_0_15px_rgba(255,255,255,0.4)] flex justify-center items-center"> {/* Flexbox for centering image */}
              <img src="src/program-officer-image.jpg" alt="Prof. Vyankatesh Bagal" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </div>
      </motion.section>
{/* Program Officer's Desk Section */}
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="flex flex-col justify-center items-center h-screen bg-[#001725] p-5"
>
  <div className="w-3/4 flex flex-col items-center gap-5">
    <h2 className="text-4xl text-white mt-16">From Program Officer's Desk</h2> {/* Increased margin-top */}
    <div className="flex items-center justify-between w-full h-auto bg-[#e8fffb] rounded-xl p-10 transition-shadow duration-300 shadow-[0_0_20px_rgba(105,222,255,0.7)] hover:shadow-[0_0_10px_rgba(255,255,255,0.6),0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.4)]">
      <div className="w-[200px] h-[200px] rounded-full shadow-[0_0_5px_rgba(255,255,255,0.6),0_0_15px_rgba(255,255,255,0.4)] flex justify-center items-center"> {/* Flexbox for centering image */}
        <img src="src/program-officer-image.jpg" alt="Prof. Alisha Banz" className="w-full h-full rounded-full object-cover" />
      </div>
      <div className="text-lg text-black leading-relaxed flex-1 pl-5 max-w-[70%] overflow-y-auto">
        <h2 className="text-2xl text-black mb-3 font-bold">Prof. Alisha Banz</h2>
        <p className="text-base mb-4">Program Officer, DJS NSS</p>
        <p className="text-base mb-4 leading-relaxed">
          It gives me immense pleasure to be a part of the National Service Scheme (NSS) wing of our institute. DJS NSS has been an integral part of our institution's commitment to community service and social responsibility. Over the years, our NSS volunteers have actively participated in various community development programs, environmental initiatives, and social welfare activities like the solar lights installation at Narpad and the Blood Donation drive in DJSCE.
        </p>
        <p className="text-base mb-4 leading-relaxed">
          Their dedication and enthusiasm have not only benefited the communities around us but have also enriched their own lives with valuable experiences and life lessons of living at a campsite with bare essentials and thriving. I encourage all students to actively engage with the NSS and contribute to making a positive difference in society.
        </p>
        <p className="text-base mb-4 leading-relaxed">
          I extend my heartfelt appreciation to all NSS volunteers, past and present, for their unwavering commitment to the service of others.
        </p>
      </div>
    </div>
  </div>
</motion.section>

      {/* Program Officer's Desk Section - Rahul Taware */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col justify-center items-center h-screen bg-[#001725] p-5"
      >
        <div className="w-3/4 flex flex-col items-center gap-5">
          <h2 className="text-4xl text-white mt-16">From Program Officer's Desk</h2> {/* Increased margin-top */}
          <div className="flex items-center justify-between w-full h-auto bg-[#e8fffb] rounded-xl p-10 transition-shadow duration-300 shadow-[0_0_20px_rgba(105,222,255,0.7)] hover:shadow-[0_0_10px_rgba(255,255,255,0.6),0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.4)]">
            <div className="text-lg text-black leading-relaxed flex-1 pl-5 max-w-[70%] overflow-y-auto">
              <h2 className="text-2xl text-black mb-3 font-bold">Prof. Rahul Taware</h2>
              <p className="text-base mb-4">Program Officer, DJS NSS</p>
              <p className="text-base mb-4 leading-relaxed">
                NSS is an extraordinary experience that allows students to contribute meaningfully to society while developing themselves as leaders. As the Program Officer for the NSS unit, it has been a privilege to guide young minds who are eager to make a difference.
              </p>
              <p className="text-base mb-4 leading-relaxed">
                Through our activities, such as environmental sustainability campaigns, education drives, and community outreach programs, students engage with social issues and work toward their resolution. We encourage participation in national and international events, fostering global citizenship among our volunteers.
              </p>
              <p className="text-base mb-4 leading-relaxed">
                It is truly fulfilling to witness the transformation in our volunteers as they embrace leadership roles and develop a strong sense of social responsibility. I look forward to their continued growth and contributions to society.
              </p>
            </div>
            <div className="w-[200px] h-[200px] rounded-full shadow-[0_0_5px_rgba(255,255,255,0.6),0_0_15px_rgba(255,255,255,0.4)] flex justify-center items-center"> {/* Flexbox for centering image */}
              <img src="src/program-officer-image2.jpg" alt="Prof. Rahul Taware" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Departments Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-10 p-10 bg-[#cbf6ff] text-center min-h-screen"
      >
        <h2 className="text-4xl text-black tracking-[6px] mb-8 mt-5">Our Departments</h2>
        <div className="grid grid-cols-3 gap-8 w-full max-w-[1200px]">
          {[
            { title: 'Creatives', description: 'Creatives are the imaginative minds behind NSS\'s visual identity. Whether it\'s designing posters or creating engaging social media content, their artistic contributions bring every project to life. Their efforts, like those of the other departments, are crucial in making sure NSS stands out in every aspect.' },
            { title: 'Technical', description: 'The Technical team manages the digital and tech needs of NSS along with coveted outhouses software and hardware projects to shine on your resume, ensuring that all platforms run efficiently. Whether it\'s handling the website or tech setups for events, their contribution is as critical as any other, enabling NSS to operate seamlessly.' },
            { title: 'Events', description: 'The Events team is responsible for planning and executing all NSS events, making sure everything runs smoothly. From logistics to coordination, they ensure that every initiative is impactful. Like the other departments, their work is fundamental in achieving NSS\'s goals.' },
            { title: 'Publicity', description: 'The Publicity team works to ensure that all NSS events and initiatives reach the maximum audience. Their efforts in promotion and outreach help NSS build a strong presence. As with every department, their role is integral to the committee\'s success.' },
            { title: 'Marketing', description: 'Manages outreach and branding.' },
            { title: 'Editorial', description: 'The Editorial team ensures that all written communication for NSS, from articles to reports, is clear, engaging, and well-crafted. They play a key role in shaping the public narrative of NSS and ensuring that every story is told effectively. Their work is as vital as any other, contributing significantly to the overall communication and reputation of the committee.' },
          ].map((dept, index) => (
            <div 
              key={index}
              className="group flex items-center justify-center flex-col bg-[rgb(231,254,255)] w-full rounded-t-[150px] p-5 
                shadow-[0_0_10px_rgba(0,0,0,0.2),_0_4px_15px_rgba(0,0,0,0.1)]
                hover:shadow-[0_6px_20px_rgba(0,0,0,0.3),_0_10px_30px_rgba(0,0,0,0.2)]
                transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center p-3">
                <h3 className="text-[22px] text-[#010000] tracking-[2px] uppercase font-bold mb-3">
                  {dept.title}
                </h3>
                <p className="text-sm text-black leading-relaxed">
                  {dept.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
      
 
    </div>
    );
  };
  
  export default AboutUs;
  