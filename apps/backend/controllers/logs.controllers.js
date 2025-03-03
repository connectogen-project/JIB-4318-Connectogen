import LogItem from "../models/logs.models.js";
import mongoose from "mongoose";

// Get logs for the authenticated user
export const getLogs = async (req, res) => {
    try {
        const userId = req.user._id; // Get the authenticated user's ID
        const logs = await LogItem.find({ userId }); // Only find logs for this user
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized - no user" });
        }

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
        userId: req.user._id // Associate the log with the authenticated user
    });

    try {
        await newLog.save();
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
        const log = await LogItem.findOne({ _id: id, userId: req.user._id }); // Ensure the log belongs to the user
        if (!log) {
            return res.status(404).json({ success: false, message: "Log not found or unauthorized" });
        }

        const updateLog = await LogItem.findByIdAndUpdate(id, logs, { new: true });
        res.status(200).json({ success: true, data: updateLog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete a log (only if it belongs to the authenticated user)
export const logDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const log = await LogItem.findOne({ _id: id, userId: req.user._id }); // Ensure the log belongs to the user
        if (!log) {
            return res.status(404).json({ success: false, message: "Log not found or unauthorized" });
        }

        await LogItem.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Log Deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Log Not Found" });
    }
};