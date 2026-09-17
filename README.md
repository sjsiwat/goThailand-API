### GO-THAILAND Backend

### MAIN API PATH

https://gothailand-api.onrender.com

### routes API

https://gothailand-api.onrender.com/api/accommodations
https://gothailand-api.onrender.com/api/cars
https://gothailand-api.onrender.com/api/guides
https://gothailand-api.onrender.com/api/users

Backend API สำหรับโปรเจกต์ GO-THAILAND — Team 8

Backend นี้ใช้สำหรับจัดการข้อมูลของ:

- 🏨 Accommodation
- 🚗 Car
- 🧑‍🏫 Guide
- 👤 User

⸻

1. Tech Stack

โปรเจกต์นี้ใช้:

- Node.js — Runtime สำหรับรัน JavaScript ฝั่ง Backend
- Express.js — สร้าง REST API
- MongoDB — Database
- Mongoose — เชื่อม Node.js กับ MongoDB
- CORS — อนุญาตให้ Frontend เรียก Backend
- dotenv — อ่านค่าจาก .env

⸻

2. Project Structure

โครงสร้างหลักของ Backend:

Team8-Backend/
│
├── src/
│ │
│ ├── server.js
│ │
│ ├── config/
│ │ └── db.js
│ │
│ ├── models/
│ │ ├── Accommodation.js
│ │ ├── Car.js
│ │ ├── Guide.js
│ │ └── User.js
│ │
│ └── routes/
│ ├── accommodation.routes.js
│ ├── car.routes.js
│ ├── guide.routes.js
│ └── user.routes.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json

หน้าที่ของแต่ละ Folder

src/server.js

เป็นไฟล์หลักของ Backend

ทำหน้าที่:

- สร้าง Express server
- เปิด CORS
- เปิด JSON parser
- เชื่อม Routes
- เชื่อม MongoDB
- เปิด Port

ไม่ควรแก้ไฟล์นี้โดยไม่จำเป็น

⸻

src/config/db.js

ใช้สำหรับเชื่อมต่อ MongoDB

ไม่ต้องแก้ไฟล์นี้

⸻

src/models/

เก็บ Model ของแต่ละ resource

ตัวอย่าง:

models/
├── Accommodation.js
├── Car.js
├── Guide.js
└── User.js

Model มีหน้าที่กำหนดว่า Document ใน MongoDB จะมีข้อมูลอะไรบ้าง

ตัวอย่าง:

const accommodationSchema = new mongoose.Schema({
name: String,
location: String,
price: Number
});

⸻

src/routes/

เก็บ API Routes ของแต่ละ resource

ตัวอย่าง:

routes/
├── accommodation.routes.js
├── car.routes.js
├── guide.routes.js
└── user.routes.js

ใน Route จะกำหนดว่า:

GET
POST
PATCH
DELETE

ทำงานอย่างไร

⸻

3. Clone Repository

เปิด Terminal ใน VS Code หรือ Terminal ของเครื่อง

ไปยัง folder ที่ต้องการเก็บ project เช่น:

cd ~/Documents/GitHub/JSD13

จากนั้น Clone:

git clone <BACKEND_REPOSITORY_URL>

ตัวอย่าง:

git clone https://github.com/xxxxx/Team8-Backend.git

เข้า folder:

cd Team8-Backend

ตรวจสอบว่าอยู่ใน project ถูกต้อง:

pwd

และ:

ls

ควรเห็นประมาณ:

README.md
package.json
package-lock.json
src
.env.example
.gitignore

⸻

4. Install Dependencies

หลังจาก Clone แล้ว ต้องติดตั้ง packages ก่อน

รัน:

npm install

คำสั่งนี้จะอ่าน package.json แล้วติดตั้ง dependencies ให้

หลังจากติดตั้งเสร็จควรมี:

node_modules/

ไม่ต้อง commit node_modules ขึ้น GitHub

เพราะมีอยู่ใน .gitignore

⸻

5. ตั้งค่า .env

ไฟล์ .env ใช้เก็บค่าที่ไม่ควรใส่ใน GitHub เช่น MongoDB connection string

ใน repository จะมีไฟล์:

.env.example

ตัวอย่าง:

PORT=5001
MONGO_URI=your_mongodb_connection_string

ให้สร้าง .env จาก .env.example

cp .env.example .env

จากนั้นเปิด:

.env

แล้วใส่ค่า MONGO_URI ที่ได้รับจาก Team 8

ตัวอย่าง:

PORT=5001
MONGO_URI=mongodb+srv://...

⚠️ สำคัญ

ห้าม commit .env ขึ้น GitHub

.env ถูกใส่ไว้ใน .gitignore แล้ว

ห้ามทำ:

git add .env

ห้ามส่ง MongoDB connection string ลง GitHub

⸻

6. Start Backend

ใช้คำสั่ง:

npm run dev

ถ้าทุกอย่างถูกต้อง จะเห็นประมาณ:

Go THAILAND Server running on http://localhost:5001 ✅
MongoDB connected

แปลว่า:

Express ✅
MongoDB ✅
Backend ✅

⸻

7. ทดสอบว่า Server ทำงาน

