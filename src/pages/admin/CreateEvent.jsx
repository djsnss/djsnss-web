import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    photo: null,
    startHours: "",
    endHours: "",
    TotalNoOfHours: "",
    date: "",
    location: "",
    maxVolunteers: 50,
    status: "Upcoming",
    scope: "Local",
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

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = "Name is required.";
    if (!formData.slug?.trim()) newErrors.slug = "Slug is required.";
    if (!formData.description?.trim())
      newErrors.description = "Description is required.";
    if (!formData.longDescription?.trim())
      newErrors.longDescription = "Long description is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.location?.trim())
      newErrors.location = "Location is required.";
    if (!formData.photo) newErrors.photo = "Event image is required.";
    if (!formData.TotalNoOfHours)
      newErrors.TotalNoOfHours = "Total hours is required.";
    if (formData.maxVolunteers < 1)
      newErrors.maxVolunteers = "Must allow at least 1 volunteer.";
    console.log("formData in validateForm:", formData);

    setErrors(newErrors);
    console.log("Errors:", newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    console.log("Before update:", formData);
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      console.log("After update:", updated);
      return updated;
    });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file, // Store the file, not a URL
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("adminAuthToken"); // Replace with your token logic
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "photo") {
          formDataToSend.append("photo", formData.photo); // Append the file
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      const response = await axios.post(
        "https://djsnss-web.onrender.com/admin/createEvent", // API endpoint
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      setSuccessMessage("Event created successfully!");

      // Reset the form on success
      setFormData({
        name: "",
        slug: "",
        description: "",
        longDescription: "",
        photo: null,
        startHours: "",
        endHours: "",
        TotalNoOfHours: "",
        date: "",
        location: "",
        maxVolunteers: 50,
        status: "Upcoming",
        scope: "Local",
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
        <h1 className="text-4xl font-bold">Create Event</h1>
        <p className="mt-2 text-xl">Fill in the event details below</p>
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

        {/* Event Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#003366]">
            Event Image *
          </label>
          <div className="relative">
            {formData.photo? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Event preview"
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

        {/* Name and Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Event Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-[#387fa8]"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                errors.slug ? "border-red-500" : "border-[#387fa8]"
              }`}
            />
            {errors.slug && (
              <p className="text-red-500 text-sm">{errors.slug}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#003366]">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`w-full p-2 border rounded-md ${
              errors.description ? "border-red-500" : "border-[#387fa8]"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#003366]">
            Long Description *
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleInputChange}
            rows={6}
            className={`w-full p-2 border rounded-md ${
              errors.longDescription ? "border-red-500" : "border-[#387fa8]"
            }`}
          />
          {errors.longDescription && (
            <p className="text-red-500 text-sm">{errors.longDescription}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#003366]">
            Total Hours *
          </label>
          <input
            type="number"
            name="TotalNoOfHours"
            value={formData.TotalNoOfHours}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${
              errors.TotalNoOfHours ? "border-red-500" : "border-[#387fa8]"
            }`}
          />
          {errors.TotalNoOfHours && (
            <p className="text-red-500 text-sm">{errors.TotalNoOfHours}</p>
          )}
        </div>

        {/* Date and Hours */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                errors.date ? "border-red-500" : "border-[#387fa8]"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Start Hour *
            </label>
            <input
              type="number"
              name="startHours"
              value={formData.startHours}
              onChange={handleInputChange}
              min="0"
              max="24"
              className="w-full p-2 border border-[#387fa8] rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              End Hour *
            </label>
            <input
              type="number"
              name="endHours"
              value={formData.endHours}
              onChange={handleInputChange}
              min="0"
              max="24"
              className="w-full p-2 border border-[#387fa8] rounded-md"
            />
          </div>
        </div>

        {/* Location and Volunteers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                errors.location ? "border-red-500" : "border-[#387fa8]"
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Max Volunteers
            </label>
            <input
              type="number"
              name="maxVolunteers"
              value={formData.maxVolunteers}
              onChange={handleInputChange}
              min="1"
              className="w-full p-2 border border-[#387fa8] rounded-md"
            />
          </div>
        </div>

        {/* Status and Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#387fa8] rounded-md"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Past">Past</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Scope *
            </label>
            <select
              name="scope"
              value={formData.scope}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#387fa8] rounded-md"
            >
              <option value="Local">Local</option>
              <option value="Area">Area</option>
              <option value="University">University</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
          >
            {loading ? "Saving..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
