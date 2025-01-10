import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { AnimatePresence, motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { FaHeart, FaFlag, FaHandHoldingHeart } from "react-icons/fa";
import { GiTreehouse, GiWheat } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import "../Timeline.css";
import TirangaRally from "../assets/Events/TirangaRally/IMG_4530.jpg";
import GrainAThon from "../assets/Events/GrainAThon.png";
import BorivaliTP from "../assets/Events/TreePlantation.png";
import NSSCamp from "../assets/Events/NSSCamp.jpg";
import AnnualCharity from "../assets/Events/AnnualCharity.png";
import VoterRegistration from "../assets/Events/VoterRegistration.png";
import BDD from "../assets/Events/BDD.jpg";
import NewspaperCollectionDrive from "../assets/Events/NewspaperCollection.png";
import IndependenceDayRally from "../assets/Events/TirangaRally/IMG_4530.jpg";

const TimelineComponent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const backgroundImages = [
    TirangaRally,
    GrainAThon,
    BorivaliTP,
    NSSCamp,
    AnnualCharity,
    VoterRegistration,
    BDD,
    NewspaperCollectionDrive,
    IndependenceDayRally
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % backgroundImages.length
        );
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const timelineData = [
    {
      date: "January",
      title: "NSS CAMP",
      description: "A camp to remember in Dahanu, focused on community service.",
      longDescription:
        "From January 26 to 31, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized an enriching camp at Dahanu, focusing on community service and personal growth. The camp kicked off with cleanliness drives, team-building activities, and creative tasks like poster making and wall painting, all fostering a spirit of teamwork and community engagement. Throughout the week, volunteers participated in impactful initiatives, including educational outreach, a medical camp, and environmental awareness drives. The installation of solar street lights highlighted the camp's commitment to sustainability. The camp concluded with cultural celebrations and a strong sense of accomplishment among participants, leaving a lasting impact on the community and volunteers alike.",
      icon: <FaFlag />,
      color: "#4C9D8F",
    },
    {
      date: "February",
      title: "Annual Charity Drive",
      description: "Shaping India's future through donations for specially-abled children.",
      longDescription:
        "From February 20th to 24th, DJ Sanghvi College of Engineering became a center of compassion and creativity during the DJSNSS Annual Charity Drive. This event united volunteers and the college community in a mission to raise funds for specially-abled children.The drive was a resounding success, raising over Rs 75,000 to support three NGOs: Kshitij, based at Charni Road, and Purnavas and VDIS, both in Malad. These funds will significantly aid the organizations in their ongoing efforts to nurture the talents of these children. The event featured a vibrant showcase of handcrafted items made by the children, including handmade chocolates, earrings, anklets, bracelets, and jute bags. Ganpati idols, symbolizing new beginnings, were also on display. Purchasing these items did more than raise funds; it celebrated the talents of these children, affirming their value and creativity. The Annual Charity Drive wasn’t just about raising money—it was a celebration of community spirit and collective kindness. In those five days, DJ Sanghvi College became a place where every contribution helped create a world where everyone’s abilities are recognized. The DJSNSS Annual Charity Drive showed that when we give from the heart, we enrich lives and build a tapestry of kindness that touches us all.",
      icon: <FaHandHoldingHeart />,
      color: "#4CAF50",
    },
    {
      date: "February",
      title: "Blood Donation Drive",
      description: "A life-saving campaign in collaboration with the Red Cross Society.",
      longDescription:
        "Set up for success: Blood Donation Drive On 14th February 2023, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a blood donation drive in collaboration with the Red Cross Society. The event, held at DJ Sanghvi College, aimed to raise awareness about the importance of blood donation and encourage students to contribute to this life-saving cause. The drive was a resounding success, with over 100 volunteers donating blood and many more participating in the event. The drive featured informative sessions on the benefits of blood donation, dispelling myths and misconceptions and inspiring participants to make a difference. The event showcased the power of collective action and community involvement in saving lives and promoting health and well-being. The enthusiasm and dedication of all participants made the drive a memorable and impactful experience, setting the stage for future initiatives to support public health and welfare.",
      icon: <FaHeart />,
      color: "#D72638",
    },
    {
      date: "June",
      title: "Newspaper Collection Drive",
      description: "Promoted recycling and environmental sustainability.",
      longDescription:
        "On 5th June 2024, World Environment Day, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a Newspaper Collection Drive aimed at promoting recycling and environmental sustainability. The event encouraged students to collect and donate old newspapers, which were then sent for recycling. The drive included educational sessions on the importance of recycling and its impact on reducing waste and conserving resources. The event successfully collected a significant amount of paper waste, highlighting the collective effort needed to protect the environment and promoting a culture of sustainability among the college community.",
      icon: <GiTreehouse />,
      color: "#2E8B57",
    },
    {
      date: "August",
      title: "Grain-A-Thon",
      description: "Donated grains to support underprivileged communities.",
      longDescription:
        "Scarcity to abundance: Grain-a-thon On 15th August 2023, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a Grain-a-thon, a food donation drive to support underprivileged communities. The event, held at DJ Sanghvi College, aimed to raise awareness about food insecurity and encourage students to contribute to this vital cause. The drive was a resounding success, with over 200 volunteers donating grains and other essential food items. The drive featured inspiring speeches, interactive sessions, and engaging activities that highlighted the importance of community service and collective action. The event showcased the power of empathy and compassion in addressing social challenges and fostering a culture of giving. The enthusiasm and generosity of all participants made the drive a memorable and impactful experience, setting the stage for future initiatives to support vulnerable communities and promote social justice.",
      icon: <GiWheat />,
      color: "#F4A261",
    },
    {
      date: "August",
      title: "Independence Day Rally",
      description: "Celebrated India's independence with unity and pride.",
      longDescription:
        "On 15th August 2024, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized an Independence Day Rally, celebrating India's freedom and promoting national unity. The event featured a patriotic march, inspiring speeches, and cultural performances that highlighted the importance of independence and the sacrifices made for the nation. Students, faculty, and volunteers participated enthusiastically, showcasing their love for the country. The rally concluded with a flag-hoisting ceremony and a pledge to uphold the values of democracy, unity, and equality. The event was a significant reminder of the ongoing efforts needed to preserve and protect the nation's freedom and heritage.",
      icon: <FaFlag />,
      color: "#FFA500",
    },
    {
      date: "August",
      title: "Tree Plantation Drive",
      description: "Planted saplings to combat climate change.",
      longDescription:
        "Tree Plantation Drive: 'Meri Mitti Mera Desh' On 9th August 2023, the NSS unit of Dwarkadas J. Sanghvi College of Engineering successfully organized a tree plantation drive at Veer Savarkar Udhyan, Borivali West. The event, themed 'Meri Mitti Mera Desh', aimed to foster environmental responsibility and raise awareness about the vital role of trees in combating climate change. Around 80 dedicated volunteers, including students and organizers, participated in planting over 110 saplings of native species, carefully chosen to enhance the local ecosystem. The drive began with inspiring speeches, and participants eagerly engaged in planting activities, showcasing their commitment to creating a greener future. The event highlighted the power of collective action and community involvement in environmental conservation. The enthusiasm and teamwork displayed by all contributed to the event's resounding success, marking a significant step toward a sustainable environment.",
      icon: <GiTreehouse />,
      color: "#2E8B57",
    },
    {
      date: "August",
      title: "Stem Cell Donation Drive",
      description: "Encouraged students to become stem cell donors.",
      longDescription:
        "On 16th August 2024, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a Stem Cell Donation Drive in collaboration with the DATRI Blood Stem Cell Donors Registry. The event aimed to raise awareness about the importance of stem cell donation and encourage students to register as potential donors. The drive featured informative sessions, interactive activities, and inspiring stories of lives saved through stem cell transplants. Our college students broke the current record of donations by donating a record 560 swabs, showcasing their commitment to helping those in need. The event highlighted the power of compassion and solidarity in supporting patients battling life-threatening diseases. The enthusiasm and generosity of all participants made the drive a memorable and impactful experience, setting the stage for future initiatives to save lives and promote health and well-being.",
      icon: <FaHeart />,
      color: "#F4A261",
    },
    {
      date: "September",
      title: "Voter Registration",
      description: "Encouraged students to exercise their democratic rights.",
      longDescription:
        "Voter Registration Drive: 'Your Vote, Your Voice' On 15th September 2023, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a voter registration drive to encourage students to exercise their democratic rights. The event, held at DJ Sanghvi College, aimed to raise awareness about the importance of voting and empower students to participate in the electoral process. The drive was a resounding success, with over 300 students registering to vote and many more engaging in informative sessions and interactive activities. The drive featured inspiring speeches, engaging discussions, and interactive games that highlighted the significance of voting in shaping the future of the nation. The event showcased the power of civic engagement and community involvement in promoting democracy and social change. The enthusiasm and commitment of all participants made the drive a memorable and impactful experience, setting the stage for future initiatives to support voter education and participation.",
      icon: <GiTreehouse />,
      color: "#9C27B0",
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
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
            zIndex: -1
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 backdrop-blur-sm bg-black/50" />

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