import React from "react"
import { motion } from "framer-motion"
import TeamCard from "./team-card"

export default function Team() {
  

  return (
    <section id="team" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Our Team
          </h2>
          <p className="text-lg text-gray-600">
            Meet the dedicated individuals who lead our initiatives and inspire positive change in the community.
          </p>
        </motion.div>

 

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
         <a href="/team">
          <button className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full">
            View All Team Members
          </button>
         </a>
        </motion.div>
      </div>
    </section>
  )
}

