import User from "../models/User.js";

const users = [
  {
    name: "Siwat",
    email: "siwat@example.com",
    phone: "0912345678",
  },
  {
    name: "John",
    email: "john@example.com",
    phone: "0923456789",
  },
  {
    name: "Jane",
    email: "jane@example.com",
    phone: "0934567890",
  },
  {
    name: "Mike",
    email: "mike@example.com",
    phone: "0945678901",
  },
  {
    name: "Anna",
    email: "anna@example.com",
    phone: "0956789012",
  },
];

async function seedUsers() {
  await User.insertMany(users);
  console.log("User seed completed ✅");
}

export default seedUsers;
