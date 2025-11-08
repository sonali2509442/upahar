import GiftReminder from "../models/giftReminderModel.js";



// Create reminder
export const createReminder = async (req, res) => {
  try {
    const { name, occasion, date, note } = req.body;
    const userId = req.userId; // ✅ get from auth middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

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
      userId,
    });

    res.status(201).json({ success: true, reminder });
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({
      success: false,
      message: "Error creating reminder",
      error: error.message,
    });
  }
};

// Get reminders for that logged-in user
export const getReminders = async (req, res) => {
  try {
    const userId = req.userId; // 👈 now comes from auth middleware

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing user ID",
      });
    }

    const reminders = await GiftReminder.find({ userId }).sort({ date: 1 });
    res.json({ success: true, reminders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching reminders",
      error: error.message,
    });
  }
};


// Delete reminder (only if belongs to user)
export const deleteReminder = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const reminder = await GiftReminder.findOne({ _id: id, userId });
    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found or unauthorized",
      });
    }

    await reminder.deleteOne();
    res.json({ success: true, message: "Reminder deleted successfully" });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting reminder",
      error: error.message,
    });
  }
};

