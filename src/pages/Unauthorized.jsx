import React from 'react';
import { XCircle } from 'lucide-react';

const Unauthorized = ({ onBackToHome }) => {
  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full px-6 bg-[#f1f8ff]">
        <XCircle className="w-16 h-16 text-red-500" />
        <p className="text-2xl text-[#003366] mt-4">401 - Unauthorized</p>
        <p className="text-lg text-[#387fa8] mt-2 text-center">
          Oops! It looks like you’re not authorized to view this page. Please check your
          credentials or contact support if you believe this is an error.
        </p>
        <button
          onClick={onBackToHome}
          className="mt-6 px-6 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
