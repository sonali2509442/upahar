import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Gift, CalendarHeart, Trash2 } from "lucide-react";

const GiftReminder = () => {
  const [reminder, setReminder] = useState({
    name: "",
    occasion: "",
    date: "",
    note: "",
  });
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gift-reminder");
      if (res.data.success) setReminders(res.data.reminders);
    } catch (error) {
      toast.error("Could not load reminders");
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleChange = (e) => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://upahar-backend.onrender.com/api/gift-reminder", reminder);
      if (res.data.success) {
        toast.success("🎁 Reminder added!");
        setReminder({ name: "", occasion: "", date: "", note: "" });
        fetchReminders();
      }
    } catch {
      toast.error("Failed to save reminder");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://upahar-backend.onrender.com/api/gift-reminder/${id}`);
      toast.success("Reminder deleted!");
      fetchReminders();
    } catch {
      toast.error("Error deleting reminder");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300 flex flex-col items-center py-10 px-4 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center">
          <Gift className="w-12 h-12 text-pink-700" />
        </div>
        <h1 className="text-4xl font-bold text-pink-800 mt-3 drop-shadow-md">
          Gift Reminder
        </h1>
        <p className="text-gray-600 mt-2">
          Never forget a special day again 💖
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-pink-100"
      >
        <h2 className="text-xl font-semibold text-pink-800 mb-5 text-center">
          Add a New Reminder 🎀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Person’s Name
            </label>
            <input
              type="text"
              name="name"
              value={reminder.name}
              onChange={handleChange}
              placeholder="e.g. Aditi"
              className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none bg-white/80"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Occasion
            </label>
            <input
              type="text"
              name="occasion"
              value={reminder.occasion}
              onChange={handleChange}
              placeholder="Birthday, Anniversary..."
              className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none bg-white/80"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={reminder.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none bg-white/80"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Note
            </label>
            <textarea
              name="note"
              value={reminder.note}
              onChange={handleChange}
              rows="3"
              placeholder="Write something sweet..."
              className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none bg-white/80"
            ></textarea>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-pink-700 transition-all duration-300"
          >
            Save Reminder
          </motion.button>
        </form>
      </motion.div>

      {/* Saved Reminders Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-4xl w-full mt-10"
      >
        <h3 className="text-2xl font-bold text-pink-800 mb-4 text-center">
          Saved Reminders 💌
        </h3>

        {reminders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reminders.map((r) => (
              <motion.div
                key={r._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-md border border-pink-200 hover:shadow-lg transition-all duration-300 relative"
              >
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <h4 className="text-lg font-semibold text-pink-700">
                  {r.name}
                </h4>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <CalendarHeart size={16} /> {r.occasion}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  📅 {new Date(r.date).toLocaleDateString()}
                </p>
                {r.note && (
                  <p className="text-gray-400 italic text-sm mt-2">{r.note}</p>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No reminders yet ✨</p>
        )}
      </motion.div>
    </div>
  );
};

export default GiftReminder;
