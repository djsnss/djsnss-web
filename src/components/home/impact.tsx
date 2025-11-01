import React from "react";
import { motion } from "framer-motion";
import StatCard from "./stat-card";

export default function Impact() {
  const stats = [
    {
      number: 50,
      label: "Events Organized",
    },
    {
      number: 5000,
      label: "Lives Impacted",
    },
    {
      number: 1000,
      label: "Volunteer Hours",
    },
    {
      number: 200,
      label: "Active Volunteers",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-geist font-bold mb-4 text-tertiary-blue">
            Our Impact
          </h2>

          {/* Paragraph */}
          <p className="text-lg text-gray-600 font-roboto">
            Through dedication and collective effort, we've achieved meaningful
            results that have positively affected thousands of lives.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              bgColor="bg-tertiary-blue"
              textColor="text-white"
              labelColor="text-white"
              delay={index * 0.1}
              labelFont="font-lateef"
              numberFont="font-geist"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
