// Used to create the degrees collection and populate the default current degress if they don't already exist.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../apps/backend/.env" });

const Degree = require("../apps/backend/models/degrees.models"); // adjust the path as needed

const defaultDegrees = [
    { name: "BS - Bachelor of Science" },
    { name: "MS - Master of Science" },
    { name: "PhD - Doctor of Philosophy" },
    { name: "MD - Doctor of Medicine" },
    { name: "NP - Nurse Practitioner" },
];

async function seedDegrees() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Degree.countDocuments();
        if (count === 0) {
            await Degree.insertMany(defaultDegrees);
            console.log("Degrees seeded successfully");
        } else {
            console.log("Degrees already seeded");
        }
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding degrees:", error);
        mongoose.connection.close();
    }
}

seedDegrees();