const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const pool = require('../config/db');
const { asyncHandler } = require('../middleware/errorHandler');

const signToken = (admin) =>
  jwt.sign(
    { id: admin.id, email: admin.email, name: admin.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

// @route  POST /api/admin/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  const result = await pool.query(
    'SELECT id, name, email, password_hash FROM admins WHERE email = $1',
    [email.toLowerCase().trim()]
  );

  const admin = result.rows[0];

  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, admin.password_hash);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = signToken(admin);

  res.json({
    success: true,
    token,
    admin: { id: admin.id, name: admin.name, email: admin.email },
  });
});

// @route  GET /api/admin/verify
// @access Private
const verify = asyncHandler(async (req, res) => {
  const result = await pool.query('SELECT id, name, email FROM admins WHERE id = $1', [
    req.admin.id,
  ]);

  const admin = result.rows[0];

  if (!admin) {
    return res.status(401).json({ success: false, message: 'Admin no longer exists' });
  }

  res.json({ success: true, admin });
});

// @route  GET /api/admin/waitlist
// @access Private
const getWaitlist = asyncHandler(async (req, res) => {
  const result = await pool.query(
    'SELECT id, name, email, phone, status, created_at, updated_at FROM waitlist ORDER BY created_at DESC'
  );

  res.json({ success: true, count: result.rows.length, data: result.rows });
});

// @route  PUT /api/admin/waitlist/:id/status
// @access Private
const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['pending', 'invited', 'joined'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${allowedStatuses.join(', ')}`,
    });
  }

  const result = await pool.query(
    `UPDATE waitlist SET status = $1 WHERE id = $2
     RETURNING id, name, email, phone, status, created_at, updated_at`,
    [status, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Waitlist entry not found' });
  }

  res.json({ success: true, message: 'Status updated', data: result.rows[0] });
});

// @route  DELETE /api/admin/waitlist/:id
// @access Private
const deleteEntry = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('DELETE FROM waitlist WHERE id = $1 RETURNING id', [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Waitlist entry not found' });
  }

  res.json({ success: true, message: 'Entry deleted' });
});

module.exports = { login, verify, getWaitlist, updateStatus, deleteEntry };
