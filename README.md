# GO-THAILAND Backend — Team 8

Backend API สำหรับโปรเจกต์ **GO-THAILAND**

> 📋 **Data Schema Documentation:** ดูเอกสารสรุปโครงสร้างข้อมูลและตัวอย่าง JSON (Accommodation, Car, Booking, Province) ได้ที่ **[DataSchema.md](./DataSchema.md)**

## Main API Path

```
https://gothailand-api.onrender.com
```

## Routes API

```
https://gothailand-api.onrender.com/api/auth
https://gothailand-api.onrender.com/api/accommodations
https://gothailand-api.onrender.com/api/cars
https://gothailand-api.onrender.com/api/bookings
https://gothailand-api.onrender.com/api/provinces
https://gothailand-api.onrender.com/api/guides
https://gothailand-api.onrender.com/api/users
```

Backend นี้ใช้สำหรับจัดการข้อมูลของ:

- 🔐 Authentication & Session (ระบบล็อกอิน/สมัครสมาชิก/ตรวจโทเคน)
- 🏨 Accommodation
- 🚗 Car
- 📑 Booking (การจองและคำสั่งซื้อ)
- 🗺️ Province
- 🧑‍🏫 Guide
- 👤 User


---

## 🔑 Test Account (ข้อมูลบัญชีสำหรับทดสอบระบบ)

บัญชีสำหรับผู้ทดสอบระบบและผู้ตรวจงาน (Credentials for Testing):

| บัญชี / บทบาท | Email (อีเมล) | Password (รหัสผ่าน) | หมายเหตุ |
| :--- | :--- | :--- | :--- |
| **Test User (บัญชีทดสอบ)** | `testgothailand`<br>*(หรือ `testgothailand@gmail.com`, `testgothailand@gothailand.com`)* | `test123456` | บัญชีผู้ใช้ทั่วไปสำหรับทดสอบระบบ (บันทึกลง MongoDB Atlas เรียบร้อย) |
| **Admin (ผู้ดูแลระบบ)** | `siwat@example.com` | `Password123!` | บัญชีผู้ดูแลระบบ (Admin) |
| **Demo Customer** | `john@example.com` | `Password123!` | บัญชีลูกค้าเดโม่เดิม |

---

## Tech Stack

โปรเจกต์นี้ใช้:

- **Node.js** — Runtime สำหรับรัน JavaScript ฝั่ง Backend (ES Modules)
- **Express.js** — เฟรมเวิร์กสร้าง REST API
- **MongoDB Atlas** — ฐานข้อมูล NoSQL Cloud Database
- **Mongoose** — ODM เชื่อมต่อและจัดการ Schema ข้อมูลระหว่าง Node.js กับ MongoDB
- **bcryptjs** — เข้ารหัส (Hashing) และตรวจสอบรหัสผ่านอย่างปลอดภัยด้วย Salt Rounds
- **jsonwebtoken (JWT)** — สร้างและตรวจสอบ Token ยืนยันตัวตน (Authentication & Authorization)
- **CORS** — จัดการ Cross-Origin Resource Sharing อนุญาตให้ Frontend เชื่อมต่อได้
- **dotenv** — จัดการ Environment Variables จากไฟล์ `.env`

---

## Project Structure

