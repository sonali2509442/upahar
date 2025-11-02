import React, { useEffect, useState } from "react";
import api from "../utils/api";
import AddReminderModal from "./AddReminderModal";
import dayjs from "dayjs";

export default function ReminderCalendar() {
  const [reminders, setReminders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  async function fetchReminders() {
    try {
      const { data } = await api.get("/api/reminders");
      if (data.success) setReminders(data.reminders);
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete reminder?")) return;
    await api.delete(`/api/reminders/${id}`);
    fetchReminders();
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          🎁 Gift Reminder Calendar
        </h2>
        <button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
          className="mt-3 sm:mt-0 px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:opacity-90 transition"
        >
          + Add Reminder
        </button>
      </div>

      {/* Reminder Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-300">
        {reminders.map((r) => (
          <div
            key={r._id}
            className="p-4 bg-gradient-to-b from-pink-50 to-white rounded-xl shadow-sm border border-pink-100 hover:shadow-md transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs text-gray-500 mb-1">
                {dayjs(r.date).format("DD MMM YYYY")}
              </div>
              <div className="font-semibold text-gray-800 text-base">
                {r.recipientName}
              </div>
              <div className="text-sm text-pink-600 font-medium">
                {r.occasion}
              </div>
              {r.note && (
                <div className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {r.note}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 text-sm">
              <button
                onClick={() => {
                  setSelected(r);
                  setOpen(true);
                }}
                className="text-indigo-600 hover:text-indigo-800 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {reminders.length === 0 && (
          <div className="col-span-full text-gray-500 text-center py-10">
            No reminders yet. Start adding one ✨
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <AddReminderModal
          initial={selected}
          onClose={() => {
            setOpen(false);
            fetchReminders();
          }}
        />
      )}
    </div>
  );
}
