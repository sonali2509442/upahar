import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchSeller, isSeller } = useAppContext();

  // Clear form when navigating between login/register
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [location.pathname]);

  // Redirect if already logged in
  useEffect(() => {
    if (
      isSeller &&
      !location.pathname.includes("seller-login") &&
      !location.pathname.includes("seller-register")
    ) {
      navigate("/seller");
    }
  }, [isSeller, navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/seller/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Login successful!");
        await fetchSeller();
        setEmail("");
        setPassword("");
        navigate("/seller");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
      <div className="bg-white/90 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-10 w-full max-w-md border border-pink-100">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Seller Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          autoComplete="off" // ✅ disables browser autofill for the entire form
        >
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              autoComplete="new-email" // ✅ prevents autofill
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              autoComplete="new-password" // ✅ prevents autofill
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/seller-register" className="text-pink-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SellerLogin;



