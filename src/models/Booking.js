import mongoose from "mongoose";

// Sub-schema สำหรับแต่ละรายการสินค้า/บริการที่อยู่ในตะกร้า (Cart Item)
const cartItemSchema = new mongoose.Schema(
  {
    cartItemId: { type: String, trim: true },
    itemId: { type: String, trim: true },
    type: {
      type: String,
      enum: ["car", "accommodation", "guide", "package", "other"],
      default: "other",
    },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    location: { type: String, default: "", trim: true },
    unitPrice: { type: Number, default: 0 },
    priceUnitLabel: { type: String, default: "" },
    quantity: { type: Number, default: 1, min: 1 },
    dates: {
      startDate: { type: mongoose.Schema.Types.Mixed },
      endDate: { type: mongoose.Schema.Types.Mixed },
      durationDays: { type: Number, default: 1 },
    },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    itemTotal: { type: Number, default: 0 },
  },
  { _id: false }
);

// Schema หลักสำหรับการจอง (Booking Schema)
const bookingSchema = new mongoose.Schema(
  {
    // รหัสอ้างอิงการจอง เช่น GT-CR-2026-00001, GT-HT-2026-00001
    bookingReferenceId: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },

    // เชื่อมโยงกับผู้ใช้ (User reference หรือ ID)
    userId: {
      type: mongoose.Schema.Types.Mixed,
      ref: "User",
      index: true,
      default: null,
    },

    // รายการสินค้า/บริการที่จอง (Array ของ Cart Items)
    items: {
      type: [cartItemSchema],
      default: [],
    },

    // ประเภทบริการหลักของการจอง: 'car' | 'accommodation' | 'guide' | 'mixed'
    serviceType: {
      type: String,
      enum: ["car", "accommodation", "guide", "mixed", "other"],
      default: "other",
    },

    // ข้อมูลวันที่การจองและช่วงเวลาการเดินทาง
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    dates: {
      startDate: { type: mongoose.Schema.Types.Mixed },
      endDate: { type: mongoose.Schema.Types.Mixed },
      durationDays: { type: Number, default: 1 },
      summary: { type: String, default: "" },
    },

    // ข้อมูลผู้เดินทาง (Traveler Info)
    traveler: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, required: true, trim: true },
      country: { type: String, default: "Thailand", trim: true },
    },

    // ข้อมูลผู้ขับขี่ (Driver Info - กรณีบริการรถเช่า)
    driver: {
      fullName: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
      licenseCountry: { type: String, default: "Thailand" },
      driverAge: { type: mongoose.Schema.Types.Mixed },
      licenseNumber: { type: String, trim: true },
    },

    // สถานที่และเวลารับส่ง (กรณีรถเช่าหรือทัวร์)
    pickupLocation: { type: String, default: "" },
    dropoffLocation: { type: String, default: "" },
    pickupDate: { type: Date },
    dropoffDate: { type: Date },
    pickupTime: { type: String, default: "" },
    dropoffTime: { type: String, default: "" },
    durationDays: { type: Number, default: 1 },
    datesSummary: { type: String, default: "" },

    // สรุปยอดเงินและราคา (Pricing Details)
    pricing: {
      subtotal: { type: Number, default: 0 },
      pricePerDay: { type: Number, default: 0 },
      rentalTotal: { type: Number, default: 0 },
      serviceFee: { type: Number, default: 0 },
      taxVat: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      totalPrice: { type: Number, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    // ข้อมูลการชำระเงิน (Payment)
    payment: {
      method: {
        type: String,
        enum: ["card", "promptpay", "bank", "cash"],
        default: "card",
      },
      cardName: { type: String, default: "" },
      cardNumberMasked: { type: String, default: "" },
      expiryDate: { type: String, default: "" },
      saveCardForFuture: { type: Boolean, default: false },
      sameAsTravelerAddress: { type: Boolean, default: true },
      slipUrl: { type: String, default: "" },
    },

    // ที่อยู่สำหรับออกใบเสร็จ (Billing Address)
    billingAddress: {
      sameAsTraveler: { type: Boolean, default: true },
      address: { type: String, default: "" },
    },

    // สถานะคำสั่งจอง (pending / paid / confirmed / cancelled)
    status: {
      type: String,
      enum: ["pending", "paid", "confirmed", "cancelled"],
      default: "confirmed",
      index: true,
    },

    // สถานะการชำระเงิน (pending / paid / failed / refunded)
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "paid",
      index: true,
    },

    specialRequests: { type: String, default: "" },
    termsAccepted: { type: Boolean, default: true },

    // ฟิลด์สนับสนุนรถเช่าแบบ Flat payload (Backward compatibility)
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    carName: { type: String },
    carCategory: { type: String },
    carImage: { type: String },
    carDetails: { type: String },
    carRating: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual `id`
bookingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Virtual `grandTotal`
bookingSchema.virtual("grandTotal").get(function () {
  return this.totalPrice || this.pricing?.totalPrice || 0;
});

// สร้าง Booking Model (ป้องกัน OverwriteModelError ในสภาพแวดล้อม dev)
export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
