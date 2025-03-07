// Used to create the subspecialties collection and populate the default current subspecialties if they don't already exist.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../apps/backend/.env" });

const Subspecialty = require("../apps/backend/models/subspecialties.models");
const defaultSubspecialties = [
    { name: "Autonomic Disorders" },
    { name: "Cardiology" },
    { name: "Dermatology" },
    { name: "Oncology" },
    { name: "Pediatrics" },
];
async function seedSubspecialties() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const count = await Subspecialty.countDocuments();
        if (count === 0) {
            await Subspecialty.insertMany(defaultSubspecialties);
            console.log("Subspecialties seeded successfully");
        } else {
            console.log("Subspecialties already seeded");
        }
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding subspecialties:", error);
        mongoose.connection.close();
    }
}

seedSubspecialties();