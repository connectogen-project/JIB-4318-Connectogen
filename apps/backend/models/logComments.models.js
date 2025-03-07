// Creating this file so that logs that are shared with other users can be commented on by shared users.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logCommentSchema = new Schema(
    {
        log: { type: Schema.Types.ObjectId, ref: 'Log', required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        comment: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('LogComment', logCommentSchema);