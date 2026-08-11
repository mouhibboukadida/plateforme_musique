import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import{connectDB} from './config/db.js';
import waitlistRoutes from './routes/waitlist.js';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.use('/api/waitlist', waitlistRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '🚀 Serveur est fonctionne !',
    time: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'fonctionne API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      waitlist: '/api/waitlist'
    }
  });
});

export default app;