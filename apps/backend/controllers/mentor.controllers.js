import User from '../models/users.models.js';

export const getMentors = async (req, res) => {
    try {
        // Find users who are mentors
        const mentors = await User.find({ isMentor: true });
        res.json({ data: mentors });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};