import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    sapId: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous error

    try {
      const response = await fetch(
        "https://djsnss-web.onrender.com/volunteer/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      alert("Login successful");
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("volunteer", JSON.stringify(data.volunteer));

      window.location.href = "/volunteer/checkhours";
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-sky-300 pt-16">
      {/* Form Container */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-2xl font-bold text-sky-900 text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SapId Field */}
          <div>
            <label
              htmlFor="sapId"
              className="block text-sky-900 font-medium mb-2"
            >
              SapId
            </label>
            <input
              type="text"
              id="sapId"
              name="sapId"
              value={formData.sapId}
              onChange={handleChange}
              className="w-full p-3 bg-sky-50 text-sky-900 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              placeholder="Enter your SapId"
              pattern="^\d{11}$"
              required
            />
          </div>
          
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sky-900 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-sky-50 text-sky-900 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              placeholder="Enter your Email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sky-900 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-sky-50 text-sky-900 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sky-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Forgot Password Field */}
          <Link to={"/volunteer/change-password"} className="mt-2 text-sky-600">
            Forgot Password?
          </Link>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Actions */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full py-3 bg-sky-900 text-white font-semibold rounded-lg hover:bg-sky-800 transition duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-center text-sky-900">
              Don&#39;t have an account?{" "}
              <a
                href="/volunteer/volunteer-registration"
                className="text-sky-700 font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
