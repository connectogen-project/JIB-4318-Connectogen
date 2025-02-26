const mongoose = require("mongoose");

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
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'undefined'],
        default: 'undefined'
    },
    institution: {
      type: String,
      enum: ['Emory University', 'Morehouse College', 'Morehouse School of Medicine',
          'Georgia Institute of Technology'],
        default: null
    },

    /* Changed degrees and sub-specialties to dynamically fetch information from
       degrees and sub-specialties models - AJ
     */

    degrees: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Degree" }],
        default: []
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
    // See above comment - AJ
    subspecialties: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subspecialty" }],
        default: []
    },

    isMentee: {
        type: Boolean,
        default: false
    },
    // expertise: [
    //  We will make this multiple choice for now, select a few things you're experienced in
    // interests: [
    //  Twin for this as well
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
    },

    resume: {
        type: String,
        default: null,
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
// Add Note Here Later - AJAJ