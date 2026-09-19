import Car from "../models/Car.js";

const CDN_BASE = "https://raw.githubusercontent.com/sjsiwat/goThailand-API/main/public/images/cars";

const cars = [
  {
    slug: "toyota-yaris",
    brand: "Toyota",
    model: "Yaris",
    name: "Toyota Yaris 1.2 Sport",
    category: "Economy",
    price: 1200,
    pricePerDay: 1200,
    rating: 4.8,
    reviewCount: 42,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    luggageCapacity: "2 Large Bags",
    description: "Compact and fuel-efficient eco car, ideal for city driving and agile maneuverability.",
    mainImage: `${CDN_BASE}/toyota-yaris.jpg`,
    galleryImages: [
      `${CDN_BASE}/toyota-yaris.jpg`,
      `${CDN_BASE}/toyota-yaris-rear.jpg`,
      `${CDN_BASE}/toyota-yaris-interior.jpg`
    ],
    availableLocations: [
      "Bangkok (BKK) Suvarnabhumi Airport",
      "Don Mueang Airport (DMK)",
      "Chiang Mai International Airport (CNX)",
      "Nan Nakhon Airport (NNT)",
      "Phra Nakhon Si Ayutthaya Heritage Center"
    ],
    isAvailable: true,
  },
  {
    slug: "honda-city",
    brand: "Honda",
    model: "City",
    name: "Honda City 1.0 Turbo RS",
    category: "Sedan",
    price: 1300,
    pricePerDay: 1300,
    rating: 4.9,
    reviewCount: 56,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    luggageCapacity: "3 Large Bags",
    description: "Comfortable and stylish sedan featuring a responsive turbocharged engine and spacious interior.",
    mainImage: `${CDN_BASE}/honda-city.jpg`,
    galleryImages: [
      `${CDN_BASE}/honda-city.jpg`,
      `${CDN_BASE}/honda-city-rear.jpg`,
      `${CDN_BASE}/honda-city-interior.jpg`
    ],
    availableLocations: [
      "Bangkok (BKK) Suvarnabhumi Airport",
      "Don Mueang Airport (DMK)",
      "Phuket International Airport (HKT)",
      "Krabi International Airport (KBV)",
      "Surat Thani Airport (URT) / Koh Samui"
    ],
    isAvailable: true,
  },
  {
    slug: "toyota-fortuner",
    brand: "Toyota",
    model: "Fortuner",
    name: "Toyota Fortuner Leader 2.4G",
    category: "SUV",
    price: 2500,
    pricePerDay: 2500,
    rating: 4.9,
    reviewCount: 38,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    luggageCapacity: "4 Large Bags",
    description: "Powerful and rugged 7-seat SUV engineered for family road trips and challenging terrains across Thailand.",
    mainImage: `${CDN_BASE}/toyota-fortuner.jpg`,
    galleryImages: [
      `${CDN_BASE}/toyota-fortuner.jpg`,
      `${CDN_BASE}/toyota-fortuner-rear.jpg`,
      `${CDN_BASE}/toyota-fortuner-interior.jpg`
    ],
    availableLocations: [
      "Bangkok (BKK) Suvarnabhumi Airport",
      "Chiang Mai International Airport (CNX)",
      "Chiang Rai International Airport (CEI)",
      "Nakhon Ratchasima / Khao Yai",
      "Kanchanaburi City Center",
      "Phuket International Airport (HKT)"
    ],
    isAvailable: true,
  },
  {
    slug: "mazda-2",
    brand: "Mazda",
    model: "2",
    name: "Mazda 2 1.3 SP Sports",
    category: "Economy",
    price: 1100,
    pricePerDay: 1100,
    rating: 4.7,
    reviewCount: 29,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    luggageCapacity: "2 Large Bags",
    description: "Sporty hatchback offering dynamic handling, high fuel efficiency, and a refined cockpit.",
    mainImage: `${CDN_BASE}/mazda-2.jpg`,
    galleryImages: [
      `${CDN_BASE}/mazda-2.jpg`,
      `${CDN_BASE}/mazda-2-rear.jpg`
    ],
    availableLocations: [
      "Bangkok (BKK) Suvarnabhumi Airport",
      "Don Mueang Airport (DMK)",
      "Chiang Mai International Airport (CNX)",
      "Khon Kaen Airport (KKC)",
      "Udon Thani International Airport (UTH)"
    ],
    isAvailable: true,
  },
  {
    slug: "nissan-almera",
    brand: "Nissan",
    model: "Almera",
    name: "Nissan Almera 1.0L Turbo VL",
    category: "Sedan",
    price: 1000,
    pricePerDay: 1000,
    rating: 4.6,
    reviewCount: 24,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    luggageCapacity: "3 Large Bags",
    description: "Modern eco-sedan equipped with comprehensive 360 safety shield features and comfortable rear legroom.",
    mainImage: `${CDN_BASE}/nissan-almera.jpg`,
    galleryImages: [
      `${CDN_BASE}/nissan-almera.jpg`,
      `${CDN_BASE}/nissan-almera-rear.jpg`
    ],
    availableLocations: [
      "Bangkok (BKK) Suvarnabhumi Airport",
      "Don Mueang Airport (DMK)",
      "Pattaya / U-Tapao Airport (UTP)",
      "Rayong City Center",
      "Hua Hin Airport (HHQ)"
    ],
    isAvailable: true,
  },
  {
    slug: "toyota-majesty",
    brand: "Toyota",
    model: "Majesty",
    name: "Toyota Majesty 2.8 Grande Premium",
    category: "MPV",
    price: 3500,
    pricePerDay: 3500,
    rating: 5.0,
    reviewCount: 16,
    seats: 11,
    transmission: "Automatic",
    fuelType: "Diesel",
    luggageCapacity: "6 Large Bags",
    description: "Premium luxury van with Captain executive seats, top-tier comfort for VIP travels and large groups.",
    mainImage: `${CDN_BASE}/toyota-majesty.jpg`,
    galleryImages: [
      `${CDN_BASE}/toyota-majesty.jpg`,
      `${CDN_BASE}/toyota-majesty-interior.jpg`
    ],
    availableLocations: [
      "Bangkok (BKK) Suvarnabhumi Airport",
      "Phuket International Airport (HKT)",
      "Chiang Mai International Airport (CNX)",
      "Pattaya / U-Tapao Airport (UTP)",
      "Nakhon Ratchasima / Khao Yai"
    ],
    isAvailable: true,
  },
  {
    slug: "bmw-5-series",
    brand: "BMW",
    model: "5 Series",
    name: "BMW 530e M Sport",
    category: "Luxury",
    price: 4800,
    pricePerDay: 4800,
    rating: 5.0,
    reviewCount: 21,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Hybrid",
    luggageCapacity: "3 Large Bags",
    description: "Executive luxury plug-in hybrid sedan offering exhilarating performance, silence, and prestige.",
    mainImage: `${CDN_BASE}/bmw-5-series.jpg`,
    galleryImages: [
      `${CDN_BASE}/bmw-5-series.jpg`,
      `${CDN_BASE}/bmw-5-series-interior.jpg`
    ],
    availableLocations: [
      "Bangkok (BKK) Suvarnabhumi Airport",
      "Phuket International Airport (HKT)",
      "Hua Hin Airport (HHQ)",
      "Pattaya / U-Tapao Airport (UTP)"
    ],
    isAvailable: true,
  },
  {
    slug: "byd-atto-3",
    brand: "BYD",
    model: "Atto 3",
    name: "BYD Atto 3 Extended Range",
    category: "SUV",
    price: 1600,
    pricePerDay: 1600,
    rating: 4.9,
    reviewCount: 33,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Electric",
    luggageCapacity: "3 Large Bags",
    description: "100% Electric EV SUV equipped with Blade Battery, high-tech interior, and 480km driving range.",
    mainImage: `${CDN_BASE}/byd-atto-3.jpg`,
    galleryImages: [
      `${CDN_BASE}/byd-atto-3.jpg`,
      `${CDN_BASE}/byd-atto-3-interior.jpg`
    ],
    availableLocations: [
      "Bangkok (BKK) Suvarnabhumi Airport",
      "Don Mueang Airport (DMK)",
      "Chiang Mai International Airport (CNX)",
      "Khon Kaen Airport (KKC)",
      "Trat Airport (TDX) / Koh Chang"
    ],
    isAvailable: true,
  }
];

async function seedCars() {
  await Car.deleteMany({});
  await Car.insertMany(cars);
  console.log(`Car seed completed ✅ (${cars.length} cars)`);
}

export default seedCars;
