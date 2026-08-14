const { validationResult } = require('express-validator');
const pool = require('../config/db');
const { asyncHandler } = require('../middleware/errorHandler');

// @route  POST /api/waitlist
// @desc   Public: join the waitlist
// @access Public
const joinWaitlist = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const { name, email, phone } = req.body;

  const existing = await pool.query('SELECT id FROM waitlist WHERE email = $1', [
    email.toLowerCase().trim(),
  ]);

  if (existing.rows.length > 0) {
    return res.status(409).json({
      success: false,
      message: 'This email is already on the waitlist.',
    });
  }

  const result = await pool.query(
    `INSERT INTO waitlist (name, email, phone)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, phone, status, created_at`,
    [name.trim(), email.toLowerCase().trim(), phone.trim()]
  );

  res.status(201).json({
    success: true,
    message: 'You have been added to the waitlist!',
    data: result.rows[0],
  });
});

module.exports = { joinWaitlist };
