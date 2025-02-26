const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../apps/backend/.env" });

const User = require("../apps/backend/models/users.models");
const Degree = require("../apps/backend/models/degrees.models");

async function migrateUserDegrees() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({});
        let migratedCount = 0;

        for (const user of users) {
            if (user.degrees && user.degrees.length > 0 && typeof user.degrees[0] === "string") {
                const degreeIds = [];
                for (const degreeName of user.degrees) {
                    let degree = await Degree.findOne({ name: degreeName });
                    if (!degree) {
                        degree = await Degree.create({ name: degreeName });
                    }
                    degreeIds.push(degree._id);
                }
                user.degrees = degreeIds;
                await user.save();
                migratedCount++;
            }
        }
        console.log(`Degrees migration complete. Migrated ${migratedCount} user(s).`);
    } catch (error) {
        console.error("Error during migration:", error);
    } finally {
        mongoose.connection.close();
    }
}

migrateUserDegrees();