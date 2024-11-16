import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    menteeName: {
        type: String,
        required: true 
    },
    mentorName: {
        type: String,
        required: true
    },
    interaction: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const LogItem = mongoose.model("Log", logSchema);
export default LogItem;
