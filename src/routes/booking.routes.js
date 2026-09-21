import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";

const router = express.Router();

// Helper: สร้าง Booking Reference ID อัตโนมัติ (เช่น GT-CR-2026-12345, GT-HT-2026-12345, GT-GD-2026-12345, GT-BK-2026-12345)
const generateBookingRef = (serviceType = "other") => {
  const prefixMap = {
    car: "CR",
    accommodation: "HT",
    hotel: "HT",
    guide: "GD",
    package: "PK",
    mixed: "MX",
  };
  const code = prefixMap[serviceType?.toLowerCase()] || "BK";
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `GT-${code}-${year}-${randomNum}`;
};

// =========================================================================
// 1. GET /api/bookings - ดึงรายการจองทั้งหมด (รองรับ Query filter: userId, status, serviceType)
// =========================================================================
router.get("/", async (req, res) => {
  try {
    const { userId, status, serviceType, paymentStatus } = req.query;
    const filter = {};

    if (userId) {
      // ค้นหาตาม userId (รองรับทั้ง ObjectId และ String ID)
      if (mongoose.Types.ObjectId.isValid(userId)) {
        filter.$or = [{ userId: new mongoose.Types.ObjectId(userId) }, { userId }];
      } else {
        filter.userId = userId;
      }
    }

    if (status) filter.status = status;
    if (serviceType) filter.serviceType = serviceType;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    let query = Booking.find(filter).sort({ createdAt: -1 });

    // Populate ข้อมูล User ถ้า userId เป็น ObjectId ถูกต้อง
    try {
      query = query.populate({
        path: "userId",
        select: "name email phone role profileImage",
      });
    } catch {
      // ข้ามหาก populate ไม่สำเร็จกรณี userId เป็น string ธรรมดา
    }

    const bookings = await query;
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =========================================================================
// 2. GET /api/bookings/user/:userId - ดึงประวัติการจองของผู้ใช้รายบุคคล
// =========================================================================
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(userId)
      ? { $or: [{ userId: new mongoose.Types.ObjectId(userId) }, { userId }] }
      : { userId };

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =========================================================================
// 3. GET /api/bookings/:id - ดึงข้อมูลการจองรายรายการตาม _id หรือ bookingReferenceId
// =========================================================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let booking = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      booking = await Booking.findById(id).populate({
        path: "userId",
        select: "name email phone role profileImage",
      });
    }

    if (!booking) {
      booking = await Booking.findOne({ bookingReferenceId: id }).populate({
        path: "userId",
        select: "name email phone role profileImage",
      });
    }

    if (!booking) {
      return res.status(404).json({ message: "ไม่พบข้อมูลการจอง (Booking not found)" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =========================================================================
// 4. POST /api/bookings - บันทึกคำสั่งจองลง Database (MongoDB) จริง
//    เชื่อมโยงกับ: userId, รายการสินค้าที่จอง (items), วันที่, ราคารวม, สถานะการชำระเงิน
// =========================================================================
router.post("/", async (req, res) => {
  try {
    const body = req.body || {};

    // 1. จัดการ User ID
    let finalUserId = body.userId || body.user?._id || body.user?.id || null;
    if (finalUserId && mongoose.Types.ObjectId.isValid(finalUserId)) {
      finalUserId = new mongoose.Types.ObjectId(finalUserId);
    }

    // 2. จัดการรายการสินค้าที่จอง (items จาก Cart หรือการจองเดี่ยว)
    let items = Array.isArray(body.items) ? body.items : [];

    // กรณีส่ง payload รถเช่าแบบ Flat (Legacy Support)
    if (items.length === 0 && (body.carName || body.carId)) {
      items = [
        {
          cartItemId: `car_${body.carId || Date.now()}`,
          itemId: String(body.carId || ""),
          type: "car",
          title: body.carName || "Toyota Fortuner",
          subtitle: body.carCategory || "SUV",
          image: body.carImage || "",
          location: body.pickupLocation || body.pickupReturn || "",
          unitPrice: Number(body.pricePerDay) || (body.rentalPrice ? Math.round(Number(body.rentalPrice) / 3) : 2500),
          quantity: 1,
          dates: {
            startDate: body.pickupDate || new Date(),
            endDate: body.dropoffDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            durationDays: Number(body.durationDays) || 3,
          },
          details: {
            carDetails: body.carDetails || "SUV · 7 Seats · Diesel",
            carRating: String(body.carRating || "4.9"),
            pickupLocation: body.pickupLocation || body.pickupReturn || "",
            dropoffLocation: body.dropoffLocation || body.pickupReturn || "",
          },
          itemTotal: Number(body.totalPrice || body.rentalPrice || body.rentalTotal || 7500),
        },
      ];
    }

    // 3. คำนวณประเภทบริการหลัก (serviceType)
    let serviceType = body.serviceType;
    if (!serviceType) {
      if (items.length === 0) {
        serviceType = "other";
      } else {
        const types = [...new Set(items.map((i) => i.type))];
        serviceType = types.length === 1 ? types[0] : "mixed";
      }
    }

    // 4. สร้างหรือรับ bookingReferenceId
    const bookingReferenceId =
      body.bookingReferenceId ||
      body.bookingRef ||
      generateBookingRef(items[0]?.type || serviceType);

    // 5. คำนวณราคารวมและ Pricing
    const calcSubtotal = items.reduce((sum, item) => sum + (Number(item.itemTotal) || 0), 0);
    const totalPrice = Number(
      body.totalPrice ??
      body.grandTotal ??
      body.pricing?.totalPrice ??
      (calcSubtotal > 0 ? calcSubtotal : 0)
    );

    const pricing = {
      subtotal: Number(body.pricing?.subtotal ?? calcSubtotal),
      pricePerDay: Number(body.pricing?.pricePerDay ?? body.pricePerDay ?? 0),
      rentalTotal: Number(body.pricing?.rentalTotal ?? body.rentalPrice ?? totalPrice),
      serviceFee: Number(body.pricing?.serviceFee ?? body.serviceFee ?? 0),
      taxVat: Number(body.pricing?.taxVat ?? body.taxVat ?? 0),
      discount: Number(body.pricing?.discount ?? body.discount ?? 0),
      totalPrice,
    };

    // 6. จัดการข้อมูลวันที่ (Dates)
    const pickupDate = body.pickupDate ? new Date(body.pickupDate) : (items[0]?.dates?.startDate ? new Date(items[0].dates.startDate) : new Date());
    const dropoffDate = body.dropoffDate ? new Date(body.dropoffDate) : (items[0]?.dates?.endDate ? new Date(items[0].dates.endDate) : new Date(Date.now() + 24 * 60 * 60 * 1000));
    const durationDays = Number(body.durationDays || body.dates?.durationDays || items[0]?.dates?.durationDays || 1);

    const dates = {
      startDate: body.dates?.startDate ? new Date(body.dates.startDate) : pickupDate,
      endDate: body.dates?.endDate ? new Date(body.dates.endDate) : dropoffDate,
      durationDays,
      summary: body.datesSummary || body.dates?.summary || body.dates || `${durationDays} วัน`,
    };

    // 7. จัดการข้อมูลผู้เดินทาง (Traveler)
    const traveler = body.traveler || {
      fullName: body.fullName || "Guest Traveler",
      email: body.email || "guest@example.com",
      phone: body.phone || "-",
      country: body.country || "Thailand",
    };

    // 8. จัดการข้อมูลผู้ขับขี่ (Driver - สำหรับรถเช่า)
    const driver = body.driver || (body.driverName || body.licenseNumber ? {
      fullName: body.driverName || body.fullName || traveler.fullName,
      phone: body.phone || traveler.phone,
      email: body.email || traveler.email,
      licenseCountry: body.licenseCountry || "Thailand",
      driverAge: body.driverAge || "30",
      licenseNumber: body.licenseNumber || "DL-00000000",
    } : undefined);

    // 9. ข้อมูลการชำระเงิน (Payment)
    const rawCardNumber = body.payment?.cardNumber || body.cardNumber || "";
    const maskedCard = rawCardNumber
      ? `**** **** **** ${String(rawCardNumber).replace(/\s/g, "").slice(-4)}`
      : body.payment?.cardNumberMasked || "**** 0000";

    const payment = {
      method: body.payment?.method || body.paymentMethod || "card",
      cardName: body.payment?.cardName || body.cardName || "",
      cardNumberMasked: maskedCard,
      expiryDate: body.payment?.expiryDate || body.expiryDate || "",
      saveCardForFuture: Boolean(body.payment?.saveCardForFuture ?? body.saveCard),
      sameAsTravelerAddress: Boolean(body.payment?.sameAsTravelerAddress ?? body.sameAsTraveler ?? true),
      slipUrl: body.payment?.slipUrl || body.slipUrl || "",
    };

    // 10. ที่อยู่สำหรับออกใบเสร็จ (Billing Address)
    const billingAddress = body.billingAddress || {
      sameAsTraveler: body.sameAsTraveler !== undefined ? Boolean(body.sameAsTraveler) : true,
      address: body.billingAddressText || body.address || "",
    };

    // 11. สถานะการจองและการชำระเงิน (pending / paid / confirmed)
    // ตรงตามโจทย์: pending, paid, confirmed
    const requestedStatus = (body.status || "confirmed").toLowerCase();
    const status = ["pending", "paid", "confirmed", "cancelled"].includes(requestedStatus)
      ? requestedStatus
      : "confirmed";

    const paymentStatus =
      body.paymentStatus ||
      (status === "pending" ? "pending" : "paid");

    // 12. รวม Payload ทั้งหมดเข้าเป็น Booking Schema
    const bookingPayload = {
      bookingReferenceId,
      userId: finalUserId,
      items,
      serviceType,
      bookingDate: new Date(),
      dates,
      traveler,
      driver,

      // ข้อมูลรับส่ง (ถ้ามี)
      pickupLocation: body.pickupLocation || body.pickupReturn || items[0]?.details?.pickupLocation || "",
      dropoffLocation: body.dropoffLocation || body.pickupReturn || items[0]?.details?.dropoffLocation || "",
      pickupDate,
      dropoffDate,
      pickupTime: body.pickupTime || "10:00 AM",
      dropoffTime: body.dropoffTime || "10:00 AM",
      durationDays,
      datesSummary: dates.summary,

      pricing,
      totalPrice,
      payment,
      billingAddress,
      status,
      paymentStatus,
      specialRequests: body.specialRequests || "",
      termsAccepted: body.termsAccepted !== undefined ? Boolean(body.termsAccepted) : true,

      // ข้อมูลรถเช่าเดิม (กรณีมีรายการรถ)
      carId: body.carId && mongoose.Types.ObjectId.isValid(body.carId) ? body.carId : (items.find((i) => i.type === "car" && mongoose.Types.ObjectId.isValid(i.itemId))?.itemId || undefined),
      carName: body.carName || items.find((i) => i.type === "car")?.title || undefined,
      carCategory: body.carCategory || items.find((i) => i.type === "car")?.subtitle || undefined,
      carImage: body.carImage || items.find((i) => i.type === "car")?.image || undefined,
      carDetails: body.carDetails || items.find((i) => i.type === "car")?.details?.carDetails || undefined,
      carRating: String(body.carRating || items.find((i) => i.type === "car")?.details?.carRating || "4.9"),
    };

    // บันทึกลง MongoDB จริง
    const newBooking = await Booking.create(bookingPayload);

    res.status(201).json({
      success: true,
      message: "บันทึกคำสั่งจองเรียบร้อยแล้ว (Booking confirmed successfully)",
      bookingReferenceId: newBooking.bookingReferenceId,
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(400).json({
      success: false,
      message: error.message || "ไม่สามารถบันทึกคำสั่งจองได้",
    });
  }
});

// =========================================================================
// 5. PATCH /api/bookings/:id - อัปเดตสถานะการจองหรือข้อมูลการชำระเงิน
// =========================================================================
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let updatedBooking = null;

    const updateData = { ...req.body };

    // ถ้ามีการเปลี่ยน status เป็น 'paid' หรือ 'confirmed' ให้อัปเดต paymentStatus ควบคู่
    if (updateData.status === "paid" && !updateData.paymentStatus) {
      updateData.paymentStatus = "paid";
    }

    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
    }

    if (!updatedBooking) {
      updatedBooking = await Booking.findOneAndUpdate(
        { bookingReferenceId: id },
        updateData,
        { new: true, runValidators: true }
      );
    }

    if (!updatedBooking) {
      return res.status(404).json({ message: "ไม่พบข้อมูลการจองที่ต้องการแก้ไข" });
    }

    res.json({
      success: true,
      message: "อัปเดตสถานะการจองเรียบร้อยแล้ว",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =========================================================================
// 6. DELETE /api/bookings/:id - ยกเลิก / ลบรายการจอง
// =========================================================================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let deletedBooking = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedBooking = await Booking.findByIdAndDelete(id);
    }

    if (!deletedBooking) {
      deletedBooking = await Booking.findOneAndDelete({ bookingReferenceId: id });
    }

    if (!deletedBooking) {
      return res.status(404).json({ message: "ไม่พบข้อมูลการจองที่ต้องการลบ" });
    }

    res.json({
      success: true,
      message: "ลบรายการจองเรียบร้อยแล้ว",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
