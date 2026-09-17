import express from "express";
import mongoose from "mongoose";
import {Car} from "../models/Car.js";

const router = express.Router();

// GET - ดึงรายการรถทั้งหมด 
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - ดึงข้อมูลรถรายคันตาม ID 
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบความถูกต้องของ MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Car ID format" });
    }

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - เพิ่มข้อมูลรถใหม่
router.post("/", async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH - อัปเดตข้อมูลรถ
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Car ID format" });
    }

    const car = await Car.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // runValidators ป้องกันข้อมูลผิดเงื่อนไข schema
    );

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - ลบข้อมูลรถ
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Car ID format" });
    }

    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;