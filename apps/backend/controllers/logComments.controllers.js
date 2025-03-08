import LogComment from "../models/logComments.models.js";
import LogItem from "../models/logs.models.js";
import User from "../models/users.models.js";

export const addComment = async (req, res) => {
    try {
        const logId = req.params.id;
        const { comment } = req.body;
        const userId = req.user._id;

        // Check that the log exists
        const log = await LogItem.findById(logId);
        if (!log) return res.status(404).json({ message: "Log not found" });

        // Check that the user is the owner or is on the shared list
        if (
            log.userId.toString() !== userId.toString() &&
            !log.sharedWith.map(String).includes(userId.toString())
        ) {
            return res
                .status(403)
                .json({ message: "Not authorized to comment on this log" });
        }

        const newComment = new LogComment({
            log: logId,
            author: userId,
            comment,
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
};

export const getComments = async (req, res) => {
    try {
        const logId = req.params.id;
        const userId = req.user._id;

        // Authorization: Check if the log exists and that the user is allowed to view comments.
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
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { comment } = req.body;
        const userId = req.user._id;
        const existingComment = await LogComment.findById(commentId);
        if (!existingComment)
            return res.status(404).json({ message: "Comment not found" });

        // Only allow the comment’s author to update it.
        if (existingComment.author.toString() !== userId.toString()) {
            return res
                .status(403)
                .json({ message: "Not authorized to update this comment" });
        }

        existingComment.comment = comment;
        await existingComment.save();
        res.status(200).json(existingComment);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;
        const existingComment = await LogComment.findById(commentId);
        if (!existingComment)
            return res.status(404).json({ message: "Comment not found" });

        // Allow deletion if the user is the comment’s author or the owner of the log.
        const log = await LogItem.findById(existingComment.log);
        if (
            existingComment.author.toString() !== userId.toString() &&
            log.userId.toString() !== userId.toString()
        ) {
            return res
                .status(403)
                .json({ message: "Not authorized to delete this comment" });
        }

        await LogComment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
};