import { FaSun,FaLightbulb,FaWater } from "react-icons/fa6";
import SolarNarpad from "../assets/Technical/SolarNarpad.jpg"
import SolarWaki from "../assets/Technical/SolarWaki.jpg"
import WaterPumpAmbewadi from "../assets/Technical/Water Pump.jpg"

export const TechnicalProjects = [
    {
      id: 1,
      title: "Solar Light Installation - Narpad Village",
      description: "Illuminating Narpad with Solar Power",
      slug: "solar-lights-narpad",
      link: "/eventdetails/solar-lights-narpad",
      background: "bg-misty-blue",
      imageURL: SolarNarpad,
      longDescription:
        "On January 29, 2024, DJS NSS successfully installed solar street lights in Narpad village, Dahanu. This initiative aimed at providing sustainable lighting solutions to improve safety and accessibility for the villagers. The project reinforced the importance of renewable energy in rural development and enhanced the quality of life for the local community.",
      scale: "Medium",
      duration: "1 day",
      location: "Narpad Village, Dahanu",
      date: "29th Jan 2024",
      icon: FaSun,
      color: "#FBBF24"
    },
    {
      id: 2,
      title: "Solar Light Installation - Waki Village",
      description: "Enhancing Safety & Navigation with Solar Lights",
      slug: "solar-lights-waki",
      link: "/eventdetails/solar-lights-waki",
      background: "bg-misty-blue",
      imageURL: SolarWaki,
      longDescription:
        "In Waki village, DJS NSS installed four strategically placed solar lights to improve safety and road maneuverability. This initiative addressed the need for well-lit pathways, reducing accidents and enhancing the overall security of the residents. The installation was a crucial step toward sustainable infrastructure in the region.",
      scale: "Medium",
      duration: "1 day",
      location: "Waki Village",
      date: "26th Jan 2025",
      icon: FaLightbulb,
      color: "#FB923C"
    },
    {
      id: 3,
      title: "Water Pump Installation - Ambewadi",
      description: "Providing Reliable Water Access",
      slug: "water-pump-ambewadi",
      link: "/eventdetails/water-pump-ambewadi",
      background: "bg-misty-blue",
      imageURL: WaterPumpAmbewadi,
      longDescription:
        "In 2019, DJS NSS undertook a project to install a water pump system to draw water from a well, benefiting the villagers of Ambewadi, Dahanu. This project aimed at providing a sustainable water source for daily needs, reducing the villagers' dependence on manual water collection. It significantly improved water accessibility and contributed to better living conditions in the community.",
      scale: "Large",
      duration: "Ongoing Impact",
      location: "Ambewadi, Dahanu",
      date: "2019",
      icon: FaWater,
      color: "#3B82F6"
    }
  ];
