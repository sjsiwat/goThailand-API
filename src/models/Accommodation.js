import mongoose from "mongoose";

const landmarkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    distance: { type: String },
  },
  { _id: false }
);

const locationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    district: { type: String },
    address_label: { type: String },
    map_coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    nearby_landmarks: [landmarkSchema],
  },
  { _id: false }
);

const guestSchema = new mongoose.Schema(
  {
    adults: { type: Number, default: 2 },
    children: { type: Number, default: 0 },
  },
  { _id: false }
);

const roomSchema = new mongoose.Schema(
  {
    room_type_id: { type: String },
    name: { type: String, required: true },
    bed_type: { type: String },
    max_guests: guestSchema,
    price_per_night: { type: Number, required: true },
    available_quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const policiesSchema = new mongoose.Schema(
  {
    cancellation_policy: { type: String },
    check_in_time: { type: String, default: "15:00" },
    check_out_time: { type: String, default: "12:00" },
  },
  { _id: false }
);

const accommodationSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.Mixed,
      default: () => new mongoose.Types.ObjectId(),
    },
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    }, // String slug สำหรับ URL route
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    categories: [{ type: String, trim: true }],
    region: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    descriptionExtra: { type: String, default: "" },
    location: { type: locationSchema, required: true },
    rating_avg: { type: Number, default: 0, min: 0, max: 5 },
    total_reviews: { type: Number, default: 0, min: 0 },
    facilities: [{ type: String }],
    special_options: [{ type: String }],
    base_price_per_night: { type: Number, required: true, min: 0 },
    rooms: [roomSchema],
    pictures: [{ type: String }],
    policies: policiesSchema,
  },
  {
    timestamps: true,
  }
);

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

export default Accommodation;
