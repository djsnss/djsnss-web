import React from 'react';
import {Link} from "react-router-dom"; 
import LinesEllipsis from 'react-lines-ellipsis';
import logo from '../../assets/DJSNSSLogo.png';

const Card = ({ title, image, content, authorName, date , slug }) => {

  return (
    <div className="bg-white  shadow-md overflow-hidden m-4 w-full max-w-md flex flex-col h-full font-poppins relative">
      {/* Title */}
      <div className="px-11 py-6 font-semibold text-2xl font-sans">{title}</div>
      
       {/* Image */}
      <div className="overflow-hidden h-[40vh] sm:h-[38vh] lg:h-[35vh] relative">
        {/* top-center "v" notch overlapping the title area - adjust w-6/h-6 and -top-3 to change size/position */}
        <div className="absolute -top-3 left-12  w-6 h-6 rotate-45 bg-white shadow-md z-20 pointer-events-none" />
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 hover:opacity-85" />
        <img 
          src={logo} 
          alt="NSS Logo" 
          className="absolute top-2 right-2 w-12 h-12 object-contain bg-white/70 backdrop-blur-sm rounded-full p-1"
        />
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
          <Link to={`/blog/${slug}`} state={{ title, image, content, authorName, date }}
           className="text-blue-600 hover:underline text-sm">Continue Reading →</Link>
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
