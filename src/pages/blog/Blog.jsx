import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import CustomLoader2 from "../../components/Loaders/CustomLoader2"; 


const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://djsnss-web.onrender.com/blogs"
        );
        const data = await response.json();
        const formattedBlog = data.Blogs.map((blog) => {
          const blogDate = new Date(blog.date);
          const formattedDate = blogDate
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .split("/")
            .join("-");
          return { ...blog, date: formattedDate };
        });
        setBlogData(formattedBlog);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full bg-[#CBE3FF] min-h-screen flex flex-col items-center pt-20 font-roboto">
      <h1 className="mx-auto mb-6 py-2 lg:py-4 text-center text-4xl md:text-5xl lg:text-6xl font-bold font-geist text-black">
        BLOG
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CustomLoader2 />
        </div>
      ) : blogData.length === 0 ? (
        <p className="text-2xl md:text-3xl w-full text-center font-bold text-black">
          No Blogs Available
        </p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {blogData.map((blog) => (
            <Card
              key={blog._id}
              title={blog.title}
              image={blog.image}
              content={blog.content}
              authorName={blog.authorName}
              date={blog.date}
              slug={blog.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
