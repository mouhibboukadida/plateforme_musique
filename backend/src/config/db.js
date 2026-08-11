// src/config/db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'ton_mot_de_passe',
  database: 'plat_music',
});

export default pool;