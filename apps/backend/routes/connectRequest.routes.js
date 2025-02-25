const express = require('express');
const router = express.Router();
const {
  sendConnectionRequest,
  getConnectionRequests,
  checkConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  unfriendUser,
} = require('../controllers/connectRequest.controllers.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// Protected Routes (Authentication Required)

// Send a connection request
router.post('/send', authMiddleware, sendConnectionRequest);

// Get connection requests for the authenticated user
router.get('/get/:id', authMiddleware, getConnectionRequests); // Ensure this route is defined

// Check if a connection request exists between two users
router.get('/check', authMiddleware, checkConnectionRequest);

// Accept a connection request
router.post('/accept', authMiddleware, acceptConnectionRequest);

// Reject a connection request
router.post('/reject', authMiddleware, rejectConnectionRequest);

// Unfriend a user
router.post('/unfriend', authMiddleware, unfriendUser);

export default router;