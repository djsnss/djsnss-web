"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ActivityCardProps {
  imageURL: string;
  title: string;
  description: string;
  link: string;
  icon?: React.ComponentType<any> | string | null | undefined;
  color?: string;
  direction?: "left" | "right" | string;
}

export default function ActivityCard({
  imageURL,
  title,
  description,
  link,
  icon,
  color,
  direction = "left",
}: ActivityCardProps) {
  // Narrow the icon to a React component if it's a function/component type
  const IconComponent =
    typeof icon === "function" ? (icon as React.ComponentType<any>) : null;

  const isLeft = direction === "left";

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageURL || "/placeholder.svg"}
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="p-6">
        <div
          className="flex items-center mb-3 rounded py-1"
        >
          {IconComponent ? (
            <IconComponent
              className="h-6 w-6 mr-2"
              style={{ color: color }}
            />
          ) : (
            <div className="h-6 w-6 mr-2 rounded bg-gray-200" />
          )}

          <h3 className="text-xl font-semibold font-giest">{title}</h3>
        </div>

        <p className="mb-4">{description}</p>

        <a
          href={link}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
        >
          Learn more
          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}