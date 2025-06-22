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
    pdfLink: null,
  });

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
      if (!formData.pdfLink)
        newErrors.pdfLink = "pdfLink is required for PDF announcements.";
    } else if (formData.typeOfContent === "link") {
      if (!formData.urlLink?.trim()) newErrors.urlLink = "urlLink is required for link announcements.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlepdfLinkUpload = (e) => {
    const pdfLink = e.target.pdfLinks[0];
    if (pdfLink) {
      setFormData((prev) => ({
        ...prev,
        pdfLink: pdfLink,
      }));
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      type: newType,
      // Reset type-specific fields when changing types
      ...(newType === "text" ? { urlLink: "", pdfLink: null } : {}),
      ...(newType === "pdf" ? { content: "", urlLink: "" } : {}),
      ...(newType === "link" ? { content: "", pdfLink: null } : {}),
    }));
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
      formDataToSend.append("type", formData.type);

      // Add type-specific fields
      if (formData.typeOfContent === "text") {
        formDataToSend.append("content", formData.content);
      } else if (formData.typeOfContent === "link") {
        formDataToSend.append("urlLink", formData.urlLink); // Changed from 'link' to 'urlLink'
      } else if (formData.typeOfContent === "pdf") {
        formDataToSend.append("pdfLink", formData.pdfLink); 
        // The server will generate the pdf_link from the uploaded pdfLink
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
        pdfLink: null,
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

        {/* Announcement Type */}
        <div>
          <label className="block text-sm font-medium text-[#003366]">
            Announcement Type *
          </label>
          <select
            name="type"
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
              type="urlLink"
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
              Upload PDF Document *
            </label>
            <div className="relative">
              {formData.pdfLink ? (
                <div className="flex items-center justify-between p-2 border rounded-md border-[#387fa8]">
                  <span>{formData.pdfLink.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, pdfLink: null }))
                    }
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <label className="block mt-2">
                      <span className="text-[#fff] p-4 bg-black/40 cursor-pointer">
                        Upload a PDF pdfLink
                      </span>
                      <input
                        type="pdfLink"
                        accept=".pdf"
                        onChange={handlepdfLinkUpload}
                        className="hidden"
                      />
                      {errors.pdfLink && (
                        <p className="text-red-500 mt-6 text-sm">{errors.pdfLink}</p>
                      )}
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
          >
            {loading ? "Creating..." : "Create Announcement"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