เปิด Browser หรือ Thunder Client

ไปที่:

http://localhost:5001/

ควรได้:

{
"message": "GO-THAILAND API is running"
}

ถ้าได้แบบนี้ แสดงว่า Backend ทำงานแล้ว

⸻

8. ใช้ Thunder Client ทดสอบ API

แนะนำให้ใช้ Thunder Client ใน VS Code

ติดตั้ง:

1. เปิด VS Code
2. เปิด Extensions
3. ค้นหา Thunder Client
4. Install

ใช้ Thunder Client เพื่อทดสอบ:

GET
POST
PATCH
DELETE

โดยไม่ต้องใช้ Frontend

⸻

9. Backend API Structure

Backend ใช้ REST API

Base URL:

http://localhost:5001

Accommodation

POST /api/accommodations
GET /api/accommodations
PATCH /api/accommodations/:id
DELETE /api/accommodations/:id

Car

POST /api/cars
GET /api/cars
PATCH /api/cars/:id
DELETE /api/cars/:id

Guide

POST /api/guides
GET /api/guides
PATCH /api/guides/:id
DELETE /api/guides/:id

User

POST /api/users
GET /api/users
PATCH /api/users/:id
DELETE /api/users/:id

⸻

10. งานของแต่ละคน

แต่ละคนรับผิดชอบ Resource ของตัวเอง

Resource Owner
Accommodation Siwat
Car Team Member A
Guide Team Member B
User Team Member C

แต่ละคนต้องทำ:

1. Model
2. Routes
3. POST
4. GET
5. PATCH
6. DELETE
7. Test API
8. Add data to MongoDB

⸻

11. ตัวอย่างงานของ Car

ถ้าคุณรับผิดชอบ Car ให้สร้าง:

src/
├── models/
│ └── Car.js
│
└── routes/
└── car.routes.js

⸻

12. สร้าง Model

สร้างไฟล์:

src/models/Car.js

ตัวอย่าง:

import mongoose from "mongoose";
const carSchema = new mongoose.Schema({
brand: String,
model: String,
price: Number
});
const Car = mongoose.model("Car", carSchema);
export default Car;

หมายเหตุ: Field ของแต่ละ resource ให้กำหนดตามข้อมูลที่โปรเจกต์ต้องการจริง

⸻

13. สร้าง Routes

สร้าง:

src/routes/car.routes.js

ตัวอย่างโครงสร้าง:

import express from "express";
import Car from "../models/Car.js";
const router = express.Router();
// POST
router.post("/", async (req, res) => {
try {
const car = await Car.create(req.body);
res.status(201).json(car);
} catch (error) {
res.status(500).json({
message: error.message
});
}
});
// GET
router.get("/", async (req, res) => {
try {
const cars = await Car.find();
res.json(cars);
} catch (error) {
res.status(500).json({
message: error.message
});
}
});
// PATCH
router.patch("/:id", async (req, res) => {
try {
const car = await Car.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);
if (!car) {
return res.status(404).json({
message: "Car not found"
});
}
res.json(car);
} catch (error) {
res.status(500).json({
message: error.message
});
}
});
// DELETE
router.delete("/:id", async (req, res) => {
try {
const car = await Car.findByIdAndDelete(
req.params.id
);
if (!car) {
return res.status(404).json({
message: "Car not found"
});
}
res.json({
message: "Car deleted successfully"
});
} catch (error) {
res.status(500).json({
message: error.message
});
}
});
export default router;

⸻

14. Register Route ใน server.js

หลังจากสร้าง Route แล้ว ต้องนำ Route มาเชื่อมกับ server.js

เพิ่ม:

import carRoutes from "./routes/car.routes.js";

และ:

app.use("/api/cars", carRoutes);

ดังนั้น:

/api/cars

จะเชื่อมกับ:

src/routes/car.routes.js

⸻

15. ทำความเข้าใจ Route

ถ้าใน server.js มี:

app.use("/api/cars", carRoutes);

และใน car.routes.js มี:

router.get("/");

URL ที่ได้คือ:

GET /api/cars

ถ้ามี:

router.get("/:id");

URL จะเป็น:

GET /api/cars/:id

ตัวอย่าง:

GET /api/cars/68abc123

⸻

16. ทดสอบ POST

เปิด Thunder Client

เลือก:

POST

URL:

http://localhost:5001/api/cars

เลือก:

Body
→ JSON

ตัวอย่าง:

{
"brand": "Toyota",
"model": "Yaris",
"price": 1200
}

กด:

Send

ถ้าสำเร็จ API จะคืนข้อมูลที่ถูกสร้างขึ้นมา พร้อม \_id

ตัวอย่าง:

{
"\_id": "68abc123",
"brand": "Toyota",
"model": "Yaris",
"price": 1200,
"\_\_v": 0
}

⸻

17. ทดสอบ GET

เลือก:

GET

URL:

http://localhost:5001/api/cars

กด:

Send

จะได้ข้อมูลทั้งหมด:

[
{
"_id": "68abc123",
"brand": "Toyota",
"model": "Yaris",
"price": 1200
}
]

⸻

18. ทดสอบ PATCH

