import React, { useState } from "react";
import axios from "axios";

export default function EditBlogPopup({ blog, onClose, onBlogUpdated }) {
  const [formData, setFormData] = useState({
    title: blog.title || "",
    content: blog.content || "",
    authorName: blog.authorName || "",
    image: blog.image || null,
  });

  const [previewImage, setPreviewImage] = useState(blog.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      const token = localStorage.getItem("adminAuthToken");
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("authorName", formData.authorName);
      if (formData.image instanceof File) data.append("image", formData.image);

      const res = await axios.put(
        `https://djsnss-web.onrender.com/blogs/${blog.slug}`,
        data,
        { headers: {
            Authorization: `Bearer ${token}`,
          }, }
      );

      onBlogUpdated(res.data);
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-lg shadow-lg p-6 relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-[#003366] mb-4">Edit Blog</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#003366] mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-[#387fa8]"
              required
            />
          </div>

          <div>
            <label className="block text-[#003366] mb-1">Author Name</label>
            <input
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-[#387fa8]"
              required
            />
          </div>

          <div>
            <label className="block text-[#003366] mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="8"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-[#387fa8]"
              required
            />
          </div>

          <div>
            <label className="block text-[#003366] mb-1">Image</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
