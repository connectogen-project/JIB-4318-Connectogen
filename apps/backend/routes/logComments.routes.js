const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware.js');
const {
    addComment,
    getComments,
    updateComment,
    deleteComment,
} = require('../controllers/logComments.controllers.js');

// POST Add Comment
router.post('/:id/comments', authMiddleware, addComment);

// GET Fetch all Comments
router.get('/:id/comments', authMiddleware, getComments);

// PUT update a comment
router.put('/:id/comments/:commentId', authMiddleware, updateComment);

// DELETE Delete comment
router.delete('/:id/comments/:commentId', authMiddleware, deleteComment);

module.exports = router;