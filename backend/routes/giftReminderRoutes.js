// import express from "express";
// import { addReminder, getReminders } from "../controllers/giftReminderController.js";

// const router = express.Router();

// router.post("/add", addReminder);
// router.get("/", getReminders);

// export default router;




import express from 'express';
import { createReminder, getReminders, deleteReminder } from '../controllers/reminderController.js';

const router = express.Router();

router.post('/', createReminder);           // Add new reminder
router.get('/', getReminders);             // Get all reminders
router.delete('/:id', deleteReminder);    // Delete a reminder

export default router;

