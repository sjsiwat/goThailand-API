import Car from "../models/Car.js";

const cars = [
  {
    brand: "Toyota",
    model: "Yaris",
    price: 1200,
  },
  {
    brand: "Honda",
    model: "City",
    price: 1300,
  },
  {
    brand: "Toyota",
    model: "Fortuner",
    price: 2500,
  },
  {
    brand: "Mazda",
    model: "2",
    price: 1100,
  },
  {
    brand: "Nissan",
    model: "Almera",
    price: 1000,
  },
];

async function seedCars() {
  await Car.insertMany(cars);
  console.log("Car seed completed ✅");
}

export default seedCars;
