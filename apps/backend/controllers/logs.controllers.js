import LogItem from "../models/logs.models.js"
import mongoose from "mongoose";

export const getLogs = async (req, res) => {
    try {
        const userEmail = req.user.email; // Get email from decoded token in req.user
        const logs = await LogItem.find({ userEmail });
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createLog = async (req, res) => {
    const log = req.body;
    const userEmail = req.user.email; // Get email from decoded token in req.user

    if(!log.title || !log.date || !log.mentorName || !log.description) {
        return res.status(400).json({ success: false, message: "Please Provide All Fields" });
    }

    const newLog = new LogItem({ ...log, userEmail });

    try {
        await newLog.save();
        res.status(201).json({ success: true, data: newLog });
    } catch (error) {
        console.error("Error in Creating Log:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const logUpdate = async (req, res) => {
    const { id } = req.params;
    const logs = req.body;
    const userEmail = req.user.email; // Get email from decoded token in req.user

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid ID" });
    }

    try {
        const updateLog = await LogItem.findOneAndUpdate(
            { _id: id, userEmail },
            logs,
            { new: true }
        );

        if (!updateLog) {
            return res.status(404).json({ success: false, message: "Log not found or unauthorized" });
        }

        res.status(200).json({ success: true, data: updateLog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const logDelete = async (req, res) => {
    const { id } = req.params;
    const userEmail = req.user.email; // Get email from decoded token in req.user

    try {
        const deletedLog = await LogItem.findOneAndDelete({ _id: id, userEmail });

        if (!deletedLog) {
            return res.status(404).json({ success: false, message: "Log not found or unauthorized" });
        }

        res.status(200).json({ success: true, message: "Log Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
