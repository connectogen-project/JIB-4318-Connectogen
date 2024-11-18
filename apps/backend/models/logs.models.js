import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    mentorName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const LogItem = mongoose.model("Log", logSchema);
export default LogItem;