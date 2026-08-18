const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  login,
  verify,
  getWaitlist,
  updateStatus,
  deleteEntry,
} = require('../controllers/adminController');

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

module.exports = router;
