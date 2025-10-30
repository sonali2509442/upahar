

import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  name: { type: String, required: true },
  occasion: { type: String, required: true },
  date: { type: Date, required: true },
  note: { type: String },
});

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
