import mongoose from "mongoose";

const bcrypt = require('bcryptjs');

const options = { discriminatorKey: 'role', timestamps: true };

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String, // URL to S3 or cloud storage
        default: null
    },
    bio: {
        type: String,
        trim: true,
        default: null
    },
    isMentor: {
        type: Boolean,
        default: false
    },

    mentorProfile: {
        institution:  { type: String },
        affiliation:  { type: String },
        field:        { type: String },
        subspecialty: { type: String },
        position:     { type: String }
    },

    isMentee: {
        type: Boolean,
        default: false
    },
    // expertise: [
    //  We will make this multiple choice for now, select a few things you're experienced in
    // interests: [
    //  Twin for this as well
    connectionRequests: [
        {
            from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Mentor/Mentee requesting connection
            status: {
                type: String,
                enum: ['pending', 'accepted', 'rejected'],
                default: 'pending'
            },
            requestedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Connected mentors/mentees
        }
    ],
    interactionLogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InteractionLog' // Reference to interaction logs collection
        }
    ],
    resetPasswordToken: String,  // Token for password reset
    resetPasswordExpires: Date,  // Expiration time for the reset token
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;