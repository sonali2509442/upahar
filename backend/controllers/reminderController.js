import Reminder from '../models/reminderModel.js';

// Create a reminder
export const createReminder = async (req, res) => {
  try {
    const { name, occasion, date, note, userId } = req.body;

    // Validate required fields
    if (!name || !occasion || !date || !userId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const reminder = await Reminder.create({
  name,
  occasion,
  date,
  note,
  userId: req.userId || req.body.userId, // Fix added here
});


    res.status(201).json({ success: true, reminder });
  } catch (error) {
    console.error('Error creating reminder:', error.message);
    res.status(500).json({ success: false, message: 'Error creating reminder', error: error.message });
  }
};

// Get all reminders
export const getReminders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const reminders = await Reminder.find({ userId }).sort({ date: 1 });
    res.json({ success: true, reminders });
  } catch (error) {
    console.error("Error fetching reminders:", error.message);
    res.status(500).json({ success: false, message: "Error fetching reminders" });
  }
}; 

// Delete a reminder
export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const reminder = await Reminder.findOneAndDelete({ _id: id, userId });

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found or not yours" });
    }

    res.json({ success: true, message: "Reminder deleted successfully" });
  } catch (error) {
    console.error("Error deleting reminder:", error.message);
    res.status(500).json({ success: false, message: "Error deleting reminder" });
  }
};

//reminder notifi
// ✅ Check for upcoming reminders (within 7 days)
export const checkUpcomingReminders = async (req, res) => {
  try {
    const { userId } = req.params;

    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const reminders = await Reminder.find({
      userId,
      date: { $gte: today, $lte: nextWeek },
    }).sort({ date: 1 });

    res.json({ success: true, reminders });
  } catch (error) {
    console.error("Error checking reminders:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error checking reminders" });
  }
};

