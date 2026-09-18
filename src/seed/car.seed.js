import Car from "../models/Car.js";

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
    mainImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
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
    mainImage: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80"
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
    mainImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
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
    mainImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80"
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
    mainImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
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
    mainImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
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
    mainImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
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
    mainImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
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
