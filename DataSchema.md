# GoThailand API — Data Schema Documentation

เอกสารสรุปโครงสร้างข้อมูล (Data Schemas) ทั้งหมดของระบบ **GoThailand API** เชื่อมต่อกับ MongoDB Atlas

> ⚠️ **สถานะเอกสาร:** ยังเหลือส่วนข้อมูล **User** และ **Guide** ที่ยังไม่ได้เขียนสรุป Schema ในเอกสารนี้ — รอเพิ่มเติมภายหลัง

## สารบัญ

1. [Accommodation Schema (ข้อมูลที่พัก)](#1-accommodation-schema-ข้อมูลที่พัก)
2. [Car & Booking Schema (ข้อมูลรถเช่าและการจอง)](#2-car--booking-schema-ข้อมูลรถเช่าและการจอง)
3. [Province Schema (ข้อมูล 77 จังหวัด)](#3-province-schema-ข้อมูล-77-จังหวัด)
4. [สรุป API Endpoints](#4-สรุป-api-endpoints-ที่เกี่ยวข้อง)
5. [ส่วนที่ยังไม่เสร็จ](#5-ส่วนที่ยังไม่เสร็จ)

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

### 2.2 Booking Schema (`Booking`)

Schema สำหรับเก็บประวัติการทำรายการจองรถเช่า (Checkout Flow):

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | ค่าเริ่มต้น / ตัวอย่าง | รายละเอียด |
| :--- | :--- | :---: | :--- | :--- |
| `bookingReferenceId` | `String` | ❌ | Unique (Gen อัตโนมัติ `GT-CR-YYYY-XXXXX`) | รหัสอ้างอิงการจอง |
| `carId` | `ObjectId` | ❌ | Ref: `'Car'` | อ้างอิงรหัสรถใน `Car` collection |
| `carName` | `String` | ✅ | เช่น `"Toyota Fortuner"` | ชื่อรถที่ทำการจอง |
| `carCategory` | `String` | ❌ | Default: `"SUV"` | ประเภทรถ |
| `carImage` | `String` | ❌ | URL ภาพ | รูปหน้ารถ |
| `carDetails` | `String` | ❌ | Default: `"SUV · 7 Seats · Diesel"` | สรุปสเปกแบบย่อ |
| `carRating` | `String` | ❌ | Default: `"4.9"` | คะแนนรีวิวตอนจอง |
| `pickupLocation` | `String` | ✅ | Default: `"Bangkok (BKK) Suvarnabhumi Airport"` | สถานที่รับรถ |
| `dropoffLocation` | `String` | ✅ | Default: `"Bangkok (BKK) Suvarnabhumi Airport"` | สถานที่คืนรถ |
| `pickupDate` | `Date` | ✅ | - | วันที่รับรถ |
| `dropoffDate` | `Date` | ✅ | - | วันที่คืนรถ |
| `pickupTime` | `String` | ❌ | Default: `"10:00 AM"` | เวลารับรถ |
| `dropoffTime` | `String` | ❌ | Default: `"10:00 AM"` | เวลาคืนรถ |
| `durationDays` | `Number` | ❌ | Default: `3` | จำนวนวันเช่า |
| `datesSummary` | `String` | ❌ | เช่น `"Oct 15 - Oct 18 (3 Days)"` | ข้อความสรุปช่วงเวลาจอง |
| `traveler` | `Object` | ✅ | `{ fullName, email, phone, country }` | ข้อมูลผู้ติดต่อหลัก |
| `driver` | `Object` | ✅ | `{ fullName, phone, email, licenseCountry, driverAge, licenseNumber }` | ข้อมูลผู้ขับขี่และใบขับขี่ |
| `specialRequests` | `String` | ❌ | - | คำขอเพิ่มเติม เช่น คาร์ซีทเด็ก |
| `pricing` | `Object` | ✅ | `{ pricePerDay, rentalTotal, serviceFee, taxVat, totalPrice }` | รายละเอียดสรุปราคาและภาษี |
| `payment` | `Object` | ❌ | `{ method: ['card','promptpay','bank'], cardName, cardNumberMasked, expiryDate, saveCardForFuture, sameAsTravelerAddress }` | ข้อมูลวิธีชำระเงิน |
| `termsAccepted` | `Boolean` | ✅ | Default: `true` | ยอมรับข้อกำหนดและเงื่อนไข |
| `status` | `String` | ❌ | **Enum:** `'pending'`, `'confirmed'`, `'cancelled'` (Default: `'confirmed'`) | สถานะการจอง |

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

## 4. สรุป API Endpoints ที่เกี่ยวข้อง

| Resource | Method | URL Path | Query Params / Description |
| :--- | :---: | :--- | :--- |
| **Accommodations** | `GET` | `/api/accommodations` | ดึงรายชื่อที่พักทั้งหมด |
| | `POST` | `/api/accommodations` | เพิ่มข้อมูลที่พักใหม่ |
| | `PATCH` | `/api/accommodations/:id` | แก้ไขข้อมูลที่พักตาม `_id` |
| | `DELETE` | `/api/accommodations/:id` | ลบข้อมูลที่พักตาม `_id` |
| **Cars** | `GET` | `/api/cars` | ดึงรายการรถเช่าทั้งหมด |
| | `GET` | `/api/cars/:id` | ดึงข้อมูลรถรายคันตาม `_id` |
| | `POST` | `/api/cars` | เพิ่มข้อมูลรถเช่าใหม่ |
| | `PATCH` | `/api/cars/:id` | แก้ไขข้อมูลรถเช่าตาม `_id` |
| | `DELETE` | `/api/cars/:id` | ลบข้อมูลรถเช่าตาม `_id` |
| **Provinces** | `GET` | `/api/provinces` | ดึงข้อมูลจังหวัดทั้งหมด คืนค่า `{ success: true, count: 77, provinces }`<br>• `?region=north` หรือ `?region=เหนือ` สำหรับกรองภาค<br>• `?format=array` สำหรับรับผลลัพธ์เป็น Array |
| | `GET` | `/api/provinces/:id` | ค้นหาจังหวัดเดี่ยวด้วยรหัส `id` (เช่น `50`) หรือ `slug` (เช่น `chiang-mai`) |
| | `POST` | `/api/provinces` | สร้างข้อมูลจังหวัดใหม่ |

---

## 5. ส่วนที่ยังไม่เสร็จ

- [ ] **User Schema** — ยังไม่ได้เขียนเอกสารสรุปโครงสร้างข้อมูล
- [ ] **Guide Schema** — ยังไม่ได้เขียนเอกสารสรุปโครงสร้างข้อมูล