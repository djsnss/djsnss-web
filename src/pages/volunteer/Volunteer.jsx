import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Image1 from "../../assets/Events/TreePlantation.png";
import VolunteerFillerSection from "./FillerSection";
import '../../styles/volunteer.css';

const Volunteer = () => {
  return (
    <div className="min-h-screen bg-[#cce7ff]">
      {/* Hero Section */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block bg-[#003366] h-full" />
          <div className="relative h-full">
            <img src={Image1} alt="Tree Plantation" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#003b5c]/70 md:bg-[#003b5c]/40" />
          </div>
        </div>
        <div className="relative z-10 h-full">
          <div className="w-full px-4 md:px-12 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:max-w-2xl"
            >
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-8 leading-tight">
                Volunteer with Us
              </h1>
              <p className="text-lg md:text-2xl text-[#cce7ff] leading-relaxed">
                Join our dedicated team of volunteers and be a driving force for meaningful transformation. Together, we can forge a brighter future.
              </p>
              <div className="flex flex-col sm:flex-row mt-4">
                <Link
                  to="/volunteer/volunteer-registration"
                  className="no-underline inline-block px-3 rounded-lg md:px-4 py-1 md:py-2 mr-4 bg-[#cce7ff] text-[#003b5c] text-base md:text-lg font-semibold transition duration-300 mb-4 w-max vol-button"
                >
                  Register to be a Volunteer
                </Link>
                <Link
                  to="/volunteer/volunteer-login"
                  className="no-underline inline-block px-3 rounded-lg md:px-6 py-1 md:py-2 bg-[#cce7ff] text-[#003b5c] text-base md:text-lg font-semibold transition duration-300 mb-4 w-max vol-button"
                >
                  Login
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {/* Impact and Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-1 md:col-span-8 bg-[#cce7ff] p-6 md:p-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#003366] mb-6 md:mb-8">Make an Impact</h2>
            <p className="text-lg md:text-xl text-[#003b5c] mb-6 md:mb-8 leading-relaxed">
              By offering your time, skills, and unwavering passion, you can make a profound impact on our community and inspire positive change.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-square bg-[#387fa8] overflow-hidden">
                <img src={"../src/assets/volunteer/impact.jpg"} alt="Volunteer Activity" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="aspect-square bg-[#387fa8] overflow-hidden">
                <img src={"../src/assets/volunteer/impact2.jpg"} alt="Community Impact" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
            </div>
          </motion.div>
          <div className="col-span-1 md:col-span-4 bg-[#005a8e] p-6 md:p-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">Volunteer Benefits</h3>
            <ul className="space-y-4 text-base md:text-lg text-[#cce7ff]">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Develop leadership and teamwork skills</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Gain hands-on experience in various fields</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Enhance your resume and career prospects</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Build a network of like-minded individuals</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Receive certificates and awards for your contributions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Full-Width Image Section */}
        <div className="relative h-64 md:h-96 w-full">
          <img src={"../src/assets/volunteer/yarana1.jpg"} alt="Volunteer Impact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#003366]/60" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="text-2xl md:text-4xl font-bold text-white text-center max-w-4xl">
              Make a difference while gaining valuable skills and experiences
            </p>
          </div>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-[#a2b9d8] p-6 md:p-12 hover:bg-[#cce7ff] transition-colors duration-300"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#003366] mb-6">Why Volunteer?</h3>
            <div className="aspect-square bg-[#387fa8] overflow-hidden">
              <img src={"../src/assets/aboutus.jpg"} alt="Why Volunteer" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
            <p className="text-[#003b5c] my-6">
              Volunteering provides an opportunity to enhance your skills, build networks, and give back to the community. Make a tangible difference and grow personally and professionally.
            </p>
            <ul className="list-disc ml-5 text-[#003b5c] space-y-3">
              <li>Enhance personal and professional skills</li>
              <li>Build meaningful connections</li>
              <li>Gain valuable experience</li>
              <li>Receive recognition for your efforts</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#003366] p-6 md:p-12 hover:bg-[#005a8e] transition-colors duration-300"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white">How to Get Involved</h3>
            <div className="aspect-square bg-[#003b5c] overflow-hidden">
              <img src={"../../src/assets/Events/CyberSavvy.png"} alt="Get Involved" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
            <p className="text-[#cce7ff] my-6">
              Explore ways to contribute, from signing up for programs to participating in community events and special projects tailored to your interests and skills.
            </p>
            <ul className="list-disc ml-5 text-[#cce7ff] space-y-3">
              <li>Sign up for volunteer programs</li>
              <li>Participate in community outreach</li>
              <li>Join special projects and initiatives</li>
              <li>Attend orientation and training sessions</li>

            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#a2b9d8] p-6 md:p-12 hover:bg-[#cce7ff] transition-colors duration-300"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#003366] mb-6">Upcoming Events</h3>
            <div className="aspect-square bg-[#387fa8] overflow-hidden">
              <img src={"../src/assets/volunteer/upcoming.png"} alt="Upcoming Events" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
            <ul className="space-y-4 text-[#003b5c] mt-6">
              <li className="border-b border-[#387fa8] pb-3">
                <span className="text-[#005a8e] font-semibold">Oct 15, 2024</span>
                <div className="font-medium">Community Clean-Up Day</div>
              </li>
              <li className="border-b border-[#387fa8] pb-3">
                <span className="text-[#005a8e] font-semibold">Nov 10, 2024</span>
                <div className="font-medium">Annual Charity Run</div>
              </li>
              <li>
                <span className="text-[#005a8e] font-semibold">Dec 5, 2024</span>
                <div className="font-medium">Food Drive</div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* NSS Events Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="col-span-1 md:col-span-7 bg-[#387fa8] p-6 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">NSS Events & Activities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="aspect-square bg-[#003b5c] overflow-hidden col-span-2 md:col-span-2 row-span-2">
                <img
                  src={"../src/assets/volunteer/events2.jpg"}
                  alt="NSS Activity Main"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="aspect-square bg-[#003b5c] overflow-hidden">
                <img
                  src={"../src/assets/volunteer/events1.jpg"}
                  alt="NSS Activity 2"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="aspect-square bg-[#003b5c] overflow-hidden">
                <img
                  src={"../src/assets/volunteer/events3.jpg"}
                  alt="NSS Activity 3"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <p className="text-[#cce7ff] text-base md:text-lg mb-8">
              NSS frequently organizes events such as rural development projects, cleanliness drives, health awareness programs, and environmental conservation campaigns. These events are perfect opportunities for volunteers to give back to society while learning new skills.
            </p>
            <p className="text-[#cce7ff] text-base md:text-lg mb-8">
              From regular meetups to special camps, NSS events bring together people from diverse backgrounds with a common goal of community service. Volunteers often form lasting bonds, build teamwork, and foster lifelong friendships.
            </p>
            <Link
              to="/volunteer/volunteer-policy"
              className="no-underline inline-block px-3 md:px-6 py-1 md:py-2 bg-[#cce7ff] text-[#003b5c] text-base md:text-lg font-semibold transition duration-300 mb-4 w-max vol-button"
            >
              View Volunteer Policy
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="col-span-1 md:col-span-5 bg-[#cce7ff] p-6 md:p-12"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-[#003366]">Build Lifelong Friendships</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="aspect-square bg-[#387fa8] overflow-hidden">
                <img
                  src={"../src/assets/volunteer/lf1.jpg"}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="aspect-square bg-[#387fa8] overflow-hidden">
                <img
                  src={"../src/assets/volunteer/lf2.jpg"}
                  alt="Friendships 2"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <p className="text-[#003b5c] text-base md:text-lg">
              The NSS experience fosters deep friendships and connections with like-minded individuals. By working together on projects, volunteers not only grow as individuals but also form a network of lifelong companions.
            </p>
            <br></br>
            <br></br>
            <p className="text-[#003b5c] text-base md:text-lg">
              Frequent meetups, discussions, and group activities create an environment where volunteers share their passion for social service while developing strong relationships that last a lifetime.
            </p>
          </motion.div>
        </div>


        {/* Additional Section */}
        <VolunteerFillerSection />
      </div>
    </div>
  );
};

export default Volunteer;