import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GenerateCertificate = () => {
    return (
        <div className="w-full mt-14 mb-2 flex flex-col justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-6xl "
            >
                <div className="text-center mb-12">
                    <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-6 text-black">
                        Generate Certificate for Past Events
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-black">
                        Generate certificates for the events you have participated in.
                    </p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center mb-6"
                >
                    <Link
                        to="https://djsnss-certificate.streamlit.app"
                        className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out text-lg"
                        target="_blank" rel="noreferrer">
                        Generate Certificate
                    </Link>
                </motion.div>

            </motion.div>
        </div>
    );
}

export default GenerateCertificate;