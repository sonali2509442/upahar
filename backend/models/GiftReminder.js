import mongoose from "mongoose";

const giftReminderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  occasion: { type: String, required: true },
  date: { type: Date, required: true },
  note: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional, if users are logged in
}, { timestamps: true });

const GiftReminder = mongoose.model("GiftReminder", giftReminderSchema);
export default GiftReminder;
