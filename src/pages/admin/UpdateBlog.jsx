import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import EditBlogPopup from "./EditBlogPopup";
import toast from "react-hot-toast";

export default function UpdateBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // for confirmation modal
  const navigate = useNavigate();

  // ✅ Check admin auth
  useEffect(() => {
    if (!localStorage.getItem("adminAuthToken")) {
      navigate("/unauthorized");
    }
  }, [navigate]);

  // ✅ Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://djsnss-web.onrender.com/blogs");

        const blogsData = Array.isArray(res.data.Blogs)
          ? res.data.Blogs
          : Array.isArray(res.data.blogs)
          ? res.data.blogs
          : [];

        setBlogs(blogsData);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setErrorMessage("Failed to load blogs.");
        toast.error("Failed to load blogs.");
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  // ✅ Delete blog (triggered after confirmation)
  const confirmDeleteBlog = async () => {
    if (!deleteTarget) return;
    try {
       const token = localStorage.getItem("adminAuthToken");
      await axios.delete(
        `https://djsnss-web.onrender.com/blogs/${deleteTarget.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogs((prev) => prev.filter((b) => b.slug !== deleteTarget.slug));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteTarget(null);
    }
  };

  // ✅ Edit blog popup handlers
  const handleSelectBlog = (blog) => setSelectedBlog(blog);
  const closePopup = () => setSelectedBlog(null);

  // ✅ Blog updated
  const handleBlogUpdated = (updated) => {
    setBlogs((prev) =>
      prev.map((b) => (b.slug === updated.slug ? updated : b))
    );
    toast.success("Blog updated successfully!");
    closePopup();
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#f1f8ff] text-[#003366]">
      {/* Header */}
      <div className="w-full bg-[#003366] py-6 text-center text-white shadow-md mb-6">
        <div className="flex items-center justify-start px-6 mb-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center text-white hover:text-gray-200 transition"
          >
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-8 pb-4">Update Blogs</h1>
      </div>

      {/* Content */}
      <div className="p-6 w-full max-w-7xl">
        {loadingBlogs ? (
          <p className="text-center text-gray-600">Loading blogs...</p>
        ) : errorMessage ? (
          <p className="text-center text-red-500">{errorMessage}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#003366]">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {blog.authorName || "Unknown Author"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(blog.date).toLocaleDateString()}
                  </p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleSelectBlog(blog)}
                      className="px-4 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(blog)}
                      className="px-4 py-2 bg-[#d9534f] text-white rounded-md hover:bg-[#c9302c] flex items-center"
                    >
                      <MdOutlineDelete className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Popup */}
      {selectedBlog && (
        <EditBlogPopup
          blog={selectedBlog}
          onClose={closePopup}
          onBlogUpdated={handleBlogUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
            <h3 className="text-xl font-semibold text-[#003366] mb-3">
              Delete Blog?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#003366]">
                {deleteTarget.title}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteBlog}
                className="px-5 py-2 bg-[#d9534f] text-white rounded-md hover:bg-[#c9302c] transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
