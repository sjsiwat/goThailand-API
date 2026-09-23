import express from "express";
import mongoose from "mongoose";
import Accommodation from "../models/Accommodation.js";

const router = express.Router();

// POST - Create
router.post("/", async (req, res) => {
  try {
    const accommodation = await Accommodation.create(req.body);

    res.status(201).json(accommodation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET - Read all (รองรับ filter: region, province, search, status, visibility, isActive)
router.get("/", async (req, res) => {
  try {
    const { region, province, search, status, visibility, isActive } = req.query;
    const filter = {};

    if (region && region !== "all") {
      filter.region = new RegExp(`^${region}$`, "i");
    }
    if (province) {
      filter["location.city"] = new RegExp(province, "i");
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { "location.city": new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
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

    const accommodations = await Accommodation.find(filter);
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Helper สำหรับค้นหา Accommodation จาก ID หลากหลายรูปแบบ (ObjectId, Number _id, String _id, หรือ slug id)
async function findAccommodation(id) {
  let acc = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    acc = await Accommodation.findById(id);
  }
  if (!acc && !isNaN(id)) {
    acc = await Accommodation.findById(Number(id));
  }
  if (!acc) {
    acc = await Accommodation.findById(id);
  }
  if (!acc) {
    acc = await Accommodation.findOne({ id });
  }
  return acc;
}

// GET - Read by ID or slug
router.get("/:id", async (req, res) => {
  try {
    const accommodation = await findAccommodation(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        message: "Accommodation not found",
      });
    }

    res.json(accommodation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE - Update by ID
router.patch("/:id", async (req, res) => {
  try {
    const target = await findAccommodation(req.params.id);
    if (!target) {
      return res.status(404).json({
        message: "Accommodation not found",
      });
    }

    const updated = await Accommodation.findByIdAndUpdate(
      target._id,
      req.body,
      { new: true, returnDocument: "after" }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE - Delete by ID
router.delete("/:id", async (req, res) => {
  try {
    const target = await findAccommodation(req.params.id);
    if (!target) {
      return res.status(404).json({
        message: "Accommodation not found",
      });
    }

    await Accommodation.findByIdAndDelete(target._id);

    res.json({
      message: "Accommodation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;


