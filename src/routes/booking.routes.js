import express from "express";
import mongoose from "mongoose";
import { Booking } from "../models/Car.js";

const router = express.Router();

// GET - ดึงรายการจองทั้งหมด (เรียงจากล่าสุดไปเก่าสุด)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - ดึงข้อมูลการจองรายรายการตาม ID หรือ bookingReferenceId
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let booking = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      booking = await Booking.findById(id);
    }

    if (!booking) {
      booking = await Booking.findOne({ bookingReferenceId: id });
    }

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - สร้างรายการจองใหม่ (รองรับทั้ง Flat Payload จากโค้ด Guitar และ Nested Object มาตรฐาน)
router.post("/", async (req, res) => {
  try {
    const body = req.body || {};

    // แปลงข้อมูลให้อยู่ในโครงสร้าง Booking Schema อย่างสมบูรณ์
    const bookingPayload = {
      // ข้อมูลตัวรถ
      carId: body.carId && mongoose.Types.ObjectId.isValid(body.carId) ? body.carId : undefined,
      carName: body.carName || "Toyota Fortuner",
      carCategory: body.carCategory || "SUV",
      carImage: body.carImage || "",
      carDetails: body.carDetails || "SUV · 7 Seats · Diesel",
      carRating: String(body.carRating || "4.9"),

      // วันที่และสถานที่
      pickupLocation: body.pickupLocation || body.pickupReturn || "Bangkok (BKK) Suvarnabhumi Airport",
      dropoffLocation: body.dropoffLocation || body.pickupReturn || "Bangkok (BKK) Suvarnabhumi Airport",
      pickupDate: body.pickupDate ? new Date(body.pickupDate) : new Date(),
      dropoffDate: body.dropoffDate ? new Date(body.dropoffDate) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      pickupTime: body.pickupTime || "10:00 AM",
      dropoffTime: body.dropoffTime || "10:00 AM",
      durationDays: Number(body.durationDays) || 3,
      datesSummary: body.datesSummary || body.dates || "Oct 15, 10:00 AM - Oct 18, 10:00 AM (3 Days)",

      // ข้อมูลผู้เช่า (Traveler)
      traveler: body.traveler || {
        fullName: body.fullName || "Guest Traveler",
        email: body.email || "guest@example.com",
        phone: body.phone || "-",
        country: body.country || "United States",
      },

      // ข้อมูลผู้ขับขี่ (Driver)
      driver: body.driver || {
        fullName: body.driverName || body.fullName || "Guest Driver",
        phone: body.phone || "-",
        email: body.email || "guest@example.com",
        licenseCountry: body.licenseCountry || "United States",
        driverAge: body.driverAge || "30",
        licenseNumber: body.licenseNumber || "DL-00000000",
      },

      specialRequests: body.specialRequests || "",

      // รายละเอียดราคา
      pricing: body.pricing || {
        pricePerDay: Number(body.pricePerDay) || (body.rentalPrice ? Math.round(Number(body.rentalPrice) / 3) : 2500),
        rentalTotal: Number(body.rentalPrice || body.rentalTotal || body.totalPrice || 7500),
        serviceFee: Number(body.serviceFee || 0),
        taxVat: Number(body.taxVat || 0),
        totalPrice: Number(body.totalPrice || body.rentalPrice || 7500),
      },

      // การชำระเงิน
      payment: body.payment || {
        method: body.paymentMethod || "card",
        cardName: body.cardName || "",
        cardNumberMasked: body.cardNumber ? `**** **** **** ${String(body.cardNumber).slice(-4)}` : "**** 0000",
        expiryDate: body.expiryDate || "",
        saveCardForFuture: Boolean(body.saveCard),
        sameAsTravelerAddress: body.sameAsTraveler !== undefined ? Boolean(body.sameAsTraveler) : true,
      },

      termsAccepted: body.termsAccepted !== undefined ? Boolean(body.termsAccepted) : true,
      status: body.status || "confirmed",
    };

    const newBooking = await Booking.create(bookingPayload);

    res.status(201).json({
      success: true,
      message: "Booking confirmed successfully",
      bookingReferenceId: newBooking.bookingReferenceId,
      booking: newBooking,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH - อัปเดตสถานะการจอง (เช่น confirmed, cancelled, pending)
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let updatedBooking = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    }

    if (!updatedBooking) {
      updatedBooking = await Booking.findOneAndUpdate({ bookingReferenceId: id }, req.body, { new: true, runValidators: true });
    }

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - ลบรายการจอง
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
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
