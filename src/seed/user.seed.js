import User from "../models/User.js";

const defaultPassword = "$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW"; // Hashed "Password123!"
const testPassword = "$2b$10$xURRwVmnhnlMqrkWZr0yVuAEgKbBXnDPwx6QzUWRTGmVq2MXnqEGa"; // Hashed "test123456"

const users = [
  {
    name: "Siwat",
    email: "siwat@example.com",
    password: defaultPassword,
    phone: "0912345678",
    role: "admin",
  },
  {
    name: "John",
    email: "john@example.com",
    password: defaultPassword,
    phone: "0923456789",
    role: "user",
  },
  {
    name: "Jane",
    email: "jane@example.com",
    password: defaultPassword,
    phone: "0934567890",
    role: "user",
  },
  {
    name: "Mike",
    email: "mike@example.com",
    password: defaultPassword,
    phone: "0945678901",
    role: "user",
  },
  {
    name: "Anna",
    email: "anna@example.com",
    password: defaultPassword,
    phone: "0956789012",
    role: "user",
  },
  {
    name: "Test GoThailand",
    email: "testgothailand",
    password: testPassword,
    phone: "0812345678",
    role: "user",
  },
  {
    name: "Test GoThailand",
    email: "testgothailand@gmail.com",
    password: testPassword,
    phone: "0812345678",
    role: "user",
  },
  {
    name: "Test GoThailand",
    email: "testgothailand@gothailand.com",
    password: testPassword,
    phone: "0812345678",
    role: "user",
  },
];

async function seedUsers() {
  await User.deleteMany({});
  await User.insertMany(users);
  console.log("User seed completed ✅");
}

export default seedUsers;