```
Team8-Backend/
│
├── src/
│   ├── server.js               # Entry point หลัก เริ่มการทำงานของ Express, Middlewares, Routes และ Database
│   │
│   ├── config/
│   │   └── db.js               # ฟังก์ชันเชื่อมต่อ MongoDB Atlas ผ่าน Mongoose
│   │
│   ├── middleware/
│   │   └── auth.middleware.js  # Middlewares ความปลอดภัย (verifyToken, isAdmin)
│   │
│   ├── models/
│   │   ├── Accommodation.js    # Schema: ที่พัก / โรงแรม / รีสอร์ท
│   │   ├── Booking.js          # Schema: ข้อมูลการจอง คำสั่งซื้อ และสถานะการชำระเงิน
│   │   ├── Car.js              # Schema: ข้อมูลรถเช่า
│   │   ├── Guide.js            # Schema: ข้อมูลไกด์นำเที่ยว
│   │   ├── Province.js         # Schema: ข้อมูล 77 จังหวัดทั่วไทย พร้อมคำขวัญและภูมิภาค
│   │   └── User.js             # Schema: ผู้ใช้งาน ข้อมูลบัญชี และ Role (admin/user)
│   │
│   ├── routes/
│   │   ├── accommodation.routes.js # API จัดการข้อมูลที่พัก (รองรับ Search & Filter)
│   │   ├── auth.routes.js          # API สมัครสมาชิก, ล็อกอิน, ตรวจสอบ Session (JWT)
│   │   ├── booking.routes.js       # API จัดการการจองและคำสั่งซื้อ
│   │   ├── car.routes.js           # API จัดการข้อมูลรถเช่า
│   │   ├── guide.routes.js         # API จัดการข้อมูลไกด์
│   │   ├── province.routes.js      # API ดึงข้อมูล 77 จังหวัด (Filter ภูมิภาค / คำค้น)
│   │   └── user.routes.js          # API จัดการผู้ใช้งาน (Protected Routes)
│   │
│   └── seed/                   # สคริปต์ Mock Data เริ่มต้นสำหรับระบบ
│       ├── index.js            # รวมคำสั่ง Seed ทั้งหมด
│       ├── user.seed.js        # Seed ข้อมูลผู้ใช้เริ่มต้นและ Test Account
│       ├── province.seed.js    # Seed ข้อมูล 77 จังหวัดพร้อมคำขวัญ
│       └── ...
│
├── .env                        # ไฟล์ Environment Variables (ห้าม commit)
├── .env.example                # ตัวอย่างการตั้งค่า Environment Variables
├── .gitignore
├── package.json
└── package-lock.json
```

### หน้าที่ของแต่ละ Folder และไฟล์สำคัญ

- **`src/server.js`**: ไฟล์หลักของระบบ เริ่มต้น Express Server, เรียกใช้ CORS, JSON parser, Mount Routes ทั้งหมด และเชื่อมต่อ MongoDB
- **`src/middleware/`**: ตัวกลางดักตรวจ Request ก่อนถึง Route Controllers เช่น การดักจับ Header Authorization, ตรวจสอบความถูกต้องและวันหมดอายุของ JWT Token, ตรวจสอบ Role Admin
- **`src/models/`**: โครงสร้าง Schema และเงื่อนไขข้อมูล (Mongoose Schema)
- **`src/routes/`**: กำหนด API Endpoints และ Controller Logic ประมวลผล Request/Response
- **`src/seed/`**: สคริปต์สำหรับนำเข้าข้อมูลจำลอง (Mock Data) ลง Database สำหรับการพัฒนาและทดสอบระบบ

---

## Clone Repository

เปิด Terminal ใน VS Code หรือ Terminal ของเครื่อง แล้วไปยัง folder ที่ต้องการเก็บ project:

```bash
cd ~/Documents/GitHub/JSD13
```

Clone repository:

```bash
git clone <BACKEND_REPOSITORY_URL>
```

ตัวอย่าง:

```bash
git clone https://github.com/xxxxx/Team8-Backend.git
```

เข้า folder:

```bash
cd Team8-Backend
```

ตรวจสอบว่าอยู่ใน project ถูกต้อง:

```bash
pwd
ls
```

ควรเห็นประมาณ:

```
README.md
package.json
package-lock.json
src
.env.example
.gitignore
```

---

## Install Dependencies

หลังจาก Clone แล้ว ต้องติดตั้ง packages ก่อน:

```bash
npm install
```

คำสั่งนี้จะอ่าน `package.json` แล้วติดตั้ง dependencies ให้ หลังจากติดตั้งเสร็จควรมี `node_modules/`

> ไม่ต้อง commit `node_modules` ขึ้น GitHub เพราะมีอยู่ใน `.gitignore` แล้ว

---

## ตั้งค่า .env

ไฟล์ `.env` ใช้เก็บค่าที่ไม่ควรใส่ใน GitHub เช่น MongoDB connection string