Copy \_id ของข้อมูลที่ต้องการแก้

ตัวอย่าง:

68abc123

เลือก:

PATCH

URL:

http://localhost:5001/api/cars/68abc123

Body:

{
"price": 1500
}

กด:

Send

ข้อมูล price จะถูกเปลี่ยนจาก:

1200

เป็น:

1500

⸻

19. ทดสอบ DELETE

เลือก:

DELETE

URL:

http://localhost:5001/api/cars/68abc123

กด:

Send

ข้อมูลนั้นจะถูกลบออกจาก MongoDB

⸻

20. Git Workflow

แต่ละคนต้องสร้าง Branch ของตัวเอง

อย่าทำงานตรงบน main

ตัวอย่าง Car:

git checkout -b feature/car-api

Guide:

git checkout -b feature/guide-api

User:

git checkout -b feature/user-api

⸻

21. หลังทำงานเสร็จ

ตรวจสอบไฟล์ที่เปลี่ยน:

git status

เพิ่มไฟล์:

git add .

Commit:

git commit -m "add car CRUD API"

Push:

git push -u origin feature/car-api

จากนั้นไปที่ GitHub และเปิด:

Pull Request

จาก:

feature/car-api

เข้า:

main

⸻

22. ก่อนเปิด Pull Request

ตรวจสอบว่า:

- Server start ได้
- MongoDB connect ได้
- POST ทำงาน
- GET ทำงาน
- PATCH ทำงาน
- DELETE ทำงาน
- Test ด้วย Thunder Client แล้ว
- ข้อมูลถูกเพิ่ม/แก้ไข/ลบใน MongoDB ถูกต้อง
- ไม่มี .env ใน commit
- ไม่มี node_modules ใน commit
- ทำงานอยู่บน branch ของตัวเอง

⸻

23. สิ่งที่ไม่ควรแก้

ถ้าไม่ได้จำเป็น อย่าแก้:

src/config/db.js

และอย่าเปลี่ยน:

MONGO_URI

ของทีม

ไม่ต้องสร้าง MongoDB database ใหม่เอง

ไม่ต้องติดตั้ง Express/Mongoose ใหม่

ไม่ต้องสร้าง Backend project ใหม่

เพียง Clone repository นี้แล้วทำ Resource ของตัวเอง

⸻

24. ถ้าเจอปัญหา

Cannot GET /api/cars

ตรวจสอบว่า:

1. มี car.routes.js
2. มี router.get("/")
3. มีการ import ใน server.js
4. มี:

app.use("/api/cars", carRoutes);

⸻

MongoDB connection error

ตรวจสอบ:

.env

ว่ามี:

MONGO_URI=...

และไม่มี typo

⸻

Cannot find module

ลอง:

npm install

และตรวจสอบ path เช่น:

import Car from "../models/Car.js";

⸻

Port ถูกใช้งานอยู่

ตรวจสอบว่าไม่มี Backend ตัวอื่นกำลังใช้:

5001

ปิด server เดิมก่อน หรือแจ้งทีมก่อนเปลี่ยน Port

⸻

25. สรุป Workflow

ทุกคนทำตามขั้นตอนนี้:

1. Clone Repository
   ↓
2. npm install
   ↓
3. สร้าง .env
   ↓
4. ใส่ MONGO_URI
   ↓
5. npm run dev
   ↓
6. สร้าง Branch ของตัวเอง
   ↓
7. สร้าง Model
   ↓
8. สร้าง Routes
   ↓
9. ทำ CRUD
   ↓
10. Test ด้วย Thunder Client
    ↓
11. ตรวจ MongoDB
    ↓
12. Commit
    ↓
13. Push
    ↓
14. Pull Request
    ↓
15. Review
    ↓
16. Merge เข้า main

17. API Architecture

ภาพรวมของระบบ:

                 Frontend React
                       │
                       │ fetch()
                       ▼
              Express Backend
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼

Accommodation Cars Guides
Routes Routes Routes
│ │ │
▼ ▼ ▼
Mongoose Mongoose Mongoose
│ │ │
└────────────┼────────────┘
▼
MongoDB

แต่ละคนรับผิดชอบ Resource ของตัวเอง แต่ทุกคนใช้ Backend และ MongoDB ของ Team 8 ร่วมกัน

### path api จะประมาณนี้

GET /api/accommodations
POST /api/accommodations

GET /api/cars
POST /api/cars

GET /api/guides
POST /api/guides

GET /api/users
POST /api/users

ตย. ชุดข้อมูลที่ทำไว้ {
"name": "Siwat",
"email": "siwat@example.com",
"phone": "0912345678"
}
แต่ละคนสามารถเพิ่มแก้ไข data schema ของตัวเองได้ใน models/xxxx ไฟล์ของแต่ละคน
เช่น
const carSchema = new mongoose.Schema({
brand: String,
model: String,
price: Number,
});

สามารถระบุเพิ่มหรือแก้ไข ให้เป็นข้อมูลแบบที่ต้องการได้

const carSchema = new mongoose.Schema({
brand: String,
model: String,
color: String,
years: Number,
transmition: String,
});
