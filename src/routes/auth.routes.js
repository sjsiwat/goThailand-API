import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();
const getJwtSecret = () => process.env.JWT_SECRET || "gothailand_jwt_secret_key_2026";

// =========================================================================
// 1. POST /api/auth/register - สมัครสมาชิกใหม่
//    - แฮชรหัสผ่านด้วย bcrypt.hash
//    - ออก Token ด้วย jwt.sign พร้อมอายุ 1d (expiresIn: '1d')
// =========================================================================
router.post("/register", async (req, res) => {
  try {
    const { name, firstName, lastName, email, password, phone, role } = req.body;

    // คำนวณชื่อเต็มถ้าส่งแยกเป็น firstName, lastName
    let fullName = name;
    if (!fullName && (firstName || lastName)) {
      fullName = `${firstName || ""} ${lastName || ""}`.trim();
    }

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "กรุณากรอกชื่อ, อีเมล และรหัสผ่านให้ครบถ้วน",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // ตรวจสอบว่ามีอีเมลนี้อยู่ในระบบแล้วหรือไม่
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "อีเมลนี้ถูกลงทะเบียนไว้ในระบบแล้ว",
      });
    }

    // เข้ารหัสรหัสผ่านด้วย bcrypt.hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // บันทึกผู้ใช้ใหม่ลง Database
    const newUser = await User.create({
      name: fullName,
      email: cleanEmail,
      password: hashedPassword,
      phone: phone || "",
      role: role === "admin" ? "admin" : "user",
      status: "active",
    });

    // ออก JWT Token พร้อมกำหนดอายุ 1 วัน
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      getJwtSecret(),
      { expiresIn: "1d" }
    );

    // แปลงข้อมูลผู้ใช้เพื่อส่งกลับ (ตัดรหัสผ่านออก)
    const userResponse = {
      id: newUser._id,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      profileImage: newUser.profileImage,
      status: newUser.status,
      createdAt: newUser.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "สมัครสมาชิกสำเร็จ",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก",
    });
  }
});

// =========================================================================
// 2. POST /api/auth/login - เข้าสู่ระบบ
//    - ตรวจสอบรหัสผ่านด้วย bcrypt.compare
//    - ออก Token ด้วย jwt.sign พร้อมอายุ 1d (expiresIn: '1d')
// =========================================================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "กรุณากรอกอีเมลและรหัสผ่าน",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // ค้นหาผู้ใช้จากอีเมล
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      });
    }

    // ตรวจสอบรหัสผ่านด้วย bcrypt.compare
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      });
    }

    // ออก JWT Token พร้อมกำหนดอายุ 1 วัน
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      getJwtSecret(),
      { expiresIn: "1d" }
    );

    // แปลงข้อมูลผู้ใช้เพื่อส่งกลับ (ตัดรหัสผ่านออก)
    const userResponse = {
      id: user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      status: user.status,
      createdAt: user.createdAt,
    };

    res.json({
      success: true,
      message: "เข้าสู่ระบบสำเร็จ",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
    });
  }
});

// =========================================================================
// 3. GET /api/auth/me - ตรวจสอบ Session ปัจจุบันของผู้ใช้
//    - มี verifyToken middleware ป้องกันและดักจับ Token หมดอายุ
// =========================================================================
router.get("/me", verifyToken, async (req, res) => {
  try {
    // req.user ถูก decode มาจาก verifyToken middleware
    const user = await User.findById(req.user.id).select("-password");

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
    console.error("❌ Session check error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "เกิดข้อผิดพลาดในการตรวจสอบ Session",
    });
  }
});

export default router;
