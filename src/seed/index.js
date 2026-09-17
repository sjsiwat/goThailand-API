import mongoose from "mongoose";
import dotenv from "dotenv";

import seedAccommodations from "./accommodation.seed.js";
import seedCars from "./car.seed.js";
import seedGuides from "./guide.seed.js";
import seedUsers from "./user.seed.js";

dotenv.config();

async function seedAll() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected 🌱");

    await seedAccommodations();
    await seedCars();
    await seedGuides();
    await seedUsers();

    console.log("All seed data inserted successfully! 🎉");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedAll();