ใน repository จะมีไฟล์ `.env.example` ตัวอย่าง:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

ให้สร้าง `.env` จาก `.env.example`:

```bash
cp .env.example .env
```

จากนั้นเปิด `.env` แล้วกำหนดค่าให้ครบถ้วน:

```env
PORT=5001
MONGO_URI=mongodb+srv://...
JWT_SECRET=gothailand_jwt_secret_key_2026_super_secure
```

- **`PORT`**: พอร์ตสำหรับรัน Backend บนเครื่องตัวเอง (แนะนำ `5001`)
- **`MONGO_URI`**: Connection String ของ MongoDB Atlas
- **`JWT_SECRET`**: คีย์ลับสำหรับสร้างและเข้ารหัส Token (ห้ามเปิดเผย)

> ⚠️ **สำคัญ**
>
> - ห้าม commit `.env` ขึ้น GitHub (`.env` ถูกใส่ไว้ใน `.gitignore` แล้ว)
> - ห้ามทำ `git add .env`
> - ห้ามส่ง MongoDB connection string หรือ JWT Secret ลง GitHub

---

## Start Backend

```bash
npm run dev
```

ถ้าทุกอย่างถูกต้อง จะเห็นประมาณ:

```
Go THAILAND Server running on http://localhost:5001
✅ MongoDB connected
```

แปลว่า Express ✅ MongoDB ✅ Backend ✅

---

## ทดสอบว่า Server ทำงาน

เปิด Browser หรือ Thunder Client ไปที่:

```
http://localhost:5001/
```

ควรได้:

```json
{ "message": "GO-THAILAND API is running" }
```

ถ้าได้แบบนี้ แสดงว่า Backend ทำงานแล้ว

---

## ใช้ Thunder Client ทดสอบ API

แนะนำให้ใช้ **Thunder Client** ใน VS Code

**ติดตั้ง:**

1. เปิด VS Code
2. เปิด Extensions
3. ค้นหา Thunder Client
4. Install

ใช้ Thunder Client เพื่อทดสอบ `GET` `POST` `PATCH` `DELETE` โดยไม่ต้องใช้ Frontend

---

## Backend API Structure

REST API — Base URL:

```
http://localhost:5001
```

**Accommodation**

```
POST   /api/accommodations
GET    /api/accommodations
PATCH  /api/accommodations/:id
DELETE /api/accommodations/:id
```

**Car**

```
POST   /api/cars
GET    /api/cars
PATCH  /api/cars/:id
DELETE /api/cars/:id
```

**Booking (Car Rental Booking)**

```
POST   /api/bookings        # สร้างการจองใหม่ (รองรับทั้ง Flat Payload และ Nested Schema)
GET    /api/bookings        # ดึงประวัติการจองทั้งหมด เรียงจากล่าสุด
GET    /api/bookings/:id    # ค้นหาการจองตาม _id หรือ bookingReferenceId
PATCH  /api/bookings/:id    # อัปเดตสถานะการจอง (confirmed, cancelled, pending)
DELETE /api/bookings/:id    # ลบหรือยกเลิกรายการจอง
```

**Province** *(📖 [PROVINCE_API.md](./PROVINCE_API.md))*

```
GET    /api/provinces       # ดึงรายการ 77 จังหวัด (รองรับ Query: ?region=... &search=... &q=... &format=summary)
GET    /api/provinces/:id   # ดึงข้อมูลจังหวัดตาม _id หรือ id หรือชื่อจังหวัด (TH/EN) พร้อมคำขวัญ
```

**Guide**

```
POST   /api/guides
GET    /api/guides
PATCH  /api/guides/:id
DELETE /api/guides/:id
```

**Authentication**

```
POST   /api/auth/register   # สมัครสมาชิกใหม่ (hash รหัสผ่านด้วย bcrypt + ออก token อายุ 1 วัน)
POST   /api/auth/login      # เข้าสู่ระบบ (ตรวจสอบรหัสผ่านด้วย bcrypt.compare + ออก token อายุ 1 วัน)
GET    /api/auth/me         # ดึงข้อมูลผู้ใช้ปัจจุบัน (ต้องส่ง Header: Authorization: Bearer <token>)
```

