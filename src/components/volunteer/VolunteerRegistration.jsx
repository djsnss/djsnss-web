import React, { useState } from "react";

const volunteerRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    sapId: "",
    phoneNumber: "",
    email: "",
    password: "",
    hobbies: "",
    motherName: "",
    fatherName: "",
    motherEmail: "",
    fatherEmail: "",
    description: "",
    passportPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-sky-100 p-6 flex flex-col items-center">
      {/* Heading */}
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

      {/* Form Container */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg backdrop-blur-lg">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left side */}
          <div className="space-y-4">
            {/* Name Field */}
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

            {/* Branch Field */}
            <div>
              <label
                htmlFor="branch"
                className="block text-sky-900 font-semibold"
              >
                Branch
              </label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
                required
              />
            </div>

            {/* SAP ID Field */}
            <div>
              <label
                htmlFor="sapId"
                className="block text-sky-900 font-semibold"
              >
                SAP ID
              </label>
              <input
                type="text"
                id="sapId"
                name="sapId"
                value={formData.sapId}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-sky-200 text-sky-900 rounded"
                pattern="^\d{10}$"
                required
              />
            </div>

            {/* Phone Number Field */}
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
                required
              />
            </div>

            {/* Hobbies Field */}
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
          </div>

          {/* Right side */}
          <div className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field */}
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
                  className="absolute inset-y-0 right-3 flex items-center text-sky-700 font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Mother's Name Field */}
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

            {/* Father's Name Field */}
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

            {/* Description Field */}
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

          {/* Passport Photo */}
          <div className="col-span-1 md:col-span-2 w-full flex flex-col items-center">
            <label
              htmlFor="passportPhoto"
              className="block text-sky-900 font-semibold text-center"
            >
              Passport Size Photo
            </label>
            <input
              type="file"
              id="passportPhoto"
              name="passportPhoto"
              accept="image/*"
              onChange={handleChange}
              className="p-2 mt-2 bg-sky-200 w-full text-sky-900 rounded"
              required
            />
          </div>
          
          {/* Submit Button */}
          <div className="mt-6 col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
            >
              Register
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default volunteerRegistration;
