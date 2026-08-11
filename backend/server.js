// server.js (à la racine de backend/)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== CONNEXION POSTGRESQL =====
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'ton_mot_de_passe',
  database: process.env.DB_NAME || 'plat_music',
});

app.use(cors());
app.use(express.json());

// ===== ROUTES =====

// GET - Récupérer tous les membres
app.get("/api/waitlist", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM waitlist ORDER BY id DESC");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST - Ajouter un membre
app.post("/api/waitlist", async (req, res) => {
  const { name, email, phone } = req.body;
  
  // Validation simple
  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "Tous les champs sont obligatoires"
    });
  }
  
  try {
    // Vérifier si l'email existe déjà
    const existing = await pool.query(
      "SELECT * FROM waitlist WHERE email = $1",
      [email]
    );
    
    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cet email est déjà inscrit"
      });
    }
    
    // Ajouter le membre
    const result = await pool.query(
      `INSERT INTO waitlist (name, email, phone) 
       VALUES ($1, $2, $3) RETURNING *`,
      [name, email, phone]
    );
    
    res.status(201).json({
      success: true,
      message: "Inscription réussie ! 🎉",
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT - Mettre à jour le statut
app.put("/api/waitlist/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  // Vérifier le statut
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Statut invalide"
    });
  }
  
  try {
    const result = await pool.query(
      `UPDATE waitlist SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Membre non trouvé"
      });
    }
    
    res.json({
      success: true,
      message: "Statut mis à jour",
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE - Supprimer un membre
app.delete("/api/waitlist/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      "DELETE FROM waitlist WHERE id = $1 RETURNING *",
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Membre non trouvé"
      });
    }
    
    res.json({
      success: true,
      message: "Membre supprimé"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET - Statistiques
app.get("/api/waitlist/stats", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
      FROM waitlist
    `);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET - Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "🚀 FAZA API fonctionne !",
    timestamp: new Date().toISOString()
  });
});

// GET - Route d'accueil
app.get("/", (req, res) => {
  res.json({
    name: "FAZA Platform API",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      waitlist: "POST /api/waitlist",
      allMembers: "GET /api/waitlist",
      stats: "GET /api/waitlist/stats",
      updateStatus: "PUT /api/waitlist/:id/status",
      delete: "DELETE /api/waitlist/:id"
    }
  });
});

// ===== DÉMARRAGE =====
app.listen(PORT, async () => {
  try {
    // Tester la connexion
    await pool.connect();
    console.log('✅ PostgreSQL connecté avec succès');
    console.log(`\n🚀 Serveur FAZA démarré sur http://localhost:${PORT}`);
    console.log(`📝 API: http://localhost:${PORT}/api/waitlist`);
    console.log(`💚 Health: http://localhost:${PORT}/api/health\n`);
  } catch (error) {
    console.error('❌ Erreur de connexion PostgreSQL:', error.message);
    console.log('\n⚠️  Vérifie que PostgreSQL est installé et en cours d\'exécution');
  }
});