**User (Admin & Management — Protected Routes)**

```
GET    /api/users           # ดูรายชื่อผู้ใช้ทั้งหมด (ต้องมี Token, ซ่อน password hash)
GET    /api/users/:id       # ดูข้อมูลผู้ใช้รายบุคคลตาม ID (ต้องมี Token, ซ่อน password hash)
POST   /api/users           # สร้างผู้ใช้ใหม่ (รองรับการตั้ง Role: user / admin)
PATCH  /api/users/:id       # แก้ไขข้อมูลผู้ใช้ (รองรับการเปลี่ยนรหัสผ่านโดย hash ใหม่อัตโนมัติ)
DELETE /api/users/:id       # ลบผู้ใช้ออกจากระบบ
```

---

## 🔐 ระบบ Authentication & Security (ระบบยืนยันตัวตน)

ระบบยืนยันตัวตนของ **GO-THAILAND** ใช้มาตรฐานความปลอดภัยระดับสากลด้วย **JWT (JSON Web Token)** ผสานกับ **bcryptjs** สำหรับการเข้ารหัสผ่านแบบ One-way Hashing

### 📌 ภาพรวมสถาปัตยกรรม (Authentication Flow)

```
[ Frontend Client ]
       │
       │ 1. POST /api/auth/register หรือ login (email, password)
       ▼
[ Express Router ] ── (auth.routes.js)
       │
       │ 2. ตรวจสอบข้อมูล & bcrypt (hash หรือ compare)
       ▼
[ MongoDB Atlas ]
       │
       │ 3. ออก JWT Token (อายุ 1 วัน) พร้อม Payload { id, email, role }
       ▼
[ Frontend Client ] ── ได้รับ Token เก็บลงใน localStorage / Cookie
       │
       │ 4. Request ถัดไปแนบ Header: "Authorization: Bearer <token>"
       ▼
[ Middleware: verifyToken ] ── ตรวจสอบความถูกต้องและวันหมดอายุของ Token
       │ ├── หากหมดอายุ -> คืนค่า 401 พร้อม { expired: true }
       │ └── หากถูกต้อง -> แนบ decoded payload ไปที่ req.user แล้วไปต่อ next()
       ▼
[ Protected Route Controllers ] (เช่น GET /api/auth/me, /api/users, /api/bookings)
```

---

### 1. การทำงานของ `POST /api/auth/register` (สมัครสมาชิก)

- **ไฟล์ที่รับผิดชอบ:** `src/routes/auth.routes.js`
- **ขั้นตอนการทำงาน:**
  1. **รับข้อมูลจาก Body:** รับค่า `name` (หรือ `firstName` + `lastName`), `email`, `password`, `phone`, `role`
  2. **Validation:** ตรวจสอบว่ากรอกข้อมูลจำเป็นครบถ้วนหรือไม่ หากไม่ครบจะตอบกลับ `400 Bad Request`
  3. **ตรวจสอบอีเมลซ้ำ:** ค้นหาใน MongoDB (`User.findOne({ email })`) หากมีอีเมลนี้อยู่แล้ว จะตอบกลับ `400 อีเมลนี้ถูกลงทะเบียนไว้ในระบบแล้ว`
  4. **เข้ารหัสรหัสผ่าน (Password Hashing):** ใช้ `bcrypt.hash(password, 10)` สร้าง Salt 10 รอบ เพื่อแปลงรหัสผ่านเป็น Hash string ที่ไม่สามารถแปลงกลับได้ ป้องกันข้อมูลรั่วไหล
  5. **บันทึกลง Database:** สร้าง Document ผู้ใช้ใหม่ลงใน MongoDB Atlas โดยกำหนดสถานะเริ่มต้นเป็น `active`
  6. **ออก JWT Token ทันที:** ใช้ `jwt.sign()` บรรจุ payload `{ id, email, role }` กำหนดอายุ **1 วัน (`expiresIn: "1d"`)**
  7. **ตอบกลับผลลัพธ์:** ส่งข้อมูล User กลับไปให้ Frontend (โดย**ตัด field password ออก**) พร้อม JWT Token เพื่อให้ผู้ใช้สามารถเข้าใช้งานระบบได้ทันทีหลังสมัครเสร็จ

