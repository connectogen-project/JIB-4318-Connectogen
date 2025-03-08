const Degree = require("../models/degrees.models");

const getDegrees = async (req, res) => {
    try {
        const degrees = await Degree.find({});
        res.status(200).json(degrees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getDegrees };