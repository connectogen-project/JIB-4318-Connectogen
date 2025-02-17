import Notification from "../models/notifications.models.js";

export const getNotification = async (req, res) => {
    try {
        // const { userEmail } = req.query;
        const userEmail = req.user.email;
        if (!userEmail) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const notif = await Notification.find({ userEmail });
        res.status(200).json({ success: true, data: notif});
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createNotification = async(req, res) => {
    try {
        const { notifType, message, userEmail } = req.body;

        let notifID = generateRandomString(10);
        while (true) {
            const existingNotif = await Notification.findOne({ notifID });
            if (existingNotif) {
                notifID = generateRandomString(10);
            } else {
                break;
            }
        }

        const time = Date.now() // the date is in milliseconds from 1/1/1970

        const newNotif = new Notification({
            notifID,
            notifType,
            message,
            userEmail,
            time,
            read: false
        });

        await newNotif.save();
        res.status(201).json({ message: 'Notification created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const readNotification = async(req, res) => {
    try {
        const { id } = req.params; 
        const notif = await Notification.findById(id);

        if (!notif) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notif.read = true;
        await notif.save();
        res.status(200).json({ message: 'Notification updated successfully', data: notif});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const deleteNotification = async(req, res) => {
    const { id } = req.params;
    try {    
        await Notification.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Notification deleted" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Notification not found" });
    }
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result
}