**ตัวอย่าง Request Body:**
```json
{
  "name": "Somchai Jaidee",
  "email": "somchai@example.com",
  "password": "Password123!",
  "phone": "0812345678"
}
```

**ตัวอย่าง Response (201 Created):**
```json
{
  "success": true,
  "message": "สมัครสมาชิกสำเร็จ",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67...abc",
    "name": "Somchai Jaidee",
    "email": "somchai@example.com",
    "phone": "0812345678",
    "role": "user",
    "status": "active"
  }
}
```

---

### 2. การทำงานของ `POST /api/auth/login` (เข้าสู่ระบบ)

- **ไฟล์ที่รับผิดชอบ:** `src/routes/auth.routes.js`
- **ขั้นตอนการทำงาน:**
  1. **รับข้อมูลจาก Body:** รับ `email` และ `password`
  2. **ค้นหาผู้ใช้งาน:** ค้นหา Document ผู้ใช้จาก `cleanEmail` ในฐานข้อมูล
  3. **ตรวจสอบรหัสผ่านด้วย `bcrypt.compare`:**
     - นำรหัสผ่านข้อความธรรมดาที่ผู้ใช้กรอก มาเปรียบเทียบกับ Hash ที่จัดเก็บใน Database
     - หาก**ไม่พบผู้ใช้** หรือ **รหัสผ่านไม่ตรงกัน** จะตอบกลับ `401 Unauthorized` ด้วยข้อความเดียวกันคือ `"อีเมลหรือรหัสผ่านไม่ถูกต้อง"` *(แนวปฏิบัติด้านความปลอดภัย: ไม่เปิดเผยว่าอีเมลหรือรหัสผ่านตัวใดที่ผิด เพื่อป้องกันการเดาผู้ใช้ของ Hacker)*
  4. **สร้าง JWT Token:** เมื่อรหัสผ่านถูกต้อง ทำการ Sign Token อายุ 1 วัน (`expiresIn: "1d"`)
  5. **ส่งผลลัพธ์:** ส่ง Token และข้อมูล User Profile กลับไปยัง Frontend

**ตัวอย่าง Request Body:**
```json
{
  "email": "siwat@example.com",
  "password": "Password123!"
}
```

**ตัวอย่าง Response (200 OK):**
```json
{
  "success": true,
  "message": "เข้าสู่ระบบสำเร็จ",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6aae496cf3c07d4e040642c0",
    "name": "Siwat",
    "email": "siwat@example.com",
    "role": "admin",
    "status": "active"
  }
}
```

---

### 3. การทำงานของ `GET /api/auth/me` (ตรวจสอบ Session ปัจจุบัน)

- **ไฟล์ที่รับผิดชอบ:** `src/routes/auth.routes.js`
- **จุดประสงค์:** ใช้เมื่อผู้ใช้เปิดเว็บหรือ Refresh หน้าเว็บ เพื่อให้ Frontend ตรวจสอบว่า Token ที่เก็บไว้ยังใช้งานได้อยู่หรือไม่ และดึงข้อมูลโปรไฟล์ล่าสุด
- **Header ที่ต้องแนบ:**
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **ขั้นตอนการทำงาน:**
  1. วิ่งผ่าน `verifyToken` middleware เพื่อถอดรหัสและตรวจความถูกต้องของ Token
  2. ดึงข้อมูล User จาก Database ตาม `req.user.id` โดยใช้คำสั่ง `.select("-password")` เพื่อไม่ให้ hash รหัสผ่านหลุดออกไป
  3. ส่งข้อมูลโปรไฟล์ล่าสุดของผู้ใช้กลับไป

---

## 🛡️ การทำงานของ Middleware (`src/middleware/auth.middleware.js`)

Middleware ทำหน้าที่เป็นตัวกรองความปลอดภัย (Security Gatekeeper) ดักจับ Request ก่อนจะอนุญาตให้ Controller ทำงานต่อ

