import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import { connectDB } from '../config/db.js';

import logRoutes from '../routes/logs.routes.js';
import userRoutes from '../routes/users.routes.js';
import mentorRoutes from '../routes/mentor.routes.js';
import menteeRoutes from '../routes/mentee.routes.js';
import requestsRoutes from '../routes/connectRequest.routes.js'; // Import connection request routes
import notificationRoutes from '../routes/notifications.routes.js';
import subspecialtiesRoutes from "../routes/subspecialties.routes";
import degreesRoutes from "../routes/degrees.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2999;

const __dirname = path.resolve();

// Enable CORS for Postman testing
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Register routes
app.use('/mentorship/logs', logRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/mentees', menteeRoutes);
app.use('/api/requests', requestsRoutes); // Add connection request routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/degrees', degreesRoutes);
app.use('/api/subspecialties', subspecialtiesRoutes);

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

