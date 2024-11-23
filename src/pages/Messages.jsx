import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Background from '../assets/Events/TreePlantation.png';

const Messages = () => {
    const { slug } = useParams();

    const desks = [
        {
            index: 1,
            link: '/messages/dr-hari-vasudevan',
            name: 'Dr. Hari Vasudevan',
            role: 'Principal',
            image: 'src/principal-image.jpg',
            message: [
                'DJS NSS, the NSS unit of Dwarkadas J. Sanghvi College of Engineering commenced their journey in the year 2005 towards making each member of the unit a better citizen and therefore making India a better nation. It is a proud moment for all of us to witness the participation of students in various activities that are undertaken by NSS volunteers. We have been striving towards the social upliftment and well-being of society.',
                'The NSS unit has been actively involved in numerous activities such as health camps, tree plantations, education programs for underprivileged children, and disaster management training. These activities have shaped the lives of our students, making them more socially aware and responsible citizens. I am proud of the progress that our students continue to make, and I look forward to seeing their efforts bring about a positive change in the world.',
                'We have always believed in making a difference through action, and I am confident that the NSS unit will continue to grow and contribute to our nation\'s development in the years to come.',
            ],
        },
        {
            index: 2,
            link: '/messages/prof-vyankatesh-bagal',
            name: 'Prof. Vyankatesh Bagal',
            role: 'Program Officer',
            image: 'src/program-officer-image.jpg',
            message: [
                'Dear Students, As the Program Officer of the NSS unit at Dwarkadas J. Sanghvi College of Engineering, I am honored to address the profound ethos encapsulated in our motto: "Not Me But You." The activities of NSS are',
                'The volunteers of NSS play a crucial role in the implementation of various social programs and projects. From organizing blood donation camps to participating in awareness drives, our students consistently work towards the well-being of the society. The true spirit of volunteering lies in the desire to make a positive impact on the community, and it is truly heartening to see our students display this commitment.',
                'As a Program Officer, my role is to guide and support these volunteers, ensuring they make the most of their experiences. Together, we will continue to strive for excellence in service and work towards a society that is just, equitable, and compassionate.',
            ],
        },
        {
            index: 3,
            link: '/messages/prof-alisha-banz',
            name: 'Prof. Alisha Banz',
            role: 'Program Officer',
            image: 'src/program-officer-image.jpg',
            message: [
                'It gives me immense pleasure to be a part of the National Service Scheme (NSS) wing of our institute. DJS NSS has been an integral part of our institution\'s commitment to community service and social responsibility. Over the years, our NSS volunteers have actively participated in various community development programs, environmental initiatives, and social welfare activities like the solar lights installation at Narpad and the Blood Donation drive in DJSCE.',
                'Their dedication and enthusiasm have not only benefited the communities around us but have also enriched their own lives with valuable experiences and life lessons of living at a campsite with bare essentials and thriving. I encourage all students to actively',
                'I extend my heartfelt appreciation to all NSS volunteers, past and present, for their unwavering commitment to the service of others.',
            ],
        },
        {
            index: 4,
            link: '/messages/prof-rahul-taware',
            name: 'Prof. Rahul Taware',
            role: 'Program Officer',
            image: 'src/program-officer-image2.jpg',
            message: [
                'NSS is an extraordinary experience that allows students to contribute meaningfully to society while developing themselves as leaders. As the Program Officer for the NSS unit, it has been a privilege to guide young minds who are eager to make a difference.',
                'Through our activities, such as environmental sustainability campaigns, education drives, and community outreach programs, students engage with social issues and work toward their resolution. We encourage participation in national and international events, fostering global citizenship among our volunteers.',
                'It is truly fulfilling to witness the transformation in our volunteers as they embrace leadership roles and develop a strong sense of social responsibility. I look forward to their continued growth and contributions to society.',
            ],
        },
    ];
    const messageData = desks.find((desk) => desk.link.endsWith(slug));

    if (!messageData) {
        return <h2 className="text-white text-center mt-10">Message not found.</h2>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="message-container w-full min-h-screen bg-cover bg-fixed bg-center"
            style={{ backgroundImage: `url(${Background})` }}
        >
            <div className='w-full min-h-screen backdrop-blur-3xl p-10'>
            <h1 className="text-3xl font-bold mb-4">{messageData.name}</h1>
            <h2 className="text-xl font-semibold text-white mb-6">{messageData.role}</h2>
            <img src={messageData.image} alt={messageData.name} className="w-full h-64 object-cover mb-6 text-white" />
            <div className="message-content space-y-4 text-lg leading-relaxed text-white">
                {messageData.message.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            </div>
        </motion.div>
    );
};

export default Messages;