### 1. `verifyToken` Middleware

ทำหน้าที่ดักจับ Token และตรวจสอบตัวตนของผู้ใช้งานใน Protected Routes ทุกเส้นทาง

```javascript
import { verifyToken } from "../middleware/auth.middleware.js";

// ใช้งานเป็น Middleware ก่อนเข้า Controller
router.get("/me", verifyToken, async (req, res) => { ... });
router.get("/users", verifyToken, async (req, res) => { ... });
```

**กลไกการทำงานอย่างละเอียด:**
1. **ดักตรวจ Authorization Header:**
   - ค้นหา Header `authorization` หรือ `Authorization`
   - ตรวจสอบรูปแบบว่าต้องขึ้นต้นด้วย `"Bearer "` เท่านั้น
   - หากไม่มี Header หรือไม่ได้ขึ้นต้นด้วย Bearer ระบบจะ Reject ทันทีด้วย `401 Unauthorized` (`"Access denied. No token provided."`)
2. **สกัด Token ดิบ (Token Extraction):**
   - แยก String ด้วยช่องว่าง: `authHeader.split(" ")[1]`
3. **ตรวจสอบความถูกต้องด้วย `jwt.verify(token, secret)`:**
   - ตรวจสอบ Signature ของ Token ด้วย Secret Key (`process.env.JWT_SECRET`)
4. **ดักจับ Error สำคัญ (Error Handling):**
   - **กรณี Token หมดอายุ (`TokenExpiredError`):** ส่งกลับ HTTP `401` พร้อมข้อความ `"Token has expired. Please login again."` และแนบ flag `"expired": true` เพื่อให้ Frontend ตรวจจับได้ง่ายและนำผู้ใช้ไปหน้า Login ทันที
   - **กรณี Token ไม่ถูกต้องหรือถูกปลอมแปลง (`JsonWebTokenError`):** ส่งกลับ HTTP `401` `"Invalid token."`
5. **ส่งต่อ Context ผ่าน `req.user`:**
   - เมื่อตรวจสอบผ่าน ระบบจะแนบข้อมูลที่ Decode ได้ (`req.user = decoded`) ซึ่งประกอบด้วย `{ id, email, role }` ให้ Controller ถัดไปสามารถเรียกใช้ `req.user.id` หรือ `req.user.role` ได้ทันที แล้วเรียก `next()`

---

### 2. `isAdmin` Middleware (Role-Based Authorization)

ทำหน้าที่จำกัดสิทธิ์เฉพาะผู้ใช้ที่มีสถานะเป็น **Admin** เท่านั้น

```javascript
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

// เฉพาะผู้ใช้ที่มีสิทธิ์ Admin เท่านั้นที่สามารถเข้าถึงได้
router.delete("/users/:id", verifyToken, isAdmin, async (req, res) => { ... });
```

**กลไกการทำงาน:**
1. ต้องรัน **ต่อจาก `verifyToken`** เสมอ เพื่อให้มี Object `req.user` ก่อน
2. ตรวจสอบค่า `req.user.role === "admin"`
3. หากเป็น Admin จะอนุญาตให้ทำงานต่อไป (`next()`)
4. หากไม่ใช่ Admin จะปฏิเสธทันทีด้วย HTTP `403 Forbidden` พร้อมข้อความ:
   ```json
   {
     "success": false,
     "message": "Access denied. Admin privileges required."
   }
   ```

---

### 3. การรักษาความปลอดภัยของ User Data (`.select("-password")`)

ใน Routes ที่มีการดึงข้อมูลผู้ใช้ เช่น `GET /api/users` หรือ `GET /api/users/:id`:
- ระบบจะใช้คำสั่ง `.select("-password")` เสมอ เพื่อกรอง field password ออกจากการ Query
- ป้องกันไม่ให้แฮชรหัสผ่านของผู้ใช้รั่วไหลออกสู่สาธารณะแม้กระทั่งทาง Response API

---

## งานของแต่ละคน

แต่ละคนรับผิดชอบ Resource ของตัวเอง:

