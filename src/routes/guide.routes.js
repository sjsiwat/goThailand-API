import express from "express";
import Guide from "../models/Guide.js";

const router = express.Router();

// GET - Get all guides
router.get("/", async (req, res) => {
  try {
    const guides = await Guide.find();

    res.json(guides);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST - Create guide
router.post("/", async (req, res) => {
  try {
    const guide = await Guide.create(req.body);

    res.status(201).json(guide);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
