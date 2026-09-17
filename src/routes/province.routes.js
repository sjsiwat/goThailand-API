import express from "express";
import Province from "../models/Province.js";

const router = express.Router();

// GET - ดึงรายการจังหวัดทั้งหมด (รองรับการกรองตามภูมิภาค เช่น ?region=north หรือ ?region=เหนือ)
router.get("/", async (req, res) => {
  try {
    const { region, format } = req.query;
    const filter = {};

    if (region) {
      filter.$or = [
        { region: new RegExp(`^${region}$`, "i") },
        { region_th: new RegExp(region, "i") },
      ];
    }

    const provinces = await Province.find(filter).sort({ id: 1 });

    if (format === "array") {
      return res.json(provinces);
    }

    res.json({
      success: true,
      count: provinces.length,
      provinces,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET - ดึงข้อมูลจังหวัดเดี่ยวจาก ID หรือ Slug (เช่น /api/provinces/bangkok หรือ /api/provinces/10)
router.get("/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const isNum = !isNaN(param);

    const province = await Province.findOne({
      $or: [
        ...(isNum ? [{ id: Number(param) }] : []),
        { slug: param.toLowerCase() },
      ],
    });

    if (!province) {
      return res.status(404).json({
        success: false,
        message: "Province not found",
      });
    }

    res.json({
      success: true,
      province,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST - สร้างข้อมูลจังหวัดใหม่
router.post("/", async (req, res) => {
  try {
    const province = await Province.create(req.body);
    res.status(201).json(province);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
