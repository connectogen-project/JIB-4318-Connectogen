const crypto = require('node:crypto');
const User = require('../models/users.models.js');
const jwt = require('jsonwebtoken');
const path = require("path");

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({message: "No file uploaded" });
        }
        const fileUrl = `http://localhost:${process.env.PORT || 2999}/uploads/${req.file.filename}`;
        res.status(200).json({fileUrl});
    } catch (error) {
        res.status(500).json({message: "Error uploading, try again", error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { email } = req.user; // Get email from decoded token in req.user

        const user = await User.findOne({ email }).select('-password');

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

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({
            firstName, lastName, email, password, isMentor, isMentee, bio, degrees, username, gender, institution, subspecialties, resume
        });

        await newUser.save();

        const payload = {
            _id: newUser._id,
            email: newUser.email,
            isMentor: newUser.isMentor,
            isMentee: newUser.isMentee
        };

        const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000 // 1 hour
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

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
            isMentee: user.isMentee
        };

        const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

const updateUser = async (req, res) => {
    try {
        const { _id } = req.user; // Get user ID from decoded token in req.user
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
            new: true,
            runValidators: true,
            context: 'query'
        }).select('-password');

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
        const { _id } = req.user; // Get user ID from decoded token in req.user

        const deletedUser = await User.findByIdAndDelete(_id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.clearCookie("token");
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

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

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

