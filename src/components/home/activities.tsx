"use client";

import { motion } from "framer-motion";
import ActivityCard from "./activity-card";
import { Heart, Leaf, BookOpen, HandHeart } from "lucide-react";
import GrainAThon from "../../assets/Events/grainathon/GrainAThon.png";
import NSSCamp from "../../assets/Events/NSSCamp.jpg";
import BDD from "../../assets/Events/bdd/BDD.jpg";
import StemCell from "../../assets/Events/TirangaRally/IMG_4530.jpg";
import ACD from "../../assets/Events/AnnualCharity.png";

export default function Activities() {
  const activities = [
    {
      image: GrainAThon,
      title: "Grain-A-Thon",
      description:
        "Collected and donated grains of more than 1000kgs for the underprivileged.",
      link: "/eventdetails/grain-a-thon",
      icon: BookOpen,
      iconColor: "text-yellow-500",
      direction: "left" as const,
    },
    {
      image: BDD,
      title: "Blood Donation Drive",
      description:
        "Successful collection of 650+ blood bags for the needy.",
      link: "/eventdetails/blood-donation-drive",
      icon: Heart,
      iconColor: "text-red-500",
      direction: "right" as const,
    },
    {
      image: NSSCamp,
      title: "NSS Camp",
      description:
        "A camp to remember for the volunteers to learn and grow.",
      link: "/eventdetails/nss-camp",
      icon: Leaf,
      iconColor: "text-green-500",
      direction: "left" as const,
    },
    {
      image: ACD,
      title: "Annual Charity Drive",
      description:
        "A drive to collect clothes, books, and toys for the underprivileged.",
      link: "/eventdetails/annual-charity-drive",
      icon: Leaf,
      iconColor: "text-green-500",
      direction: "left" as const,
    },
  ];

  return (
    <section
      id="activities"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Our Activities
          </h2>
          <p className="text-lg text-gray-600">
            Through a diverse range of activities, we strive to make a
            meaningful difference in our community while developing essential
            skills in our volunteers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              image={activity.image}
              title={activity.title}
              description={activity.description}
              link={activity.link}
              icon={activity.icon}
              iconColor={activity.iconColor}
              direction={activity.direction}
            />
          ))}
        </div>
      </div>
    </section>
  );
}