| Resource        | Owner                     |
| --------------- | ------------------------- |
| Accommodation   | Siwat / Yok (36-yok)      |
| Car & Booking   | Guitar (Car-Guitar)       |
| Province        | Po (31-po)                |
| Guide           | Meng (20-meng)            |
| User            | Team Member               |

แต่ละคนต้องทำ:

- Model
- Routes (POST, GET, PATCH, DELETE)
- Test API
- Add data to MongoDB

---

## ตัวอย่างงานของ Car

ถ้าคุณรับผิดชอบ Car ให้สร้าง:

```
src/
├── models/
│   └── Car.js
│
└── routes/
    └── car.routes.js
```

### สร้าง Model

สร้างไฟล์ `src/models/Car.js`:

```js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: Number,
});

const Car = mongoose.model("Car", carSchema);
export default Car;
```

> หมายเหตุ: Field ของแต่ละ resource ให้กำหนดตามข้อมูลที่โปรเจกต์ต้องการจริง

### สร้าง Routes

สร้างไฟล์ `src/routes/car.routes.js`:

```js
import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
```

### Register Route ใน server.js

หลังจากสร้าง Route แล้ว ต้องนำ Route มาเชื่อมกับ `server.js`:

```js
import carRoutes from "./routes/car.routes.js";

app.use("/api/cars", carRoutes);
```

ดังนั้น `/api/cars` จะเชื่อมกับ `src/routes/car.routes.js`

### ทำความเข้าใจ Route

ถ้าใน `server.js` มี:

```js
app.use("/api/cars", carRoutes);
```

และใน `car.routes.js` มี:

```js
router.get("/");
```

URL ที่ได้คือ `GET /api/cars`

ถ้ามี:

```js
router.get("/:id");
```

URL จะเป็น `GET /api/cars/:id` เช่น `GET /api/cars/68abc123`

---

## ทดสอบ POST

เปิด Thunder Client → เลือก **POST** → URL:

```
http://localhost:5001/api/cars
```

เลือก Body → JSON:

```json
{
  "brand": "Toyota",
  "model": "Yaris",
  "price": 1200
}
```

กด Send — ถ้าสำเร็จ API จะคืนข้อมูลที่ถูกสร้างขึ้นมา พร้อม `_id`:

```json
{
  "_id": "68abc123",
  "brand": "Toyota",
  "model": "Yaris",
  "price": 1200,
  "__v": 0
}
```

## ทดสอบ GET

เลือก **GET** → URL:

```
http://localhost:5001/api/cars
```

กด Send — จะได้ข้อมูลทั้งหมด:

```json
[
  {
    "_id": "68abc123",
    "brand": "Toyota",
    "model": "Yaris",
    "price": 1200
  }
]
```

## ทดสอบ PATCH

Copy `_id` ของข้อมูลที่ต้องการแก้ เช่น `68abc123`

เลือก **PATCH** → URL:

```
http://localhost:5001/api/cars/68abc123
```

Body:

```json
{ "price": 1500 }
```

กด Send — ข้อมูล `price` จะถูกเปลี่ยนจาก `1200` เป็น `1500`

## ทดสอบ DELETE

เลือก **DELETE** → URL:

```
http://localhost:5001/api/cars/68abc123
```

กด Send — ข้อมูลนั้นจะถูกลบออกจาก MongoDB

---

## Git Workflow

แต่ละคนต้องสร้าง Branch ของตัวเอง — **อย่าทำงานตรงบน main**

ตัวอย่าง:

```bash
git checkout -b feature/car-api
git checkout -b feature/guide-api
git checkout -b feature/user-api
```

### หลังทำงานเสร็จ

ตรวจสอบไฟล์ที่เปลี่ยน:

```bash
git status
```

เพิ่มไฟล์และ commit:

```bash
git add .
git commit -m "add car CRUD API"
```

Push:

```bash
git push -u origin feature/car-api
```

จากนั้นไปที่ GitHub และเปิด **Pull Request** จาก `feature/car-api` เข้า `main`

---

## ก่อนเปิด Pull Request

