import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  nickname: { type: String, trim: true },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other', 'Not Specified'], 
    default: 'Not Specified' 
  },
  
  // แนะนำให้เก็บเป็น String (URL หรือที่อยู่ของไฟล์ภาพใน Server/Cloud)
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

  // ไกด์มักจะพูดได้หลายภาษา จึงควรใช้เป็น Array of Strings
  language: { type: [String], default: ['Thai'] }, 
  
  // ไกด์อาจให้บริการหลายพื้นที่ จึงควรใช้เป็น Array
  service_areas: [String], 
  
  base_location: { type: String, trim: true },
  
  // เพิ่ม enum เพื่อจำกัดสถานะให้ชัดเจน ป้องกันการพิมพ์ผิด
  status: { 
    type: String, 
    enum: ['Available', 'Busy', 'Inactive'], 
    default: 'Available' 
  },
  
  years_experience: { type: Number, min: 0, default: 0 }, 
}, { 
  timestamps: true // เพิ่ม option นี้เพื่อให้ Mongoose สร้างฟิลด์ createdAt และ updatedAt ให้อัตโนมัติ
});

const Guide = mongoose.model("Guide", guideSchema);

export default Guide;
