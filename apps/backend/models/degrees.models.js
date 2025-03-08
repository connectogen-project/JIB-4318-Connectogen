const mongoose = require("mongoose");

const degreeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

const Degree = mongoose.model("Degree", degreeSchema);
module.exports = Degree;