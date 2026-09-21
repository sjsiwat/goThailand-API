# GoThailand API — Data Schema Documentation

เอกสารสรุปโครงสร้างข้อมูล (Data Schemas) ทั้งหมดของระบบ **GoThailand API** เชื่อมต่อกับ MongoDB Atlas

> ⚠️ **สถานะเอกสาร:** ยังเหลือส่วนข้อมูล **User** ที่ยังไม่ได้เขียนสรุป Schema ในเอกสารนี้ — ข้อมูล Accommodation, Car, Booking, Province และ Guide เสร็จสมบูรณ์แล้ว

## สารบัญ

1. [Accommodation Schema (ข้อมูลที่พัก)](#1-accommodation-schema-ข้อมูลที่พัก)
2. [Car & Booking Schema (ข้อมูลรถเช่าและการจอง)](#2-car--booking-schema-ข้อมูลรถเช่าและการจอง)
3. [Province Schema (ข้อมูล 77 จังหวัด)](#3-province-schema-ข้อมูล-77-จังหวัด)
4. [Guide Schema (ข้อมูลมัคคุเทศก์ / ไกด์นำเที่ยว)](#4-guide-schema-ข้อมูลมัคคุเทศก์--ไกด์นำเที่ยว)
5. [สรุป API Endpoints](#5-สรุป-api-endpoints-ที่เกี่ยวข้อง)
6. [ส่วนที่ยังไม่เสร็จ](#6-ส่วนที่ยังไม่เสร็จ)

---

## 1. Accommodation Schema (ข้อมูลที่พัก)

โมเดลสำหรับจัดการข้อมูลโรงแรม รีสอร์ท และที่พัก (`accommodations` collection) พร้อม Sub-documents สำหรับตำแหน่งที่ตั้ง, ห้องพัก และเงื่อนไขนโยบาย

> 💡 **สถิติข้อมูลจำลอง (Seed Data):**
> - มีข้อมูลครอบคลุมครบทั้ง **77 จังหวัด** (รวมทั้งหมด **537 แห่ง**)
> - **18 จังหวัดท่องเที่ยวหลัก (ภาคละ 3 จังหวัด):** มีที่พัก **20 แห่ง/จังหวัด** (รวม 360 แห่ง)
> - **59 จังหวัดรอง:** มีที่พัก **3 แห่ง/จังหวัด** (รวม 177 แห่ง)
> - **6 หมวดหมู่ประเภทที่พัก (Property Types):** เกลี่ยเฉลี่ยสมดุลเท่าๆ กัน (~84–101 แห่ง/หมวด)
>   - `Bed & Breakfast` (101 แห่ง) — *มี Breakfast Included ครบ 100%*
>   - `Guest House` (91 แห่ง)
>   - `Luxury Resort` (89 แห่ง)
>   - `Private Villa` (87 แห่ง)
>   - `Luxury Hotel` (85 แห่ง)
>   - `Budget Hotel` (84 แห่ง)
> - **สิ่งอำนวยความสะดวก (Facilities):** ใช้ชื่อเรียบง่ายไม่เว่อร์ เช่น `Free Wi-Fi`, `Gym`, `Spa`, `Restaurant`, `Swimming Pool`, `Room Service`, `Bar`, `River View`, `Mountain View`, `Beach Access`
> - **ช่วงราคาฐาน (`base_price_per_night`):** เริ่มต้นตั้งแต่ **590 บาท/คืน** ไปจนถึงระดับ Luxury Pool Villa
> - **นโยบายเวลา:** เช็คอิน `13:00` น. และเช็คเอาท์ `12:00` น. ครบทุกแห่ง
> - **ป้ายที่อยู่:** ใช้มาตรฐาน 2 ส่วน `"[Province], Thailand"` (อ้างอิงตรงกับ `provinces.name_en`)

### 1.1 Main Schema (`Accommodation`)

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | ค่าเริ่มต้น / ข้อจำกัด | รายละเอียด |
| :--- | :--- | :---: | :--- | :--- |
| `_id` | `ObjectId / Mixed` | ❌ | Gen อัตโนมัติ | รหัส Primary Key ของ MongoDB |
| `id` | `String` | ✅ | Unique, Indexed | Slug รหัสประจำที่พักสำหรับ Route URL เช่น `"the-siam-heritage-sanctuary"` |
| `name` | `String` | ✅ | Trim | ชื่อที่พัก เช่น `"The Siam Heritage Sanctuary"` |
| `category` | `String` | ✅ | Trim | หมวดหมู่หลัก เช่น `"Luxury Resort"`, `"Boutique Hotel"` |
| `categories` | `[String]` | ❌ | `[]` | หมวดหมู่ย่อยทั้งหมด |
| `region` | `String` | ✅ | Trim | ภูมิภาคที่ตั้ง เช่น `"central"`, `"north"`, `"south"` |
| `description` | `String` | ✅ | - | รายละเอียดคำบรรยายที่พัก |
| `descriptionExtra` | `String` | ❌ | `""` | ข้อมูลรายละเอียดเพิ่มเติม |
| `location` | `Object` | ✅ | Sub-document | โครงสร้างข้อมูลที่ตั้ง (ดูหัวข้อ 1.2) |
| `rating_avg` | `Number` | ❌ | `0` (Min: 0, Max: 5) | คะแนนเฉลี่ยรีวิว |
| `total_reviews` | `Number` | ❌ | `0` (Min: 0) | จำนวนรีวิวทั้งหมด |
| `facilities` | `[String]` | ❌ | `[]` | รายการสิ่งอำนวยความสะดวก เช่น `["Free Wi-Fi", "Swimming Pool", "Spa"]` |
| `special_options` | `[String]` | ❌ | `[]` | สิทธิพิเศษเพิ่มเติม เช่น `["Breakfast Included", "Free Airport Transfer"]` |
| `base_price_per_night` | `Number` | ✅ | Min: 0 | ราคาเริ่มต้นต่อคืน (THB) |
| `rooms` | `[Object]` | ❌ | Array of Sub-docs | รายการห้องพักที่เปิดให้บริการ (ดูหัวข้อ 1.3) |
| `pictures` | `[String]` | ❌ | `[]` | Array ของ URL รูปภาพที่พัก |
| `policies` | `Object` | ❌ | Sub-document | นโยบายการเข้าพัก (ดูหัวข้อ 1.4) |
| `createdAt` / `updatedAt` | `Date` | ❌ | Auto timestamps | วันและเวลาที่สร้าง/อัปเดตข้อมูล |

### 1.2 Location Sub-document (`location`)

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | รายละเอียด |
| :--- | :--- | :---: | :--- |
| `city` | `String` | ✅ | จังหวัด/เมือง เช่น `"Bangkok"`, `"Chiang Mai"` |
| `district` | `String` | ❌ | อำเภอ/เขต เช่น `"Phra Nakhon"` |
| `address_label` | `String` | ❌ | ป้ายที่อยู่แบบ 2 ส่วน รูปแบบ: `"[Province], Thailand"` เช่น `"Bangkok, Thailand"` |
| `map_coordinates` | `Object` | ❌ | `{ lat: Number, lng: Number }` พิกัดละติจูดและลองจิจูด |
| `nearby_landmarks` | `[Object]` | ❌ | สถานที่สำคัญใกล้เคียง Array ของ `{ name: String, distance: String }` |

### 1.3 Rooms Sub-document (`rooms`)

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | รายละเอียด |
| :--- | :--- | :---: | :--- |
| `room_type_id` | `String` | ❌ | รหัสประเภทห้อง เช่น `"deluxe-king"`, `"suite-river"` |
| `name` | `String` | ✅ | ชื่อประเภทห้อง เช่น `"Deluxe King River View"` |
| `bed_type` | `String` | ❌ | ประเภทเตียง เช่น `"1 King Bed"`, `"2 Twin Beds"` |
| `max_guests` | `Object` | ❌ | `{ adults: Number (default 2), children: Number (default 0) }` |
| `price_per_night` | `Number` | ✅ | ราคาห้องพักต่อคืน (THB) |
| `available_quantity` | `Number` | ❌ | Default: `1` จำนวนห้องว่าง |

### 1.4 Policies Sub-document (`policies`)

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | ค่าเริ่มต้น | รายละเอียด |
| :--- | :--- | :---: | :---: | :--- |
| `cancellation_policy` | `String` | ❌ | - | เงื่อนไขการยกเลิก เช่น `"Free cancellation up to 48 hours before check-in"` |
| `check_in_time` | `String` | ❌ | `"13:00"` | เวลาเช็คอินมาตรฐาน (13:00 น.) |
| `check_out_time` | `String` | ❌ | `"12:00"` | เวลาเช็คเอาท์มาตรฐาน (12:00 น.) |

### 1.5 ตัวอย่าง JSON ของ Accommodation

```json
{
  "_id": "66f4a1b2c3d4e5f6a7b8c9d0",
  "id": "the-siam-heritage-sanctuary",
  "name": "The Siam Heritage Sanctuary",
  "category": "Luxury Resort",
  "categories": ["Luxury Resort", "Heritage"],
  "region": "central",
  "description": "Experience unparalleled luxury in the heart of Bangkok.",
  "location": {
    "city": "Bangkok",
    "district": "Phra Nakhon",
    "address_label": "Bangkok, Thailand",
    "map_coordinates": {
      "lat": 13.7563,
      "lng": 100.5018
    },
    "nearby_landmarks": [
      { "name": "Grand Palace", "distance": "1.2 km" }
    ]
  },
  "rating_avg": 5.0,
  "total_reviews": 128,
  "facilities": ["Free Wi-Fi", "Swimming Pool", "Spa & Wellness", "Restaurant"],
  "special_options": ["Breakfast Included", "Free Airport Transfer"],
  "base_price_per_night": 4500,
  "rooms": [
    {
      "room_type_id": "deluxe-king",
      "name": "Deluxe King River View",
      "bed_type": "1 King Bed",
      "max_guests": { "adults": 2, "children": 1 },
      "price_per_night": 4500,
      "available_quantity": 5
    }
  ],
  "pictures": ["https://images.unsplash.com/photo-1566073771259-6a8506099945"],
  "policies": {
    "cancellation_policy": "Free cancellation up to 48 hours before check-in",
    "check_in_time": "13:00",
    "check_out_time": "12:00"
  }
}
```

---

## 2. Car & Booking Schema (ข้อมูลรถเช่าและการจอง)

จัดการข้อมูลรถยนต์ให้เช่า (`cars` collection) และข้อมูลการจองรถ (`bookings` collection)

### 2.1 Car Schema (`Car`)

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | ค่าเริ่มต้น / Enum / ตัวอย่าง | รายละเอียด |
| :--- | :--- | :---: | :--- | :--- |
| `slug` | `String` | ✅ | Unique เช่น `"toyota-yaris-cross"` | รหัส URL สำหรับระบุตัวรถ |
| `brand` | `String` | ✅ | เช่น `"Toyota"`, `"Honda"`, `"Nissan"` | ยี่ห้อรถยนต์ |
| `model` | `String` | ❌ | เช่น `"Yaris"`, `"Fortuner"` | รุ่นรถยนต์ |
| `name` | `String` | ✅ | เช่น `"Toyota Yaris Cross HEV"` | ชื่อเต็มของรถยนต์ |
| `category` | `String` | ✅ | **Enum:** `'Economy'`, `'Sedan'`, `'SUV'`, `'MPV'`, `'Luxury'` | ประเภทกลุ่มรถ |
| `price` | `Number` | ✅ | เช่น `1200` | ราคาค่าเช่าต่อวัน (THB) |
| `pricePerDay` | `Number` | ❌ | เช่น `1200` | ตัวแปรคู่ขนานสำหรับราคาต่อวัน |
| `rating` | `Number` | ❌ | Default: `5.0` | คะแนนรีวิวเฉลี่ย (0 - 5) |
| `reviewCount` | `Number` | ❌ | Default: `0` | จำนวนรีวิว |
| `seats` | `Number` | ✅ | เช่น `5`, `7` | จำนวนที่นั่งโดยสาร |
| `transmission` | `String` | ❌ | **Enum:** `'Automatic'`, `'Auto'`, `'Manual'` (Default: `'Automatic'`) | ระบบเกียร์ |
| `fuelType` | `String` | ✅ | **Enum:** `'Diesel'`, `'Petrol'`, `'Hybrid'`, `'Electric'` | ประเภทเชื้อเพลิง |
| `luggageCapacity` | `String` | ❌ | Default: `"4 Large Bags"` | ความจุพื้นที่เก็บกระเป๋าสัมภาระ |
| `description` | `String` | ❌ | - | คำอธิบายรายละเอียดและจุดเด่นของรถ |
| `mainImage` | `String` | ❌ | Default: `""` | รูปภาพหน้าปก |
| `galleryImages` | `[String]` | ❌ | Default: `[]` | Array ของ URL รูปภาพมุมต่างๆ |
| `availableLocations` | `[String]` | ❌ | เช่น `["Bangkok (BKK)", "Chiang Mai (CNX)"]` | สถานที่/สนามบินที่รับส่งรถได้ |
| `isAvailable` | `Boolean` | ❌ | Default: `true` | สถานะเปิดให้เช่า |
| `createdAt` / `updatedAt` | `Date` | ❌ | Auto timestamps | เวลาที่สร้าง/อัปเดตข้อมูล |

#### Virtual Fields (ฟิลด์เสมือนที่สร้างให้อัตโนมัติเมื่อส่ง JSON ไปยัง Frontend)
เพื่อให้โค้ด Frontend (เช่น คอมโพเนนต์ของ Guitar: `CarCard`, `CarDetail`) ใช้งานได้ทันทีโดยไม่เกิด runtime error Mongoose Schema ได้ทำการแนบ Virtual Getters ดังนี้:

| Virtual Field | แมปมาจากฟิลด์จริง (Source) | ชนิดข้อมูล | จุดประสงค์ / ประโยชน์ |
| :--- | :--- | :---: | :--- |
| `id` | `_id.toHexString()` | `String` | ให้ Frontend ที่เรียก `car.id` หรือใช้เป็น key ใช้งานได้ทันที |
| `fuel` | `fuelType` | `String` | ป้องกัน error ในจุดที่เรียก `car.fuel` แทน `car.fuelType` |
| `luggage` | `luggageCapacity` | `String` | รองรับการเรียก `car.luggage` แทน `car.luggageCapacity` |
| `reviews` | `reviewCount` | `Number` | รองรับการเรียก `car.reviews` แทน `car.reviewCount` |
| `gallery` | `galleryImages` | `[String]` | รองรับการเรียก `car.gallery` แทน `car.galleryImages` |

> [!NOTE]
> **API Routing (`GET /api/cars/:id`):** ฝั่ง Backend รองรับการค้นหาผ่านทั้ง MongoDB `_id` (ObjectId) และ `slug` ทำให้ Frontend สามารถเปิดหน้าดูรายละเอียดรถด้วย URL ทั้งสองรูปแบบได้ทันที

### 2.2 Booking Schema (`Booking`)

Schema สำหรับเก็บประวัติการทำรายการจองทั้งหมด (ทั้งรถเช่า ที่พัก ไกด์ และ Cart รวม):

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | ค่าเริ่มต้น / ตัวอย่าง | รายละเอียด |
| :--- | :--- | :---: | :--- | :--- |
| `bookingReferenceId` | `String` | ❌ | Unique (Gen อัตโนมัติ `GT-CR-YYYY-XXXXX`, `GT-HT-YYYY-XXXXX`, `GT-GD-YYYY-XXXXX`, `GT-BK-YYYY-XXXXX`) | รหัสอ้างอิงการจอง |
| `userId` | `Mixed` (ObjectId / String) | ❌ | Ref: `'User'` หรือ User ID string | เชื่อมโยงกับบัญชีผู้ใช้ผู้ทำการจอง |
| `items` | `Array<Object>` | ❌ | Default: `[]` | รายการสินค้า/บริการที่จอง (Cart Items: `itemId`, `type`, `title`, `unitPrice`, `quantity`, `dates`, `itemTotal`) |
| `serviceType` | `String` | ❌ | **Enum:** `'car'`, `'accommodation'`, `'guide'`, `'mixed'`, `'other'` | ประเภทบริการหลักของการจอง |
| `bookingDate` | `Date` | ❌ | Default: `Date.now` | วันที่ทำรายการจอง |
| `dates` | `Object` | ❌ | `{ startDate, endDate, durationDays, summary }` | ช่วงวันและจำนวนวันที่ใช้บริการ |
| `traveler` | `Object` | ✅ | `{ fullName, email, phone, country }` | ข้อมูลผู้เดินทาง / ผู้ติดต่อหลัก |
| `driver` | `Object` | ❌ | `{ fullName, phone, email, licenseCountry, driverAge, licenseNumber }` | ข้อมูลผู้ขับขี่และใบขับขี่ (กรณีบริการรถเช่า) |
| `pickupLocation` | `String` | ❌ | เช่น `"Bangkok (BKK) Suvarnabhumi Airport"` | สถานที่รับรถ/จุดนัดพบ |
| `dropoffLocation` | `String` | ❌ | เช่น `"Bangkok (BKK) Suvarnabhumi Airport"` | สถานที่คืนรถ |
| `pickupDate` | `Date` | ❌ | - | วันที่รับรถ |
| `dropoffDate` | `Date` | ❌ | - | วันที่คืนรถ |
| `pricing` | `Object` | ✅ | `{ subtotal, pricePerDay, rentalTotal, serviceFee, taxVat, discount, totalPrice }` | รายละเอียดสรุปราคาและภาษี |
| `totalPrice` | `Number` | ✅ | ยอดรวมสุทธิ (฿) | ราคารวมทั้งหมดของการจอง |
| `payment` | `Object` | ❌ | `{ method: ['card','promptpay','bank','cash'], cardName, cardNumberMasked, expiryDate, saveCardForFuture, sameAsTravelerAddress, slipUrl }` | ข้อมูลวิธีชำระเงิน |
| `billingAddress` | `Object` | ❌ | `{ sameAsTraveler, address }` | ที่อยู่สำหรับออกใบเสร็จ |
| `termsAccepted` | `Boolean` | ✅ | Default: `true` | ยอมรับข้อกำหนดและเงื่อนไข |
| `status` | `String` | ❌ | **Enum:** `'pending'`, `'paid'`, `'confirmed'`, `'cancelled'` (Default: `'confirmed'`) | สถานะการจอง |
| `paymentStatus` | `String` | ❌ | **Enum:** `'pending'`, `'paid'`, `'failed'`, `'refunded'` (Default: `'paid'`) | สถานะการชำระเงิน |

#### Booking API Endpoints (`/api/bookings`)

| Method | Endpoint | รายละเอียด |
| :---: | :--- | :--- |
| `GET` | `/api/bookings` | ดึงประวัติรายการจองทั้งหมด (รองรับ Filter: `userId`, `status`, `serviceType`, `paymentStatus`) |
| `GET` | `/api/bookings/user/:userId` | ดึงประวัติรายการจองทั้งหมดของผู้ใช้รายบุคคล |
| `GET` | `/api/bookings/:id` | ค้นหารายการจองด้วย `_id` หรือ `bookingReferenceId` |
| `POST` | `/api/bookings` | บันทึกรายการจองใหม่ลง MongoDB จริง (เชื่อมโยง `userId`, `items`, `dates`, `totalPrice`, `status: pending/paid/confirmed`) |
| `PATCH` | `/api/bookings/:id` | อัปเดตสถานะการจอง (`status: pending / paid / confirmed / cancelled`) |
| `DELETE` | `/api/bookings/:id` | ลบรายการจอง |

> [!TIP]
> **Payload Compatibility (Frontend -> Backend):** Endpoint `POST /api/bookings` รองรับทั้ง:
> 1. Multi-service Cart Booking: ส่ง `items`, `userId`, `dates`, `totalPrice`, `status` จากหน้า `CheckoutPage.jsx`
> 2. Flat Payload: รูปแบบเดิมของฟอร์มจองรถเช่า (`fullName`, `email`, `driverName`, `licenseNumber`, `pickupReturn`, `rentalPrice` ฯลฯ) โดย Backend จะแปลงและบันทึกลง Database อัตโนมัติ

### 2.3 ตัวอย่าง JSON ของ Car

```json
{
  "_id": "66f501a2b3c4d5e6f7a8b9c0",
  "slug": "toyota-fortuner-leader",
  "brand": "Toyota",
  "model": "Fortuner",
  "name": "Toyota Fortuner Leader 2.4G",
  "category": "SUV",
  "price": 2500,
  "pricePerDay": 2500,
  "rating": 4.9,
  "reviewCount": 35,
  "seats": 7,
  "transmission": "Automatic",
  "fuelType": "Diesel",
  "luggageCapacity": "4 Large Bags",
  "description": "Spacious and powerful 7-seat SUV for all terrain.",
  "mainImage": "https://example.com/cars/fortuner.png",
  "galleryImages": [
    "https://example.com/cars/fortuner-1.png",
    "https://example.com/cars/fortuner-2.png"
  ],
  "availableLocations": [
    "Bangkok (BKK) Suvarnabhumi Airport",
    "Chiang Mai International Airport (CNX)"
  ],
  "isAvailable": true
}
```

---

## 3. Province Schema (ข้อมูล 77 จังหวัด)

โมเดลสำหรับจัดเก็บข้อมูล 77 จังหวัดในประเทศไทย (`provinces` collection) รองรับการแสดงผลตาราง การกรองตามภูมิภาค และพิกัด Vector Path SVG สำหรับแสดงรูปทรงแผนที่

### 3.1 Province Schema (`Province`)

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | ข้อจำกัด / ค่าเริ่มต้น | รายละเอียด |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `Number` | ✅ | Unique, Indexed | รหัสประจำจังหวัด (ตามมาตรฐาน มท./ไปรษณีย์ เช่น `10`, `50`) |
| `code` | `String` | ❌ | Trim | รหัสจังหวัดแบบ String (เช่น `"10"`, `"50"`) |
| `slug` | `String` | ✅ | Unique, Indexed, Trim | ชื่อภาษาอังกฤษตัวพิมพ์เล็ก URL-friendly เช่น `"bangkok"`, `"chiang-mai"` |
| `name_th` | `String` | ✅ | Trim | ชื่อภาษาไทยทางการ เช่น `"กรุงเทพมหานคร"`, `"เชียงใหม่"` |
| `name_en` | `String` | ✅ | Trim | ชื่อภาษาอังกฤษทางการ เช่น `"Bangkok"`, `"Chiang Mai"` |
| `region` | `String` | ✅ | **Enum 6 ภาค (Lowercase):**<br>`'north'`, `'central'`, `'isan'`, `'south'`, `'east'`, `'west'` | ภูมิภาคภาษาอังกฤษ (ตรงกับตัวกรอง Frontend) |
| `region_th` | `String` | ✅ | Trim | ภูมิภาคภาษาไทย เช่น `"เหนือ"`, `"กลาง"`, `"อีสาน"`, `"ใต้"`, `"ตะวันออก"`, `"ตะวันตก"` |
| `vectorData` | `Object` | ❌ | `{ d: { type: String, default: "" } }` | พิกัด Path SVG สำหรับวาดรูปทรงแผนที่ของจังหวัด |
| `nameTh` | `String` | ❌ | Trim | *Alias รองรับโค้ด Frontend เก่า* |
| `nameEn` | `String` | ❌ | Trim | *Alias รองรับโค้ด Frontend เก่า* |
| `name` | `String` | ❌ | Trim | *Alias ภาษาอังกฤษ* |
| `createdAt` / `updatedAt` | `Date` | ❌ | Auto timestamps | บันทึกเวลาสร้าง/แก้ไขอัตโนมัติ |

### 3.2 การจำแนก 6 ภูมิภาค (ครบทั้ง 77 จังหวัด)

| ภูมิภาค (`region`) | ภาคภาษาไทย (`region_th`) | จำนวนจังหวัด | ตัวอย่างรายชื่อจังหวัด |
| :--- | :--- | :---: | :--- |
| `north` | เหนือ | 9 | เชียงใหม่, ลำพูน, ลำปาง, อุตรดิตถ์, แพร่, น่าน, พะเยา, เชียงราย, แม่ฮ่องสอน |
| `central` | กลาง | 22 | กรุงเทพฯ, อยุธยา, นนทบุรี, ปทุมธานี, สมุทรปราการ, ลพบุรี, สุพรรณบุรี ฯลฯ |
| `isan` | อีสาน | 20 | นครราชสีมา, ขอนแก่น, อุดรธานี, อุบลราชธานี, บุรีรัมย์, สุรินทร์, ร้อยเอ็ด ฯลฯ |
| `south` | ใต้ | 14 | ภูเก็ต, สุราษฎร์ธานี, สงขลา, กระบี่, นครศรีธรรมราช, พังงา, ตรัง ฯลฯ |
| `east` | ตะวันออก | 7 | ชลบุรี, ระยอง, จันทบุรี, ตราด, ฉะเชิงเทรา, ปราจีนบุรี, สระแก้ว |
| `west` | ตะวันตก | 5 | กาญจนบุรี, ตาก, เพชรบุรี, ประจวบคีรีขันธ์, ราชบุรี |
| **รวมทั้งหมด** | | **77** | |

### 3.3 ตัวอย่าง JSON ของ Province

```json
{
  "_id": "66f4b2a1c2d3e4f5a6b7c8d9",
  "id": 50,
  "code": "50",
  "slug": "chiang-mai",
  "name_th": "เชียงใหม่",
  "name_en": "Chiang Mai",
  "nameTh": "เชียงใหม่",
  "nameEn": "Chiang Mai",
  "name": "Chiang Mai",
  "region": "north",
  "region_th": "เหนือ",
  "vectorData": {
    "d": "M 120 45 L 125 50 ..."
  },
  "createdAt": "2026-09-17T15:30:00.000Z",
  "updatedAt": "2026-09-17T15:30:00.000Z"
}
```

---

---

## 4. Guide Schema (ข้อมูลมัคคุเทศก์ / ไกด์นำเที่ยว)

โมเดลสำหรับจัดเก็บและค้นหาข้อมูลไกด์นำเที่ยว (`guides` collection) อ้างอิงมาตรฐานกรมการท่องเที่ยว มีใบอนุญาตถูกต้อง และระบุความเชี่ยวชาญเฉพาะด้าน (`specialized_services`)

> 💡 **สถิติข้อมูลจำลอง (Seed Data):**
> - **18 จังหวัดท่องเที่ยวหลัก (ภาคละ 3 จังหวัด):**
>   - **ภาคเหนือ:** Chiang Mai (6), Chiang Rai (6), Nan (5)
>   - **ภาคกลาง:** Bangkok (6), Phra Nakhon Si Ayutthaya (6), Nonthaburi (5)
>   - **ภาคอีสาน:** Nakhon Ratchasima (6), Khon Kaen (6), Udon Thani (5)
>   - **ภาคใต้:** Phuket (6), Surat Thani (6), Krabi (5)
>   - **ภาคตะวันออก:** Chonburi (6), Rayong (5), Trat (5)
>   - **ภาคตะวันตก:** Kanchanaburi (6), Prachuap Khiri Khan (5), Phetchaburi (5)
> - **จำนวนไกด์:** เกลี่ยเฉลี่ยจังหวัดละ 5–6 คน ครบทุกจังหวัดหลัก รวมทั้งสิ้น **100 คน**
> - **ใบอนุญาต:** รหัสมาตรฐานกรมการท่องเที่ยว `TG-[รหัสจังหวัด]-[ลำดับ]` เช่น `TG-50-1001`
> - **ความเชี่ยวชาญ:** มีบริการเสริมเฉพาะทาง (`specialized_services`) เช่น เดินทัวร์วัดโบราณล้านนา, ล่องเรือชมทะเลบัวแดง, ชิมสตรีทฟู้ดยาวราช, ซาฟารีส่องสัตว์เขาใหญ่

### 4.1 Main Schema (`Guide`)

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | ค่าเริ่มต้น / ข้อจำกัด | รายละเอียด |
| :--- | :--- | :---: | :--- | :--- |
| `_id` | `ObjectId` | ❌ | Gen อัตโนมัติ | รหัส Primary Key ของ MongoDB |
| `name` | `String` | ✅ | Trim | ชื่อ-นามสกุลจริงของมัคคุเทศก์ |
| `nickname` | `String` | ❌ | Trim | ชื่อเล่น เช่น `"Chai"`, `"Ploy"` |
| `gender` | `String` | ❌ | **Enum:** `'Male'`, `'Female'`, `'Other'`, `'Not Specified'` | เพศสภาพ |
| `guide_photo` | `String` | ❌ | Default: `'default_avatar.jpg'` | รูปโปรไฟล์มัคคุเทศก์ |
| `phone` | `String` | ✅ | เช่น `"081-234-5678"` | เบอร์โทรศัพท์ติดต่อ |
| `email` | `String` | ❌ | Lowercase, Trim | อีเมลติดต่อ |
| `line_id` | `String` | ❌ | Trim | LINE ID สำหรับติดต่อ |
| `province` | `String` | ❌ | เช่น `"Chiang Mai"`, `"Phuket"` | จังหวัดประจำการหลัก (อ้างอิงตรงกับ `provinces.name_en`) |
| `daily_fee` | `Number` | ❌ | Min: 0 (เช่น `1600`–`3000`) | ค่าบริการมาตรฐานรายวัน (8 ชั่วโมง) THB |
| `overtime_rate_perhour` | `Number` | ❌ | Min: 0 (เช่น `240`–`450`) | อัตราค่าบริการล่วงเวลาต่อชั่วโมง THB |
| `license_number` | `String` | ✅ | Unique (เช่น `"TG-50-1001"`) | เลขที่ใบอนุญาตมัคคุเทศก์ |
| `license_category` | `String` | ❌ | **Enum:** `'General'`, `'Specific Region'`, `'Local'` | ประเภทใบอนุญาต |
| `scope_type` | `String` | ❌ | เช่น `"Inbound & Domestic"` | ขอบเขตประเภทการนำเที่ยว |
| `scope_description` | `String` | ❌ | - | คำอธิบายสิทธิ์การนำเที่ยว |
| `permitted_regions` | `[String]` | ❌ | เช่น `["Northern Thailand"]` | ภูมิภาคที่ได้รับอนุญาต |
| `issue_date` | `Date` | ❌ | - | วันที่ออกใบอนุญาต |
| `expiry_date` | `Date` | ❌ | - | วันหมดอายุใบอนุญาต |
| `verified` | `Boolean` | ❌ | Default: `false` | สถานะการตรวจสอบยืนยันเอกสาร |
| `language` | `[String]` | ❌ | Default: `["Thai"]` | ภาษาที่สื่อสารได้ เช่น `["Thai", "English", "Mandarin"]` |
| `service_areas` | `[String]` | ❌ | รายชื่อสถานที่ เช่น `["Doi Suthep", "Wat Chedi Luang"]` | ขอบเขตพื้นที่และจุดนำเที่ยวหลัก |
| `base_location` | `String` | ❌ | Trim | สถานที่ฐานปฏิบัติการ |
| `max_guest` | `Number` | ❌ | Min: 1 (เช่น `8`–`16`) | จำนวนลูกทัวร์สูงสุดที่รับได้ต่อกรุ๊ป |
| `guide_service_duration_per_day` | `Number` | ❌ | Default: `8` | ระยะเวลาให้บริการมาตรฐานต่อวัน (ชั่วโมง) |
| `status` | `String` | ❌ | **Enum:** `'Available'`, `'Busy'`, `'Inactive'` (Default: `'Available'`) | สถานะความพร้อมให้บริการ |
| `rating_avg` | `Number` | ❌ | Default: `0` (Min: 0, Max: 5) | คะแนนรีวิวเฉลี่ย |
| `total_reviews` | `Number` | ❌ | Default: `0` (Min: 0) | จำนวนรีวิวทั้งหมด |
| `years_experience` | `Number` | ❌ | Default: `0` (Min: 0) | ประสบการณ์การเป็นมัคคุเทศก์ (ปี) |
| `total_travelers` | `Number` | ❌ | Default: `0` (Min: 0) | จำนวนนักท่องเที่ยวที่เคยให้บริการ |
| `description` | `String` | ❌ | - | ประวัติและคำแนะนำตัวของมัคคุเทศก์ |
| `specialized_services` | `[Object]` | ❌ | Array of Sub-docs | บริการพิเศษเฉพาะทาง (ดูหัวข้อ 4.2) |

### 4.2 Specialized Services Sub-document (`specialized_services`)

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | รายละเอียด |
| :--- | :--- | :---: | :--- |
| `service_id` | `String` | ✅ | รหัสประจำบริการพิเศษ เช่น `"svc-50-1-1"` |
| `title` | `String` | ✅ | ชื่อโปรแกรม/บริการ เช่น `"Lanna Heritage & Ancient Temples"` |
| `description` | `String` | ✅ | รายละเอียดโปรแกรมและไฮไลต์กิจกรรม |
| `image_url` | `String` | ❌ | รูปภาพประกอบบริการ |

### 4.3 Virtual Fields (ฟิลด์เสมือนสำหรับเชื่อมต่อ Frontend)

| Virtual Field | แมปมาจากฟิลด์จริง (Source) | ชนิดข้อมูล | จุดประสงค์ / ประโยชน์ |
| :--- | :--- | :---: | :--- |
| `id` | `_id.toHexString()` | `String` | รองรับ Frontend ที่เรียก `guide.id` หรือใช้เป็น key |
| `pricePerDay` | `daily_fee` | `Number` | รองรับคอมโพเนนต์การ์ดไกด์ `guide.pricePerDay` |
| `rating` | `rating_avg` | `Number` | รองรับ `guide.rating` |
| `reviews` | `total_reviews` | `Number` | รองรับ `guide.reviews` |
| `location` | `province` หรือ `base_location` | `String` | รองรับการแสดงผลเมือง/จังหวัดแบบย่อ `guide.location` |
| `bio` | `description` | `String` | รองรับคำแนะนำตัว `guide.bio` |
| `languages` | `language` | `[String]` | รองรับการวนลูปภาษา `guide.languages` |
| `image` | `guide_photo` | `String` | รองรับภาพโปรไฟล์ `guide.image` |
| `specialties` | `specialized_services.map(s => s.title)` | `[String]` | คืนค่าเป็น Array ของชื่อบริการพิเศษให้แสดง Badge ได้ทันที |

### 4.4 ตัวอย่าง JSON ของ Guide

```json
{
  "_id": "6aae4929c51495ec81c1d332",
  "id": "6aae4929c51495ec81c1d332",
  "name": "Somchai Jaidee",
  "nickname": "Chai",
  "gender": "Male",
  "guide_photo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  "phone": "081-100-1007",
  "email": "chai.somchai@gothailand-guide.com",
  "line_id": "@guide_chai_chia",
  "province": "Chiang Mai",
  "daily_fee": 1600,
  "overtime_rate_perhour": 240,
  "license_number": "TG-50-1001",
  "license_category": "General",
  "scope_type": "Inbound & Domestic",
  "scope_description": "Certified professional tourist guide authorized for cultural, heritage, and nature tourism in Chiang Mai and Northern Thailand.",
  "permitted_regions": ["Northern Thailand"],
  "issue_date": "2021-01-10T00:00:00.000Z",
  "expiry_date": "2028-01-10T00:00:00.000Z",
  "verified": true,
  "language": ["Thai", "English"],
  "service_areas": [
    "Doi Suthep",
    "Wat Chedi Luang",
    "Nimmanhaemin",
    "Doi Inthanon",
    "Sticky Waterfalls",
    "Mae Rim Valley"
  ],
  "base_location": "Mueang Chiang Mai District, Chiang Mai",
  "max_guest": 8,
  "guide_service_duration_per_day": 8,
  "status": "Available",
  "rating_avg": 4.7,
  "total_reviews": 20,
  "years_experience": 3,
  "total_travelers": 360,
  "description": "Professional licensed guide based in Chiang Mai with over 3 years of expertise. Passionate about sharing authentic local culture, hidden gems, and memorable stories with travelers from all over the world.",
  "specialized_services": [
    {
      "service_id": "svc-50-1-1",
      "title": "Lanna Heritage & Ancient Temples",
      "description": "Discover centuries-old teakwood temples, sacred chanting rituals, and ancient Lanna kingdom history.",
      "image_url": "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80"
    },
    {
      "service_id": "svc-50-1-2",
      "title": "Northern Street Food & Night Bazaar",
      "description": "Taste Khao Soi, Sai Oua sausage, and night bazaar delicacies with a local food expert.",
      "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
    }
  ],
  "pricePerDay": 1600,
  "rating": 4.7,
  "reviews": 20,
  "location": "Chiang Mai",
  "bio": "Professional licensed guide based in Chiang Mai with over 3 years of expertise...",
  "languages": ["Thai", "English"],
  "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  "specialties": [
    "Lanna Heritage & Ancient Temples",
    "Northern Street Food & Night Bazaar"
  ]
}
```

---

## 5. สรุป API Endpoints ที่เกี่ยวข้อง

| Resource | Method | URL Path | Query Params / Description |
| :--- | :---: | :--- | :--- |
| **Accommodations** | `GET` | `/api/accommodations` | ดึงรายชื่อที่พักทั้งหมด |
| | `POST` | `/api/accommodations` | เพิ่มข้อมูลที่พักใหม่ |
| | `PATCH` | `/api/accommodations/:id` | แก้ไขข้อมูลที่พักตาม `_id` |
| | `DELETE` | `/api/accommodations/:id` | ลบข้อมูลที่พักตาม `_id` |
| **Cars** | `GET` | `/api/cars` | ดึงรายการรถเช่าทั้งหมด |
| | `GET` | `/api/cars/:id` | ดึงข้อมูลรถรายคันตาม `_id` หรือ `slug` |
| | `POST` | `/api/cars` | เพิ่มข้อมูลรถเช่าใหม่ |
| | `PATCH` | `/api/cars/:id` | แก้ไขข้อมูลรถเช่าตาม `_id` |
| | `DELETE` | `/api/cars/:id` | ลบข้อมูลรถเช่าตาม `_id` |
| **Bookings** | `GET` | `/api/bookings` | ดึงประวัติรายการจองรถทั้งหมด |
| | `GET` | `/api/bookings/:id` | ดึงข้อมูลการจองตาม `bookingReferenceId` หรือ `_id` |
| | `POST` | `/api/bookings` | บันทึกการจองรถใหม่ (ออก Reference ID อัตโนมัติ) |
| | `PATCH` | `/api/bookings/:id` | ปรับปรุงสถานะหรือข้อมูลการจอง |
| | `DELETE` | `/api/bookings/:id` | ยกเลิก/ลบรายการจอง |
| **Guides** | `GET` | `/api/guides` | ดึงรายชื่อไกด์ทั้งหมด<br>• `?province=Chiang%20Mai` กรองตามจังหวัด<br>• `?status=Available` กรองตามสถานะ<br>• `?search=Chai` ค้นหาชื่อ/ชื่อเล่น/จังหวัด |
| | `GET` | `/api/guides/:id` | ดึงข้อมูลไกด์รายคนตาม `_id` |
| | `POST` | `/api/guides` | เพิ่มข้อมูลมัคคุเทศก์ใหม่ |
| | `PATCH` | `/api/guides/:id` | แก้ไขข้อมูลมัคคุเทศก์ตาม `_id` |
| | `DELETE` | `/api/guides/:id` | ลบข้อมูลมัคคุเทศก์ตาม `_id` |
| **Provinces** | `GET` | `/api/provinces` | ดึงข้อมูลจังหวัดทั้งหมด คืนค่า `{ success: true, count: 77, provinces }`<br>• `?region=north` หรือ `?region=เหนือ` สำหรับกรองภาค<br>• `?format=array` สำหรับรับผลลัพธ์เป็น Array |
| | `GET` | `/api/provinces/:id` | ค้นหาจังหวัดเดี่ยวด้วยรหัส `id` (เช่น `50`) หรือ `slug` (เช่น `chiang-mai`) |
| | `POST` | `/api/provinces` | สร้างข้อมูลจังหวัดใหม่ |

---

## 6. ส่วนที่ยังไม่เสร็จ

- [ ] **User Schema** — ยังไม่ได้เขียนเอกสารสรุปโครงสร้างข้อมูล