const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware.js');
const {
    sendMentorshipRequest,
    getMentorshipRequests,
    acceptMentorshipRequest,
    rejectMentorshipRequest
} = require('../controllers/mentorshipRequest.controllers.js');

// Users must be authenticated to access these routes
router.post('/send', authMiddleware, sendMentorshipRequest);
router.get('/requests', authMiddleware, getMentorshipRequests);
router.patch('/accept/:requestId', authMiddleware, acceptMentorshipRequest);
router.patch('/reject/:requestId', authMiddleware, rejectMentorshipRequest);

module.exports = router;