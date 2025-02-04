import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Loader from '../../components/Loaders/CustomLoader2';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message

    // Check if email or password is empty
    if (!formData.email || !formData.password) {
      setErrorMessage("Email or password is empty");
      setLoading(false);
      return;
    }

    try {
      // Simulate an API call for login
      const response = await fetch(
        "https://djsnss-web.onrender.com/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await response.json();

      // Save login data (e.g., token) to localStorage
      localStorage.setItem("adminAuthToken", data.token);
      localStorage.setItem("email", formData.email);

      // Redirect to dashboard using navigate
      navigate('/admin/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* Page Heading */}
      <div className="bg-[#003366] text-center text-white py-8">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="mt-2 text-xl">Login to continue</p>
      </div>

      {/* Login Form */}
      <div className="flex flex-col items-center justify-center h-full px-6 bg-[#f1f8ff]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-[#003366] mb-6 text-center">
            Login
          </h2>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#003366] mb-1">
              Email
            </label>
            <input
              type="email" // Changed to email input for validation
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#003366] mb-1">
              Password
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
            {loading ? <Loader /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
