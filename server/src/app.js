import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth-routes.js';
import contactsRoutes from './routes/contacts-routes.js';
import statusesRoutes from './routes/statuses-routes.js';

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5175',
      process.env.CLIENT_URL
    ].filter(Boolean);
    
    if (!origin) return callback(null, true);
    
    if (origin && (origin.includes('vercel.app') || origin.includes('vercel.com'))) {
      return callback(null, true);
    }
    
    if (origin && origin.includes('render.com')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.some(allowed => origin === allowed || origin.startsWith(allowed.replace(/\/$/, '')))) {
      return callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/statuses', statusesRoutes);

export default app;
