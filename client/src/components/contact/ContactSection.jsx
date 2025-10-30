import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", website: "", message: "" });

    // (Later) You can send this data to your backend using axios.post('/api/contact', formData)
  };

  return (
    <div className="flex flex-col lg:flex-row m-6 bg-gradient-to-br from-pink-50 via-white to-pink-100 rounded-3xl shadow-md overflow-hidden">
      {/* Left Section (Form) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 flex flex-col justify-center px-6 py-10 lg:px-16"
      >
        <h2 className="text-4xl font-bold text-pink-600 mb-3">Contact Us</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Get in <span className="text-pink-600">Touch</span> 🌻
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We'd love to hear from you! Drop your message below and we’ll get back
          to you within 24 hours.
        </p>

        {submitted ? (
          <div className="bg-pink-100 text-pink-700 p-4 rounded-lg shadow-sm text-center">
            🌸 Thank you for contacting us! We'll respond soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
            <div>
              <label htmlFor="website" className="block text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                placeholder="Your Website (optional)"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-all"
            >
              POST COMMENT
            </motion.button>
          </form>
        )}
      </motion.div>

      {/* Right Section (Map) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 flex items-center justify-center bg-pink-50"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.0307362985827!2d85.80517887501179!3d20.340348881142354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190902b2a59ce5%3A0xdfb554a4e0bafffb!2sTrident%20Academy%20of%20Technology!5e0!3m2!1sen!2sin!4v1761848360668!5m2!1sen!2sin"
          width="100%"
          height="550"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
          className="rounded-3xl shadow-inner"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default ContactSection;
