import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    code: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    name_th: { type: String, required: true, trim: true },
    name_en: { type: String, required: true, trim: true },
    nameTh: { type: String, trim: true },
    nameEn: { type: String, trim: true },
    name: { type: String, trim: true },
    region: {
      type: String,
      required: true,
      enum: ["north", "central", "isan", "south", "east", "west"],
      lowercase: true,
      trim: true,
    },
    region_th: {
      type: String,
      required: true,
      trim: true,
    },
    slogan: { type: String, trim: true, default: "" },
    summary: { type: String, trim: true, default: "" },
    highlights: { type: [String], default: [] },
    signatureFood: { type: [String], default: [] },
    unseenGems: { type: [String], default: [] },
    bestMonths: { type: [String], default: [] },
    travelTips: { type: String, trim: true, default: "" },
    vibes: { type: [String], default: [] },
    vectorData: {
      viewBox: { type: String, default: "" },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
      d: { type: String, default: "" },
    },
    isProtected: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: provinceId (เช่น "TH-50" หรือ "TH-10") เพื่อรองรับ Frontend เดิม
provinceSchema.virtual("provinceId").get(function () {
  if (this.code) {
    return this.code.startsWith("TH-") ? this.code : `TH-${this.code}`;
  }
  return this.id ? `TH-${this.id}` : "";
});

// Virtual: d (พิกัด SVG path) เพื่อให้ Component เก่าและใหม่ดึง path ไปวาดได้ทันที
provinceSchema.virtual("d").get(function () {
  return this.vectorData?.d || "";
});

// Virtual: viewBox (อัตราส่วน SVG)
provinceSchema.virtual("viewBox").get(function () {
  return this.vectorData?.viewBox || "0 0 800 600";
});

// Virtual: width & height
provinceSchema.virtual("width").get(function () {
  return this.vectorData?.width || 800;
});

provinceSchema.virtual("height").get(function () {
  return this.vectorData?.height || 600;
});

const Province = mongoose.model("Province", provinceSchema);

export default Province;

