const mongoose = require('mongoose');
const ConnectionRequest = require('../models/connectRequest.models.js');
const User = require('../models/users.models.js');

// Send a connection request with an optional message
const sendConnectionRequest = async (req, res) => {
  try {
    const userId = req.user._id; // Get the authenticated user's ID from req.user
    const { recipientId, message } = req.body; // Include the optional message

    const existingRequest = await ConnectionRequest.findOne({ from: userId, recipient: recipientId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Connection request already sent' });
    }

    const newRequest = new ConnectionRequest({ 
      from: userId, 
      recipient: recipientId, 
      status: 'pending', 
      message // Include the optional message
    });
    const result = await newRequest.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get connection requests for the authenticated user
const getConnectionRequests = async (req, res) => {
  try {
    const userId = req.user._id; // Get the authenticated user's ID
    const requests = await ConnectionRequest.find({ recipient: userId }); // Only find requests for this user
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check if a connection request exists between the authenticated user and another user
const checkConnectionRequest = async (req, res) => {
  try {
    const { profileUserId } = req.query;
    const userId = req.user._id; // Get the authenticated user's ID

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

// Accept a connection request (only if it belongs to the authenticated user)
const acceptConnectionRequest = async (req, res) => {
  try {
    const recipientId = req.user._id; // Get the authenticated user's ID
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

// Reject a connection request (only if it belongs to the authenticated user)
const rejectConnectionRequest = async (req, res) => {
  try {
    const recipientId = req.user._id; // Get the authenticated user's ID
    const senderId = req.body.sender;

    await ConnectionRequest.findOneAndDelete({ from: senderId, recipient: recipientId });
    const updatedRequests = await ConnectionRequest.find({ recipient: recipientId, status: 'pending' });
    res.status(200).json({ updatedRequests });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Unfriend a user (only if they are connected to the authenticated user)
const unfriendUser = async (req, res) => {
  try {
    const userId = req.user._id; // Get the authenticated user's ID
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