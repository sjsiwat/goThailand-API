import express from "express";
import Province from "../models/Province.js";

const router = express.Router();

/** Helper: สร้าง Mongoose query เพื่อค้นหาจาก id, slug หรือ code/ISO */
function getProvinceMatchQuery(param) {
  const isNum = !isNaN(param);
  const cleanCode = String(param).replace(/^TH-/i, "");
  const clauses = [
    { slug: String(param).toLowerCase() },
    { code: cleanCode },
    { code: String(param) },
  ];

  if (isNum) {
    clauses.push({ id: Number(param) });
  }

  return { $or: clauses };
}

// GET - ดึงรายการจังหวัดทั้งหมด (รองรับการกรองตามภูมิภาค ?region= และค้นหาตามคีย์เวิร์ด ?search= หรือ ?q=)
router.get("/", async (req, res) => {
  try {
    const { region, search, q, format } = req.query;
    const filter = {};
    const conditions = [];

    // 1. กรองตามภูมิภาค (รองรับทั้งภาษาอังกฤษและภาษาไทย)
    if (region) {
      conditions.push({
        $or: [
          { region: new RegExp(`^${region}$`, "i") },
          { region_th: new RegExp(region, "i") },
        ],
      });
    }

    // 2. ค้นหาตามคีย์เวิร์ดชื่อจังหวัด
    const keyword = search || q;
    if (keyword) {
      conditions.push({
        $or: [
          { name_th: new RegExp(keyword, "i") },
          { name_en: new RegExp(keyword, "i") },
          { slug: new RegExp(keyword, "i") },
        ],
      });
    }

    if (conditions.length > 0) {
      filter.$and = conditions;
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

// GET - ดึงเฉพาะข้อมูล Vector Path สำหรับเรนเดอร์แผนที่รวม 77 จังหวัด (Payload ขนาดเบา)
router.get("/vectors", async (req, res) => {
  try {
    const { region } = req.query;
    const filter = {};

    if (region) {
      filter.$or = [
        { region: new RegExp(`^${region}$`, "i") },
        { region_th: new RegExp(region, "i") },
      ];
    }

    const provinces = await Province.find(filter)
      .select("id code slug name_th name_en region region_th vectorData")
      .sort({ id: 1 });

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

// GET - ดึงรูปภาพ SVG แผนที่จังหวัดตรงๆ (สำหรับใส่ในแท็ก <img src="..." />)
router.get("/:id/svg", async (req, res) => {
  try {
    const province = await Province.findOne(getProvinceMatchQuery(req.params.id));

    if (!province || !province.vectorData || !province.vectorData.d) {
      return res.status(404).send("SVG map not found for this province");
    }

    const viewBox = province.vectorData.viewBox || "0 0 500 500";
    const width = province.vectorData.width || 500;
    const height = province.vectorData.height || 500;
    const d = province.vectorData.d;

    // ตัวเลือกปรับแต่งสีผ่าน Query Parameter (เช่น ?fill=%230284c7&stroke=%230369a1)
    const fill = req.query.fill || "#2563eb";
    const stroke = req.query.stroke || "#1e3a8a";
    const strokeWidth = req.query.strokeWidth || "2";

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
  <path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />
</svg>`;

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
    return res.send(svgContent);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET - ดึงข้อมูลจังหวัดเดี่ยวจาก ID, Slug หรือรหัส ISO (เช่น /api/provinces/chiang-mai, /50, /TH-50)
router.get("/:id", async (req, res) => {
  try {
    const province = await Province.findOne(getProvinceMatchQuery(req.params.id));

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
    res.status(201).json({
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

// PATCH - อัปเดตข้อมูลจังหวัด
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Province.findOneAndUpdate(
      getProvinceMatchQuery(req.params.id),
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Province not found",
      });
    }

    res.json({
      success: true,
      province: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE - ลบข้อมูลจังหวัด
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Province.findOneAndDelete(getProvinceMatchQuery(req.params.id));

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Province not found",
      });
    }

    res.json({
      success: true,
      message: "Province deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
