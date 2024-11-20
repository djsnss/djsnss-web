// Function to generate common faculty data
const generateFacultyData = () => ({
  Principal: ['Dr. Hari Vasudevan'],
  ProgramOfficers: ['Prof. Vyankatesh Bagal', 'Prof. Rahul Taware', 'Prof. Alisha Banz'],
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
      Chairperson: ['Dev Popat'],
      ViceChairperson: ['Shashank Naik', 'Parna Mishra'],
      Secretary: ['Rushabh Mehta'],
      JointSecretary: ['Yash Dalvi', 'Bhavy Shah'],
      Treasurer: ['Cleon Lopes'],
      JointTreasurer: ['Archi Patel', 'Manit Rathod'],
    },
    heads: {
      Publicity: ['Umang Duwani', 'Agam Kamdar', 'Neet Jain', 'Jaiwin Mehta'],
      Technical: ['Ansh Shah', 'Jainam Shah', 'Harsheel Sharma'],
      Events: ['Jheel Patel', 'Shrirang Deshmukh', 'Dev Shah', 'Mahek Sureja'],
      Creatives: ['Asmi Savla', 'Harsh Keniya'],
      SocialMedia: ['Asvi Shah', 'Deep Doshi'],
      Editorial: ['Shriya Kela', 'Diyan Mehta', 'Hitanshu Shah', 'Dhruvi Shah'],
    },
  },
  volunteers: ['Devesh Bhayani', 'Hriday Thakkar', 'Ayushi Shah', 'Upasana Shah'],
};

// Simplified data for previous years
const Team_22_23 = {
  faculty: generateFacultyData(),
  core: {
    upperCore: {
      Chairperson: ['Rugved Mahulkar'],
      ViceChairperson: ['Ayush Tolia'],
      Secretary: ['Nirali Hirpara'],
      Treasurer: ['Deep Bhanushali'],
      JointTreasurer: ['Meera Dedhia'],
    },
    heads: {}, // Heads can be expanded similarly
  },
  volunteers: emptyVolunteers,
};

const Team_21_22 = { faculty: generateFacultyData(), core: emptyCoreData, volunteers: emptyVolunteers };
const Team_20_21 = { faculty: generateFacultyData(), core: emptyCoreData, volunteers: emptyVolunteers };
const Team_19_20 = { faculty: generateFacultyData(), core: emptyCoreData, volunteers: emptyVolunteers };

// Export all team data
export { Team_23_24, Team_22_23, Team_21_22, Team_20_21, Team_19_20 };
