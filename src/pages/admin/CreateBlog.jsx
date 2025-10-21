import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    blogName: "",
    blogDescription: "",
    photo: null,
    startHours: "",
    endHours: "",
    TotalNoOfHours: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminAuthToken")) {
      window.location.href = "/unauthorized";
    }
  }, []);

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = "Event name is required.";
    if (!formData.slug?.trim()) newErrors.slug = "Slug is required.";
    if (!formData.description?.trim())
      newErrors.description = "Event description is required.";
    if (!formData.blogName?.trim())
      newErrors.blogName = "Blog name is required.";
    if (!formData.blogDescription?.trim())
      newErrors.blogDescription = "Blog description is required.";
    if (!formData.longDescription?.trim())
      newErrors.longDescription = "Long description is required.";
    if (!formData.photo) newErrors.photo = "Blog image is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.date) {
      setFormData((prev) => ({ ...prev, date: "TBD" }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("adminAuthToken");
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "photo") {
          formDataToSend.append("photo", formData.photo);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "https://djsnss-web.onrender.com/admin/createBlog",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      setSuccessMessage("Blog created successfully!");

      setFormData({
        name: "",
        slug: "",
        description: "",
        longDescription: "",
        blogName: "",
        blogDescription: "",
        photo: null,
        date: "",
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#003366] text-center text-white py-8">
        <div className="mt-5 md:mt-8 ml-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-1 bg-white/80 hover:bg-white px-3 py-2 rounded-md shadow-sm text-[#003366] font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
        </div>
        <h1 className="mt-4 text-4xl font-bold">Create Blog</h1>
        <p className="mt-2 text-xl">Fill in the blog details below</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 bg-[#f1f8ff] w-full"
      >
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md">
            {errorMessage}
          </div>
        )}

        {/* Blog Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#003366]">
            Blog Image *
          </label>
          <div className="relative">
            {formData.photo ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Blog preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2">
                  <label className="block">
                    <span className="text-[#fff] bg-black/40 p-4 cursor-pointer">
                      Replace Image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <label className="block mt-2">
                    <span className="text-[#fff] p-4 bg-black/40 cursor-pointer">
                      Upload an image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {errors.photo && (
                      <p className="text-red-500 mt-6 text-sm">
                        {errors.photo}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

    

        {/* Blog Title */}
        <div>
          <label className="block text-sm font-medium text-[#003366]">
            Blog Title *
          </label>
          <input
            type="text"
            name="blogTitle"
            value={formData.blogTitle}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${
              errors.blogName ? "border-red-500" : "border-[#387fa8]"
            }`}
          />
          {errors.blogTitle && (
            <p className="text-red-500 text-sm">{errors.blogTitle}</p>
          )}
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-sm font-medium text-[#003366]">
            Blog Content *
          </label>
          <textarea
            name="blogContent"
            value={formData.blogContent}
            onChange={handleInputChange}
            rows={4}
            className={`w-full p-2 border rounded-md ${
              errors.blogDescription ? "border-red-500" : "border-[#387fa8]"
            }`}
          />
          {errors.blogContent && (
            <p className="text-red-500 text-sm">{errors.blogContent}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-[#003366]">
            Author *
          </label>
          <input
            type="text"
            name="Author"
            value={formData.Author}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${
              errors.Author ? "border-red-500" : "border-[#387fa8]"
            }`}
          />
          {errors.Author && (
            <p className="text-red-500 text-sm">{errors.Author}</p>
          )}
        </div>


        {/*Date*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date === "TBD" ? "" : formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#387fa8] rounded-md"
            />
          </div>
          </div>
      
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
          >
            {loading ? "Saving..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
