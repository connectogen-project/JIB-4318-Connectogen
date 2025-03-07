import express from 'express';
import {
    createNotification,
    getNotification,
    readNotification,
    deleteNotification,
} from '../controllers/notifications.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js'; // Import the auth middleware

const router = express.Router();

// Apply authMiddleware to all routes
router.post('/createNotif', authMiddleware, createNotification);
router.get('/getNotif', authMiddleware, getNotification);
router.put('/read/:id', authMiddleware, readNotification);
router.delete('/delNotif/:id', authMiddleware, deleteNotification);

export default router;