const express = require('express');
const { body } = require('express-validator');
const { joinWaitlist } = require('../controllers/waitlistController');

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
    body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone number is required')
      .isLength({ min: 6, max: 30 })
      .withMessage('Phone number looks invalid'),
  ],
  joinWaitlist
);

module.exports = router;
