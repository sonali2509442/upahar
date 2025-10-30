import express from 'express';
import { createReminder, getReminders, deleteReminder } from '../controllers/reminderController.js';

const router = express.Router();

router.post('/', createReminder);
router.get('/:userId', getReminders);
router.delete('/:id', deleteReminder);

export default router;

