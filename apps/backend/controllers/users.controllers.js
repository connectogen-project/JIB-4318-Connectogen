const crypto = require('node:crypto');
const User = require('../models/users.models.js');
const jwt = require('jsonwebtoken');
const path = require('path');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            _id: user._id,
            email: user.email,
            isMentor: user.isMentor,
            isMentee: user.isMentee,
        };

        const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1h' });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false, // will need to be updated
            sameSite: 'lax',
            maxAge: 3600000,
            path: '/' // Ensure it's accessible for all routes
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const logoutUser = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/' // Ensure it matches the cookie path set during login
        });

        // Respond with success message
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const fileUrl = `http://localhost:${process.env.PORT || 2999}/uploads/${req.file.filename}`;
        res.status(200).json({ fileUrl });
    } catch (error) {
        res.status(500).json({ message: "Error uploading, try again", error: error.message });
    }
};


const getUser = async (req, res) => {
    try {
        const { email } = req.query; // User ID is their email address

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email })
            .select('-password')
            .populate('degrees')
            .populate('subspecialties')
            .populate('connectionRequests');


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, isMentor, isMentee, bio, degrees, username, gender, institution, subspecialties, resume } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password, // pwd hash taken care of in models
            isMentor,
            isMentee,
            bio,
            degrees,
            username,
            gender,
            institution,
            subspecialties,
            resume
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // User ID passed as a URL parameter
        const updateData = req.body;

        // Optional: Prevent updating password
        if (updateData.password) {
            // If password is being updated, it should be hashed in the model's pre-save hook
            // Alternatively, handle hashing here
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
            context: 'query'
        }).select('-password'); // Exclude password

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // User ID passed as a URL parameter

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        res.status(200).json({ message: 'Reset token generated', resetToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword, confirmPassword } = req.body;

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Find user by reset token and check expiration
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Update password and clear reset token fields
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getUser,
    forgotPassword,
    resetPassword,
    uploadResume
};

// module.exports.uploadResume = uploadResume; test code
// Undo deletion
