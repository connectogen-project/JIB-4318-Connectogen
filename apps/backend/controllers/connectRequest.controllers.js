const mongoose = require('mongoose');
const ConnectionRequest = require('../models/connectRequest.models.js');
const User = require('../models/users.models.js');

// Utility function to handle errors
const handleError = (res, error, status = 400) => {
  res.status(status).json({ error: error.message });
};

// Send a connection request with an optional message
const sendConnectionRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { recipientId, message } = req.body;

    // Check if a request already exists
    const existingRequest = await ConnectionRequest.findOne({ from: userId, recipient: recipientId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Connection request already sent' });
    }

    // Create and save the new request
    const newRequest = new ConnectionRequest({ 
      from: userId, 
      recipient: recipientId, 
      status: 'pending', 
      message 
    });
    const result = await newRequest.save();
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

// Get connection requests for the authenticated user
const getConnectionRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const requests = await ConnectionRequest.find({ recipient: userId }).populate('from', 'firstName lastName profilePicture');
    res.status(200).json(requests);
  } catch (error) {
    handleError(res, error);
  }
};

// Check if a connection request exists between the authenticated user and another user
const checkConnectionRequest = async (req, res) => {
  try {
    const { profileUserId } = req.query;
    const userId = req.user._id;

    const requestExists = await ConnectionRequest.exists({
      $or: [
        { from: userId, recipient: profileUserId },
        { from: profileUserId, recipient: userId },
      ],
    });

    res.json({ exists: !!requestExists });
  } catch (error) {
    handleError(res, error);
  }
};

// Accept a connection request
const acceptConnectionRequest = async (req, res) => {
  try {
    const recipientId = req.user._id; // Authenticated user (recipient)
    const senderId = req.body.sender; // User who sent the request

    // Check if the request exists and is still pending
    const connectionRequest = await ConnectionRequest.findOne({ from: senderId, recipient: recipientId, status: 'pending' });

    if (!connectionRequest) {
      return res.status(404).json({ message: 'Connection request not found or already handled' });
    }

    // Add each user to the other's connections array
    await User.findByIdAndUpdate(senderId, { $addToSet: { connections: recipientId } });
    await User.findByIdAndUpdate(recipientId, { $addToSet: { connections: senderId } });

    // Update the request status to 'accepted'
    connectionRequest.status = 'accepted';
    await connectionRequest.save(); // Save the updated request

    // Fetch updated pending requests
    const updatedRequests = await ConnectionRequest.find({ recipient: recipientId, status: 'pending' });

    // Fetch the updated connections list for the recipient
    const recipient = await User.findById(recipientId).populate('connections', 'firstName lastName profilePicture');

    res.status(200).json({ 
      updatedRequests, 
      connections: recipient.connections 
    });
  } catch (error) {
    handleError(res, error);
  }
};


// Reject a connection request
const rejectConnectionRequest = async (req, res) => {
  try {
    const recipientId = req.user._id; // Authenticated user (recipient)
    const senderId = req.body.sender; // User who sent the request

    // Check if the request exists and is still pending
    const connectionRequest = await ConnectionRequest.findOne({ from: senderId, recipient: recipientId, status: 'pending' });

    if (!connectionRequest) {
      return res.status(404).json({ message: 'Connection request not found or already handled' });
    }

    // Update the request status to 'rejected'
    connectionRequest.status = 'rejected';
    await connectionRequest.save(); // Save the updated request

    // Fetch updated pending requests
    const updatedRequests = await ConnectionRequest.find({ recipient: recipientId, status: 'pending' });

    res.status(200).json({ updatedRequests });
  } catch (error) {
    handleError(res, error);
  }
};


// Unfriend a user
const unfriendUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { friendId } = req.body;

    // Remove the connection from both users
    await User.findByIdAndUpdate(userId, { $pull: { connections: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { connections: userId } });

    // Delete any related connection requests
    await ConnectionRequest.findOneAndDelete({
      $or: [
        { from: userId, recipient: friendId },
        { from: friendId, recipient: userId },
      ],
    });

    res.status(200).json({ message: 'Unfriended successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

// Get the authenticated user's connections
const getConnections = async (req, res) => {
  try {
    const userId = req.user._id; // Get the authenticated user's ID

    // Find the user and populate the connections field
    const user = await User.findById(userId).populate('connections', 'firstName lastName profilePicture');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.connections);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  sendConnectionRequest,
  getConnectionRequests,
  checkConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  unfriendUser,
  getConnections,
};