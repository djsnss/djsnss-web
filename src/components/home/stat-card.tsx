import React from "react"
import { motion } from "framer-motion"

interface StatCardProps {
  number: string
  label: string
  bgColor: string
  textColor: string
  delay?: number
}

export default function StatCard({ number, label, bgColor, textColor, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      className={`${bgColor} rounded-xl p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className={`text-4xl md:text-5xl font-bold ${textColor} mb-2`}>{number}</h3>
      <p className="text-gray-700">{label}</p>
    </motion.div>
  )
}

