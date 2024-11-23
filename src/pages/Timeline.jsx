import { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaChalkboardTeacher, FaHandsHelping, FaTree } from "react-icons/fa";
import { AiOutlinePlus, AiFillExperiment } from "react-icons/ai";
import { IoMdPeople } from "react-icons/io";
import "../Timeline.css";

const TimelineComponent = () => {
  const timelineData = [
    {
      date: "March",
      title: "Blood Donation Drive",
      description:
        "Organized a successful blood donation campaign in collaboration with NSS.",
      icon: <FaHandsHelping />,
      color: "#E63946",
    },
    {
      date: "October",
      title: "Grain-A-Thon",
      description:
        "Collected grains for the underprivileged as part of a community service drive.",
      icon: <FaChalkboardTeacher />,
      color: "#2A9D8F",
    },
    {
      date: "September",
      title: "Tree Plantation Drive",
      description:
        "Planted over 200 saplings around the campus to promote sustainability.",
      icon: <FaTree />,
      color: "#2E8B57",
    },
    {
      date: "August",
      title: "Freshers' Welcome",
      description:
        "Hosted a vibrant event to welcome the new batch of students.",
      icon: <IoMdPeople />,
      color: "#FFC107",
    },
    {
      date: "July",
      title: "Innovation Fest",
      description:
        "Displayed groundbreaking projects and experiments by students.",
      icon: <AiFillExperiment />,
      color: "#6A4C93",
    },
    {
      date: "June",
      title: "Web Development Workshop",
      description: "Conducted a workshop on web development for students.",
      icon: <FaChalkboardTeacher />,
      color: "#2A9D8F",
    },
  ];

  const [visibleItems, setVisibleItems] = useState(2);

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 2, timelineData.length));
  };

  return (
    <div className="bg-waves-bg inset-0 -z-10 h-full w-full py-24 bg-cover bg-no-repeat bg-center bg-fixed backdrop-blur-sm overflow-y-scroll">
      <div className="inset-0 backdrop-blur-sm w-full h-full">
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
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                boxShadow: `0 4px 30px ${item.color}`,
                border: `1px solid ${item.color}`,
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
              }}
              contentArrowStyle={{
                borderRight: `7px solid ${item.color}`,
              }}
            >
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              <p>{item.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        {visibleItems < timelineData.length && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div
              onClick={loadMore}
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                cursor: "pointer",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              <AiOutlinePlus size={24} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineComponent;
