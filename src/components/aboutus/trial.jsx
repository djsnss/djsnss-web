import React from 'react';
import { motion } from 'framer-motion';
import './trial.css'; 
const AboutUs = () => {
  return (
    <div className="app-container">
      {/* About Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="about-us-section"
              >
        <h1>ABOUT US</h1>
        <div className="about-us-content">
          <div className="about-us-text">
            <h2>Our Mission and Vision</h2>
            <p>
              DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of Engineering, started in 2005. Our mission is to foster the all-round development of society, addressing socio-economic problems and sustainability crises caused by global warming. We aim to transform individuals into resilient and capable citizens, encouraging both technical advancements and societal contributions.
            </p>
            <br />
            <p>
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
        className="desk-section"
      >
        <div className="desk-content">
          <h2>From Principal's Desk</h2>
          <div className="desk-box">
            <div className="desk-image">
              <img src="src/principal-image.jpg" alt="Dr. Hari Vasudevan" />
            </div>
            <div className="desk-text">
              <h2>Dr. Hari Vasudevan</h2>
              <p>Principal, DJSCE</p>
              <p>
                DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of Engineering commenced their journey in the year 2005 towards making each member of the unit a better citizen and therefore making India a better nation. The unit works for the all-round development of society, wherein they try to solve various issues ranging from socio-economic problems to the sustainability crisis caused by global warming that ails Mother Nature.
              </p>
              <p>
                We, at D.J. Sanghvi College of Engineering, believe that for every individual to be strong enough to face the challenges of today's world, they have to see and experience for themselves the problems and predicaments faced by society and work towards its betterment one step at a time. At DJS NSS, we nurture and encourage this process of self-transformation, which will help the students become resilient and unfaltering in the face of life, ultimately transforming them from the "Arjuna Syndrome" to being successful individuals.
              </p>
              <p>
                It also inspires the team's journey towards becoming a strong unit, contributing to the progress and development of our nation. Social growth aside, DJS NSS also encourages the students to bring about various technical advancements, wherever necessary and possible. We encourage the unit to mesh technology with the daily lives of the needy, thereby inculcating in them a sense of oneness with society as a whole.
              </p>
              <p>
                In all our efforts, we seek the Lord's Grace to keep us on the path of virtue, courage, and wisdom. May thy grace and blessings flow through us to the world around us in all our efforts to make better people, in addition to being quality engineers who can make a positive impact in our society and help build our nation in these ever-changing and challenging times. Warm regards and good wishes!
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Program Officer's Desk Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="desk-section"
      >
        <div className="desk-content">
          <h2>From Program Officer's Desk</h2>
          <div className="desk-box">
            
            <div className="desk-text">
              <h2>Prof. Vyankatesh Bagal</h2>
              <p>Program Officer, DJS NSS</p>
              <p>
                Dear Students, As the Program Officer of the NSS unit at Dwarkadas J. Sanghvi College of Engineering, I am honored to address the profound ethos encapsulated in our motto: "Not Me But You." This simple yet powerful statement resonates deeply with the values of democratic living and selfless service that we hold dear. The essence of "Not Me But You" extends far beyond individual actions; it embodies a collective commitment to the betterment of society as a whole.
              </p>
              <p>
                Through NSS, we aim to cultivate in our students a profound appreciation for diverse perspectives and a genuine concern for the well-being of others, including all living beings. Our philosophy, deeply rooted in this motto, emphasizes the interconnectedness of individual welfare with the welfare of the broader community. It serves as a guiding principle, reminding us that our actions should always be driven by a desire to contribute positively to society.
              </p>
              <p>
                As NSS volunteers, it is our responsibility to translate this ethos into action, to strive tirelessly for the welfare of our society. Let us continue to uphold the spirit of "Not Me But You" in all that we do, making meaningful contributions to our community and fostering a culture of empathy, inclusivity, and service.
              </p>
              <p>
                Together, let us embark on this journey of selfless dedication, knowing that by prioritizing the needs of others, we ultimately enrich our own lives and the world around us. With warm regards,
              </p>
            </div>
            <div className="desk-image">
              <img src="src/program-officer-image.jpg" alt="Prof. Vyankatesh Bagal" />
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="desk-section"
>
  <div className="desk-content">
    <h2>From Program Officer's Desk</h2>
    <div className="desk-box">
      <div className="desk-image">
        <img src="src/program-officer-image.jpg" alt="Prof. Rahul Taware" />
      </div>
      <div className="desk-text">
        <h2>Prof. Rahul Taware</h2>
        <p>Program Officer, DJS NSS</p>
        <p>
          At DJS NSS, we believe in the power of collective action to bring about positive change in our society. Through a variety of events and initiatives, such as Blood Donation Drives, Grain Distribution programs, Voter Registration Drives, and our NSS Regular Camp at Narpad Dahanu, we strive to make a meaningful impact on the lives of those around us. Our commitment to service extends beyond the confines of our campus, as we actively seek opportunities to engage with and support communities in need. Whether it's providing essential resources to those facing food insecurity, advocating for civic participation through voter registration, or contributing to the critical need for blood donations, each initiative is driven by our shared values of empathy, compassion, and service.
        </p>
        <p>
          As Program Officer, I am proud to work alongside our dedicated team of volunteers, who embody the spirit of selfless service and demonstrate a deep commitment to making a positive difference in the world. Together, we will continue to uphold the values of NSS and strive to create a more just, equitable, and compassionate society for all. With warm regards,
        </p>
      </div>
    </div>
  </div>
</motion.section>
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="desk-section"
>
  <div className="desk-content">
    <h2>From Program Officer's Desk</h2>
    <div className="desk-box">
     
      <div className="desk-text">
        <h2>Prof. Alisha Banz</h2>
        <p>Program Officer, DJS NSS</p>
        <p>
          It gives me immense pleasure to be a part of the National Service Scheme (NSS) wing of our institute. DJS NSS has been an integral part of our institution's commitment to community service and social responsibility. Over the years, our NSS volunteers have actively participated in various community development programs, environmental initiatives, and social welfare activities like the solar lights installation at Narpad and the Blood Donation drive in DJSCE. Their dedication and enthusiasm have not only benefited the communities around us but have also enriched their own lives with valuable experiences and life lessons of living at a campsite with bare essentials and thriving.
        </p>
        <p>
          I encourage all students to actively engage with the NSS and contribute to making a positive difference in society. I extend my heartfelt appreciation to all NSS volunteers, past and present, for their unwavering commitment to the service of others.
        </p>
      </div>
      <div className="desk-image">
        <img src="src/program-officer-image.jpg" alt="Prof. Alisha Banz" />
      </div>
    </div>
  </div>
</motion.section>


      {/* Our Departments Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="departments-section"
      >
        <h2>Our Departments</h2>
        <div className="departments-grid">
          {[
            { title: 'Creatives', description: 'Creatives are the imaginative minds behind NSS\'s visual identity. Whether it\'s designing posters or creating engaging social media content, their artistic contributions bring every project to life. Their efforts, like those of the other departments, are crucial in making sure NSS stands out in every aspect.' },
            { title: 'Technical', description: 'The Technical team manages the digital and tech needs of NSS along with coveted outhouses software and hardware projects to shine on your resume, ensuring that all platforms run efficiently. Whether it\'s handling the website or tech setups for events, their contribution is as critical as any other, enabling NSS to operate seamlessly.' },
            { title: 'Events', description: 'The Events team is responsible for planning and executing all NSS events, making sure everything runs smoothly. From logistics to coordination, they ensure that every initiative is impactful. Like the other departments, their work is fundamental in achieving NSS\'s goals.' },
            { title: 'Publicity', description: 'The Publicity team works to ensure that all NSS events and initiatives reach the maximum audience. Their efforts in promotion and outreach help NSS build a strong presence. As with every department, their role is integral to the committee\'s success.' },
            { title: 'Marketing', description: 'Manages outreach and branding.' },
            { title: 'Editorial', description: 'The Editorial team ensures that all written communication for NSS, from articles to reports, is clear, engaging, and well-crafted. They play a key role in shaping the public narrative of NSS and ensuring that every story is told effectively. Their work is as vital as any other, contributing significantly to the overall communication and reputation of the committee.' },
          ].map((dept, index) => (
            <div className="department-card" key={index}>
              <div className="department-content">
                <h3>{dept.title}</h3>
                <p>{dept.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

 
    </div>
  );
};

export default AboutUs;
