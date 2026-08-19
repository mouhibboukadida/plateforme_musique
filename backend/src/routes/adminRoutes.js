import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import {
  login,
  verify,
  getWaitlist,
  updateStatus,
  deleteEntry,
} from '../controllers/adminController.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.get('/verify', protect, verify);
router.get('/waitlist', protect, getWaitlist);
router.put('/waitlist/:id/status', protect, updateStatus);
router.delete('/waitlist/:id', protect, deleteEntry);

export default router;