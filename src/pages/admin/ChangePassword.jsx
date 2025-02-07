import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loaders/CustomLoader2';

const ChangePasswordPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://djsnss-web.onrender.com/admin/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send OTP");
      }

      setStep(2);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://djsnss-web.onrender.com/admin/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: formData.otp, newPassword: formData.newPassword })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

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
        <h1 className="text-4xl font-bold">Change Password</h1>
        <p className="mt-2 text-xl">Update your account password</p>
      </div>
      
      <div className="flex flex-col items-center justify-center h-full px-6 bg-[#f1f8ff]">
        <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#003366] mb-6 text-center">{step === 1 ? "Verify Email" : "Change Password"}</h2>
          
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

          {step === 1 && (
            <>
              <label className="block text-sm font-medium text-[#003366] mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]" required />
              <button type="submit" disabled={loading} onClick={handleSendOtp} className="w-full py-2 mt-4 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]">{loading ? <Loader /> : 'Send OTP'}</button>
            </>
          )}

          {step === 2 && (
            <>
              <label className="block text-sm font-medium text-[#003366] mb-1">OTP</label>
              <input type="text" name="otp" value={formData.otp} onChange={handleInputChange} className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]" required />
              
              <label className="block text-sm font-medium text-[#003366] mb-1 mt-4">New Password</label>
              <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]" required />
              
              <label className="block text-sm font-medium text-[#003366] mb-1 mt-4">Confirm New Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full p-2 border border-[#387fa8] rounded-md text-[#003366]" required />
              
              <button type="submit" disabled={loading} onClick={handleChangePassword} className="w-full py-2 mt-4 bg-[#387fa8] text-white rounded-md hover:bg-[#005a8e]">{loading ? <Loader /> : 'Update Password'}</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
