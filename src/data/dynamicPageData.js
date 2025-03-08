// propsData.js

import NSSCamp from '../assets/Camp.jpg';
import GrainAThon from '../assets/Grains.png';
import BDD from '../assets/Events/bdd/bdd5.jpg';
import Camp1 from '../assets/Events/camp/camp1.jpg';
import Camp2 from '../assets/Events/camp/camp2.jpg';
import Camp3 from '../assets/Events/camp/camp3.jpg';
import Camp4 from '../assets/Events/camp/camp4.jpg';
import Camp5 from '../assets/Events/camp/camp5.jpg';
import Camp6 from '../assets/Events/camp/camp6.jpg';
import Grain3 from '../assets/Events/grainathon/GrainAThon.png';
import Grain1 from '../assets/Events/grainathon/grainathon1.png';
import Grain5 from '../assets/Events/grainathon/grainathon2.png';
import GrainathonPreview from '../assets/Events/grainathon/grainathon3.png';
import Grain4 from '../assets/Events/grainathon/grainathon4.png';
import Grain2 from '../assets/Events/grainathon/grainathon5.png';
import Grain6 from '../assets/Events/grainathon/grainathon6.png';
import BDD1 from '../assets/Events/bdd/bdd1.jpg';
import BDD2 from '../assets/Events/bdd/bdd2.jpg';
import BDD3 from '../assets/Events/bdd/bdd3.jpg';
import BDD4 from '../assets/Events/bdd/bdd4.jpg';
import BDD5 from '../assets/Events/bdd/bdd5.jpg';
import BDD6 from '../assets/Events/bdd/bdd6.jpg';
import CampFeatured from '../assets/camp-highlight.jpg';

export const propsData = [
  {
    id: 1,
    title: '7 Days Camp',
    description: `
From January 26 to 31, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized an enriching camp at Dahanu, aiming to foster community service and personal growth. The camp began with activities like cleanliness drives, team-building exercises, and creative endeavors such as poster making and wall painting. These initiatives not only encouraged teamwork but also strengthened the participants’ connection to the local community.
<br/><br/>
As the week progressed, volunteers engaged in a variety of impactful programs. Educational outreach sessions were conducted to inspire young minds, while a medical camp provided essential health services to the community. Environmental awareness drives emphasized the importance of sustainability and responsible living, aligning with the broader goals of the camp.
<br/><br/>
One of the most notable achievements was the installation of solar street lights, a testament to the camp's dedication to sustainable development. This initiative significantly benefited the local residents by enhancing safety and promoting eco-friendly practices.
<br/><br/>
The camp concluded with vibrant cultural celebrations, showcasing the talents of the volunteers and fostering a sense of unity. The experience left a profound impact on both the participants and the community, instilling a lasting sense of accomplishment and inspiration to continue making a difference.
    `,
    backgroundColor: 'dark-navy',
    bgImage: NSSCamp,
    featuredImage: CampFeatured,
    slug: 'nss-camp',
    location: 'Dahanu',
    date: '26th Jan - 31st Jan 2024',
    images: [Camp1, Camp2, Camp3, Camp4, Camp5, Camp6]
  },
  {
    id: 2,
    title: 'Grain-A-Thon',
    description: `In February 2024, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a week-long food donation drive, Grain-A-Thon, to combat food insecurity in Mumbai. The event aimed to raise awareness about hunger and food waste while collecting and distributing food to those in need. Volunteers collected donations from students, faculty, and local businesses, distributing over 1000 meals to underprivileged communities.
<br/><br/>
Throughout the week, volunteers worked tirelessly to ensure food reached those in need. The event received an overwhelming response, with donations pouring in from all corners, demonstrating a strong sense of community. Collaborations with local NGOs helped identify areas of highest need and coordinate distribution.
<br/><br/>
The initiative also raised awareness about food insecurity in urban areas, educating students and faculty on reducing food waste and supporting local food banks. Workshops on sustainable food practices encouraged participants to make more conscious food choices, fostering a culture of giving and responsibility.
<br/><br/>
The success of Grain-A-Thon highlighted the power of community-driven initiatives and left a lasting legacy of kindness, generosity, and social responsibility.`,
    backgroundColor: 'yellow-500',
    bgImage: GrainAThon,
    slug: 'grain-a-thon',
    location: 'Mumbai',
    featuredImage: GrainathonPreview,
    date: 'February 2024',
    images: [Grain1, Grain2, Grain3, Grain4, Grain5, Grain6]
  },
  {
    id: 3,
    title: 'Blood Donation Drive',
    description: `In March 2024, the NSS unit of Dwarkadas J. Sanghvi College of Engineering organized a blood donation drive in collaboration with the Bombay Blood Group. The event aimed to raise awareness about the importance of blood donation and encourage students, faculty, and staff to donate blood to save lives. The drive was a resounding success, with over 100 units of blood collected and a significant impact made on the lives of those in need.
<br/><br/>
The initiative was designed not only to address the critical need for blood but also to educate participants about the lifesaving power of a single donation. Throughout the day, volunteers assisted in guiding donors through the process, ensuring they were well-informed and comfortable. The atmosphere was filled with a sense of solidarity as individuals from various departments came together for this noble cause.
<br/><br/>
The partnership with the Bombay Blood Group added a level of expertise and efficiency to the drive, with medical professionals overseeing the entire process. The event saw participation from students who were first-time donors as well as regular donors, all contributing to the success of the campaign. Many donors expressed their gratitude for the opportunity to contribute to saving lives, reinforcing the importance of community participation in such vital initiatives.
<br/><br/>
In addition to the blood donation itself, informational sessions were conducted to dispel myths and raise awareness about the necessity of regular blood donations. These sessions also highlighted how blood donations are crucial in times of medical emergencies, surgeries, and for patients suffering from chronic illnesses.
<br/><br/>
The success of the blood donation drive reflected the strength of the college community's commitment to making a positive impact. Not only did it help save lives in the immediate term, but it also set an inspiring example of how simple acts of kindness can have a profound effect on the health and well-being of countless individuals. The drive ended on a high note, with organizers and participants alike feeling a deep sense of accomplishment and pride in contributing to such a meaningful cause.`,
    backgroundColor: 'red-500',
    bgImage: BDD,
    featuredImage: "../assets/Events/bdd2.jpg",
    slug: 'blood-donation-drive',
    location: 'Mumbai',
    date: 'March 2024',
    images: [BDD1, BDD2, BDD3, BDD4, BDD5, BDD6]
  }
]
