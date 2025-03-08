  import { useState } from 'react';
  import { motion } from 'framer-motion';
  import CardNew from './CardNew';
  import Modal from './Modal';
  

  const DistinguishedAlumni = () => {
    const [selectedAlumnus, setSelectedAlumnus] = useState(null);

    const alumni = [
      {
        name: 'Hetankshi Vora',
        position: '',
        image: '../assets/alumini/Hetankshi Vora.jpg',
        details: 'I am a Electronics & Telecommunication Engineer from the batch of 2023 with strong time management and leadership skills. Serving as a Volunteer & Secretary at DJNSS was one of the best experiences of my journey, allowing me to contribute to impactful initiatives that fostered social awareness and well-being. From organizing blood donation drive, voter registration campaigns, bringing joy to children during orphanage visits, leading road safety and COVID awareness campaigns to ensure public safety. \nAll of this was made possible with the unwavering support of my NSS committee, Principal Sir, Rahul Taware Sir, and Vyankatesh Bagal Sir whose guidance and encouragement played a vital role in driving these initiatives forward. My time in NSS has deeply shaped my commitment to community service and social responsibility.'
      },
      {
        name: 'Shailee Gala',
        position: 'MBA student at SIBM Pune',
        image: '../src/assets/alumini/Shailee Gala.jpg',
        details: 'Review: \nMy experience at NSS Unit of DJ Sanghvi is a blend of service, learning and personal growth. The feeling of giving back to the society is something that I will always carry with me for the rest of my life. The work at NSS pushed me out of my comfort zone, and it was the most rewarding part of my life at DJ Sanghvi. \n\nResume: \nCurrently an MBA student at SIBM Pune.Have 2 years of work experience at Samsung Electronics India Limited.Graduated as EXTC Engineer (B.E.) and was Jt. secretary at NSS Unit 2020-21'
      },
      {
        name: 'Rajas Joshi',
        position: 'Senior Analyst at Sergiwa Capital',
        image: '../src/assets/alumini/Rajas Joshi.jpg',
        details: 'Reviews - \nManaged various teams and defined actionable roadmaps for publicity & technical teams, further, coordinated meetings with team members for weekly updates on progress of implementing planned initiatives. \n Work Experience - \nWorked as a Senior Analyst at SERGIWA CAPITAL \nWorked as an analyst at TRESVISTA FINANCIAL SERVICES'
      },
      {
        name: 'Riya Kothari',
        position: 'Professor & HOD Of Chemistry',
        image: '../src/assets/alumini/Riya Kothari.jpg',
        details: 'Review – My NSS Journey \nBeing a part of NSS was one of the most enriching experiences of my college life. Serving as the Creative Head allowed me to explore my creativity while making a meaningful social impact. The journey from organizing large-scale events to working at the grassroots level helped me develop valuable skills in management, leadership, public engagement, and problem-solving. \nOne of the most memorable milestones was leading a record-breaking blood donation drive, where we collected nearly 800 bottles, setting a benchmark for future initiatives. The 7-day rural development camp gave me a deep sense of responsibility and the opportunity to understand and address real-life challenges faced by underprivileged communities. \nBeyond the activities, NSS has played a crucial role in my holistic development—enhancing my communication skills, teamwork, empathy, and decision-making abilities. It has shaped me into a more socially responsible individual, and I carry these lessons with me in every aspect of life. \nI am truly grateful for this journey and for the lifelong memories and values it has given me. \nWork Experience - \n 1. Currently working as a Professor & HOD Of Chemistry for an leading education institute in Mumbai, coaching kids from 8 th to 12 th grade  \n2. Co Founder Of Sarthak - An organisation for Holistic Development of students  \n3. Academic Counselor at Private Institutes in Mumbai.'
      },
      {
        name: 'Rohin Mathew',
        position: 'Product Manager at Kotak Mahindra Bank',
        image: '../src/assets/alumini/Rohin.jpg',
        details: 'Chair person DJ NSS, 2019 \n\nQualification - \n1) MBA - Xavier Institute of Management, Bhubaneswar, Batch of 2023 \n2) Mechanical Engineering D.J Sanghvi, Batch of 2020 \n\nViews - \n NSS has always been very close to my heart. Being from D.J Sanghvi, we as a team always wanted to bring a substantial change in our service to society with our long term projects, technical projects etc and were successful in doing so. The way NSS grooms you as a person and the bonds that it helps you create is just an amazing experience.'
      }
    ];

    return (
      <div className="bg-white my-7">
        <div className="text-center mb-8">
          <h2 className="text-dark-navy text-xl md:text-2xl lg:text-4xl underline font-bold tracking-wide">
            Distinguished Alumni
          </h2>
          <p className="text-light-gray mt-2 text-lg">
            Meet some of our accomplished alumni who are making a difference in their fields.
          </p>
          <a href="/alumni" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">View More Alumni</a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex flex-row flex-wrap justify-center items-center gap-10 p-6"
        >
          {alumni.map((alumnus, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <CardNew img={alumnus.image} name={alumnus.name} position={alumnus.position} />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white text-center px-2"
                >
                  {alumnus.position}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setSelectedAlumnus(alumnus)}
                >
                  View More
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {selectedAlumnus && (
        <Modal onClose={() => setSelectedAlumnus(null)}>
          <h2 className="text-xl font-bold">{selectedAlumnus.name}</h2>
          <p className="text-gray-700">{selectedAlumnus.position}</p>
          <div className="mt-4" style={{ whiteSpace: 'pre-line' }}>
            <p>{selectedAlumnus.details}</p>
          </div>
        </Modal>
      )}
      </div>
    );
  };

  export default DistinguishedAlumni;