ตรวจสอบว่า:

- [ ] Server start ได้
- [ ] MongoDB connect ได้
- [ ] POST ทำงาน
- [ ] GET ทำงาน
- [ ] PATCH ทำงาน
- [ ] DELETE ทำงาน
- [ ] Test ด้วย Thunder Client แล้ว
- [ ] ข้อมูลถูกเพิ่ม/แก้ไข/ลบใน MongoDB ถูกต้อง
- [ ] ไม่มี `.env` ใน commit
- [ ] ไม่มี `node_modules` ใน commit
- [ ] ทำงานอยู่บน branch ของตัวเอง

---

## สิ่งที่ไม่ควรแก้

ถ้าไม่ได้จำเป็น อย่าแก้:

- `src/config/db.js`
- อย่าเปลี่ยน `MONGO_URI` ของทีม

และ:

- ไม่ต้องสร้าง MongoDB database ใหม่เอง
- ไม่ต้องติดตั้ง Express/Mongoose ใหม่
- ไม่ต้องสร้าง Backend project ใหม่

เพียง Clone repository นี้แล้วทำ Resource ของตัวเอง

---

## ถ้าเจอปัญหา

**`Cannot GET /api/cars`**

ตรวจสอบว่า:

- มี `car.routes.js`
- มี `router.get("/")`
- มีการ import ใน `server.js`
- มี `app.use("/api/cars", carRoutes);`

**MongoDB connection error**

ตรวจสอบ `.env` ว่ามี `MONGO_URI=...` และไม่มี typo

**`Cannot find module`**

ลอง:

```bash
npm install
```

และตรวจสอบ path เช่น `import Car from "../models/Car.js";`

**Port ถูกใช้งานอยู่**

ตรวจสอบว่าไม่มี Backend ตัวอื่นกำลังใช้ port `5001` — ปิด server เดิมก่อน หรือแจ้งทีมก่อนเปลี่ยน Port

---

## สรุป Workflow

```
Clone Repository
        ↓
   npm install
        ↓
    สร้าง .env
        ↓
  ใส่ MONGO_URI
        ↓
    npm run dev
        ↓
สร้าง Branch ของตัวเอง
        ↓
    สร้าง Model
        ↓
   สร้าง Routes
        ↓
     ทำ CRUD
        ↓
Test ด้วย Thunder Client
        ↓
   ตรวจ MongoDB
        ↓
      Commit
        ↓
       Push
        ↓
  Pull Request
        ↓
      Review
        ↓
   Merge เข้า main
```

---

## API Architecture

ภาพรวมของระบบ:

```
              Frontend React
                    │
                    │ fetch()
                    ▼
            Express Backend
                    │
      ┌─────────────┼─────────────┐
      │             │             │
      ▼             ▼             ▼
Accommodation      Cars         Guides
   Routes         Routes        Routes
      │             │             │
      ▼             ▼             ▼
  Mongoose       Mongoose      Mongoose
      │             │             │
      └─────────────┼─────────────┘
                     ▼
                  MongoDB
```

แต่ละคนรับผิดชอบ Resource ของตัวเอง แต่ทุกคนใช้ Backend และ MongoDB ของ Team 8 ร่วมกัน

API paths โดยรวม:

```
GET  /api/accommodations
POST /api/accommodations

GET  /api/cars
POST /api/cars

GET  /api/bookings
POST /api/bookings

GET  /api/provinces

GET  /api/guides
POST /api/guides

GET  /api/users
POST /api/users
```

ตัวอย่างชุดข้อมูลที่ทำไว้:

```json
{
  "name": "Siwat",
  "email": "siwat@example.com",
  "phone": "0912345678"
}
```

แต่ละคนสามารถเพิ่ม/แก้ไข data schema ของตัวเองได้ใน `models/xxxx.js` ของแต่ละคน เช่น:

```js
const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: Number,
});
```

สามารถระบุเพิ่มหรือแก้ไข ให้เป็นข้อมูลแบบที่ต้องการได้ เช่น:

```js
const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  color: String,
  years: Number,
  transmition: String,
});
```
