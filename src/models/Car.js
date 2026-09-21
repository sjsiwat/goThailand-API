import mongoose from 'mongoose';

// 1. CAR SCHEMA 
const carSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },               
  model:{type:String},
  name: { type: String, required: true },                
  category: { 
    type: String, 
    enum: ['Economy', 'Sedan', 'SUV', 'MPV', 'Luxury'], 
    required: true 
  },
  
  // ข้อมูลราคาและคะแนนรีวิว 
  price: { type: Number, required: true },       
  pricePerDay:{type:Number},
  rating: { type: Number, default: 5.0 },                // เช่น 4.9
  reviewCount: { type: Number, default: 0 },             
  
  // สเปกตัวรถ
  seats: { type: Number, required: true },               
  transmission: { 
    type: String, 
    enum: ['Automatic', 'Auto', 'Manual'], 
    default: 'Automatic' 
  },
  fuelType: { 
    type: String, 
    enum: ['Diesel', 'Petrol', 'Hybrid', 'Electric'], 
    required: true 
  },
  luggageCapacity: { type: String, default: "4 Large Bags" }, 
  
  // รายละเอียดเนื้อหาและรูปภาพ
  description: { type: String },                        
  mainImage: { type: String, default: "" },           // รูปหน้าปก
  galleryImages: {type:[String],default: [] },  
          // รูปรอบคัน/ภายใน 
  
  // สถานที่และสถานะ
  availableLocations: [{ type: String }],               
  isAvailable: { type: Boolean, default: true }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for `id` so frontend calling `car.id` gets string id
carSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Virtual aliases to support frontend property names seamlessly
carSchema.virtual('fuel').get(function () {
  return this.fuelType;
});

carSchema.virtual('luggage').get(function () {
  return this.luggageCapacity;
});

carSchema.virtual('reviews').get(function () {
  return this.reviewCount;
});

carSchema.virtual('gallery').get(function () {
  return this.galleryImages;
});


// 2. RE-EXPORT BOOKING MODEL
import Booking from "./Booking.js";

// 3. EXPORT MODELS
export const Car = mongoose.model('Car', carSchema);
export { Booking };

export default Car;