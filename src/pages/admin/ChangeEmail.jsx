import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loaders/CustomLoader2';

const ChangeEmailPage = () => {
  const [formData, setFormData] = useState({
    currentEmail: "",
    newEmail: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Validation checks
    if (!formData.currentEmail || !formData.newEmail || !formData.password) {
      setErrorMessage("All fields are required");
      setLoading(false);
      return;
    }

    if (!formData.newEmail.includes('@')) {
      setErrorMessage("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("adminAuthToken");
      const response = await fetch(
        "https://djsnss-web.onrender.com/admin/change-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            currentEmail: formData.currentEmail,
            newEmail: formData.newEmail,
            password: formData.password
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change email");
      }

      // Update email in localStorage and navigate back to dashboard
      localStorage.setItem("email", formData.newEmail);
      navigate('/admin/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <div className="bg-[#003366] text-center text-white py-8">
        <h1 className="text-4xl font-bold">Change Email</h1>
        <p className="mt-2 text-xl">Update your account email</p>
      </div>

      <div className="flex flex-col items-center justify-center h-full px-6 bg-[#f1f8ff]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-[#003366] mb-6 text-center">
            Change Email
          </h2>
          
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#003366] mb-1">
              Current Email
            </label>
            <input
              type="email"
              name="currentEmail"
              value={formData.currentEmail}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#003366] mb-1">
              New Email
            </label>
            <input
              type="email"
              name="newEmail"
              value={formData.newEmail}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#003366] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]"
          >
            {loading ? <Loader /> : 'Update Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmailPage;