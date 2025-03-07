import LogItem from "../models/logs.models.js";
import mongoose from "mongoose";
import User from "../models/users.models";

// Get logs for the authenticated user
export const getLogs = async (req, res) => {
    try {
        const userId = req.user._id; // Get the authenticated user's ID
        const logs = await LogItem.find({
            $or: [
                { userId: userId },
                { sharedWith: userId }
            ]
        });

        // Commented out for now to take into account shared users - AJ
        // const logs = await LogItem.find({ userId }); // Only find logs for this user
        // if (!req.user) {
        //     return res.status(401).json({ success: false, message: "Unauthorized - no user" });
        // }

        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Create a new log for the authenticated user
export const createLog = async (req, res) => {
    const log = req.body;
    if (!log.title || !log.date || !log.mentorName || !log.description) {
        return res.status(400).json({ success: false, message: "Please Provide All Fields" });
    }

    const newLog = new LogItem({
        ...log,
        userId: req.user._id, // Associate the log with the authenticated user
        sharedWith: log.sharedWith || [] // Array of shared users
    });

    try {
        await newLog.save();
        // this dynamically places it in the user model interactionLogs array
        await User.findByIdAndUpdate(req.user._id, { $push: { interactionLogs: newLog._id } });
        res.status(201).json({ success: true, data: newLog });
    } catch (error) {
        console.error("Error in Creating Log:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update a log (only if it belongs to the authenticated user)
export const logUpdate = async (req, res) => {
    const { id } = req.params;
    const logs = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid ID" });
    }

    try {
        // Ensure the log belongs to the authenticated user
        const log = await LogItem.findOne({ _id: id, userId: req.user._id });
        if (!log) {
            return res.status(404).json({ success: false, message: "Log not found or unauthorized" });
        }

        // Perform the update
        const updatedLog = await LogItem.findByIdAndUpdate(id, logs, { new: true });
        res.status(200).json({ success: true, data: updatedLog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// Delete a log (only if it belongs to the authenticated user)
export const logDelete = async (req, res) => {
    const { id } = req.params;

    try {
        // Ensure the log belongs to the authenticated user
        const log = await LogItem.findOne({ _id: id, userId: req.user._id });
        if (!log) {
            return res.status(404).json({ success: false, message: "Log not found or unauthorized" });
        }

        // Proceed to delete the log
        await LogItem.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Log Deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Log Not Found" });
    }
};


// New function to share logs with others
export const shareLog = async (req, res) => {
    try {
        const logId = req.params.id;
        const { shareWithUserId } = req.body;  // expect a single user id to be shared with
        const userId = req.user._id;

        const log = await LogItem.findById(logId);
        if (!log) return res.status(404).json({ message: "Log not found" });

        // Only the owner can share the log
        if (log.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to share this log" });
        }

        // Check that the share target is among the current user's connections.
        const user = await User.findById(userId);
        if (!user.connections || !user.connections.map(String).includes(shareWithUserId)) {
            return res.status(403).json({
                message: "You can only share logs with users you are already connected with"
            });
        }

        // Add the new user to sharedWith if not already present.
        if (!log.sharedWith.map(String).includes(shareWithUserId)) {
            log.sharedWith.push(shareWithUserId);
            await log.save();
        }
        res.status(200).json({ message: "Log shared successfully", log });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
