import React from "react"
import { motion } from "framer-motion"
import EventCard from "./event-card"
import { ArrowRight, Heart, Leaf, BookOpen } from "lucide-react"

export default function Events() {
  const events = [
    {
      title: "Blood Donation Drive",
      date: "March 15, 2025",
      location: "College Campus",
      icon: Heart,
      iconColor: "text-red-500",
    },
    {
      title: "Tree Plantation Drive",
      date: "April 5, 2025",
      location: "City Park",
      icon: Leaf,
      iconColor: "text-green-500",
    },
    {
      title: "Education Workshop",
      date: "April 20, 2025",
      location: "Community Center",
      icon: BookOpen,
      iconColor: "text-blue-500",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600">
            Join us for these upcoming activities and be part of creating positive change in our community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              location={event.location}
              icon={event.icon}
              iconColor={event.iconColor}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
            View All Events <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

