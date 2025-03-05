import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from '../config/db.js';

import logRoutes from '../routes/logs.routes.js';
import userRoutes from '../routes/users.routes.js';
import mentorRoutes from '../routes/mentor.routes.js';
import menteeRoutes from '../routes/mentee.routes.js';
import requestsRoutes from '../routes/connectRequest.routes.js'; // Import connection request routes
import notificationRoutes from '../routes/notifications.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2999;

const __dirname = path.resolve();

// Enable CORS for Postman testing
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  credentials: true,
}));

// app.use((req, res, next) => {
//   next();
// });
app.use(cookieParser());
app.use(express.json());

// Register routes
app.use('/mentorship/logs', logRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/mentees', menteeRoutes);
app.use('/api/requests', requestsRoutes); // Add connection request routes
app.use('/api/notifications', notificationRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Start server and connect to DB
app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:' + PORT);
});

