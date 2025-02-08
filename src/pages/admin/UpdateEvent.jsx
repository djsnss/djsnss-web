import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

/**
 * Popup component for editing an event.
 * Receives an event and callbacks for closing and updating.
 */
function EditEventPopup({ event, onClose, onEventUpdated }) {
  const [formData, setFormData] = useState(event);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Validate required fields before submitting.
   */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.TotalNoOfHours) newErrors.TotalNoOfHours = 'Total hours is required';
    if (formData.maxVolunteers < 1) newErrors.maxVolunteers = 'Must allow at least 1 volunteer';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input changes and update form state.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Convert a selected file to a Base64 URL for preview.
   */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: { url: reader.result, public_id: 'temp_id' },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Submit updated event data.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Make the API call to update the event
      console.log(formData);
      const token = localStorage.getItem("adminAuthToken");
      await axios.put(
        `https://djsnss-web.onrender.com/admin/updateEvent/${formData._id}`,
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Event updated successfully');
      onEventUpdated(formData);
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
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

        <h2 className="text-2xl font-bold text-[#003366] mb-4">Edit Event</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Event Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#003366]">Event Image</label>
            <div className="relative">
              {formData.photo.url ? (
                <div className="relative">
                  <img
                    src={formData.photo.url}
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
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#003366]">
                Event Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${
                  errors.name ? 'border-red-500' : 'border-[#387fa8]'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#003366]">
                Status *
              </label>
              <select
                name="status"
                value={formData.status || 'Upcoming'}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#387fa8] rounded-md"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Past">Past</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={2}
              className="w-full p-2 border border-[#387fa8] rounded-md"
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-sm font-medium text-[#003366]">
              Long Description
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border border-[#387fa8] rounded-md"
            />
          </div>

          {/* Date & Total Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  errors.date ? 'border-red-500' : 'border-[#387fa8]'
                }`}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
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
                  errors.TotalNoOfHours ? 'border-red-500' : 'border-[#387fa8]'
                }`}
              />
              {errors.TotalNoOfHours && (
                <p className="text-red-500 text-sm">{errors.TotalNoOfHours}</p>
              )}
            </div>
          </div>

          {/* Start & End Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#003366]">
                Start Hour
              </label>
              <input
                type="number"
                name="startHours"
                min="0"
                max="23"
                value={formData.startHours}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#387fa8] rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#003366]">
                End Hour
              </label>
              <input
                type="number"
                name="endHours"
                min="0"
                max="24"
                value={formData.endHours}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#387fa8] rounded-md"
              />
            </div>
          </div>

          {/* Location & Max Volunteers */}
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
                  errors.location ? 'border-red-500' : 'border-[#387fa8]'
                }`}
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#003366]">
                Maximum Volunteers
              </label>
              <input
                type="number"
                name="maxVolunteers"
                min="1"
                value={formData.maxVolunteers}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${
                  errors.maxVolunteers ? 'border-red-500' : 'border-[#387fa8]'
                }`}
              />
              {errors.maxVolunteers && (
                <p className="text-red-500 text-sm">{errors.maxVolunteers}</p>
              )}
            </div>
          </div>

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
              className="px-4 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Main component that lists events and uses EditEventPopup to edit them.
 */
export default function UpdateEventPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch the list of events from /events on mount
  useEffect(() => {
    if (!localStorage.getItem("adminAuthToken")) {
      // Redirect to login if not authenticated
      window.location.href = "/unauthorized";
    }

    async function fetchEvents() {
      try {
        const token = localStorage.getItem("adminAuthToken"); // Replace with your token logic
        const response = await axios.get("https://djsnss-web.onrender.com/admin/getAllEvents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data || []);
        console.log(response);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoadingEvents(false);
      }
    }

    fetchEvents();
  }, []);

  /**
   * Opens the popup with the selected event data.
   */
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  /**
   * Closes the popup without saving.
   */
  const closePopup = () => {
    setSelectedEvent(null);
  };

  /**
   * Called after the event has been updated successfully.
   * We can update the local list of events to reflect the changes if desired.
   */
  const handleEventUpdated = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((ev) => (ev._id === updatedEvent._id ? updatedEvent : ev))
    );
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* Page Heading */}
      <div className="bg-[#003366] text-center text-white py-8">
        <h1 className="text-4xl font-bold">Update Event</h1>
        <p className="mt-2 text-xl">Select an event to update its details</p>
      </div>

      {/* Event List Section */}
      <div className="p-6 bg-[#f1f8ff] flex-1 overflow-auto">
        {loadingEvents && <p className="text-center text-[#003366]">Loading events...</p>}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        {/* Grid of events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:shadow"
              onClick={() => handleSelectEvent(event)}
            >
              <h2 className="text-lg font-bold text-[#003366]">{event.name}</h2>
              <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Location: {event.location}</p>
              <p className="text-sm text-gray-500">Status: {event.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Popup */}
      {selectedEvent && (
        <EditEventPopup
          event={selectedEvent}
          onClose={closePopup}
          onEventUpdated={handleEventUpdated}
        />
      )}
    </div>
  );
}
