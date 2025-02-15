const mongoose = require('mongoose');
const ConnectionRequest = require('../models/connectRequest.models.js');
const User = require('../models/users.models.js');

// Send a connection request
const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.tokenUser;
    const { recipientId } = req.body;

    const existingRequest = await ConnectionRequest.findOne({ from: userId, recipient: recipientId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Connection request already sent' });
    }

    const newRequest = new ConnectionRequest({ from: userId, recipient: recipientId, status: 'pending' });
    const result = await newRequest.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get connection requests for a user
const getConnectionRequests = async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({ recipient: req.params.id });
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check if a connection request exists
const checkConnectionRequest = async (req, res) => {
  try {
    const { profileUserId } = req.query;
    const { userId } = req.tokenUser;

    const requestExists = await ConnectionRequest.exists({
      $or: [
        { from: userId, recipient: profileUserId },
        { from: profileUserId, recipient: userId },
      ],
    });

    res.json({ exists: !!requestExists });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Accept a connection request
const acceptConnectionRequest = async (req, res) => {
  try {
    const recipientId = req.tokenUser.userId;
    const senderId = req.body.sender;

    const sender = await User.findByIdAndUpdate(senderId, { $addToSet: { connections: recipientId } }, { new: true });
    const recipient = await User.findByIdAndUpdate(recipientId, { $addToSet: { connections: senderId } }, { new: true });

    if (recipient) {
      await ConnectionRequest.findOneAndUpdate({ from: senderId, recipient: recipientId }, { status: 'accepted' });
      const updatedRequests = await ConnectionRequest.find({ recipient: recipientId, status: 'pending' });
      res.status(200).json({ updatedRequests, connections: recipient.connections });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reject a connection request
const rejectConnectionRequest = async (req, res) => {
  try {
    const recipientId = req.tokenUser.userId;
    const senderId = req.body.sender;

    await ConnectionRequest.findOneAndDelete({ from: senderId, recipient: recipientId });
    const updatedRequests = await ConnectionRequest.find({ recipient: recipientId, status: 'pending' });
    res.status(200).json({ updatedRequests });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Unfriend a user
const unfriendUser = async (req, res) => {
  try {
    const { userId } = req.tokenUser;
    const { friendId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { connections: friendId } }, { new: true }).select('-password');
    const updatedFriend = await User.findByIdAndUpdate(friendId, { $pull: { connections: userId } }, { new: true }).select('-password');

    await ConnectionRequest.findOneAndDelete({
      $or: [
        { from: userId, recipient: friendId },
        { from: friendId, recipient: userId },
      ],
    });

    res.status(200).json({ updatedUser, updatedFriend });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendConnectionRequest,
  getConnectionRequests,
  checkConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  unfriendUser,
};
