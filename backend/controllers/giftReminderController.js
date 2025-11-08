
import GiftReminder from ".../models/giftReminderModel.js";

// Create reminder
export const createReminder = async (req, res) => {
  try {
    const { name, occasion, date, note, userId } = req.body;

    if (!name || !occasion || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const reminder = await GiftReminder.create({
      name,
      occasion,
      date,
      note,
      userId: userId || null, // optional
    });

    res.status(201).json({ success: true, reminder });
  } catch (error) {
    console.error("Error creating reminder:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating reminder",
      error: error.message,
    });
  }
};

// Get all reminders
export const getReminders = async (req, res) => {
  try {
    const reminders = await GiftReminder.find().sort({ date: 1 });
    res.json({ success: true, reminders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching reminder",
      error: error.message,
    });
  }
};

// Delete reminder
export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    await GiftReminder.findByIdAndDelete(id);
    res.json({ success: true, message: "Reminder deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting reminder",
      error: error.message,
    });
  }
};
