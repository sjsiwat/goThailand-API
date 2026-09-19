import express from 'express';
import Guide from '../models/Guide.js'; // สมมติว่า Model ของคุณชื่อ Guide

const router = express.Router();

// 1. CREATE: เพิ่มไกด์ใหม่
router.post("/", async (req, res) => {
  try {
    const newGuide = new Guide(req.body);
    const savedGuide = await newGuide.save();
    res.status(201).json(savedGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. READ: ดึงรายการไกด์ทั้งหมด (รองรับ filter ตาม province, status, search)
router.get("/", async (req, res) => {
  try {
    const { province, status, search } = req.query;
    const filter = {};

    if (province) {
      filter.province = { $regex: new RegExp(province, "i") };
    }
    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { nickname: { $regex: new RegExp(search, "i") } },
        { province: { $regex: new RegExp(search, "i") } }
      ];
    }

    const guides = await Guide.find(filter);
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. READ: ดึงข้อมูลไกด์ตาม ID
router.get("/:id", async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. UPDATE: แก้ไขข้อมูลไกด์
router.patch("/:id", async (req, res) => {
  try {
    const updatedGuide = await Guide.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // ให้คืนค่าข้อมูลที่อัปเดตแล้วกลับมา
    );
    if (!updatedGuide) return res.status(404).json({ message: "Guide not found" });
    res.status(200).json(updatedGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 5. DELETE: ลบข้อมูลไกด์
router.delete("/:id", async (req, res) => {
  try {
    const deletedGuide = await Guide.findByIdAndDelete(req.params.id);
    if (!deletedGuide) return res.status(404).json({ message: "Guide not found" });
    res.status(200).json({ message: "Guide deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;