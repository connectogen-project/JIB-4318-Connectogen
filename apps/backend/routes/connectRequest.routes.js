const express = require('express');
const router = express.Router();
const {
  sendConnectionRequest,
  getConnectionRequests,
  checkConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  unfriendUser,
  getConnections,
} = require('../controllers/connectRequest.controllers.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// Protected Routes (Authentication Required)

// Send a connection request
router.post('/send', authMiddleware, sendConnectionRequest);

// Get connection requests for the authenticated user
router.get('/requests', authMiddleware, getConnectionRequests); // Changed route to be more RESTful

// Check if a connection request exists between two users
router.get('/check', authMiddleware, checkConnectionRequest);

// Accept a connection request
router.patch('/accept', authMiddleware, acceptConnectionRequest);

// Reject a connection request
router.patch('/reject', authMiddleware, rejectConnectionRequest);

// Unfriend a user
router.post('/unfriend', authMiddleware, unfriendUser);

router.get('/connections', authMiddleware, getConnections);

module.exports = router; // Changed from `export default router` to CommonJS syntax