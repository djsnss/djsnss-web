import { motion } from 'framer-motion'

const VolunteerFillerSection = () => {
    return (
        <motion.div className='mt-12'>
            {/* Notable People & Inspirational Stories Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-gray-100 p-8 rounded-lg shadow-lg mb-12"
            >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-0 md:p-4 text-center">Notable Volunteers & Inspirational Stories</h2>
                <div className="space-y-0 md:p-4">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="p-0 md:p-4"
                    >
                        <h3 className="text-md sm:text-lg lg:text-xl font-semibold text-gray-800 mb-4">Mother Teresa&apos;s Legacy</h3>
                        <p className="text-gray-600">
                            Mother Teresa devoted her life to serving the poor and destitute around the world. Her selfless work through the Missionaries of Charity continues to inspire volunteers across the globe.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="p-0 md:p-4"
                    >
                        <h3 className="text-md sm:text-lg lg:text-xl font-semibold text-gray-800 mb-4">Dr. APJ Abdul Kalam&apos;s Vision</h3>
                        <p className="text-gray-600">
                            Dr. APJ Abdul Kalam, the &apos;People&apos;s President,&apos; emphasized giving back to society through education and social service. His contributions continue to motivate young volunteers to take up social causes.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="p-0 md:p-4"
                    >
                        <h3 className="text-md sm:text-lg lg:text-xl font-semibold text-gray-800 mb-4">NSS Alumni Achievements</h3>
                        <p className="text-gray-600">
                            National Service Scheme (NSS) alumni have achieved remarkable success, including K. Radhakrishnan, former ISRO chairman, who actively volunteered during his college days, instilling a lifelong spirit of service.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Connecting with Nature & Rural India Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-gray-100 p-8 rounded-lg shadow-lg mb-12"
            >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-0 md:p-4 text-center">Connecting with Nature & Rural India</h2>
                <p className="text-gray-600 text-lg mb-4">
                    NSS brings you closer to nature and rural communities, offering a wholesome experience that promotes both environmental awareness and rural development. Through hands-on involvement in projects like tree plantations, village development, and clean energy initiatives, volunteers learn the importance of preserving natural resources.
                </p>
                <p className="text-gray-600 text-lg">
                    Volunteering in rural areas exposes you to different cultures, traditions, and the beauty of simplicity, fostering personal growth and a deeper understanding of India’s diversity.
                </p>
            </motion.div>


            {/* Government Schemes Promoting Social Work */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-gray-100 p-8 rounded-lg shadow-lg mb-12"
            >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-0 md:p-4 text-center">Government Schemes Supporting Volunteering</h2>
                <ul className="list-disc ml-0 md:p-4 sm:ml-8 lg:ml-10 text-gray-600">
                    <li>
                        <strong>National Service Scheme (NSS):</strong> A nationwide youth program encouraging students to engage in community service and social welfare activities.
                    </li>
                    <li>
                        <strong>Swachh Bharat Abhiyan:</strong> A national campaign launched by the Government of India to clean streets, roads, and infrastructure across India, promoting volunteer-driven cleanliness drives.
                    </li>
                    <li>
                        <strong>Atal Innovation Mission (AIM):</strong> Encourages youth to volunteer in developing innovative solutions for social challenges through grassroots initiatives.
                    </li>
                    <li>
                        <strong>Pradhan Mantri Kaushal Vikas Yojana (PMKVY):</strong> Volunteers are encouraged to join skill development programs aimed at empowering disadvantaged communities with vocational training.
                    </li>
                </ul>
            </motion.div>
        </motion.div>
    )
}

export default VolunteerFillerSection