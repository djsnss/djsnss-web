import React, { useState } from 'react';
import { X } from 'lucide-react';

const sectionColors = [
  "#a2b9d8", 
  "#387fa8", 
  "#cce7ff", 
  "#003b5c", 
  "#003366", 
  "#005a8e", 
];

const CreateEvent = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: event?.name || '',
    description: event?.description || '',
    photo: event?.photo || { url: '', public_id: '' },
    startHours: event?.startHours || '',
    endHours: event?.endHours || '',
    TotalNoOfHours: event?.TotalNoOfHours || '',
    date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
    location: event?.location || '',
    maxVolunteers: event?.maxVolunteers || 50,
    status: event?.status || 'Upcoming'
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: {
            url: reader.result,
            public_id: 'temp_id'
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* Page Heading */}
      <div className="bg-[#003366] text-center text-white py-8">
        <h1 className="text-4xl font-bold">Event Management</h1>
        <p className="mt-2 text-xl">Create or update your event details below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-[#f1f8ff] w-full">
    
        {/* Image Upload */}
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
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, photo: { url: '', public_id: '' } }))}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <label className="block mt-2">
                    <span className="text-[#387fa8] hover:text-[#003b5c] cursor-pointer">
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

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#003366] mb-1">Event Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full p-2 border border-[#387fa8] rounded-md text-[#003366] ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#003366] mb-1">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Past">Past</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#003366] mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#003366] mb-1">Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className={`w-full p-2 border border-[#387fa8] rounded-md text-[#003366] ${errors.date ? 'border-red-500' : ''}`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#003366] mb-1">Total Hours *</label>
            <input
              type="number"
              value={formData.TotalNoOfHours}
              onChange={(e) => setFormData(prev => ({ ...prev, TotalNoOfHours: e.target.value }))}
              className={`w-full p-2 border border-[#387fa8] rounded-md text-[#003366] ${errors.TotalNoOfHours ? 'border-red-500' : ''}`}
            />
            {errors.TotalNoOfHours && <p className="text-red-500 text-sm mt-1">{errors.TotalNoOfHours}</p>}
          </div>
        </div>

        {/* Start and End Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#003366] mb-1">Start Hour</label>
            <input
              type="number"
              min="0"
              max="23"
              value={formData.startHours}
              onChange={(e) => setFormData(prev => ({ ...prev, startHours: e.target.value }))}
              className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#003366] mb-1">End Hour</label>
            <input
              type="number"
              min="0"
              max="23"
              value={formData.endHours}
              onChange={(e) => setFormData(prev => ({ ...prev, endHours: e.target.value }))}
              className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]"
            />
          </div>
        </div>

        {/* Location and Volunteers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#003366] mb-1">Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className={`w-full p-2 border border-[#387fa8] rounded-md text-[#003366] ${errors.location ? 'border-red-500' : ''}`}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#003366] mb-1">Maximum Volunteers</label>
            <input
              type="number"
              min="1"
              value={formData.maxVolunteers}
              onChange={(e) => setFormData(prev => ({ ...prev, maxVolunteers: e.target.value }))}
              className={`w-full p-2 border border-[#387fa8] rounded-md text-[#003366] ${errors.maxVolunteers ? 'border-red-500' : ''}`}
            />
            {errors.maxVolunteers && <p className="text-red-500 text-sm mt-1">{errors.maxVolunteers}</p>}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-[#003366] hover:bg-[#387fa8] rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
          >
            {event ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
