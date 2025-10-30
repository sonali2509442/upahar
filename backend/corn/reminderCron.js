import cron from "node-cron";
import GiftReminder from "../models/GiftReminder.js";
import { sendEmail } from "../configs/email.js";

// Runs every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);

    // Find reminders for today
    const reminders = await GiftReminder.find({
      date: today
    });

    reminders.forEach(rem => {
      // Send email (replace with user email if you have login)
      sendEmail(
        "user@example.com", // replace with dynamic user email
        `Reminder: ${rem.occasion}`,
        `Hi! Don't forget: ${rem.name}'s ${rem.occasion} is today!\nNote: ${rem.note || "No note"}`
      );
    });
  } catch (err) {
    console.error("Cron error:", err);
  }
});
