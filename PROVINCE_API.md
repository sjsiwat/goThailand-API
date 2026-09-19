# 🗺️ Go Thailand — Province & SVG Map API Documentation

คู่มือการใช้งาน REST API สำหรับ **ข้อมูล 77 จังหวัดและรูปทรงแผนที่เวกเตอร์ SVG (77 Provinces & SVG Vectors)** อย่างละเอียด ครอบคลุมทั้ง Schema, Endpoints, ตัวอย่าง Request/Response และโค้ดตัวอย่างสำหรับ Frontend

---

## 📌 สารบัญ (Table of Contents)
1. [ภาพรวมของ Service (Overview)](#1-ภาพรวมของ-service-overview)
2. [โครงสร้างข้อมูล (Data Schema)](#2-โครงสร้างข้อมูล-data-schema)
3. [สรุป Endpoints ทั้งหมด (Endpoints Summary)](#3-สรุป-endpoints-ทั้งหมด-endpoints-summary)
4. [รายละเอียดการเรียกใช้งานแต่ละ Endpoint](#4-รายละเอียดการเรียกใช้งานแต่ละ-endpoint)
   - [4.1 ดึงข้อมูลจังหวัดทั้งหมด (`GET /api/provinces`)](#41-ดึงข้อมูลจังหวัดทั้งหมด-get-apiprovinces)
   - [4.2 ดึงเฉพาะข้อมูล Vector รวม (`GET /api/provinces/vectors`)](#42-ดึงเฉพาะข้อมูล-vector-รวม-get-apiprovincesvectors)
   - [4.3 ดึงรูปภาพ SVG แผนที่ตรงๆ (`GET /api/provinces/:id/svg`)](#43-ดึงรูปภาพ-svg-แผนที่ตรงๆ-get-apiprovincesidsvg)
   - [4.4 ดึงข้อมูลจังหวัดเดี่ยว (`GET /api/provinces/:id`)](#44-ดึงข้อมูลจังหวัดเดี่ยว-get-apiprovincesid)
   - [4.5 สร้างข้อมูลจังหวัดใหม่ (`POST /api/provinces`)](#45-สร้างข้อมูลจังหวัดใหม่-post-apiprovinces)
   - [4.6 อัปเดตข้อมูลจังหวัด (`PATCH /api/provinces/:id`)](#46-อัปเดตข้อมูลจังหวัด-patch-apiprovincesid)
   - [4.7 ลบข้อมูลจังหวัด (`DELETE /api/provinces/:id`)](#47-ลบข้อมูลจังหวัด-delete-apiprovincesid)
5. [การจำแนก 6 ภูมิภาค (77 จังหวัด)](#5-การจำแนก-6-ภูมิภาค-77-จังหวัด)
6. [ตัวอย่างการนำไปใช้ใน Frontend (Code Snippets)](#6-ตัวอย่างการนำไปใช้ใน-frontend-code-snippets)

---

## 1. ภาพรวมของ Service (Overview)

API ชุดนี้ถูกออกแบบมาเพื่อให้บริการข้อมูล 77 จังหวัดของประเทศไทย โดยมีจุดเด่นคือ:
* **มีพิกัด SVG ครบทั้ง 77 จังหวัด:** แต่ละจังหวัดมีข้อมูล `viewBox`, `width`, `height`, และเส้นพาธ `d`
* **คืนค่าภาพ SVG ตรงๆ ได้ทันที:** มี Endpoint เฉพาะสำหรับใส่ในแท็ก `<img src="..." />` ไม่ต้องเขียนโค้ดแปลง SVG เอง
* **มีข้อมูลท่องเที่ยวเชิงลึก:** ครบทั้งคำขวัญ (`slogan`), ไฮไลต์ (`highlights`), ของกินเด่น (`signatureFood`), แหล่ง Unseen และเดือนที่น่าเที่ยว
* **เปิด CORS (`Access-Control-Allow-Origin: *`):** เรียกใช้งานได้จากทุกโดเมน ทั้ง `localhost` และ Production

### 🌐 Base URLs
* **Local Development:** `http://localhost:5001`
* **Production (Render):** `https://gothailand-api.onrender.com` *(หรือ `https://gothailand-31-po.onrender.com`)*

---

## 2. โครงสร้างข้อมูล (Data Schema)

ข้อมูลจัดเก็บในคอลเลกชัน `provinces` ของ MongoDB

| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | บังคับ (Required) | ค่าเริ่มต้น / ข้อจำกัด | คำอธิบาย |
| :--- | :--- | :---: | :--- | :--- |
| `_id` | `ObjectId` | ❌ | MongoDB Auto ID | รหัส Primary Key ของ Document |
| `id` | `Number` | ✅ | Unique, Indexed | รหัสประจำจังหวัดตามมาตรฐาน มท. เช่น `50`, `10` |
| `code` | `String` | ❌ | Trim | รหัสจังหวัดแบบข้อความ เช่น `"50"`, `"10"` |
| `slug` | `String` | ✅ | Unique, Indexed | URL-friendly Slug เช่น `"chiang-mai"`, `"bangkok"` |
| `name_th` | `String` | ✅ | Trim | ชื่อภาษาไทยทางการ เช่น `"เชียงใหม่"` |
| `name_en` | `String` | ✅ | Trim | ชื่อภาษาอังกฤษทางการ เช่น `"Chiang Mai"` |
| `nameTh` | `String` | ❌ | Trim | *Alias ชื่อภาษาไทยสำหรับ Frontend* |
| `nameEn` | `String` | ❌ | Trim | *Alias ชื่อภาษาอังกฤษสำหรับ Frontend* |
| `name` | `String` | ❌ | Trim | *Alias ภาษาอังกฤษทั่วไป* |
| `region` | `String` | ✅ | Enum: `'north'`, `'central'`, `'isan'`, `'south'`, `'east'`, `'west'` | รหัสภูมิภาค 6 ภาค (ตัวพิมพ์เล็ก) |
| `region_th` | `String` | ✅ | Trim | ภูมิภาคภาษาไทย เช่น `"เหนือ"`, `"กลาง"`, `"อีสาน"` |
| `slogan` | `String` | ❌ | `""` | คำขวัญประจำจังหวัด |
| `summary` | `String` | ❌ | `""` | สรุปเสน่ห์และจุดเด่นของจังหวัด |
| `highlights` | `[String]` | ❌ | `[]` | สถานที่ท่องเที่ยวสำคัญ 3–5 แห่ง |
| `signatureFood` | `[String]` | ❌ | `[]` | อาหารและของฝากขึ้นชื่อ |
| `unseenGems` | `[String]` | ❌ | `[]` | สถานที่ท่องเที่ยวแบบ Unseen |
| `bestMonths` | `[String]` | ❌ | `[]` | เดือนที่เหมาะสมแก่การท่องเที่ยว |
| `travelTips` | `String` | ❌ | `""` | คำแนะนำการเดินทางประจำภาค |
| `vibes` | `[String]` | ❌ | `[]` | แฮชแท็กและบรรยากาศการท่องเที่ยว |
| `vectorData` | `Object` | ❌ | Sub-document | โครงสร้างสำหรับวาดแผนที่ SVG (ดูตารางย่อย) |
| `createdAt` | `Date` | ❌ | Auto timestamp | วันและเวลาที่สร้างข้อมูล |
| `updatedAt` | `Date` | ❌ | Auto timestamp | วันและเวลาที่แก้ไขข้อมูลล่าสุด |

### โครงสร้างย่อย `vectorData` (SVG Structure)
| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | ตัวอย่าง | คำอธิบาย |
| :--- | :--- | :--- | :--- |
| `viewBox` | `String` | `"2905 9 375 708"` | กรอบพิกัดเฉพาะของจังหวัด (`min-x min-y width height`) |
| `width` | `Number` | `375` | ความกว้างของรูปทรงแผนที่ |
| `height` | `Number` | `708` | ความสูงของรูปทรงแผนที่ |
| `d` | `String` | `"m3250.41 49.22..."` | SVG Path Data สำหรับเรนเดอร์รูปทรง |

---

## 3. สรุป Endpoints ทั้งหมด (Endpoints Summary)

| Method | Endpoint | Query Parameters | หน้าที่หลัก |
| :---: | :--- | :--- | :--- |
| `GET` | `/api/provinces` | `?region=`, `?search=`, `?q=`, `?format=array` | ดึงข้อมูลจังหวัดทั้งหมด คืนค่า JSON |
| `GET` | `/api/provinces/vectors` | `?region=` | ดึงเฉพาะข้อมูล Vector สำหรับวาดแผนที่รวม (Payload เบา) |
| `GET` | `/api/provinces/:id/svg` | `?fill=`, `?stroke=`, `?strokeWidth=` | **คืนรูปภาพ SVG ตรงๆ (`image/svg+xml`) สำหรับใส่แท็ก `<img>`** |
| `GET` | `/api/provinces/:id` | - | ดึงข้อมูลจังหวัดเดี่ยว (รองรับทั้ง Slug, ID ตัวเลข, และรหัส ISO เช่น `TH-50`) |
| `POST` | `/api/provinces` | - | เพิ่มข้อมูลจังหวัดใหม่ |
| `PATCH` | `/api/provinces/:id` | - | แก้ไข/อัปเดตข้อมูลจังหวัด |
| `DELETE` | `/api/provinces/:id` | - | ลบข้อมูลจังหวัด |

---

## 4. รายละเอียดการเรียกใช้งานแต่ละ Endpoint

### 4.1 ดึงข้อมูลจังหวัดทั้งหมด (`GET /api/provinces`)
ดึงรายชื่อจังหวัดทั้งหมด พร้อมรองรับการกรองตามภูมิภาคและการค้นหาคีย์เวิร์ด

* **Query Parameters:**
  * `region`: กรองตามภาคภาษาอังกฤษ (`north`, `central`, `isan`, `south`, `east`, `west`) หรือภาษาไทย (`เหนือ`, `กลาง`, `อีสาน`, `ใต้`, `ตะวันออก`, `ตะวันตก`)
  * `search` หรือ `q`: ค้นหาชื่อจังหวัดภาษาไทย, ภาษาอังกฤษ หรือ Slug
  * `format=array`: คืนค่าเป็น Array ตรงๆ (ถ้าไม่ใส่จะคืนรูปแบบ `{ success, count, provinces }`)

* **ตัวอย่างการเรียก:**
  ```http
  GET /api/provinces?region=north
  GET /api/provinces?search=เชียง
  GET /api/provinces?q=phuket&format=array
  ```

* **ตัวอย่าง Response (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 1,
    "provinces": [
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
        "slogan": "ดอยสุเทพเป็นศรี ประเพณีเป็นสง่า บุปผาชาติตระการตา นามระบือล้ำ ค่านครพิงค์",
        "summary": "ศูนย์กลางวัฒนธรรมล้านนา โอบล้อมด้วยเทือกเขาสูง คาเฟ่ระดับสากล และธรรมชาติอันเงียบสงบ",
        "highlights": ["ดอยอินทนนท์", "นิมมาน", "แม่กำปอง"],
        "signatureFood": ["ข้าวซอยไก่", "ไส้อั่วสมุนไพร"],
        "unseenGems": ["บ้านแม่แมะ เชียงดาว", "น้ำตกบัวตอง"],
        "bestMonths": ["พฤศจิกายน", "ธันวาคม", "มกราคม", "กุมภาพันธ์"],
        "travelTips": "แนะนำเดินทางช่วงฤดูหนาวและปลายฝนต้นหนาว เตรียมเสื้อกันหนาวสำหรับการขึ้นดอยสูง",
        "vibes": ["#เชียงใหม่", "#เที่ยวเชียงใหม่", "ทะเลหมอกและขุนเขา"],
        "vectorData": {
          "viewBox": "2905 9 375 708",
          "width": 375,
          "height": 708,
          "d": "m3250.41 49.22-6.52 2.61 1.3 6.52..."
        }
      }
    ]
  }
  ```

---

### 4.2 ดึงเฉพาะข้อมูล Vector รวม (`GET /api/provinces/vectors`)
ดึงเฉพาะฟิลด์ที่จำเป็นต่อการวาดแผนที่ (`id`, `code`, `slug`, `name_th`, `name_en`, `region`, `vectorData`) ช่วยลดขนาดข้อมูลที่ต้องส่งผ่านเครือข่ายลงได้มากกว่า 60% เหมาะสำหรับหน้า Interactive Map

* **Query Parameters:**
  * `region`: กรองตามภาคได้เหมือนเดิม (เช่น `?region=south`)

* **ตัวอย่างการเรียก:**
  ```http
  GET /api/provinces/vectors?region=south
  ```

---

### 4.3 ดึงรูปภาพ SVG แผนที่ตรงๆ (`GET /api/provinces/:id/svg`) ⭐
Endpoint พิเศษที่จะสร้างและส่งกลับเป็น **ไฟล์รูปภาพ SVG แท้จริง (`Content-Type: image/svg+xml`)** สามารถนำ URL ไปแปะลงในแท็ก `<img>` หรือ `background-image` ได้ทันที

* **Path Parameters:**
  * `:id`: รองรับทั้ง Slug (`chiang-mai`, `phuket`), รหัสตัวเลข (`50`, `83`) หรือรหัส ISO (`TH-50`, `TH-83`)

* **Query Parameters (ปรับแต่งสีได้อิสระ):**
  * `fill`: สีพื้นหลังของแผนที่ (Default: `#2563eb`) สามารถใส่ Hex Code ได้ (เช่น `%230284c7`)
  * `stroke`: สีเส้นขอบแผนที่ (Default: `#1e3a8a`)
  * `strokeWidth`: ความหนาของเส้นขอบ (Default: `2`)

* **ตัวอย่างการใช้งานใน HTML/React:**
  ```html
  <!-- เรียกด้วยชื่อ Slug -->
  <img src="https://gothailand-api.onrender.com/api/provinces/chiang-mai/svg" alt="แผนที่เชียงใหม่" />

  <!-- เรียกด้วยรหัส ISO -->
  <img src="https://gothailand-api.onrender.com/api/provinces/TH-50/svg" alt="เชียงใหม่" />

  <!-- ปรับสีฟ้าใสและเส้นขอบเข้ม -->
  <img src="https://gothailand-api.onrender.com/api/provinces/phuket/svg?fill=%2338bdf8&stroke=%230284c7&strokeWidth=2" />
  ```

* **HTTP Headers ที่ส่งกลับ:**
  ```http
  Content-Type: image/svg+xml; charset=utf-8
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
  ```

---

### 4.4 ดึงข้อมูลจังหวัดเดี่ยว (`GET /api/provinces/:id`)
ค้นหาข้อมูลรายละเอียดครบทุกมิติของจังหวัดเดียว

* **Path Parameters:** รองรับ 3 รูปแบบ
  1. Slug เช่น `/api/provinces/bangkok`
  2. รหัสตัวเลข เช่น `/api/provinces/10`
  3. รหัส ISO เช่น `/api/provinces/TH-10`

* **ตัวอย่าง Response (`200 OK`):**
  ```json
  {
    "success": true,
    "province": {
      "id": 10,
      "code": "10",
      "slug": "bangkok",
      "name_th": "กรุงเทพมหานคร",
      "name_en": "Bangkok",
      "region": "central",
      "slogan": "กรุงเทพฯ ดุจเทพสร้าง เมืองศูนย์กลางการปกครอง...",
      "summary": "มหานครที่ไม่เคยหลับใหล ผสมผสานวัดวาอารามเก่าแก่...",
      "highlights": ["วัดพระแก้ว", "เยาวราช", "ไอคอนสยาม"],
      "signatureFood": ["ผัดไทย", "ต้มยำกุ้งแม่น้ำ"],
      "vectorData": { ... }
    }
  }
  ```

---

### 4.5 สร้างข้อมูลจังหวัดใหม่ (`POST /api/provinces`)
* **Endpoint:** `POST /api/provinces`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "id": 99,
    "code": "99",
    "slug": "demo-province",
    "name_th": "จังหวัดทดสอบ",
    "name_en": "Demo Province",
    "region": "central",
    "region_th": "กลาง",
    "slogan": "ทดสอบระบบ",
    "vectorData": {
      "viewBox": "0 0 500 500",
      "width": 500,
      "height": 500,
      "d": "M 10 10 L 100 100 Z"
    }
  }
  ```
* **Response:** `201 Created`

---

### 4.6 อัปเดตข้อมูลจังหวัด (`PATCH /api/provinces/:id`)
* **Endpoint:** `PATCH /api/provinces/:id`
* **Request Body (ส่งเฉพาะฟิลด์ที่ต้องการแก้ไข):**
  ```json
  {
    "slogan": "คำขวัญอัปเดตใหม่ล่าสุด",
    "highlights": ["สถานที่ท่องเที่ยวใหม่ 1", "สถานที่ท่องเที่ยวใหม่ 2"]
  }
  ```
* **Response:** `200 OK` พร้อมข้อมูลจังหวัดที่อัปเดตแล้ว

---

### 4.7 ลบข้อมูลจังหวัด (`DELETE /api/provinces/:id`)
* **Endpoint:** `DELETE /api/provinces/:id`
* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Province deleted successfully"
  }
  ```

---

## 5. การจำแนก 6 ภูมิภาค (77 จังหวัด)

| ภูมิภาค (`region`) | ภาคภาษาไทย (`region_th`) | จำนวน | รายชื่อจังหวัด |
| :--- | :--- | :---: | :--- |
| `north` | เหนือ | 9 | เชียงใหม่, ลำพูน, ลำปาง, อุตรดิตถ์, แพร่, น่าน, พะเยา, เชียงราย, แม่ฮ่องสอน |
| `central` | กลาง | 22 | กรุงเทพมหานคร, สมุทรปราการ, นนทบุรี, ปทุมธานี, พระนครศรีอยุธยา, อ่างทอง, ลพบุรี, สิงห์บุรี, ชัยนาท, สระบุรี, นครนายก, นครปฐม, สุพรรณบุรี, สมุทรสาคร, สมุทรสงคราม, เพชรบูรณ์, สุโขทัย, พิษณุโลก, พิจิตร, กำแพงเพชร, นครสวรรค์, อุทัยธานี |
| `isan` | อีสาน | 20 | นครราชสีมา, บุรีรัมย์, สุรินทร์, ศรีสะเกษ, อุบลราชธานี, ยโสธร, ชัยภูมิ, อำนาจเจริญ, บึงกาฬ, หนองบัวลำภู, ขอนแก่น, อุดรธานี, เลย, หนองคาย, มหาสารคาม, ร้อยเอ็ด, กาฬสินธุ์, สกลนคร, นครพนม, มุกดาหาร |
| `south` | ใต้ | 14 | ภูเก็ต, สุราษฎร์ธานี, สงขลา, กระบี่, นครศรีธรรมราช, พังงา, ตรัง, ชุมพร, ระนอง, พัทลุง, สตูล, ปัตตานี, ยะลา, นราธิวาส |
| `east` | ตะวันออก | 7 | ชลบุรี, ระยอง, จันทบุรี, ตราด, ฉะเชิงเทรา, ปราจีนบุรี, สระแก้ว |
| `west` | ตะวันตก | 5 | กาญจนบุรี, ตาก, เพชรบุรี, ประจวบคีรีขันธ์, ราชบุรี |
| **รวมทั้งหมด** | | **77** | |

---

## 6. ตัวอย่างการนำไปใช้ใน Frontend (Code Snippets)

### 6.1 ตัวอย่างที่ 1: นำ URL ภาพ SVG ไปใส่ใน React Component ตรงๆ
```tsx
export function ProvinceThumbnail({ slug = 'phuket' }) {
  // สั่งเปลี่ยนสีภาพตาม Theme ผ่าน Query Parameter ได้เลย
  const imageUrl = `https://gothailand-api.onrender.com/api/provinces/${slug}/svg?fill=%230284c7&stroke=%230369a1`;

  return (
    <div className="card">
      <img
        src={imageUrl}
        alt={`แผนที่จังหวัด ${slug}`}
        className="w-48 h-48 object-contain transition-transform hover:scale-110"
        loading="lazy"
      />
    </div>
  );
}
```

### 6.2 ตัวอย่างที่ 2: ดึงข้อมูลและเรนเดอร์ SVG Path ใน React
```tsx
import { useEffect, useState } from 'react';

export function ProvinceDetailView({ slug = 'chiang-mai' }) {
  const [province, setProvince] = useState<any>(null);

  useEffect(() => {
    fetch(`https://gothailand-api.onrender.com/api/provinces/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProvince(data.province);
      });
  }, [slug]);

  if (!province) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">{province.name_th} ({province.name_en})</h2>
      <p className="text-sm text-gray-500 italic mt-1">{province.slogan}</p>
      
      {/* วาดรูปทรงแผนที่ SVG */}
      <div className="my-6 flex justify-center">
        <svg
          viewBox={province.vectorData.viewBox}
          width={province.vectorData.width}
          height={province.vectorData.height}
          className="max-w-[260px] h-auto drop-shadow-md"
        >
          <path
            d={province.vectorData.d}
            fill="#0284c7"
            stroke="#0369a1"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-700">ไฮไลต์ท่องเที่ยว:</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {province.highlights?.map((item: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-medium">
              📍 {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 6.3 ตัวอย่างที่ 3: ค้นหาจังหวัดแบบ Autocomplete (Search Bar)
```ts
export async function searchProvinces(keyword: string) {
  const res = await fetch(
    `https://gothailand-api.onrender.com/api/provinces?search=${encodeURIComponent(keyword)}`
  );
  const data = await res.json();
  return data.provinces || [];
}
```
