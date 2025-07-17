import Logo from "../assets/DJSNSSLogo.jpg";
import GrainAThon from "../assets/Events/grainathon25/grainathon1.jpg";
import BorivaliTP from "../assets/Events/TreePlantation25.jpg";
import NSSCamp from "../assets/Events/camp25/camp2.jpeg";
import AnnualCharity from "../assets/Events/AnnualCharity.png";
import VoterRegistration from "../assets/Events/VoterRegistration.png";
import BDD from "../assets/Events/bdd25/bdd2.jpg";
import StemCell from "../assets/Events/Stemcell.jpg";
import NewspaperCollectionDrive from "../assets/Events/NewspaperCollection.png";
import IndependenceDayRally from "../assets/Events/TirangaRally/IMG_4530.jpg";
import { FaHeart, FaFlag, FaHandHoldingHeart } from "react-icons/fa";
import { GiTreehouse, GiWheat } from "react-icons/gi";

export const largeEventsData = [
  {
    id: 0,
    title: "DJS NSS",
    imageURL: Logo,
    longDescription:
      "DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of Engineering, started in 2005. Our mission is to foster the all-round development of society, addressing socio-economic problems and sustainability crises caused by global warming. We aim to transform individuals into resilient and capable citizens, encouraging both technical advancements and societal contributions.",
  },
  {
    id: 1,
    title: "NSS CAMP",
    description: "A camp to remember",
    slug: "nss-camp",
    link: "/eventdetails/nss-camp",
    background: "bg-teal-400",
    imageURL: NSSCamp,
    longDescription:
      "From January 21 to 28, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized an enriching camp at Dahanu, focusing on community service and personal growth. The camp kicked off with cleanliness drives, team-building activities, and creative tasks like poster making and wall painting, all fostering a spirit of teamwork and community engagement. Throughout the week, volunteers participated in impactful initiatives, including educational outreach, a medical camp, and environmental awareness drives. The installation of solar street lights highlighted the camp's commitment to sustainability. The camp concluded with cultural celebrations and a strong sense of accomplishment among participants, leaving a lasting impact on the community and volunteers alike.",
    scale: "Large",
    duration: "7 days",
    location: "Dahanu",
    date: "21st Jan - 28th Jan 2025",
    icon: FaFlag,
    color: "#4C9D8F",
  },
  {
    id: 2,
    title: "BLOOD DONATION DRIVE",
    description: "Donate blood, save lives",
    slug: "blood-donation-drive",
    link: "/eventdetails/blood-donation-drive",
    background: "bg-red-400",
    imageURL: BDD,
    longDescription:
      "Set up for success: Blood Donation Drive On 4th March 2025, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a blood donation drive in collaboration with the Red Cross Society. The event, held at DJ Sanghvi College, aimed to raise awareness about the importance of blood donation and encourage students to contribute to this life-saving cause. The drive was a resounding success, with over 100 volunteers donating blood and many more participating in the event. The drive featured informative sessions on the benefits of blood donation, dispelling myths and misconceptions and inspiring participants to make a difference. The event showcased the power of collective action and community involvement in saving lives and promoting health and well-being. The enthusiasm and dedication of all participants made the drive a memorable and impactful experience, setting the stage for future initiatives to support public health and welfare.",
    scale: "Large",
    duration: "1 day",
    location: "DJ Sanghvi College",
    date: "4th March 2025",
    icon: FaHeart,
    color: "#D72638",
  },
  {
    id: 3,
    title: "GRAIN-A-THON",
    description: "Our small actions, others' huge aid",
    slug: "grain-a-thon",
    link: "/eventdetails/grain-a-thon",
    background: "bg-yellow-400",
    imageURL: GrainAThon,
    longDescription:
      "Scarcity to abundance: Grain-a-thon On 17th - 18th October 2024, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a Grain-a-thon, a food donation drive to support underprivileged communities. The event, held at DJ Sanghvi College, aimed to raise awareness about food insecurity and encourage students to contribute to this vital cause. The drive was a resounding success, with over 200 volunteers donating grains and other essential food items. The drive featured inspiring speeches, interactive sessions, and engaging activities that highlighted the importance of community service and collective action. The event showcased the power of empathy and compassion in addressing social challenges and fostering a culture of giving. The enthusiasm and generosity of all participants made the drive a memorable and impactful experience, setting the stage for future initiatives to support vulnerable communities and promote social justice.",
    scale: "Large",
    duration: "1 day",
    location: "DJ Sanghvi College",
    date: "17th Oct - 18th Oct 2024",
    icon: GiWheat,
    color: "#F4A261",
  },
  {
    id: 4,
    title: "TREE PLANTATION",
    description: "Planting trees, planting hope",
    slug: "tree-plantation",
    link: "/eventdetails/tree-plantation",
    background: "bg-blue-400",
    imageURL: BorivaliTP,
    longDescription:
      "Tree Plantation Drive: On 28th June 2025, the NSS unit of Dwarkadas J. Sanghvi College of Engineering successfully organized a tree plantation at Aarey Colony, Mumbai West.",
    scale: "Medium",
    duration: "1 day",
    location: "Aarey Colony, Mumbai",
    date: "28th June 2025",
    icon: GiTreehouse,
    color: "#2E8B57",
  },
  {
    id: 5,
    title: "ANNUAL CHARITY DRIVE",
    description: "Shaping India's futures",
    slug: "annual-charity-drive",
    link: "/eventdetails/annual-charity-drive",
    background: "bg-green-400",
    imageURL: AnnualCharity,
    longDescription:
      "From February 20th to 24th, DJ Sanghvi College of Engineering became a center of compassion and creativity during the DJSNSS Annual Charity Drive. This event united volunteers and the college community in a mission to raise funds for specially-abled children.The drive was a resounding success, raising over Rs 75,000 to support three NGOs: Kshitij, based at Charni Road, and Purnavas and VDIS, both in Malad. These funds will significantly aid the organizations in their ongoing efforts to nurture the talents of these children. The event featured a vibrant showcase of handcrafted items made by the children, including handmade chocolates, earrings, anklets, bracelets, and jute bags. Ganpati idols, symbolizing new beginnings, were also on display. Purchasing these items did more than raise funds; it celebrated the talents of these children, affirming their value and creativity. The Annual Charity Drive wasn’t just about raising money—it was a celebration of community spirit and collective kindness. In those five days, DJ Sanghvi College became a place where every contribution helped create a world where everyone’s abilities are recognized. The DJSNSS Annual Charity Drive showed that when we give from the heart, we enrich lives and build a tapestry of kindness that touches us all.",
    scale: "Large",
    duration: "5 days",
    location: "DJ Sanghvi College",
    date: "20th Feb - 24th Feb 2024",
    icon: FaHandHoldingHeart,
    color: "#4CAF50",
  },
  {
    id: 6,
    title: "VOTER REGISTRATION",
    description: "Your vote, your voice",
    slug: "voter-registration",
    link: "/eventdetails/voter-registration",
    background: "bg-purple-400",
    imageURL: VoterRegistration,
    longDescription:
      "Voter Registration Drive: 'Your Vote, Your Voice' On 15th September 2023, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a voter registration drive to encourage students to exercise their democratic rights. The event, held at DJ Sanghvi College, aimed to raise awareness about the importance of voting and empower students to participate in the electoral process. The drive was a resounding success, with over 300 students registering to vote and many more engaging in informative sessions and interactive activities. The drive featured inspiring speeches, engaging discussions, and interactive games that highlighted the significance of voting in shaping the future of the nation. The event showcased the power of civic engagement and community involvement in promoting democracy and social change. The enthusiasm and commitment of all participants made the drive a memorable and impactful experience, setting the stage for future initiatives to support voter education and participation.",
    scale: "Medium",
    duration: "1 day",
    location: "DJ Sanghvi College",
    date: "15th Sep 2024",
    icon: GiTreehouse,
    color: "#9C27B0",
  },
  {
    id: 7,
    title: "NEWSPAPER COLLECTION DRIVE",
    description: "Recycle today for a better tomorrow",
    slug: "newspaper-collection-drive",
    link: "/eventdetails/newspaper-collection-drive",
    background: "bg-indigo-400",
    imageURL: NewspaperCollectionDrive,
    longDescription:
      "On 5th June 2024, World Environment Day, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a Newspaper Collection Drive aimed at promoting recycling and environmental sustainability. The event encouraged students to collect and donate old newspapers, which were then sent for recycling. The drive included educational sessions on the importance of recycling and its impact on reducing waste and conserving resources. The event successfully collected a significant amount of paper waste, highlighting the collective effort needed to protect the environment and promoting a culture of sustainability among the college community.",
    scale: "Medium",
    duration: "1 day",
    location: "DJ Sanghvi College",
    date: "5th June 2024",
    icon: GiTreehouse,
    color: "#2E8B57",
  },
  {
    id: 8,
    title: "STEM CELL DONATION DRIVE",
    description: "Be a hero, save a life",
    slug: "stem-cell-donation-drive",
    link: "/eventdetails/stem-cell-donation-drive",
    background: "bg-yellow-400",
    imageURL: StemCell,
    longDescription:
      "On 16th August 2024, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a Stem Cell Donation Drive in collaboration with the DATRI Blood Stem Cell Donors Registry. The event aimed to raise awareness about the importance of stem cell donation and encourage students to register as potential donors. The drive featured informative sessions, interactive activities, and inspiring stories of lives saved through stem cell transplants. Our college students broke the current record of donatons by donating a record 560 swabs, showcasing their commitment to helping those in need. The event highlighted the power of compassion and solidarity in supporting patients battling life-threatening diseases. The enthusiasm and generosity of all participants made the drive a memorable and impactful experience, setting the stage for future initiatives to save lives and promote health and well-being.",
    scale: "Large",
    duration: "1 day",
    location: "DJ Sanghvi College",
    date: "16th Aug 2024",
    icon: FaHeart,
    color: "#F4A261",
  },
  {
    id: 9,
    title: "INDEPENDENCE DAY RALLY",
    description: "Celebrating freedom with unity",
    slug: "independence-day-rally",
    link: "/eventdetails/independence-day-rally",
    background: "bg-orange-400",
    imageURL: IndependenceDayRally,
    longDescription:
      "On 15th August 2024, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized an Independence Day Rally, celebrating India's freedom and promoting national unity. The event featured a patriotic march, inspiring speeches, and cultural performances that highlighted the importance of independence and the sacrifices made for the nation. Students, faculty, and volunteers participated enthusiastically, showcasing their love for the country. The rally concluded with a flag-hoisting ceremony and a pledge to uphold the values of democracy, unity, and equality. The event was a significant reminder of the ongoing efforts needed to preserve and protect the nation's freedom and heritage.",
    scale: "Large - University Level",
    duration: "1 day",
    location: "DJ Sanghvi College",
    date: "15th Aug 2024",
    icon: FaFlag ,
    color: "#FFA500",
  },
];
