import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddEvent = () => {
    navigate("/admin/create-event");
  };

  const handleEditEvent = () => {
    navigate("/admin/update-event");
  };
  const handleAddBlog = () => {
    navigate("/admin/create-blog");
  };

  const handleEditBlog = () => {
    navigate("/admin/update-blog");
  };
  
  const handleAddAnnouncement = () => {
    navigate("/admin/create-announcement");
  };

  const handleEditAnnouncement = () => {
    navigate("/admin/update-announcement");
  };

  const handleVolunteerEdit = () => {
    navigate("/admin/edit-details");
  };

  const handleChangeEmail = () => {
    navigate("/admin/change-email");
  };

  const handleChangePassword = () => {
    navigate("/admin/change-password");
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("adminAuthToken"); // Replace with your token logic
    await axios.post(
      "https://djsnss-web.onrender.com/admin/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("adminAuthToken");
    navigate("/admin/login");
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Main Dashboard Header */}
      <div className="bg-[#003366] text-center text-white py-8">
        <h1 className="mt-5 md:mt-20 text-4xl font-bold">Main Dashboard</h1>
        <p className="mt-2 text-xl">Manage Events and Volunteer Details</p>
      </div>

      {/* Dashboard Buttons */}
      <div className="p-8 bg-[#f1f8ff]">
        {/* Event Management Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4 text-center">Event Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <button
              onClick={handleAddEvent}
              className="px-6 py-3 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Event
            </button>

            <button
              onClick={handleEditEvent}
              className="px-6 py-3 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Update Event
            </button>
          </div>
        </div>
        {/* Blog Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4 text-center">Blog Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <button
              onClick={handleAddBlog}
              className="px-6 py-3 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Blog
            </button>

            <button
              onClick={handleEditBlog}
              className="px-6 py-3 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Update Blog
            </button>
          </div>
        </div>

        {/* Announcement Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4 text-center">Announcement Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <button
              onClick={handleAddAnnouncement}
              className="px-6 py-3 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
              Add Announcement
            </button>

            <button
              onClick={handleEditAnnouncement}
              className="px-6 py-3 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Update Announcement
            </button>
          </div>
        </div>

        {/* Account Management Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4 text-center">Account Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <button
              onClick={handleVolunteerEdit}
              className="px-6 py-3 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Edit Volunteer Details
            </button>

            <button
              onClick={handleChangeEmail}
              className="px-6 py-3 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Change Email
            </button>

            <button
              onClick={handleChangePassword}
              className="px-6 py-3 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Change Password
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-[#d9534f] text-white rounded-md hover:bg-[#c9302c] flex items-center justify-center"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
