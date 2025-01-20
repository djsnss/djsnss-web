import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleAddEvent = () => {
    navigate('/create-event');
  };

  const handleEditEvent = () => {
    navigate('/update-event');
  };

  const handleVolunteerEdit = () => {
    navigate('/edit-details');
  };

  useEffect(() => {
    if (!localStorage.getItem("adminAuthToken")) {
      // Redirect to login if not authenticated
      window.location.href = "/unauthorized";
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Main Dashboard Header */}
      <div className="bg-[#003366] text-center text-white py-8">
        <h1 className="text-4xl font-bold">Main Dashboard</h1>
        <p className="mt-2 text-xl">Manage Events and Volunteer Details</p>
      </div>

      {/* Dashboard Buttons */}
      <div className="p-6 flex flex-col items-center space-y-4 bg-[#f1f8ff]">
        <button
          onClick={handleAddEvent}
          className="px-6 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
        >
          Add Event
        </button>

        <button
          onClick={handleEditEvent}
          className="px-6 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
        >
          Update Event
        </button>

        <button
          onClick={handleVolunteerEdit}
          className="px-6 py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
        >
          Edit Volunteer Details
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
