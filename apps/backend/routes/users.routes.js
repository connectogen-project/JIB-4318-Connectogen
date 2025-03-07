const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/users.controllers.js');
const { logUpdate, logDelete } = require('../controllers/logs.controllers');
const authMiddleware = require('../middlewares/auth.middleware.js');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const {uploadResume, getMyMentors, getMyMentees} = require("../controllers/users.controllers");
router.post("/upload-resume", upload.single("resume"), uploadResume);

// Public Routes (No Authentication Required)
router.post('/register', registerUser); // Register a new user

router.post('/login', loginUser); // Login a user

router.post('/logout', logoutUser); // Logout a user

router.post('/forgot-password', forgotPassword); // Forgot password (generate reset token)

router.post('/reset-password', resetPassword); // Reset password (validate token and update password)

// Protected Routes (Authentication Required)
router.get('/', getUser); // Get user details

// For fetching a user's mentors / mentees
router.get('/my-mentors', authMiddleware, getMyMentors);
router.get('/my-mentees', authMiddleware, getMyMentees);

// Only an authenticated user can update their own profile after revalidating password
router.put('/:id', authMiddleware, async (req, res, next) => {
  // The actual update logic is in updateUser, but we'll confirm ownership + password here first.
  // 1) Ensure the logged-in user matches the :id
  if (req.user._id !== req.params.id) {
    return res.status(403).json({ message: 'Not authorized to update this profile' });
  }

  // 2) Check if the user re-sent password in the body
  const { reenteredPassword } = req.body;
  if (!reenteredPassword) {
    return res.status(400).json({ message: 'Must provide current password' });
  }

  // 3) Re-fetch user from DB to compare password 
  const User = require('../models/users.models.js');
  const existingUser = await User.findById(req.params.id);
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await existingUser.comparePassword(reenteredPassword);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // If all checks pass, proceed to the real update handler
  next();
}, updateUser, logUpdate);

// Only an authenticated user can delete their own profile after revalidating password
router.delete('/:id', authMiddleware, async (req, res, next) => {
  // 1) Ensure the logged-in user matches the :id
  if (req.user._id !== req.params.id) {
    return res.status(403).json({ message: 'Not authorized to delete this profile' });
  }

  // 2) Check if the user re-sent password in the body
  const { reenteredPassword } = req.body;
  if (!reenteredPassword) {
    return res.status(400).json({ message: 'Must provide current password' });
  }

  // 3) Re-fetch user from DB to compare password
  const User = require('../models/users.models.js');
  const existingUser = await User.findById(req.params.id);
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await existingUser.comparePassword(reenteredPassword);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // If all checks pass, proceed to the real delete handler
  next();
}, deleteUser, logDelete);

module.exports = router;