const LogComment = require("../models/logComments.models");
const LogItem = require("../models/logs.models");
const User = require("../models/users.models");

const addComment = async (req, res) => {
    try {
        const logId = req.params.id;
        const { comment } = req.body;
        const userId = req.user._id;

        // Checking the log exists
        const log = await LogItem.findById(logId);
        if (!log) return res.status(404).json({ message: "Log not found" });

        // Checking if user is owner or on shared list
        if (
            log.userId.toString() !== userId.toString() &&
            !log.sharedWith.map(String).includes(userId.toString())
        ) {
            return res.status(403).json({ message: "Not authorized to comment on this log" });
        }

        const newComment = new LogComment({
            log: logId,
            author: userId,
            comment
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const logId = req.params.id;
        const userId = req.user._id;

        // Authorization Stuff.
        const log = await LogItem.findById(logId);
        if (!log) return res.status(404).json({ message: "Log not found" });
        if (
            log.userId.toString() !== userId.toString() &&
            !log.sharedWith.map(String).includes(userId.toString())
        ) {
            return res.status(403).json({ message: "Not authorized to view comments on this log" });
        }

        const comments = await LogComment.find({ log: logId })
            .populate('author', 'firstName lastName email');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { comment } = req.body;
        const userId = req.user._id;
        const existingComment = await LogComment.findById(commentId);
        if (!existingComment) return res.status(404).json({ message: "Comment not found" });

        // Only allow the comment’s author to update it.
        if (existingComment.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to update this comment" });
        }

        existingComment.comment = comment;
        await existingComment.save();
        res.status(200).json(existingComment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;
        const existingComment = await LogComment.findById(commentId);
        if (!existingComment) return res.status(404).json({ message: "Comment not found" });

        // Allow deletion if the user is the comment’s author or the owner of the log.
        const log = await LogItem.findById(existingComment.log);
        if (
            existingComment.author.toString() !== userId.toString() &&
            log.userId.toString() !== userId.toString()
        ) {
            return res.status(403).json({ message: "Not authorized to delete this comment" });
        }

        await LogComment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    addComment,
    getComments,
    updateComment,
    deleteComment,
};