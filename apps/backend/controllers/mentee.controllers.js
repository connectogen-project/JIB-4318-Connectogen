import User from '../models/users.models.js';

export const getMentees = async (req, res) => {
    try {
        // Find users who are mentors
        const mentees = await User.find({ isMentee: true });
        res.json({ data: mentees });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};