const User = require('../models/users.models.js');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
    try {
        const { email } = req.query; // User ID is their email address

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email }).select('-password'); // Exclude password req

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
        const { firstName, lastName, email, password, isMentor, isMentee } = req.body;

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
            isMentee
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate pwd hash
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

        const token = jwt.sign(payload, process.env.JWT_TOKEN, {expiresIn: '1h'});

        // Success results in 400 code
        res.status(200).json({ message: 'Login successful', token });
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

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUser
};