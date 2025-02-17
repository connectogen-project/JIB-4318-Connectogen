const getNotifications = async (req, res) => {
    try {
        // Assuming authMiddleware sets req.user and your Notification model has a 'userEmail' field
        const userEmail = req.user.email;
        const notifications = await Notification.find({ userEmail });
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Example code for createNotification (if needed)
const createNotification = async (req, res) => {
   try {
       // Ensure the notification is created for the authenticated user
       const newNotif = new Notification({
         ...req.body,
         userEmail: req.user.email // force the notification to be linked to the logged in user
       });
       await newNotif.save();
       res.status(201).json(newNotif);
   } catch (error) {
       res.status(500).json({ message: 'Error creating notification', error: error.message });
   }
};

module.exports = { getNotifications, createNotification }; 