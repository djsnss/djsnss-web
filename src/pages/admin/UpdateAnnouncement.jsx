import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Popup component for editing an announcement.
 * Receives an announcement and callbacks for closing and updating.
 */
function EditAnnouncementPopup({ announcement, onClose, onAnnouncementUpdated }) {
  const [formData, setFormData] = useState({
    title: announcement.title,
    type: announcement.type,
    content: announcement.content || "",
    url: announcement.url || "",
    file: null,
    // Store the existing file info if available
    existingFile: announcement.type === "pdf" ? announcement.link : null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Validate form based on announcement type
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = "Title is required.";

    if (formData.type === "text") {
      if (!formData.content?.trim())
        newErrors.content = "Content is required for text announcements.";
    } else if (formData.type === "pdf") {
      // If updating a PDF announcement, we don't require a new file
      // unless the existing file is being replaced
      if (!formData.existingFile && !formData.file) {
        newErrors.file = "File is required for PDF announcements.";
      }
    } else if (formData.type === "link") {
      if (!formData.url?.trim()) newErrors.url = "URL is required for link announcements.";
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
        existingFile: null, // Clear existing file as we're uploading a new one
      }));
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      type: newType,
      // Reset type-specific fields when changing types
      ...(newType === "text" ? { url: "", file: null, existingFile: null } : {}),
      ...(newType === "pdf" ? { content: "", url: "" } : {}),
      ...(newType === "link" ? { content: "", file: null, existingFile: null } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("adminAuthToken");
      const formDataToSend = new FormData();
      
      // Add common fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("type", formData.type);
      
      // Add type-specific fields
      if (formData.type === "text") {
        formDataToSend.append("content", formData.content);
      } else if (formData.type === "link") {
        formDataToSend.append("url", formData.url);
      } else if (formData.type === "pdf") {
        if (formData.file) {
          formDataToSend.append("file", formData.file);
        } else if (formData.existingFile) {
          formDataToSend.append("existingFile", "keep"); // Signal to keep existing file
        }
      }

      const response = await axios.put(
        `https://djsnss-web.onrender.com/announcement/update-announcement/${announcement._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Announcement updated successfully");
      onAnnouncementUpdated({
        ...announcement,
        ...formData,
        link: formData.type === "pdf" ? 
          (formData.file ? URL.createObjectURL(formData.file) : announcement.link) : 
          undefined
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Close the popup when the "Esc" key is pressed
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      {/* Popup Card */}
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 bg-red-500 text-white rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-[#003366] mb-4">Edit Announcement</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={formData.type}
              onChange={handleTypeChange}
              className="w-full p-2 border border-[#387fa8] rounded-md"
            >
              <option value="text">Text Only</option>
              <option value="pdf">PDF Document</option>
              <option value="link">External Link</option>
            </select>
          </div>

          {/* Conditional fields based on announcement type */}
          {formData.type === "text" && (
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

          {formData.type === "link" && (
            <div>
              <label className="block text-sm font-medium text-[#003366]">
                External Link URL *
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${
                  errors.url ? "border-red-500" : "border-[#387fa8]"
                }`}
                placeholder="https://example.com"
              />
              {errors.url && (
                <p className="text-red-500 text-sm">{errors.url}</p>
              )}
            </div>
          )}

          {formData.type === "pdf" && (
            <div>
              <label className="block text-sm font-medium text-[#003366]">
                PDF Document
              </label>
              <div className="relative">
                {formData.existingFile && !formData.file ? (
                  <div className="flex items-center justify-between p-2 border rounded-md border-[#387fa8]">
                    <span>Current file: {formData.existingFile.split('/').pop()}</span>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, existingFile: null }))}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : formData.file ? (
                  <div className="flex items-center justify-between p-2 border rounded-md border-[#387fa8]">
                    <span>{formData.file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ 
                        ...prev, 
                        file: null,
                        existingFile: announcement.type === "pdf" ? announcement.link : null
                      }))}
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
                          Upload a PDF file
                        </span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        {errors.file && (
                          <p className="text-red-500 mt-6 text-sm">{errors.file}</p>
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-[#003366] rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
            >
              {loading ? "Updating..." : "Update Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Main component that lists announcements and provides editing capabilities.
 */
const UpdateAnnouncement = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Fetch the list of announcements
  useEffect(() => {
    if (!localStorage.getItem("adminAuthToken")) {
      window.location.href = "/unauthorized";
      return;
    }

    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem("adminAuthToken");
        const response = await axios.get(
          "https://djsnss-web.onrender.com/announcement/get-announcements",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (response.data && Array.isArray(response.data)) {
          setAnnouncements(response.data);
        } else if (response.data && Array.isArray(response.data.announcements)) {
          setAnnouncements(response.data.announcements);
        } else {
          setError("Invalid response format received");
        }
      } catch (err) {
        setError(err.message || "Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Handle edit announcement selection
  const handleEditAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  // Close edit popup
  const closeEditPopup = () => {
    setSelectedAnnouncement(null);
  };

  // Handle successful update
  const handleAnnouncementUpdated = (updatedAnnouncement) => {
    setAnnouncements((prev) =>
      prev.map((item) => 
        item._id === updatedAnnouncement._id ? updatedAnnouncement : item
      )
    );
  };

  // Handle delete confirmation
  const openDeleteConfirmation = (announcement) => {
    setDeleteConfirmation(announcement);
  };

  // Close delete confirmation
  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  // Delete the announcement
  const handleDeleteAnnouncement = async () => {
    if (!deleteConfirmation) return;
    
    try {
      const token = localStorage.getItem("adminAuthToken");
      await axios.delete(
        `https://djsnss-web.onrender.com/announcement/delete-announcement/${deleteConfirmation._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Remove from the local state
      setAnnouncements((prev) => 
        prev.filter((item) => item._id !== deleteConfirmation._id)
      );
      
      closeDeleteConfirmation();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Failed to delete announcement: " + (error.response?.data?.message || error.message));
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="w-full flex flex-col bg-white min-h-screen">
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
        <h1 className="mt-4 text-4xl font-bold">Manage Announcements</h1>
        <p className="mt-2 text-xl">Select an announcement to update its details</p>
      </div>

      {/* Content */}
      <div className="p-6 bg-[#f1f8ff] flex-1">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-[#003366]">Loading announcements...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">All Announcements</h2>
            
            {announcements.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No announcements found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-[#f1f8ff]">
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map((announcement) => (
                      <tr key={announcement._id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">{announcement.title}</td>
                        <td className="px-4 py-3 capitalize">{announcement.type}</td>
                        <td className="px-4 py-3">{formatDate(announcement.date)}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditAnnouncement(announcement)}
                              className="px-3 py-1 bg-[#387fa8] text-white text-sm rounded hover:bg-[#005a8e]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteConfirmation(announcement)}
                              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Popup */}
      {selectedAnnouncement && (
        <EditAnnouncementPopup
          announcement={selectedAnnouncement}
          onClose={closeEditPopup}
          onAnnouncementUpdated={handleAnnouncementUpdated}
        />
      )}

      {/* Delete Confirmation Popup */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-[#003366] mb-4">Confirm Delete</h3>
            <p>
              Are you sure you want to delete the announcement "{deleteConfirmation.title}"? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 bg-gray-300 text-[#003366] rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAnnouncement}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAnnouncement;