"use client"

import { motion } from "framer-motion"
import ActivityCard from "./activity-card"
import { common } from "../../data/common.js"

export default function Activities() {
  return (
    <section id="activities" className="py-20 bg-white-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-geist mb-4 text-tertiary-blue">
            Our Activities
          </h2>
          <p className="text-lg text-gray-600 font-roboto">
            Through a diverse range of activities, we strive to make a
            meaningful difference in our community while developing essential
            skills in our volunteers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {common
            .filter((activity) => [1, 2, 3, 5].includes(activity.id))
            .map((activity, index) => (
              <ActivityCard
                key={index}
                imageURL={activity.imageURL ?? ""}
                title={activity.title ?? ""}
                description={activity.description ?? ""}
                link={activity.link ?? ""}
                icon={activity.icon ?? ""}
                color={activity.color ?? ""}
                direction={activity.direction ?? ""}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
