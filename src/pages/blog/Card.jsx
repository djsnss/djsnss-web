import React from 'react';
import {Link} from "react-router-dom"; 

const Card = ({ title, image, content, authorName, date , slug }) => {

  // Truncate content for preview
  const preview = content.length > 180 ? content.slice(0, 180) + '...' : content;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden m-4 w-full max-w-md flex flex-col h-full font-poppins">
      {/* Title */}
      <div className="px-4 pt-4  pb-2 font-semibold text-2xl">{title}</div>
      
      {/* Image */}
      <div className="overflow-hidden h-[40vh] sm:h-[38vh] lg:h-[35vh]">
        <img src={image} alt={title} className=" w-full h-full object-cover hover:scale-110 transition-transform duration-300 hover:opacity-85 " />
      </div>

      {/* Content Preview */}
      <div className="px-4 py-2 text-gray-700 text-sm ">{preview}</div>
      <div className="px-4 pb-4">
        <Link to={`/blog/${slug}`} className="text-blue-600 hover:underline text-sm">Continue Reading →</Link>
      </div>
      {/* Author & Date */}
      <div className="px-4 pb-2 text-xs text-gray-500">
        Author: <span className='font-bold underline '>{authorName}  </span> 
      </div>
      <div className="px-4 pb-2 text-xs text-gray-500">
        Date: {date}   
      </div>
      {/* Continue Reading */}
      
    </div>
  );
};

export default Card;
