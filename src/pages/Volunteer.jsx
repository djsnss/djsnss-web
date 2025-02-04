import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Image1 from "../assets/Events/TreePlantation.png";
import VolunteerFillerSection from "../pages/volunteer/FillerSection";

const Volunteer = () => {
  return (
    <div className="bg-gradient-to-bl  from-blue-300 to-gray-300">
      <div className="p-6 mx-auto max-w-7xl text-white flex flex-col justify-center">
        <div className="mt-10 ">
          <div className="text-center min-h-svh flex flex-col">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Volunteer with Us
            </h1>
            <div className="flex flex-col justify-around items-center">
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-800">
                Join our dedicated team of volunteers and be a driving force for
                meaningful transformation. By offering your time, skills, and
                unwavering passion, you can make a profound impact on our
                community, inspire positive change, and help build a legacy of
                compassion and progress that will echo through generations.
                Together, we can forge a brighter future and create lasting
                differences that uplift and empower those around us.
              </p>
              <img
                src={Image1}
                alt="Tree Plantation"
                className="max-h-96 rounded-lg shadow-lg mb-8"
              />
            </div>
          </div>

          {/* Volunteer Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white p-8 rounded-lg shadow-lg mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-green-800 mb-6 text-center">
              Volunteer Benefits
            </h2>
            <p className="text-md sm:text-lg lg:text-xl text-gray-600 mb-4 text-center">
              Discover the numerous benefits of volunteering with us, from
              personal growth to professional development and community
              engagement. Make a difference while gaining valuable skills and
              experiences. Join us today and be a part of something bigger than
              yourself.
            </p>
            <ul className="list-disc text-gray-600 ml-0 md:ml-20">
              <li>Develop leadership and teamwork skills</li>
              <li>Gain hands-on experience in various fields</li>
              <li>Enhance your resume and career prospects</li>
              <li>Build a network of like-minded individuals</li>
              <li>Receive certificates and awards for your contributions</li>
            </ul>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                Why Volunteer?
              </h2>
              <p className="text-gray-600 mb-4">
                Volunteering provides an opportunity to enhance your skills,
                build networks, and give back to the community. Make a tangible
                difference and grow personally and professionally.
              </p>
              <ul className="list-disc ml-5 text-gray-600">
                <li>Enhance personal and professional skills</li>
                <li>Build meaningful connections</li>
                <li>Gain valuable experience</li>
                <li>Receive recognition for your efforts</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                How to Get Involved
              </h2>
              <p className="text-gray-600 mb-4">
                Explore ways to contribute, from signing up for programs to
                participating in community events and special projects tailored
                to your interests and skills.
              </p>
              <ul className="list-disc ml-5 text-gray-600">
                <li>Sign up for volunteer programs</li>
                <li>Participate in community outreach</li>
                <li>Join special projects and initiatives</li>
                <li>Attend orientation and training sessions</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                Upcoming Events
              </h2>
              <p className="text-gray-600 mb-4">
                Join our upcoming events and make an impact. Participate in
                clean-ups, charity runs, food drives, and more!
              </p>
              <ul className="list-disc ml-5 text-gray-600">
                <li>Community Clean-Up Day - Oct 15, 2024</li>
                <li>Annual Charity Run - Nov 10, 2024</li>
                <li>Food Drive - Dec 5, 2024</li>
                <li>Winter Festival Volunteering - Dec 20, 2024</li>
              </ul>
            </motion.div>
          </div>

          {/* Informational Section 1: Why Volunteer? */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white p-8 rounded-lg shadow-lg mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 mb-6 text-center">
              NSS Events & Activities
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              NSS frequently organizes events such as rural development
              projects, cleanliness drives, health awareness programs, and
              environmental conservation campaigns. These events are perfect
              opportunities for volunteers to give back to society while
              learning new skills.
            </p>
            <p className="text-gray-600 text-lg">
              From regular meetups to special camps, NSS events bring together
              people from diverse backgrounds with a common goal of community
              service. Volunteers often form lasting bonds, build teamwork, and
              foster lifelong friendships.
            </p>
          </motion.div>

          <div>
            {/* Build Lifelong Friendships */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg shadow-md mb-12"
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                Build Lifelong Friendships
              </h3>
              <p className="text-gray-600">
                The NSS experience fosters deep friendships and connections with
                like-minded individuals. By working together on projects,
                volunteers not only grow as individuals but also form a network
                of lifelong companions.
              </p>
              <p className="text-gray-600">
                Frequent meetups, discussions, and group activities create an
                environment where volunteers share their passion for social
                service while developing strong relationships that last a
                lifetime.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center my-12"
            >
              <Link
                to="/volunteer-policy"
                className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out text-lg mt-12"
              >
                View Volunteer Policy
              </Link>
            </motion.div>
          </div>

          {/* Informational Section 2: Connecting with Nature & Rural India */}
          <VolunteerFillerSection />
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
