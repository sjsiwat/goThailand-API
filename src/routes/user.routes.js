import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// =========================================================================
// 1. GET /api/users - ดึงรายชื่อ User ทั้งหมด
//    - ติด verifyToken: เฉพาะผู้ใช้ที่มี Token เท่านั้นที่เข้าถึงได้
//    - ซ่อนรหัสผ่าน: ใช้ .select("-password") ไม่ให้หลุด hash password ออกไป
// =========================================================================
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// =========================================================================
// 2. GET /api/users/:id - ดึงข้อมูล User รายบุคคล
// =========================================================================
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูลผู้ใช้ในระบบ",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================================================================
// 3. POST /api/users - สร้าง User ใหม่โดยตรง (สำหรับ Admin หลังบ้าน)
// =========================================================================
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const userData = { ...req.body };

    if (userData.email) {
      userData.email = userData.email.trim().toLowerCase();
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "อีเมลนี้ถูกลงทะเบียนไว้ในระบบแล้ว",
        });
      }
    }

    if (userData.password && !userData.password.startsWith("$2")) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const newUser = await User.create(userData);
    const userObject = newUser.toObject();
    delete userObject.password;

    res.status(201).json({
      success: true,
      message: "สร้างบัญชีผู้ใช้เรียบร้อยแล้ว",
      user: userObject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================================================================
// 4. PATCH /api/users/:id - แก้ไขข้อมูล User
// =========================================================================
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // อนุญาตให้แก้ไขได้เฉพาะเจ้าของบัญชี หรือคนที่มี role: 'admin'
    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only update your own profile.",
      });
    }

    const updateData = { ...req.body };

    // หากมีการเปลี่ยนรหัสผ่าน ให้แฮชใหม่ด้วย bcrypt
    if (updateData.password && !updateData.password.startsWith("$2")) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // ห้าม user ทั่วไปแก้ไข role ตัวเองเป็น admin
    if (updateData.role && req.user.role !== "admin") {
      delete updateData.role;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบผู้ใช้ที่ต้องการแก้ไข",
      });
    }

    res.json({
      success: true,
      message: "อัปเดตข้อมูลผู้ใช้สำเร็จ",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================================================================
// 5. DELETE /api/users/:id - ลบ User (Admin Only)
// =========================================================================
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id).select("-password");

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบผู้ใช้ที่ต้องการลบ",
      });
    }

    res.json({
      success: true,
      message: "ลบผู้ใช้เรียบร้อยแล้ว",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
