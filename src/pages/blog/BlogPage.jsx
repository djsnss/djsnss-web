import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomLoader2 from "../../components/Loaders/CustomLoader2"; 

const BlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const encodedSlug = encodeURIComponent(slug);
        const res = await fetch(`https://djsnss-web.onrender.com/blogs/${encodedSlug}`);
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

  if (loading)
    return <CustomLoader2 />;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!blog)
    return <div className="text-center py-20">No blog found</div>;

  const { title, image, content, authorName, date } = blog;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB")
    : "Unknown date";
  const modifyDate = formattedDate.replace(/\//g, "-");

  return (
    <div className="my-auto flex items-center justify-center bg-[#CBE3FF] py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-8">
      <div className="mt-10 relative bg-white shadow-lg w-[95%] sm:w-[90%] p-3 sm:p-4 md:p-8 font-poppins ">
        {/* Logo */}
        <img
          src="../src/assets/DJSNSSLogo.png"
          alt="Logo"
          className="absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 object-contain"
        />

        {/* Title */}
        <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl px-11 py-4 sm:py-6 ">
          {title}
        </h1>

        {/* Image */}
        <div className="w-full h-[60vh] sm:h-[68vh] lg:h-[75vh] mb-6 rounded-xl overflow-hidden mt-4">
          <img src={image} alt={title} className="w-full object-contain" />
        </div>

        {/* Content */}
        <p className="text-black text-sm sm:text-base md:text-lg mb-8 whitespace-pre-line leading-relaxed">
          {content}
        </p>

        {/* Author + Date */}
        <div className="font-bold">
          Author: <span className="underline">{authorName}</span>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Published on: {modifyDate}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
