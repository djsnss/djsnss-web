"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import CardNew from "./CardNew"
import Modal from "./Modal"

const AllAlumni = () => {
  const [selectedAlumnus, setSelectedAlumnus] = useState(null)

  // Extended alumni list - you can add more alumni here
  const alumini = [
    {
      name: "Ritvi Shetty",
      position: "Co-Chairperson",
      image: "../assets/alumini/RitviShetty.jpg",
      details:
    ""},
    {
      name: "Krutik Panchal",
      position: "Editorial Co-committee",
      image: "../src/assets/alumini/KrutikPanchal.jpg",
      details:
""    },
    {
      name: "Nilay Shah",
      position: "Chairperson",
      image: "../src/assets/alumini/NilayShah.jpg",
      details:
        "Qualification:\nMBA - Jamnalal Bajaj Institute of Management Studies, Batch of 2025\nB.E. Electronics & Telecommunication - DJSCE 2021\n\nNSS Tenure:\mDuring our tenure, we conducted a medical camp, solar streetlights installation, recycled rubber tyre footwear distribution and other projects at our adopted village, and organised a Blood Donation Drive with a single day collection of 819 units\nRegistered for stem cell donation at DJSCE, and some years later, I was fortunate to match with a patient and donated stem cells to save a life\nPrevious Work Experience:\nSAP B1 funcional consultant at Uneecops Business Solutions\nBusiness Development Executive at Aelius Turbina (Solar and Wind Renewables)\n\nViews about NSS:\nBeing part of NSS allowed me to collaborate with individuals from diverse backgrounds and lead a team of 150 volunteers toward a shared mission. The connections we built remain strong to this day, extending to fellow members, faculty, villagers, and everyone we engaged with over those two years. This experience has been one of my life's most impactful and transformative chapters, reinforcing my commitment to a career centered on leadership and service."
    },
    {
      name: "Vishwa Mehta",
      position: "Joint Secretary",
      image: "../src/assets/alumini/VishwaMehta.jpg",
      details:
        "B.E. Electronics & Telecommunication - DJSCE 2021\n• Pursued her passion for baking by completing a certified course from a renowned culinary school.\n• Successfully runs a baking and confectionery business.\n• Joined the family business in stock broking and mutual fund distribution. .",
    },
    {
      name: "Ritik Shah",
      position: "Technical Head",
      image: "../src/assets/alumini/RitikShah.jpg",
      details:
        "",
    },
    {
      name: "Jignesh Thakur",
      position: "Joint Treasurer",
      image: "../src/assets/alumini/JigneshThakur.jpg",
      details:
        "Qualification:\nMBA - Jamnalal Bajaj Institute of Management Studies\nBatch of 2024\nB.E. Electronics & Telecommunication - DJSCE '21\nCurrently working in JM Financial as a Senior Associate",
    },
    {
      name: "Nidhi Joshi",
      position: "Co-Chairperson",
      image: "../src/assets/alumini/NidhiJoshi.jpg",
      details:
        "M.Sc. Medical Engineering - FAU (Erlangen, Germany) 2025\nB.E. Biomedical Engineering - DJSCE (Mumbai, India) 2021\nReceived an honorary best paper award for a research paper (VRST 2024)\nCurrently working part-time in a MedTech company while travelling Europe (14 countries so far). ",
    },
    {
      name: "Tanaya Parab",
      position: "Vice Chairperson",
      image: "../src/assets/alumini/TanayaParab.jpg",
      details:
        "B.E Electronics - DJSCE 2021\nAchieved AIR-2 after clearing SSB Interview to join Officers' Training Academy, Gaya\nTo pass-out as a Lieutenant and join Indian Army in Sept 2025",
    },
    {
      name: "Maitri Shah",
      position: "Secretary",
      image: "../src/assets/alumini/MaitriShah.jpg",
      details:
        "Qualification:\nMaster’s in Engineering Management - Duke University (Durham, USA) 2023\nB.E. Electronics Engineering - DJSCE (Mumbai, India) 2021\n\nPreviously served as the Co-President for Duke Engineering Masters Student Council\nCertified in Lean Six Sigma (Green Belt) – Skilled in process optimization and operational efficiency\nCurrently working as an Operations Program Manager for Mill Industries, a Bay Area based Climate Tech startup",
    },
    {
      name: "Shubh Padechia",
      position: "Technical Head",
      image: "../src/assets/alumini/ShubhPadechia.jpg",
      details:
        "",
    },
    {
      name: "Ahan Dalia",
      position: "Treasurer",
      image: "../src/assets/alumini/AhanDalia.jpg",
      details:
        "Completed my Master's degree in Robotics from Johns Hopkins University.\nPublished 2 papers and had a demo presentation at a leading conference in 2024.",
    },
    {
      name: "Tanushree Saraf",
      position: "Chairperson",
      image: "../src/assets/alumini/TanushreeSaraf.jpg",
      details:
        "Completed Masters in Management of Technology from New York University.\nAutomated Student-Project Allocation System using LLM for one of the departments at NYU.",
    },
    {
      name: "Labdhi Shah",
      position: "Secretary",
      image: "../src/assets/alumini/LabdhiShah.jpg",
      details:
        "Completed my Master’s in Management Science from The University of Texas at Dallas.\nCSM certified, led project management initiatives through the Project Management Club, implementing an AI solution at a financial services venture.",
    }
  ]

  return (
    <div className="bg-white my-7">
      <div className="text-center mb-8">
        <h2 className="text-dark-navy text-xl md:text-2xl lg:text-4xl underline font-bold tracking-wide">
          Alumni Directory
        </h2>
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
          <motion.div key={index} className="relative group overflow-hidden" whileHover={{ scale: 1.05 }}>
            <CardNew img={alumnus.image} name={alumnus.name} position={alumnus.position} />
            <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white text-center px-2"
              >
                {alumnus.position}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setSelectedAlumnus(alumnus)}
              >
                View More
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {selectedAlumnus && (
        <Modal onClose={() => setSelectedAlumnus(null)}>
          <h2 className="text-xl font-bold">{selectedAlumnus.name}</h2>
          <p className="text-gray-700">{selectedAlumnus.position}</p>
          <div className="mt-4" style={{ whiteSpace: "pre-line" }}>
            <p>{selectedAlumnus.details}</p>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default AllAlumni;


