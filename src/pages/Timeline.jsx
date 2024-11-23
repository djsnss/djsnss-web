import ReactDOM from "react-dom";
import { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { AnimatePresence, motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { FaHeart, FaLightbulb, FaLaptopCode, FaRegSmileBeam } from "react-icons/fa";
import { GiWheat, GiTreehouse } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import "../Timeline.css";

const TimelineComponent = () => {
  const timelineData = [
    {
      date: "March",
      title: "Blood Donation Drive",
      description: "Organized a successful blood donation campaign in collaboration with NSS.",
      longDescription:
        "The blood donation drive in March witnessed 200+ participants donating over 150 units of blood. Organized in collaboration with NSS, it included health checkups and awareness sessions about the importance of blood donation.",
      icon: <FaHeart />,
      color: "#D72638",
    },
    {
      date: "October",
      title: "Grain-A-Thon",
      description: "Collected grains for the underprivileged as part of a community service drive.",
      longDescription:
        "Grain-A-Thon was a month-long initiative where over 500 kg of grains were collected to support underprivileged communities. It involved active participation from students and faculty alike.",
      icon: <GiWheat />,
      color: "#F4A261",
    },
    {
      date: "September",
      title: "Tree Plantation Drive",
      description: "Planted over 200 saplings around the campus to promote sustainability.",
      longDescription:
        "The tree plantation drive was a significant step towards a greener campus, with workshops on climate change and sustainable practices complementing the plantation efforts.",
      icon: <GiTreehouse />,
      color: "#2E8B57",
    },
    {
      date: "August",
      title: "Freshers' Welcome",
      description: "Hosted a vibrant event to welcome the new batch of students.",
      longDescription:
        "Freshers' Welcome was a grand affair with performances, games, and a formal introduction to campus life. It set the tone for an exciting academic year ahead.",
      icon: <FaRegSmileBeam />,
      color: "#FFC107",
    },
    {
      date: "July",
      title: "Innovation Fest",
      description: "Displayed groundbreaking projects and experiments by students.",
      longDescription:
        "Innovation Fest showcased the creativity and technical expertise of students, featuring 50+ innovative projects across various domains.",
      icon: <FaLightbulb />,
      color: "#6A4C93",
    },
    {
      date: "June",
      title: "Web Development Workshop",
      description: "Conducted a workshop on web development for students.",
      longDescription:
        "The workshop focused on modern web technologies like React, Tailwind CSS, and backend frameworks, attracting over 100 participants.",
      icon: <FaLaptopCode />,
      color: "#2A9D8F",
    },
  ];
  

  const [visibleItems, setVisibleItems] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 2, timelineData.length));
  };

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-timeline inset-0 -z-10 min-h-screen w-full bg-cover bg-no-repeat bg-center bg-fixed backdrop-blur-sm select-none">
      <div className="absolute inset-0 backdrop-blur-sm w-full min-h-screen"></div>

      <div className="relative overflow-y-scroll py-10">
        <VerticalTimeline lineColor="rgba(255, 255, 255, 0.2)">
          {timelineData.slice(0, visibleItems).map((item, index) => (
            <VerticalTimelineElement
              key={index}
              date={item.date}
              dateClassName="timeline-date"
              icon={item.icon}
              iconStyle={{
                background: item.color,
                color: "white",
                border: `2px solid ${item.color}`,
                backdropFilter: "blur(8px)",
              }}
              contentStyle={{
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                border: `1px solid rgba(255, 255, 255, 0.2)`,
                backdropFilter: "blur(15px)",
                borderRadius: "10px",
              }}
              contentArrowStyle={{
                borderRight: `7px solid rgba(255, 255, 255, 0.15)`,
              }}
            >
              <h3
                className="vertical-timeline-element-title"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
              <p>{item.description}</p>
              <button
                onClick={() => openModal(item)}
                className="mt-2 px-4 py-2 bg-white/10 backdrop-blur-lg text-white rounded-lg hover:bg-white/20 transition-all block"
              >
                View Details
              </button>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        {visibleItems < timelineData.length && (
          <div className="text-center mt-5">
            <div
              onClick={loadMore}
              className="w-12 h-12 bg-[rgba(255,255,255,0.15)] text-white border border-[rgba(255,255,255,0.2)] backdrop-blur-md rounded-full flex items-center justify-center mx-auto cursor-pointer shadow-md transition-transform duration-200 hover:scale-110"
            >
              <AiOutlinePlus size={24} />
            </div>
          </div>
        )}
      </div>

      {ReactDOM.createPortal(
        <EventModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          data={modalData}
        />,
        document.body
      )}
    </div>
  );
};

const EventModal = ({ isOpen, setIsOpen, data }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md grid place-items-center cursor-pointer select-none"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: "10deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-6 rounded-2xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-bold mb-2">{data?.title}</h3>
              <p className="mb-6">{data?.longDescription}</p>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-[25%] py-2 rounded font-semibold text-white transition-all"
                  style={{
                    background: data?.color,
                    borderColor: data?.color,
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default TimelineComponent;
