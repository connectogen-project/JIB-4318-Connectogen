const mongoose = require("mongoose");

const subspecialtySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

const Subspecialty = mongoose.model("Subspecialty", subspecialtySchema);
module.exports = Subspecialty;