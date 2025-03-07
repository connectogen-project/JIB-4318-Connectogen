const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentorshipRequestSchema = new Schema(
    {
        from: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        // Sender is asking target to either be their mentor or mentee
        type: {
            type: String,
            enum: ['mentor', 'mentee'],
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'denied'],
            default: 'pending'
        },
        message: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('MentorshipRequest', mentorshipRequestSchema);