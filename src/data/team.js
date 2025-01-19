// Function to generate common faculty data for each year}

import AnshShah from "../assets/Team/Ansh Shah.jpg";
import BhavyShah from "../assets/Team/Bhavy Shah.jpg";
import CleonLopes from "../assets/Team/Cleon Lopes.jpg";
import DevPopat from "../assets/Team/Dev Popat.jpg";
import ManitRathod from "../assets/Team/Manit Rathod.jpg";
import ParnaMishra from "../assets/Team/Parna Mishra.jpg";
import RushabhMehta from "../assets/Team/Rushabh Mehta.jpg";
import ShashankNaik from "../assets/Team/Shashank Naik.jpg";
import AgamKamdar from "../assets/Team/Agam Kamdar.jpg";
import YashDalvi from "../assets/Team/Yash Dalvi.jpg";
import ArchiPatel from "../assets/Team/Archi Patel.jpg";
import JaiwinMehta from "../assets/Team/Jaiwin Mehta.jpg";
import JainamShah from "../assets/Team/Jainam Shah.jpg";
import HarsheelSharma from "../assets/Team/Harsheel Sharma.jpg";
import JheelPatel from "../assets/Team/Jheel Patel.jpg";
import ShrirangDeshmukh from "../assets/Team/Shrirang Deshmukh.jpg";
import DevShah from "../assets/Team/Dev Shah.jpg";
import MahekSureja from "../assets/Team/Mahek Sureja.jpg";
// import AsmiSavla from "../assets/Team/Asmi Savla.jpg";
import HarshKeniya from "../assets/Team/Harsh Keniya.jpg";
// import AsviShah from "../assets/Team/Asvi Shah.jpg";
// import DeepDoshi from "../assets/Team/Deep Doshi.jpg";
import ShriyaKela from "../assets/Team/Shriya Kela.jpg";
import DiyanMehta from "../assets/Team/Diyan Mehta.jpg";
import HitanshuShah from "../assets/Team/Hitanshu Shah.jpg";
import DhruviShah from "../assets/Team/Dhruvi Shah.jpg";
import UmangDuwani from "../assets/Team/Umang Duwani.jpg";
import NeetJain from "../assets/Team/Neet Jain.jpg";



const generateFacultyData = () => ({
  Principal: [
    { name: "Dr. Hari Vasudevan", imageUrl: "path_to_principal_image.jpg" },
  ],
  ProgramOfficers: [
    { name: "Prof. Vyankatesh Bagal", imageUrl: "path_to_bagal_image.jpg" },
    { name: "Prof. Rahul Taware", imageUrl: "path_to_taware_image.jpg" },
    { name: "Prof. Alisha Banz", imageUrl: "path_to_banz_image.jpg" },
  ],
});

// Function to generate empty core structure for previous years
const emptyCoreData = {
  upperCore: {},
  heads: {},
};

// Function to generate empty volunteer list
const emptyVolunteers = [];

// Team data for each year
const Team_23_24 = {
  faculty: generateFacultyData(),
  core: {
    upperCore: {
      Chairperson: [{ name: "Dev Popat", imageUrl: DevPopat }],
      ViceChairperson: [
        { name: "Shashank Naik", imageUrl: ShashankNaik },
        { name: "Parna Mishra", imageUrl: ParnaMishra },
      ],
      Secretary: [
        { name: "Rushabh Mehta", imageUrl: RushabhMehta },
      ],
      JointSecretary: [
        { name: "Yash Dalvi", imageUrl:   YashDalvi },
        { name: "Bhavy Shah", imageUrl: BhavyShah },
      ],
      Treasurer: [
        { name: "Cleon Lopes", imageUrl: CleonLopes },
      ],
      JointTreasurer: [
        { name: "Archi Patel", imageUrl: ArchiPatel },
        { name: "Manit Rathod", imageUrl: ManitRathod },
      ],
    },
    heads: {
      Publicity: [
        { name: "Umang Duwani", imageUrl: UmangDuwani },
        { name: "Agam Kamdar", imageUrl: AgamKamdar },
        { name: "Neet Jain", imageUrl: NeetJain },
        { name: "Jaiwin Mehta", imageUrl: JaiwinMehta },
      ],
      Technical: [
        { name: "Ansh Shah", imageUrl: AnshShah },
        { name: "Jainam Shah", imageUrl: JainamShah },
        { name: "Harsheel Sharma", imageUrl: HarsheelSharma },
      ],
      Events: [
        { name: "Jheel Patel", imageUrl: JheelPatel },
        { name: "Shrirang Deshmukh", imageUrl: ShrirangDeshmukh },
        { name: "Dev Shah", imageUrl: DevShah },
        { name: "Mahek Sureja", imageUrl: MahekSureja },
      ],
      Creatives: [
        { name: "Asmi Savla", imageUrl: "" },
        { name: "Harsh Keniya", imageUrl: HarshKeniya },
      ],
      SocialMedia: [
        { name: "Asvi Shah", imageUrl: "" },
        { name: "Deep Doshi", imageUrl: "" },
      ],
      Editorial: [
        { name: "Shriya Kela", imageUrl: ShriyaKela },
        { name: "Diyan Mehta", imageUrl: DiyanMehta },
        { name: "Hitanshu Shah", imageUrl: HitanshuShah },
        { name: "Dhruvi Shah", imageUrl: DhruviShah },
      ],
    },
  },
  volunteers: [
    { name: "Devesh Bhayani", imageUrl: "path_to_bhayani_image.jpg" },
    { name: "Hriday Thakkar", imageUrl: "path_to_thakkar_image.jpg" },
    { name: "Ayushi Shah", imageUrl: "path_to_shah_image.jpg" },
    { name: "Upasana Shah", imageUrl: "path_to_shah_image.jpg" },
  ],
};

// Simplified data for previous years
const Team_22_23 = {
  faculty: generateFacultyData(),
  core: {
    upperCore: {
      Chairperson: [
        { name: "Rugved Mahulkar", imageUrl: "path_to_mahulkar_image.jpg" },
      ],
      ViceChairperson: [
        { name: "Ayush Tolia", imageUrl: "path_to_tolia_image.jpg" },
      ],
      Secretary: [
        { name: "Nirali Hirpara", imageUrl: "path_to_hirpara_image.jpg" },
      ],
      Treasurer: [
        { name: "Deep Bhanushali", imageUrl: "path_to_bhanushali_image.jpg" },
      ],
      JointTreasurer: [
        { name: "Meera Dedhia", imageUrl: "path_to_dedhia_image.jpg" },
      ],
    },
    heads: {}, // Heads can be expanded similarly
  },
  volunteers: emptyVolunteers,
};

const Team_21_22 = {
  faculty: generateFacultyData(),
  core: emptyCoreData,
  volunteers: emptyVolunteers,
};
const Team_20_21 = {
  faculty: generateFacultyData(),
  core: emptyCoreData,
  volunteers: emptyVolunteers,
};
const Team_19_20 = {
  faculty: generateFacultyData(),
  core: emptyCoreData,
  volunteers: emptyVolunteers,
};

// Export all team data
export { Team_23_24, Team_22_23, Team_21_22, Team_20_21, Team_19_20 };
