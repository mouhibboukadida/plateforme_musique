import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 API: http://localhost:${PORT}/api/waitlist`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health\n`);
});