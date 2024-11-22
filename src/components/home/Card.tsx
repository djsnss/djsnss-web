import React from "react";
import { motion } from "framer-motion";

function ProfileCard({ name, position, imageUrl, link }) {
    return (
        <motion.div
            className="flex flex-col w-[17vw] bg-white shadow-lg rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Full Image Section with Overlay Info and Gradient Blur */}
            <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                {/* Background Image */}
                <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover"
                />
                {/* Gradient Blur Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-600 via-white/10 to-transparent"></div>
                {/* Overlay Information */}
                <div className="absolute bottom-4 left-4 text-black z-10">
                    <strong className="text-lg md:text-3xl font-semibold">{name}</strong>
                    <p className="text-sm opacity-75">{position}</p>
                    <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-black hover:text-blue-600 duration-200 text-md md:text-xl mt-1 inline-block"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default ProfileCard;
