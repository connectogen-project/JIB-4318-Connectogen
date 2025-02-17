const logoutUser = async (req, res) => {
    try {
        // Clear the JWT cookie (adjust the cookie name and options if needed)
        res.cookie('jwt', '', { maxAge: 1, httpOnly: true });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
  
        // Validate password
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
  
        // Set the JWT in an HTTP-only cookie so that subsequent requests include it.
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 3600000, // 1 hour in ms
        });
  
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}; 