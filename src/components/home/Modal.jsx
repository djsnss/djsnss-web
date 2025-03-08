import { motion } from 'framer-motion';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white bg-opacity-75 backdrop-filter backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full relative border border-gray-200"
      >
        <button 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div className="text-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;