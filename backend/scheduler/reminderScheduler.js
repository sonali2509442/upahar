// utils/reminderScheduler.js
import cron from "node-cron";
import Reminder from "../models/reminderModel.js";


// Run every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("🕘 Checking for upcoming reminders...");

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  try {
    // Get reminders that are within next 7 days and not notified yet
    const reminders = await Reminder.find({
      date: { $gte: today, $lte: nextWeek },
      notified: false,
    }).populate("userId");

    for (const reminder of reminders) {
      const reminderDate = new Date(reminder.date);
      const diffDays = Math.ceil((reminderDate - today) / (1000 * 60 * 60 * 24));

      let message = "";

      if (diffDays === 1) {
        message = `🎉 Reminder: ${reminder.name}'s ${reminder.occasion} is tomorrow!`;
      } else if (diffDays === 7) {
        message = `🎁 ${reminder.name}'s ${reminder.occasion} is in a week! Plan something special 💕`;
      }

      if (message) {
        // ✅ Send notification (email, SMS, or push)
        await sendEmail(
          reminder.userId.email,
          "Upcoming Reminder",
          message
        );

        reminder.notified = true;
        await reminder.save();
        console.log("✅ Reminder sent to:", reminder.userId.email);
      }
    }
  } catch (error) {
    console.error("❌ Error checking reminders:", error.message);
  }
});
