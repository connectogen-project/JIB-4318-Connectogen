import LogItem from "../models/logs.models.js"
import mongoose from "mongoose";


export const getLogs = async (req, res) => {
    try {
        const logs = await LogItem.find({});
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        console.log("Error", error.message)
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createLog = async (req, res) => {
    const log = req.body;
    if(!log.mentorName || !log.menteeName || !log.interaction || !log.summary) {
        return res.status(400).json({ success:false, message: "Please Provide All Fields" })
    }

    const newLog = new LogItem(log)

    try {
        await newLog.save();
        res.status(201).json({ success: true, data: newLog});
    } catch (error) {
        console.error("Error in Creating Log:", error.message);
        return res.status(500).json({ success:false, message: "Server Error" })
    }
}

export const logUpdate = async (req, res) => {
    const { id } = req.params;
    const logs = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid"});
    }
    try {
        const updateLog = await LogItem.findByIdAndUpdate(id, logs, {new:true});
        res.status(200).json({ success: true, data: updateLog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });

    }
}

export const logDelete = async (req, res) => {
    const { id } = req.params;
    try {
        await LogItem.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Log Deleted"});
    } catch (error) {
        res.status(404).json({ success: false, message: "Log Not Found"});
    }
}