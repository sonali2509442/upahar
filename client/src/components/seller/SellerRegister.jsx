import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";

const SellerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      shopName: "",
      phone: "",
      address: "",
    });
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://upahar-backend.vercel.app/api/seller/seller-register",
        formData
      );
      if (res.data.success) {
        toast.success("Registration successful!");
        navigate("/seller-login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
      <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Seller Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          autoComplete="off" // ✅ disables browser autofill for the entire form
        >
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="new-name" // ✅ prevents previous autofill
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            required
            autoComplete="new-shop" // ✅ prevents previous autofill
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="new-email" // ✅ prevents autofill of old email
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password" // ✅ prevents old password autofill
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="new-phone" // ✅ prevents autofill
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            autoComplete="new-address" // ✅ prevents autofill
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />

          <button
            type="submit"
            className="col-span-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/seller-login" className="text-pink-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SellerRegister;



