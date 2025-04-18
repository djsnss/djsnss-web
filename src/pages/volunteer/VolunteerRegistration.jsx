import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VolunteerRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleNavigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    sapId: "",
    caste: "",
    gender: "",
    phoneNumber: "",
    email: "",
    password: "",
    hobbies: "",
    motherName: "",
    fatherName: "",
    motherEmail: "",
    fatherEmail: "",
    description: "",
    passport: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      console.log(`Uploading file: ${files[0].name}`); // Debugging
    }
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "https://djsnss-web.onrender.com/volunteer/signup",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        handleNavigate("/volunteer/volunteer-login");
        setFormData({
          name: "",
          branch: "",
          sapId: "",
          caste: "",
          gender: "",
          phoneNumber: "",
          email: "",
          password: "",
          hobbies: "",
          motherName: "",
          fatherName: "",
          motherEmail: "",
          fatherEmail: "",
          description: "",
          passport: null,
        });
      } else {
        setMessage(`Error: ${result.message || "Failed to register."}`);
      }
    } catch (error) {
      setMessage("An error occurred during registration. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-blue-100 to-sky-300 pt-16">
      <h2 className="text-5xl font-bold text-sky-900 mb-6 text-center">
        Volunteer Registration
      </h2>
      <div>
        <p className="text-sky-900 text-lg text-center">
          Already Registered?{" "}
          <a
            href="/volunteer/volunteer-login"
            className="text-sky-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sky-900 font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
                required
              />
            </div>
            <div>
              <label
                htmlFor="branch"
                className="block text-sky-900 font-semibold"
              >
                Branch
              </label>
              <select
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
                required
              >
                <option value="" disabled>Select Branch</option>
                <option value="Computer">Computer</option>
                <option value="IT">IT</option>
                <option value="Data Science">Data Science</option>
                <option value="EXTC">EXTC</option>
                <option value="IOT">IOT</option>
                <option value="Mechanical">Mechanical</option>
                <option value="AI&ML">AI&ML</option>
                <option value="AI&DS">AI&DS</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sapId"
                className="block text-sky-900 font-semibold"
              >
                SAP ID
              </label>
              <input
                type="number"
                id="sapId"
                name="sapId"
                value={formData.sapId}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                pattern="^\d{11}$"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sky-900 font-semibold"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>
            <div>
              <label
                htmlFor="hobbies"
                className="block text-sky-900 font-semibold"
              >
                Hobbies
              </label>
              <input
                type="text"
                id="hobbies"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sky-900 font-semibold">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="caste"
                className="block text-sky-900 font-semibold"
              >
                Caste
              </label>
              <input
                type="text"
                id="caste"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sky-900 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sky-900 font-semibold"
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
                  className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sky-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="motherName"
                className="block text-sky-900 font-semibold"
              >
                Mother&apos;s Name
              </label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="motherEmail"
                className="block text-sky-900 font-semibold"
              >
                Mother&apos;s Email
              </label>
              <input
                type="email"
                id="motherEmail"
                name="motherEmail"
                value={formData.motherEmail}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="fatherName"
                className="block text-sky-900 font-semibold"
              >
                Father&apos;s Name
              </label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="fatherEmail"
                className="block text-sky-900 font-semibold"
              >
                Father&apos;s Email
              </label>
              <input
                type="email"
                id="fatherEmail"
                name="fatherEmail"
                value={formData.fatherEmail}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sky-900 font-semibold"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
              />
            </div>
          </div>

          {/* Passport Photo Upload */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="passport"
              className="block text-sky-900 font-semibold text-center"
            >
              Passport Size Photo
            </label>
            <input
              type="file"
              id="passport"
              name="passport"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
            >
              Register
            </button>
          </div>
        </form>

        {/* Message Display */}
        {message && (
          <p
            className={`mt-4 text-center ${message.startsWith("Error") ? "text-red-600" : "text-green-600"
              }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VolunteerRegistration;
