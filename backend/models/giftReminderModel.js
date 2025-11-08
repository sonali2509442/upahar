import mongoose from "mongoose";

const giftReminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const GiftReminder = mongoose.model("GiftReminder", giftReminderSchema);

export default GiftReminder;