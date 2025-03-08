"use client"

import { motion } from "framer-motion"
import ActivityCard from "./activity-card"
import { Heart, Leaf, BookOpen, HandHeart } from "lucide-react"

export default function Activities() {
  const activities = [
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Blood Donation Camps",
      description:
        "Regular blood donation drives organized in collaboration with hospitals and blood banks to address the critical need for blood supplies.",
      icon: Heart,
      iconColor: "text-red-500",
      direction: "left" as const,
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Tree Plantation Drives",
      description:
        "Environmental conservation initiatives focused on increasing green cover and raising awareness about ecological sustainability.",
      icon: Leaf,
      iconColor: "text-green-500",
      direction: "right" as const,
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Education Outreach",
      description:
        "Teaching and mentoring programs for underprivileged children, focusing on STEM education and digital literacy.",
      icon: BookOpen,
      iconColor: "text-blue-500",
      direction: "left" as const,
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Health Awareness Camps",
      description:
        "Health check-ups and awareness sessions in rural and urban communities to promote preventive healthcare and wellness.",
      icon: HandHeart,
      iconColor: "text-purple-500",
      direction: "right" as const,
    },
  ]

  return (
    <section id="activities" className="py-20 bg-gradient-to-b from-white to-blue-50">
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
            Through a diverse range of activities, we strive to make a meaningful difference in our community while
            developing essential skills in our volunteers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              image={activity.image}
              title={activity.title}
              description={activity.description}
              icon={activity.icon}
              iconColor={activity.iconColor}
              direction={activity.direction}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

