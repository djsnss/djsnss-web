import React from 'react';
import {Link} from "react-router-dom"; 
import LinesEllipsis from 'react-lines-ellipsis';

const Card = ({ title, image, content, authorName, date , slug }) => {

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden m-4 w-full max-w-md flex flex-col h-full font-poppins">
      {/* Title */}
      <div className="px-11 py-8 font-semibold text-2xl font-sans">{title}</div>
      
      {/* Image */}
      <div className="overflow-hidden h-[40vh] sm:h-[38vh] lg:h-[35vh]">
        <img src={image} alt={title} className=" w-full h-full object-cover hover:scale-110 transition-transform duration-300 hover:opacity-85 " />
      </div>

      {/* Content Preview */}
      <div className="px-4 py-5 text-black text-lg ">
        <LinesEllipsis
          text={content}
          maxLine='5'
          ellipsis='...'
          trimRight
          basedOn='letters'
        />
      </div>
      <div className="px-4 pb-4">
        <Link to={`/blog/${slug}`} className="text-[#041887] hover:underline text-md">Continue Reading →</Link>
      </div>
      {/* Author & Date */}
      <div className="px-4 pb-2 text-sm text-black">
        Author: <span className='font-bold underline'>{authorName}  </span> 
      </div>
      <div className="px-4 pb-2 text-sm text-black">
        Published On: {date}   
      </div>
      {/* Continue Reading */}
      
    </div>
  );
};

export default Card;
