import mongoose from "mongoose";
import dotenv from "dotenv";
import Accommodation from "../models/Accommodation.js";

dotenv.config();

const accommodations = [
  {
    name: "Mountain View Resort",
    location: "Chiang Mai",
    price: 1500,
  },
  {
    name: "Old Town Hotel",
    location: "Chiang Mai",
    price: 1200,
  },
  {
    name: "Sea Breeze Resort",
    location: "Phuket",
    price: 2500,
  },
  {
    name: "Bangkok City Hotel",
    location: "Bangkok",
    price: 1800,
  },
  {
    name: "Pai Riverside Resort",
    location: "Mae Hong Son",
    price: 1000,
  },
];

async function seedAccommodations() {
  await Accommodation.insertMany(accommodations);
  console.log("Accommodation seed completed ✅");
}

export default seedAccommodations;
