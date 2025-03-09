"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, type LucideIcon } from "lucide-react";

interface ActivityCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  iconColor: string;
  direction: "left" | "right";
}

export default function ActivityCard({
  image,
  title,
  description,
  link,
  icon: Icon,
  iconColor,
  direction,
}: ActivityCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
      initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Icon className={`h-5 w-5 ${iconColor} mr-2`} />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <a
          href={link}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
        >
          Learn more{" "}
          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}