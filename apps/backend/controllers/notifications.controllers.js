import Notification from "../models/notifications.models.js";
import mongoose from "mongoose";
import User from "../models/users.models.js";

// Get notifications for the authenticated user
export const getNotification = async (req, res) => {
    try {
        const userId = req.user._id; // Get the authenticated user's ID
        const notif = await Notification.find({ userId }); // Only find notifications for this user
        res.status(200).json(notif);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getAllNotifications = async (req, res) => {
    try {
        const notif = await Notification.find({ });
        res.status(200).json(notif);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Create a notification for the authenticated user
export const createNotification = async (req, res) => {
    try {
        const { notifType, message, userId } = req.body;
        const userEmail = await User.findById(userId).select("email");

        let notifID = generateRandomString(10);
        while (true) {
            const existingNotif = await Notification.findOne({ notifID });
            if (existingNotif) {
                notifID = generateRandomString(10);
            } else {
                break;
            }
        }

        const time = Date.now(); // The date is in milliseconds from 1/1/1970

        const newNotif = new Notification({
            notifID,
            notifType,
            message,
            userEmail,
            userId, // Associate the notification with the authenticated user
            time,
            read: false
        });

        await newNotif.save();
        res.status(201).json({ message: 'Notification created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Mark a notification as read (only if it belongs to the authenticated user)
export const readNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notif = await Notification.findOne({ _id: id, userId: req.user._id }); // Ensure the notification belongs to the user

        if (!notif) {
            return res.status(404).json({ message: 'Notification not found or unauthorized' });
        }

        notif.read = true;
        await notif.save();
        res.status(200).json({ message: 'Notification updated successfully', data: notif });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a notification (only if it belongs to the authenticated user)
export const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notif = await Notification.findOne({ _id: id, userId: req.user._id }); // Ensure the notification belongs to the user
        if (!notif) {
            return res.status(404).json({ success: false, message: "Notification not found or unauthorized" });
        }

        await Notification.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Notification deleted" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Notification not found" });
    }
};

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}