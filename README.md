# GO-THAILAND Backend — Team 8

Backend API สำหรับโปรเจกต์ **GO-THAILAND**

> 📋 **Data Schema Documentation:** ดูเอกสารสรุปโครงสร้างข้อมูลและตัวอย่าง JSON (Accommodation, Car, Booking, Province) ได้ที่ **[DataSchema.md](./DataSchema.md)**

## Main API Path

```
https://gothailand-api.onrender.com
```

## Routes API

```
https://gothailand-api.onrender.com/api/accommodations
https://gothailand-api.onrender.com/api/cars
https://gothailand-api.onrender.com/api/bookings
https://gothailand-api.onrender.com/api/provinces
https://gothailand-api.onrender.com/api/guides
https://gothailand-api.onrender.com/api/users
```

Backend นี้ใช้สำหรับจัดการข้อมูลของ:

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

- **Node.js** — Runtime สำหรับรัน JavaScript ฝั่ง Backend
- **Express.js** — สร้าง REST API
- **MongoDB** — Database
- **Mongoose** — เชื่อม Node.js กับ MongoDB
- **CORS** — อนุญาตให้ Frontend เรียก Backend
- **dotenv** — อ่านค่าจาก `.env`

---

## Project Structure

```
Team8-Backend/
│
├── src/
│   ├── server.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── Accommodation.js
│   │   ├── Car.js
│   │   ├── Guide.js
│   │   └── User.js
│   │
│   └── routes/
│       ├── accommodation.routes.js
│       ├── car.routes.js
│       ├── guide.routes.js
│       └── user.routes.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

### หน้าที่ของแต่ละ Folder

**`src/server.js`**
เป็นไฟล์หลักของ Backend ทำหน้าที่:

- สร้าง Express server
- เปิด CORS
- เปิด JSON parser
- เชื่อม Routes
- เชื่อม MongoDB
- เปิด Port

> ⚠️ ไม่ควรแก้ไฟล์นี้โดยไม่จำเป็น

**`src/config/db.js`**
ใช้สำหรับเชื่อมต่อ MongoDB — ไม่ต้องแก้ไฟล์นี้

**`src/models/`**
เก็บ Model ของแต่ละ resource เช่น

```js
const accommodationSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
});
```

**`src/routes/`**
เก็บ API Routes ของแต่ละ resource กำหนดว่า `GET` `POST` `PATCH` `DELETE` ทำงานอย่างไร

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
```

ให้สร้าง `.env` จาก `.env.example`:

```bash
cp .env.example .env
```

จากนั้นเปิด `.env` แล้วใส่ค่า `MONGO_URI` ที่ได้รับจาก Team 8:

```env
PORT=5001
MONGO_URI=mongodb+srv://...
```

> ⚠️ **สำคัญ**
>
> - ห้าม commit `.env` ขึ้น GitHub (`.env` ถูกใส่ไว้ใน `.gitignore` แล้ว)
> - ห้ามทำ `git add .env`
> - ห้ามส่ง MongoDB connection string ลง GitHub

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
GET    /api/provinces       # ดึงรายการจังหวัดทั้งหมด (77 จังหวัด)
GET    /api/provinces/:id   # ดึงข้อมูลจังหวัดตาม ID หรือชื่อ
```

**Guide**

```
POST   /api/guides
GET    /api/guides
PATCH  /api/guides/:id
DELETE /api/guides/:id
```

**User**

```
POST   /api/users
GET    /api/users
PATCH  /api/users/:id
DELETE /api/users/:id
```

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
