import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();

    res.json(cars);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const car = await Car.create(req.body);

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
