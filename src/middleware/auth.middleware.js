import jwt from "jsonwebtoken";

const getJwtSecret = () => process.env.JWT_SECRET || "gothailand_jwt_secret_key_2026";

/**
 * Middleware: verifyToken
 * ดักตรวจ Token จาก Authorization Header (Bearer <token>)
 * ตรวจสอบความถูกต้องและดักจับกรณี Token หมดอายุ (TokenExpiredError)
 */
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token is missing.",
      });
    }

    // ตรวจสอบความถูกต้องและวันหมดอายุของ Token
    const decoded = jwt.verify(token, getJwtSecret());


    // แนบข้อมูลผู้ใช้จาก Token ลงใน req.user
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
        expired: true,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication error: " + error.message,
    });
  }
};

/**
 * Middleware: isAdmin
 * ตรวจสอบสิทธิ์ว่าผู้ใช้มีบทบาทเป็น Admin หรือไม่ (ต้องใช้คู่กับ verifyToken)
 */
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied. Admin privileges required.",
  });
};

export default verifyToken;

