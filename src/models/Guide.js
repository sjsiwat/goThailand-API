import mongoose from "mongoose";

// 1. สร้าง Sub-schema สำหรับ specialized_services
const specializedServiceSchema = new mongoose.Schema({
  service_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String }
}, { _id: false });

// 2. รวมฟิลด์ทั้งหมดไว้ใน guideSchema เดียวกัน
const guideSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  nickname: { type: String, trim: true },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other', 'Not Specified'], 
    default: 'Not Specified' 
  },
  guide_photo: { type: String, default: 'default_avatar.jpg' }, 
  phone: { type: String, required: true }, 
  email: { type: String, lowercase: true, trim: true }, 
  line_id: { type: String, trim: true },
  province: { type: String },
  daily_fee: { type: Number, min: 0 },
  overtime_rate_perhour: { type: Number, min: 0 },
  license_number: { type: String, required: true, unique: true }, 
  license_category: { 
    type: String, 
    enum: ['General', 'Specific Region', 'Local'] 
  },
  scope_type: String,
  scope_description: String,
  permitted_regions: [String], 
  issue_date: Date,
  expiry_date: Date,
  verified: { type: Boolean, default: false }, 
  language: { type: [String], default: ['Thai'] },
  service_areas: [String],
  base_location: { type: String, trim: true },
  max_guest: { type: Number, min: 1 },
  guide_service_start_date: Date,
  guide_service_end_date: Date,
  guide_service_duration_per_day: { type: Number, default: 8 }, 
  status: { 
    type: String, 
    enum: ['Available', 'Busy', 'Inactive'], 
    default: 'Available' 
  },
  
  rating_avg: { type: Number, default: 0, min: 0, max: 5 },
  total_reviews: { type: Number, default: 0, min: 0 },
  years_experience: { type: Number, min: 0, default: 0 }, 
  total_travelers: { type: Number, default: 0, min: 0 },
  description: { type: String },
  specialized_services: [specializedServiceSchema],

}, { 
  timestamps: true 
});

const Guide = mongoose.model("Guide", guideSchema);

export default Guide;