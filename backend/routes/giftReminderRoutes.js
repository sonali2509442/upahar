



import express from 'express';
import authUser from '../middlewares/authUser.js';
import {
  createReminder,
  getReminders,
  deleteReminder,
} from '../controllers/giftReminderController.js';

const router = express.Router();

router.post('/', authUser, createReminder);
router.get('/', authUser, getReminders);
router.delete('/:id', authUser, deleteReminder);

export default router;





