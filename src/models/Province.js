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
    vectorData: {
      d: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const Province = mongoose.model("Province", provinceSchema);

export default Province;
