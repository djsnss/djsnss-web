"use client"

import { motion } from "framer-motion"
import CardNew from "./CardNew"
import alumini from "../../data/alumniData"
const AllAlumni = () => {

  return (
    <div className=" bg-gradient-to-br from-blue-100 to-sky-300 pt-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 text-center">
          Alumni Directory
        </h1>
        <p className="text-light-gray mt-2 text-lg">
          Explore our complete directory of alumni who have contributed to NSS and are making an impact in various
          fields.
        </p>
        <a
          href="/"
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 hover:underline"
        >
          ← Back to Distinguished Alumni
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-row flex-wrap justify-center items-center gap-10 p-6"
      >
        {alumini.map((alumnus, index) => (
          <div key={index}>
            <CardNew
              name={alumnus.name}
              imageUrl={alumnus.image}
              url={alumnus.url}
              linkedin={alumnus.linkedin}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default AllAlumni;