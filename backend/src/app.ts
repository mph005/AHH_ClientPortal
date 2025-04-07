import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
// import userRoutes from './routes/user.routes';
// import clientRoutes from './routes/client.routes';
// import appointmentRoutes from './routes/appointment.routes';
// import serviceRoutes from './routes/service.routes';
// import paymentRoutes from './routes/payment.routes';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Massage Therapy Client Portal API',
    status: 'online',
    version: '1.0.0',
  });
});

// Apply routes
app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/clients', clientRoutes);
// app.use('/api/v1/appointments', appointmentRoutes);
// app.use('/api/v1/services', serviceRoutes);
// app.use('/api/v1/payments', paymentRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

export default app; 