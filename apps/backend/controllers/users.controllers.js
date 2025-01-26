const User = require('../models/users.models.js');
const jwt = require('jsonwebtoken');

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



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUser
};

//test