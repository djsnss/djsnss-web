import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CreateAnnouncement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    typeOfContent: "text", // Default to text announcement
    content: "",
    urlLink: "",
    pdfLink: "",
    isNew: true, // Added isNew field with default as true
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminAuthToken")) {
      // Redirect to login if not authenticated
      window.location.href = "/unauthorized";
    }
  }, []);

  // Validate form based on announcement type
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = "Title is required.";

    if (formData.typeOfContent === "text") {
      if (!formData.content?.trim())
        newErrors.content = "Content is required for text announcements.";
    } else if (formData.typeOfContent === "pdf") {
      if (!pdfFile && !formData.pdfLink)
        newErrors.pdfLink = "PDF document is required for PDF announcements.";
    } else if (formData.typeOfContent === "link") {
      if (!formData.urlLink?.trim()) 
        newErrors.urlLink = "URL is required for link announcements.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      typeOfContent: newType,
      // Reset type-specific fields when changing types
      ...(newType === "text" ? { urlLink: "", pdfLink: "" } : {}),
      ...(newType === "pdf" ? { content: "", urlLink: "" } : {}),
      ...(newType === "link" ? { content: "", pdfLink: "" } : {}),
    }));
    
    if (newType !== "pdf") {
      setPdfFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("adminAuthToken");
      const formDataToSend = new FormData();

      // Add common fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("typeOfContent", formData.typeOfContent);
      formDataToSend.append("isNew", formData.isNew);

      // Add type-specific fields
      if (formData.typeOfContent === "text") {
        formDataToSend.append("content", formData.content);
      } else if (formData.typeOfContent === "link") {
        formDataToSend.append("urlLink", formData.urlLink);
      } else if (formData.typeOfContent === "pdf") {
        if (pdfFile) {
          formDataToSend.append("announcement", pdfFile);
        } else if (formData.pdfLink) {
          formDataToSend.append("pdfLink", formData.pdfLink);
        }
      }

      const response = await axios.post(
        "https://djsnss-web.onrender.com/announcement/create",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      setSuccessMessage("Announcement created successfully!");

      // Reset form
      setFormData({
        title: "",
        typeOfContent: "text",
        content: "",
        urlLink: "",
        pdfLink: "",
        isNew: true,
      });
      setPdfFile(null);
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
      <div className="bg-[#003366] text-center text-white py-8 relative">
        {/* Back Button */}
        <div className="mt-5 md:mt-8 ml-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-1 bg-white/80 hover:bg-white px-3 py-2 rounded-md shadow-sm text-[#003366] font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
        </div>
        <h1 className="mt-4 text-4xl font-bold">Create Announcement</h1>
        <p className="mt-2 text-xl">Add a new announcement to the system</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 bg-[#f1f8ff] w-full mx-auto"
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

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[#003366]">
            Announcement Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-[#387fa8]"
            }`}
            placeholder="Enter announcement title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Mark as New */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isNew"
            name="isNew"
            checked={formData.isNew}
            onChange={handleInputChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isNew" className="ml-2 text-sm font-medium text-[#003366]">
            Mark as New (displays a "New" badge on the announcement)
          </label>
        </div>

        {/* Announcement Type */}
        <div>
          <label className="block text-sm font-medium text-[#003366]">
            Announcement Type *
          </label>
          <select
            name="typeOfContent"
            value={formData.typeOfContent}
            onChange={handleTypeChange}
            className="w-full p-2 border border-[#387fa8] rounded-md"
          >
            <option value="text">Text Only</option>
            <option value="pdf">PDF Document</option>
            <option value="link">External Link</option>
          </select>
        </div>

        {/* Conditional fields based on announcement type */}
        {formData.typeOfContent === "text" && (
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Announcement Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={6}
              className={`w-full p-2 border rounded-md ${
                errors.content ? "border-red-500" : "border-[#387fa8]"
              }`}
              placeholder="Enter announcement content"
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>
        )}

        {formData.typeOfContent === "link" && (
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              External Link URL *
            </label>
            <input
              type="url"
              name="urlLink"
              value={formData.urlLink}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                errors.urlLink ? "border-red-500" : "border-[#387fa8]"
              }`}
              placeholder="https://example.com"
            />
            {errors.urlLink && (
              <p className="text-red-500 text-sm">{errors.urlLink}</p>
            )}
          </div>
        )}

        {formData.typeOfContent === "pdf" && (
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              PDF Document *
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#003366] mb-1">
                  Upload PDF File
                </label>
                <div className="relative">
                  {pdfFile ? (
                    <div className="flex items-center justify-between p-2 border rounded-md border-[#387fa8]">
                      <span>{pdfFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setPdfFile(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg">
                      <div className="text-center">
                        <label className="block mt-2">
                          <span className="px-4 py-2 bg-[#387fa8] text-white rounded cursor-pointer hover:bg-[#005a8e]">
                            Choose PDF File
                          </span>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handlePdfUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-500">- OR -</div>
              
              <div>
                <label className="block text-sm font-medium text-[#003366] mb-1">
                  Provide PDF Link
                </label>
                <input
                  type="url"
                  name="pdfLink"
                  value={formData.pdfLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com/document.pdf"
                  className="w-full p-2 border border-[#387fa8] rounded-md"
                />
              </div>
              
              {errors.pdfLink && (
                <p className="text-red-500 text-sm">{errors.pdfLink}</p>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Announcement"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
