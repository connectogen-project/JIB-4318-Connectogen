const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware.js');
const {
  getNotifications,
  createNotification
} = require('../controllers/notifications.controllers.js');

// Protected route: Only an authenticated user can get their own notifications
router.get('/getNotif', authMiddleware, getNotifications);

// You may also want to protect creation if required
router.post('/createNotif', authMiddleware, createNotification);

module.exports = router; 