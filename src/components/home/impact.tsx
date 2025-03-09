import React from "react"
import { motion } from "framer-motion"
import StatCard from "./stat-card"

export default function Impact() {
  const stats = [
    {
      number: "50+",
      label: "Events Organized",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      number: "5000+",
      label: "Lives Impacted",
      bgColor: "bg-sky-50",
      textColor: "text-sky-600",
    },
    {
      number: "1000+",
      label: "Volunteer Hours",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      number: "200+",
      label: "Active Volunteers",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
  ]

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600">
            Through dedication and collective effort, we've achieved meaningful results that have positively affected
            thousands of lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              bgColor={stat.bgColor}
              textColor={stat.textColor}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">Sustainable Development Goals</h3>
              <p className="text-gray-600 mb-6">
                Our initiatives align with the UN's Sustainable Development Goals, focusing particularly on quality
                education, good health and well-being, and climate action.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

