
import React from 'react'
import { useLocation, Link } from "react-router-dom";

const BlogPage = () => {
  const location = useLocation();
  const { title, image, content, authorName, date } = location.state || {};

  return (

    <div className="my-auto flex items-center justify-center bg-[#CBE3FF] py-10 md:py-16 px-4 md:px-8">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-8 font-poppins">

        <div className='font-semi-bold text-5xl font-poppins py-4'>
          {title}
        </div>

        <div className=" w-full mb-6 rounded-md overflow-hidden rounded-xl">
          <img src={image} alt={title}></img>
        </div>

        <div className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-line">
          content{content}
        </div>

        <div className='font-bold'>
          Author: <span className=' underline '>{authorName}  </span>
        </div>
        <div className='py-4 text-l'>Thank You </div>
      </div>
    </div>
  );
}

export default BlogPage