import mongoose from "mongoose";

const notifSchema = new mongoose.Schema({
    notifID: {
        type: String,
        required: true,
        trim: true
    },
    notifType: {
        type: String,
        enum: ['Incoming Connection Request', 'Accepted Connection Request', 'Message', 'User Profile Update'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    read: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Notification = mongoose.model("Notification", notifSchema);
export default Notification;