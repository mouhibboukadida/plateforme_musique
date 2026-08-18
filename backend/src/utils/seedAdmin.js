require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function seedAdmin() {
  const name = process.env.ADMIN_NAME || 'Admin';
  const email = process.env.ADMIN_EMAIL || 'admin@faza.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  try {
    const existing = await pool.query('SELECT id FROM admins WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      console.log(`ℹ️  Admin "${email}" already exists. Skipping.`);
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await pool.query(
      'INSERT INTO admins (name, email, password_hash) VALUES ($1, $2, $3)',
      [name, email, passwordHash]
    );

    console.log('✅ Admin account created:');
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${password}`);
    console.log('   ⚠️  Change this password after first login in production.');
  } catch (err) {
    console.error('❌ Failed to seed admin:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seedAdmin();
