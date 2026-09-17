import express from "express";
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

// GET - Read all
router.get("/", async (req, res) => {
  try {
    const accommodations = await Accommodation.find();

    res.json(accommodations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE - Update by ID
router.patch("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

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

// DELETE - Delete by ID
router.delete("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        message: "Accommodation not found",
      });
    }

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
