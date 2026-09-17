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
}, { timestamps: true });


// 2. BOOKING SCHEMA (สำหรับ Screen 9, Screen 10, และ Screen 11)
const bookingSchema = new mongoose.Schema({
  //  Booking Reference ID 
  bookingReferenceId: { 
    type: String, 
    unique: true, 
    default: () => `GT-CR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}` 
  },

  // ข้อมูลรถที่ถูกเลือก 
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  carName: { type: String, required: true },       
  carCategory: { type: String, default: "SUV" },
  carImage: { type: String },
  carDetails: { type: String, default: "SUV · 7 Seats · Diesel" },
  carRating: { type: String, default: "4.9" },

  // ข้อมูลวัน-เวลาและสถานที่รับส่งรถ
  pickupLocation: { 
    type: String, 
    required: true, 
    default: "Bangkok (BKK) Suvarnabhumi Airport" 
  },
  dropoffLocation: { 
    type: String, 
    required: true, 
    default: "Bangkok (BKK) Suvarnabhumi Airport" 
  },
  pickupDate: { type: Date, required: true },
  dropoffDate: { type: Date, required: true },
  pickupTime: { type: String, default: "10:00 AM" },
  dropoffTime: { type: String, default: "10:00 AM" },
  durationDays: { type: Number, default: 3 },
  datesSummary: { type: String, default: "Oct 15, 10:00 AM - Oct 18, 10:00 AM (3 Days)" },

  // Traveler Info
  traveler: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, default: "United States" }
  },

  // Driver Info
  driver: {
    fullName: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    licenseCountry: { type: String, default: "United States" },
    driverAge: { type: mongoose.Schema.Types.Mixed, required: true },
    licenseNumber: { type: String, required: true }
  },

  // Special Requests 
  specialRequests: { type: String },

  // สรุปราคา 
  pricing: {
    pricePerDay: { type: Number, required: true },       
    rentalTotal: { type: Number, required: true },       
    serviceFee: { type: Number, default: 0 },
    taxVat: { type: Number, default: 0 },                
    totalPrice: { type: Number, required: true }         
  },

  // Payment & Billing Address 
  payment: {
    method: { 
      type: String, 
      enum: ['card', 'promptpay', 'bank'], 
      default: 'card' 
    },
    cardName: { type: String },
    cardNumberMasked: { type: String },
    expiryDate: { type: String },
    saveCardForFuture: { type: Boolean, default: false },
    sameAsTravelerAddress: { type: Boolean, default: true }
  },

  // เงื่อนไขและสถานะการจอง 
  termsAccepted: { type: Boolean, required: true, default: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'confirmed' 
  }
}, { timestamps: true });

// 3. EXPORT MODELS
export const Car = mongoose.model('Car', carSchema);
export const Booking = mongoose.model('Booking', bookingSchema);

export default Car;