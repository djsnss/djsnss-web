"use client";

import React from "react";
import { motion } from "framer-motion";
import EventCard from "./event-card";
import { ArrowRight, Heart, Leaf, BookOpen, Tent, Droplets } from "lucide-react";

export default function Events() {
  const events = [
    {
      title: "NSS Annual Camp",
      date: "December 2023",
      location: "Rural Community Site",
      icon: Tent,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Grain-A-Thon",
      date: "February 2024",
      location: "DJ Sanghvi College",
      icon: BookOpen,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Blood Donation Drive",
      date: "October 2023",
      location: "Main Hall, DJ Sanghvi College",
      icon: Droplets,
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
    }
  ];

  return (
    <section className="py-20 bg-white-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 py-2">
            Main Events
          </h2>
          <p className="text-lg text-gray-600">
            Join us for these activities and be part of creating
            positive change in our community.
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
              bgColor={event.bgColor}
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
          <a
            href="/events"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group underline"
          >
            View All Events{" "}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}