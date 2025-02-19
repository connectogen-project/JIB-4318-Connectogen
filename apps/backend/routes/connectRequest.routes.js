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

// Send a friend request
router.post('/send', authMiddleware, sendConnectionRequest);

// Get friend requests for the authenticated user
router.get('/requests/:id', authMiddleware, getConnectionRequests);

// Check if a friend request exists between two users
router.get('/check', authMiddleware, checkConnectionRequest);

// Accept a friend request
router.post('/accept', authMiddleware, acceptConnectionRequest);

// Reject a friend request
router.post('/reject', authMiddleware, rejectConnectionRequest);

// Unfriend a user
router.post('/unfriend', authMiddleware, unfriendUser);

export default router;
