const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionRequestSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User' // Mentor/Mentee requesting connection
    },
    recipient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    requestedAt: {
      type: Date,
      default: Date.now
    },
    connectionParticipants: {
        type: [Schema.Types.ObjectId],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema);
