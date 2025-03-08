import React from 'react';
import { motion } from 'framer-motion';
import MotherTeresa from '../../assets/volunteer/motherteresa.jpg';
import AbdulKalam from '../../assets/volunteer/abdulkalam.jpg';
import Event1 from '../../assets/volunteer/events1.jpg';
import Event2 from '../../assets/volunteer/events2.jpg';
import Event3 from '../../assets/volunteer/events3.jpg';
import RuralArea from "../../assets/volunteer/rural.jpg";
import env from "../../assets/volunteer/env.jpg";
import govt from "../../assets/volunteer/govt.jpg";

const VolunteerFillerSection = () => {
  return (
    <div className="w-full">
      {/* Notable People Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-[#a2b9d8] p-6 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8">
            Notable Volunteers & Stories
          </h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 aspect-square bg-[#387fa8] overflow-hidden">
                <img
                  src={MotherTeresa}
                  alt="Mother Teresa"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold text-[#003366] mb-3">Mother Teresa&apos;s Legacy</h3>
                <p className="text-[#003b5c]">
                  Mother Teresa devoted her life to serving the poor and destitute around the world. Her selfless work through the Missionaries of Charity continues to inspire volunteers across the globe.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 aspect-square bg-[#387fa8] overflow-hidden">
                <img
                  src={AbdulKalam}
                  alt="APJ Abdul Kalam"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold text-[#003366] mb-3">Dr. APJ Abdul Kalam&apos;s Vision</h3>
                <p className="text-[#003b5c]">
                  Dr. APJ Abdul Kalam, the &apos;People&apos;s President,&apos; emphasized giving back to society through education and social service.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-[#003366] p-6 md:p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">NSS Alumni Success</h2>
          <div className="aspect-video bg-[#005a8e] overflow-hidden mb-6">
            <img
              src={Event3}
              alt="NSS Alumni"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-[#cce7ff] text-lg mb-6">
            National Service Scheme (NSS) alumni have achieved remarkable success, including K. Radhakrishnan, former ISRO chairman, who actively volunteered during his college days, instilling a lifelong spirit of service.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-[#005a8e] overflow-hidden">
              <img
                src={Event1}
                alt="Alumni Achievement 1"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="aspect-square bg-[#005a8e] overflow-hidden">
              <img
                src={Event2}
                alt="Alumni Achievement 2"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Three Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-[#cce7ff] p-6 md:p-12 hover:bg-[#a2b9d8] transition-colors duration-300"
        >
          <h3 className="text-2xl font-semibold text-[#003366] mb-6">Rural Development</h3>
          <div className="aspect-square bg-[#387fa8] overflow-hidden">
            <img
              src={RuralArea}
              alt="Rural Development"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-[#003b5c] mt-6">
            NSS brings you closer to nature and rural communities, offering a wholesome experience that promotes both environmental awareness and rural development. Through hands-on involvement in projects like tree plantations, village development, and clean energy initiatives, volunteers learn the importance of preserving natural resources.
          </p>
          <p className="text-[#003b5c] mt-6">
            Volunteering in rural areas exposes you to different cultures, traditions, and the beauty of simplicity, fostering personal growth and a deeper understanding of India’s diversity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#003366] p-6 md:p-12 hover:bg-[#005a8e] transition-colors duration-300"
        >
          <h3 className="text-2xl font-semibold mb-6 text-white">Environmental Impact</h3>
          <div className="aspect-square bg-[#005a8e] overflow-hidden">
            <img
              src={env}
              alt="Environmental Projects"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-[#cce7ff] mt-6">
            Participate in tree plantations, clean energy initiatives, and environmental awareness campaigns. NSS volunteers contribute to a greener future by organizing eco-friendly events, promoting sustainable practices, and educating communities on the importance of environmental conservation. By engaging in environmental projects, you can make a tangible impact on the planet and inspire others to adopt eco-friendly habits.
            <br />
            <br />
            <span className="font-semibold">Join NSS to protect the environment and create a sustainable future for all!</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#a2b9d8] p-6 md:p-12 hover:bg-[#cce7ff] transition-colors duration-300"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-[#003366] mb-6">Government Initiatives</h3>
          <div className="aspect-square bg-[#387fa8] overflow-hidden">
            <img src={govt} alt="Government Schemes" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          </div>
          <ul className="space-y-4 text-[#003b5c] mt-6">
            <li className="border-b border-[#387fa8] pb-3">
              <span className="text-[#005a8e] font-semibold">National Service Scheme (NSS)</span>
              <div className="font-medium">A nationwide youth program encouraging students to engage in community service and social welfare activities.</div>
            </li>
            <li className="border-b border-[#387fa8] pb-3">
              <span className="text-[#005a8e] font-semibold">Swachh Bharat Abhiyan</span>
              <div className="font-medium">A national campaign promoting volunteer-driven cleanliness drives across India.</div>
            </li>
            <li className="border-b border-[#387fa8] pb-3">
              <span className="text-[#005a8e] font-semibold">Atal Innovation Mission (AIM)</span>
              <div className="font-medium">Encourages youth to volunteer in developing innovative solutions for social challenges.</div>
            </li>
            <li>
              <span className="text-[#005a8e] font-semibold">Pradhan Mantri Kaushal Vikas Yojana (PMKVY)</span>
              <div className="font-medium">Volunteers join skill development programs aimed at empowering disadvantaged communities with vocational training.</div>
            </li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
};

export default VolunteerFillerSection;