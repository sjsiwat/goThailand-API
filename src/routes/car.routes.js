import express from "express";
import mongoose from "mongoose";
import {Car} from "../models/Car.js";

const router = express.Router();

// GET - ดึงรายการรถทั้งหมด (รองรับ filter: category, location, search, status, visibility, isActive)
router.get("/", async (req, res) => {
  try {
    const { category, location, search, status, visibility, isActive } = req.query;
    const filter = {};

    if (category && category !== "all") {
      filter.category = new RegExp(`^${category}$`, "i");
    }
    if (location) {
      filter.availableLocations = { $in: [new RegExp(location, "i")] };
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
        { model: new RegExp(search, "i") },
      ];
    }
    if (status === "hidden" || visibility === "hidden" || isActive === "false") {
      filter.isActive = false;
    } else if (
      status === "visible" ||
      status === "active" ||
      visibility === "visible" ||
      isActive === "true"
    ) {
      filter.$or = [{ isActive: true }, { isActive: { $exists: false } }];
    }

    const cars = await Car.find(filter);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - ดึงข้อมูลรถรายคันตาม ID หรือ slug
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let car = null;

    // 1. ค้นหาด้วย MongoDB ObjectId หากมี format ถูกต้อง
    if (mongoose.Types.ObjectId.isValid(id)) {
      car = await Car.findById(id);
    }

    // 2. หากหาไม่เจอหรือ ID ไม่ใช่ ObjectId ให้ค้นหาด้วย slug
    if (!car) {
      car = await Car.findOne({ slug: id });
    }

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

// PATCH - อัปเดตข้อมูลรถ (รองรับทั้ง ObjectId และ slug)
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let car = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      car = await Car.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
    }

    if (!car) {
      car = await Car.findOneAndUpdate(
        { slug: id },
        req.body,
        { new: true, runValidators: true }
      );
    }

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - ลบข้อมูลรถ (รองรับทั้ง ObjectId และ slug)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let car = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      car = await Car.findByIdAndDelete(id);
    }

    if (!car) {
      car = await Car.findOneAndDelete({ slug: id });
    }

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;