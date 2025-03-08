import React from "react"
import { BookOpen, HandHeart, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import FeatureCard from "./feature-card"

export default function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Education",
      description:
        "Promoting literacy and educational initiatives in underserved communities to empower through knowledge.",
    },
    {
      icon: HandHeart,
      title: "Community Service",
      description:
        "Engaging in meaningful service activities that address real community needs and create lasting impact.",
    },
    {
      icon: Trophy,
      title: "Leadership",
      description: "Developing student leaders who can drive positive change in their communities and beyond.",
    },
  ]

  return (
    <section id="about" className="bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600">
            The National Service Scheme (NSS) at DJ Sanghvi College of Engineering is dedicated to developing the
            personality of students through community service, fostering social responsibility, and creating a positive
            impact on society.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

