const MentorshipRequest = require('../models/mentorshipRequest.models.js');
const User = require('../models/users.models.js');

// User can only send a mentorship request if they're already connected with target
const sendMentorshipRequest = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { recipientId, type, message } = req.body;

        // Check to see if sender/target already connected
        const sender = await User.findById(senderId);
        if (!sender.connections.includes(recipientId)) {
            return res.status(400).json({ message: "You must be connected to send a mentorship request." });
        }

        // Check if a request was already sent
        const existingRequest = await MentorshipRequest.findOne({
            from: senderId,
            to: recipientId,
            type
        });
        if (existingRequest) {
            return res.status(400).json({ message: "Mentorship request already sent." });
        }

        const newRequest = new MentorshipRequest({
            from: senderId,
            to: recipientId,
            type,
            message
        });

        const result = await newRequest.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get pending mentorship requests for an authenticated user
const getMentorshipRequests = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const requests = await MentorshipRequest.find({
            to: currentUserId,
            status: 'pending'
        }).populate('from', 'firstName lastName');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Accept a mentorship request
const acceptMentorshipRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const currentUserId = req.user._id;

        const mentorshipRequest = await MentorshipRequest.findById(requestId);
        if (
            !mentorshipRequest ||
            mentorshipRequest.to.toString() !== currentUserId.toString() ||
            mentorshipRequest.status !== 'pending'
        ) {
            return res.status(404).json({ message: "Mentorship request not found or already processed." });
        }

        mentorshipRequest.status = 'accepted';
        await mentorshipRequest.save();

        // Update the mentor/mentee relationship dependent on the type
        if (mentorshipRequest.type === 'mentor') {
            // The sender is asking the current user to be their mentor
            await User.findByIdAndUpdate(currentUserId, { $addToSet: { mentees: mentorshipRequest.from } });
            await User.findByIdAndUpdate(mentorshipRequest.from, { $addToSet: { mentors: currentUserId } });
        } else if (mentorshipRequest.type === 'mentee') {
            // The sender is asking the current user to be their mentee
            await User.findByIdAndUpdate(currentUserId, { $addToSet: { mentors: mentorshipRequest.from } });
            await User.findByIdAndUpdate(mentorshipRequest.from, { $addToSet: { mentees: currentUserId } });
        }

        res.status(200).json({ message: "Mentorship request accepted.", mentorshipRequest });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Reject a mentorship request
const rejectMentorshipRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const currentUserId = req.user._id;

        const mentorshipRequest = await MentorshipRequest.findById(requestId);
        if (
            !mentorshipRequest ||
            mentorshipRequest.to.toString() !== currentUserId.toString() ||
            mentorshipRequest.status !== 'pending'
        ) {
            return res.status(404).json({ message: "Mentorship request not found or already processed." });
        }

        mentorshipRequest.status = 'denied';
        await mentorshipRequest.save();

        res.status(200).json({ message: "Mentorship request denied.", mentorshipRequest });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    sendMentorshipRequest,
    getMentorshipRequests,
    acceptMentorshipRequest,
    rejectMentorshipRequest
};