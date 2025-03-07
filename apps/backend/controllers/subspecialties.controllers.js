const Subspecialty = require("../models/subspecialties.models");

const getSubspecialties = async (req, res) => {
    try {
        const subspecialties = await Subspecialty.find({});
        res.status(200).json(subspecialties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getSubspecialties };