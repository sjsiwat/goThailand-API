import Guide from "../models/Guide.js";

const guides = [
  {
    name: "Somchai",
    province: "Chiang Mai",
    price: 1500,
  },
  {
    name: "Somsak",
    province: "Phuket",
    price: 1800,
  },
  {
    name: "Narin",
    province: "Bangkok",
    price: 1600,
  },
  {
    name: "Anan",
    province: "Krabi",
    price: 1700,
  },
  {
    name: "Kanya",
    province: "Chiang Rai",
    price: 1400,
  },
];

async function seedGuides() {
  await Guide.insertMany(guides);
  console.log("Guide seed completed ✅");
}

export default seedGuides;
