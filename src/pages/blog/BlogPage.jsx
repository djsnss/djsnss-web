// import React from 'react'
// import { useLocation, Link } from "react-router-dom";

// const BlogPage = () => {
//   const location = useLocation();
//   const { title, image, content, authorName, date } = location.state || {};

//   return (

//     <div className="my-auto flex items-center justify-center bg-[#CBE3FF] py-10 md:py-16 px-4 md:px-8">
//       <div className="bg-white  shadow-lg max-w-4xl w-full p-8 font-poppins">

//         <div className='font-semi-bold text-5xl font-poppins py-4'>
//           {title}
//         </div>

//         <div className=" w-full mb-6 rounded-md overflow-hidden ">
//           <img src={image} alt={title}></img>
//         </div>

//         <div className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-line">
//          {content}
//         </div>

//         <div className='font-bold font-poppins'>
//           Author: <span className=' underline '>{authorName}  </span>
//         </div>
//         <div className='py-4 text-l font-poppins'>Thank You </div>
//       </div>
//     </div>
//   );
// }

// export default BlogPage

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `https://djsnss-web.onrender.com/blogs/${slug}`
        );
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setBlog(data.Blog || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return;
  <div className="text-center py-20">Loading...</div>;
  if (error) return;
  <div className="text-center py-20 text-red-500">{error}</div>;
  if (!blog) return;
  <div className="text-center py-20">No blog found</div>;

  const { title, image, content, authorName, date } = blog;

  return (
    <div className="my-auto flex items-center justify-center bg-[#CBE3FF] py-10 md:py-16 px-4 md:px-8">
      <div className="bg-white shadow-lg max-w-4xl w-full p-8 font-poppins">
        {/* 
        <h1 className="font-semibold text-4xl md:text-5xl py-4 justify-end">
          {title}</h1> */}

        <div className="flex items-center justify-between py-4">
          <h1 className="font-semibold text-4xl md:text-5xl">{title}</h1>
          <img
            src="../src/assets/DJSNSSLogo.png"
            alt="Logo"
            className="w-16 h-16 md:w-16 md:h-16 object-contain"
          />
        </div>

        <div className="w-full mb-6 rounded-l overflow-hidden">
          <img src={image} alt={title} className="w-full object-cover" />
          <div className=" w-full mb-6 rounded-md overflow-hidden">
            <img src={image} alt={title}></img>
          </div>

          <p className="text-gray-700 text-base md:text-lg  mb-8 whitespace-pre-line">
            {content}
          </p>

          <div className="font-bold">
            Author: <span className="underline">{authorName}</span>
          </div>
          <div className="text-sm text-gray-500 mt-2">Published on: {date}</div>

          <div className="py-4 text-lg font-medium">Thank You ! </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
