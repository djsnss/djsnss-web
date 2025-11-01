import React, { useState } from "react";


const initialState = {
  name: "",
  email: "",
  phone: "",
  query: "",
};

const ContactUs = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMsg("");
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.query) {
      setError("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Invalid email format.");
      return false;
    }
    const phoneDigits = form.phone.replace(/\D/g, "").slice(-10);
    if (!/^[0-9]{10}$/.test(phoneDigits)) {
      setError("Invalid phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    setMsg("");
    try {
      const res = await fetch("https://djsnss-web.onrender.com/contact/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.message);
        setForm(initialState);
      } else {
        setError(data.message || "Failed to send message.");
      }
    } catch {
      setError("Failed to send message. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-tertiary-blue text-center mb-8">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-bold font-roboto text-gray-700 text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-700 bg-gray-50 transition"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold font-roboto text-gray-700 text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-700 bg-gray-50 transition"
            value={form.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold font-roboto text-gray-700 text-lg">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-700 bg-gray-50 transition"
            value={form.phone}
            onChange={handleChange}
            maxLength={15}
            placeholder="10-digit number"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold font-roboto text-gray-700 text-lg">
            Your Query / Message
          </label>
          <textarea
            name="query"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-700 bg-gray-50 transition"
            rows={4}
            value={form.query}
            onChange={handleChange}
          />
        </div>
        {error && (
          <div className="text-red-600 text-base font-semibold">{error}</div>
        )}
        {msg && (
          <div className="text-green-600 text-base font-semibold">{msg}</div>
        )}
        <button
          type="submit"
          className="w-full bg-tertiary-blue text-white py-2 rounded font-bold hover:bg-dark-blue transition disabled:opacity-60 text-lg shadow"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
