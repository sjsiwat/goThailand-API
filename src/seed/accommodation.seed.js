import Accommodation from "../models/Accommodation.js";
import { provinces } from "./province.seed.js";

function makeLocation(city, district, addressLabel, nearby = [], coordinates = null) {
  return {
    city,
    district,
    address_label: addressLabel,
    ...(coordinates ? { map_coordinates: coordinates } : {}),
    nearby_landmarks: nearby.map((item) => ({
      name: item.name,
      distance: item.distance,
    })),
  };
}

function getDefaultRooms(id, name, basePrice, bedrooms = 1) {
  return [
    {
      room_type_id: `rm-${id}-01`,
      name: `${name} Standard Suite`,
      bed_type: bedrooms >= 2 ? "1 King Bed + 1 Queen Bed" : "1 King Bed",
      max_guests: {
        adults: bedrooms >= 2 ? 4 : 2,
        children: 1,
      },
      price_per_night: basePrice,
      available_quantity: 4,
    },
    {
      room_type_id: `rm-${id}-02`,
      name: `${name} Deluxe Villa`,
      bed_type: "1 Super King Bed",
      max_guests: {
        adults: 2,
        children: 2,
      },
      price_per_night: Math.round(basePrice * 1.25),
      available_quantity: 2,
    },
  ];
}

const defaultPolicies = {
  cancellation_policy: "Free cancellation up to 48 hours before check-in",
  check_in_time: "13:00",
  check_out_time: "12:00",
};

function imagesFor(id) {
  return [1, 2, 3, 4, 5].map((n) => `/images/${id}/${n}.jpg`);
}

function buildAccommodation({
  _id,
  id,
  name,
  category,
  categories,
  region,
  city,
  district,
  addressLabel,
  nearby = [],
  lat,
  lng,
  ratingAvg,
  totalReviews,
  description,
  descriptionExtra = "",
  facilities = [],
  specialOptions = ["Free Cancellation", "Breakfast Included"],
  basePrice,
  bedrooms = 1,
  rooms = [],
  pictures,
  policies = defaultPolicies,
}) {
  const defaultRooms =
    rooms.length > 0
      ? rooms
      : getDefaultRooms(id, name, basePrice, bedrooms);

  return {
    _id,
    id, // String slug สำหรับ URL route
    name,
    category,
    categories: categories || [category],
    region,
    description,
    descriptionExtra,
    location: makeLocation(city, district, addressLabel || `${city}, Thailand`, nearby, lat && lng ? { lat, lng } : null),
    rating_avg: ratingAvg,
    total_reviews: totalReviews,
    facilities,
    special_options: specialOptions,
    base_price_per_night: basePrice,
    rooms: defaultRooms,
    pictures: pictures || imagesFor(id),
    policies,
  };
}

const curatedAccommodations = [
  buildAccommodation({
    _id: 1,
    id: "siam-heritage-sanctuary",
    name: "The Siam Heritage Sanctuary",
    category: "Luxury Resort",
    categories: ["Private Villa", "Luxury Resort"],
    region: "central",
    city: "Bangkok",
    district: "Riverside",
    addressLabel: "Bangkok, Thailand",
    lat: 13.7234,
    lng: 100.5147,
    ratingAvg: 5,
    totalReviews: 124,
    basePrice: 12500,
    description: "Experience unparalleled luxury in the heart of Bangkok. The Siam Heritage Sanctuary offers a profound sense of place, blending deep-rooted Thai architectural traditions with exquisite contemporary comfort. Set amidst lush, manicured gardens along the historic Chao Phraya River, this exclusive retreat promises serenity and absolute privacy.",
    descriptionExtra: "Each villa is a masterpiece of design — teak interiors, towering vaulted ceilings and curated antiques. Step outside to your expansive private deck, where a personal infinity pool merges visually with the river beyond.",
    facilities: ["Free Wi-Fi", "Swimming Pool", "Room Service", "Spa", "Gym", "Restaurant"],
    specialOptions: ["Breakfast Included", "Free Cancellation", "Private Pool", "Beachfront"],
    rooms: [
      {
        "room_type_id": "rm-villa-01",
        "name": "Royal Riverside Villa",
        "bed_type": "1 King Bed",
        "max_guests": {
          "adults": 2,
          "children": 1
        },
        "price_per_night": 12500,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-villa-02",
        "name": "Grand Chao Phraya Penthouse",
        "bed_type": "2 King Beds",
        "max_guests": {
          "adults": 4,
          "children": 2
        },
        "price_per_night": 22000,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/siam-heritage-sanctuary/1.jpg", "/images/siam-heritage-sanctuary/2.jpg", "/images/siam-heritage-sanctuary/3.jpg", "/images/siam-heritage-sanctuary/4.jpg", "/images/siam-heritage-sanctuary/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "The Grand Palace",
        "distance": "2.5 km"
      },
      {
        "name": "Wat Arun (Temple of Dawn)",
        "distance": "1.8 km"
      },
      {
        "name": "ICONSIAM Luxury Mall",
        "distance": "3.0 km"
      },
      {
        "name": "Suvarnabhumi Airport",
        "distance": "35 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 2,
    id: "skyline-executive-suites",
    name: "Skyline Executive Suites",
    category: "Luxury Hotel",
    categories: ["Luxury Hotel"],
    region: "central",
    city: "Bangkok",
    district: "Sukhumvit",
    addressLabel: "Bangkok, Thailand",
    lat: 13.7423,
    lng: 100.5612,
    ratingAvg: 4.7,
    totalReviews: 88,
    basePrice: 14200,
    description: "Sleek executive suites high above Sukhumvit, with panoramic skyline views and direct access to the BTS for effortless city exploring.",
    descriptionExtra: "Floor-to-ceiling glass wraps every suite, turning the Bangkok skyline into the room's centrepiece day and night.",
    facilities: ["Free Wi-Fi", "Swimming Pool", "Gym", "Bar"],
    specialOptions: ["Breakfast Included", "Free Cancellation"],
    rooms: [
      {
        "room_type_id": "rm-skyline-executive-suites-01",
        "name": "Skyline Executive Suites Standard Suite",
        "bed_type": "1 King Bed",
        "max_guests": {
          "adults": 2,
          "children": 1
        },
        "price_per_night": 14200,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-skyline-executive-suites-02",
        "name": "Skyline Executive Suites Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 17750,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/skyline-executive-suites/1.jpg", "/images/skyline-executive-suites/2.jpg", "/images/skyline-executive-suites/3.jpg", "/images/skyline-executive-suites/4.jpg", "/images/skyline-executive-suites/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Terminal 21 Mall",
        "distance": "0.3 km"
      },
      {
        "name": "Benjakitti Forest Park",
        "distance": "1.2 km"
      },
      {
        "name": "EmQuartier Shopping Centre",
        "distance": "1.5 km"
      },
      {
        "name": "Suvarnabhumi Airport",
        "distance": "28 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 3,
    id: "ayutthaya-heritage-riverside",
    name: "Ayutthaya Heritage Riverside",
    category: "Bed & Breakfast",
    categories: ["Bed & Breakfast"],
    region: "central",
    city: "Phra Nakhon Si Ayutthaya",
    district: "Phra Nakhon Si Ayutthaya",
    addressLabel: "Phra Nakhon Si Ayutthaya, Thailand",
    lat: 14.3532,
    lng: 100.5684,
    ratingAvg: 4.8,
    totalReviews: 92,
    basePrice: 8200,
    description: "A peaceful riverside estate facing the ancient temples of Ayutthaya, blending traditional wooden pavilions with modern comforts.",
    descriptionExtra: "Dine on the river terrace as illuminated stupas glow in the distance, then retire to bedrooms scented with natural cedar.",
    facilities: ["Free Wi-Fi", "Restaurant", "River View"],
    specialOptions: ["Breakfast Included", "Free Cancellation"],
    rooms: [
      {
        "room_type_id": "rm-ayutthaya-heritage-riverside-01",
        "name": "Ayutthaya Heritage Riverside Standard Suite",
        "bed_type": "1 King Bed + 1 Queen Bed",
        "max_guests": {
          "adults": 4,
          "children": 1
        },
        "price_per_night": 8200,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-ayutthaya-heritage-riverside-02",
        "name": "Ayutthaya Heritage Riverside Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 10250,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/ayutthaya-heritage-riverside/1.jpg", "/images/ayutthaya-heritage-riverside/2.jpg", "/images/ayutthaya-heritage-riverside/3.jpg", "/images/ayutthaya-heritage-riverside/4.jpg", "/images/ayutthaya-heritage-riverside/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Wat Chaiwatthanaram",
        "distance": "1.2 km"
      },
      {
        "name": "Ayutthaya Historical Park",
        "distance": "2.8 km"
      },
      {
        "name": "Chao Sam Phraya Museum",
        "distance": "3.5 km"
      },
      {
        "name": "Don Mueang Airport",
        "distance": "55 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 4,
    id: "river-kwai-jungle-raft",
    name: "River Kwai Jungle Raft Resort",
    category: "Luxury Resort",
    categories: ["Luxury Resort"],
    region: "central",
    city: "Kanchanaburi",
    district: "Sai Yok",
    addressLabel: "Kanchanaburi, Thailand",
    lat: 14.2831,
    lng: 98.9842,
    ratingAvg: 4.6,
    totalReviews: 70,
    basePrice: 6500,
    description: "Floating eco-villas moored on the Kwai Noi River, surrounded by sheer limestone cliffs and untouched rainforest.",
    descriptionExtra: "Step directly from your bedroom terrace into the cool, flowing river water for an authentic jungle experience.",
    facilities: ["River View", "Spa", "Free Wi-Fi"],
    specialOptions: ["Breakfast Included", "Free Cancellation"],
    rooms: [
      {
        "room_type_id": "rm-river-kwai-jungle-raft-01",
        "name": "River Kwai Jungle Raft Resort Standard Suite",
        "bed_type": "1 King Bed",
        "max_guests": {
          "adults": 2,
          "children": 1
        },
        "price_per_night": 6500,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-river-kwai-jungle-raft-02",
        "name": "River Kwai Jungle Raft Resort Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 8125,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/river-kwai-jungle-raft/1.jpg", "/images/river-kwai-jungle-raft/2.jpg", "/images/river-kwai-jungle-raft/3.jpg", "/images/river-kwai-jungle-raft/4.jpg", "/images/river-kwai-jungle-raft/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Hellfire Pass Memorial",
        "distance": "12 km"
      },
      {
        "name": "Sai Yok Noi Waterfall",
        "distance": "18 km"
      },
      {
        "name": "Bridge on River Kwai",
        "distance": "52 km"
      },
      {
        "name": "Suvarnabhumi Airport",
        "distance": "190 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 5,
    id: "hua-hin-royal-beachfront",
    name: "Hua Hin Royal Beachfront Villa",
    category: "Private Villa",
    categories: ["Private Villa"],
    region: "central",
    city: "Prachuap Khiri Khan",
    district: "Hua Hin",
    addressLabel: "Prachuap Khiri Khan, Thailand",
    lat: 12.5684,
    lng: 99.9577,
    ratingAvg: 4.9,
    totalReviews: 104,
    basePrice: 16800,
    description: "Colonial-inspired beachfront residence with a manicured lawn rolling down to the golden sands of Hua Hin's royal coast.",
    descriptionExtra: "Generous veranda living, private infinity pool and dedicated staff make this villa the choice for multi-generational escapes.",
    facilities: ["Free Wi-Fi", "Swimming Pool", "Beach Access", "Spa"],
    specialOptions: ["Breakfast Included", "Free Cancellation", "Private Pool", "Beachfront"],
    rooms: [
      {
        "room_type_id": "rm-hua-hin-royal-beachfront-01",
        "name": "Hua Hin Royal Beachfront Villa Standard Suite",
        "bed_type": "1 King Bed + 1 Queen Bed",
        "max_guests": {
          "adults": 4,
          "children": 1
        },
        "price_per_night": 16800,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-hua-hin-royal-beachfront-02",
        "name": "Hua Hin Royal Beachfront Villa Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 21000,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/hua-hin-royal-beachfront/1.jpg", "/images/hua-hin-royal-beachfront/2.jpg", "/images/hua-hin-royal-beachfront/3.jpg", "/images/hua-hin-royal-beachfront/4.jpg", "/images/hua-hin-royal-beachfront/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Cicada Night Market",
        "distance": "1.5 km"
      },
      {
        "name": "Royal Hua Hin Golf Club",
        "distance": "3.2 km"
      },
      {
        "name": "Khao Takiab Temple",
        "distance": "4.0 km"
      },
      {
        "name": "Hua Hin Airport",
        "distance": "9.5 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 6,
    id: "emerald-jungle-retreat",
    name: "Emerald Jungle Retreat",
    category: "Luxury Resort",
    categories: ["Luxury Resort"],
    region: "north",
    city: "Chiang Mai",
    district: "Mae Rim",
    addressLabel: "Chiang Mai, Thailand",
    lat: 18.9142,
    lng: 98.9452,
    ratingAvg: 4.7,
    totalReviews: 76,
    basePrice: 9500,
    description: "Canopy tents suspended above a private valley, with open-air bathing, forest dining and guided morning treks through the highlands surrounding Chiang Mai.",
    descriptionExtra: "A rare blend of adventure and comfort — wake to birdsong and mist rolling through the canopy below your deck.",
    facilities: ["Free Wi-Fi", "Restaurant", "Mountain View"],
    specialOptions: ["Breakfast Included", "Free Cancellation"],
    rooms: [
      {
        "room_type_id": "rm-emerald-jungle-retreat-01",
        "name": "Emerald Jungle Retreat Standard Suite",
        "bed_type": "1 King Bed",
        "max_guests": {
          "adults": 2,
          "children": 1
        },
        "price_per_night": 9500,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-emerald-jungle-retreat-02",
        "name": "Emerald Jungle Retreat Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 11875,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/emerald-jungle-retreat/1.jpg", "/images/emerald-jungle-retreat/2.jpg", "/images/emerald-jungle-retreat/3.jpg", "/images/emerald-jungle-retreat/4.jpg", "/images/emerald-jungle-retreat/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Mae Sa Waterfall",
        "distance": "4.2 km"
      },
      {
        "name": "Elephant Sanctuary",
        "distance": "6.0 km"
      },
      {
        "name": "Chiang Mai Old City",
        "distance": "18 km"
      },
      {
        "name": "Chiang Mai Airport",
        "distance": "24 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 7,
    id: "doi-mist-mountain-lodge",
    name: "Doi Mist Mountain Lodge",
    category: "Bed & Breakfast",
    categories: ["Bed & Breakfast"],
    region: "north",
    city: "Mae Hong Son",
    district: "Pai",
    addressLabel: "Mae Hong Son, Thailand",
    lat: 19.3582,
    lng: 98.4412,
    ratingAvg: 4.6,
    totalReviews: 58,
    basePrice: 7500,
    description: "Perched on a ridge above the Pai valley, this timber lodge wakes to a sea of morning mist rolling between the hills.",
    descriptionExtra: "Floor-to-ceiling windows frame the valley from every room, with a wraparound deck built for slow mountain mornings.",
    facilities: ["Free Wi-Fi", "Restaurant", "Mountain View"],
    specialOptions: ["Breakfast Included", "Free Cancellation"],
    rooms: [
      {
        "room_type_id": "rm-doi-mist-mountain-lodge-01",
        "name": "Doi Mist Mountain Lodge Standard Suite",
        "bed_type": "1 King Bed",
        "max_guests": {
          "adults": 2,
          "children": 1
        },
        "price_per_night": 7500,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-doi-mist-mountain-lodge-02",
        "name": "Doi Mist Mountain Lodge Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 9375,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/doi-mist-mountain-lodge/1.jpg", "/images/doi-mist-mountain-lodge/2.jpg", "/images/doi-mist-mountain-lodge/3.jpg", "/images/doi-mist-mountain-lodge/4.jpg", "/images/doi-mist-mountain-lodge/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Pai Canyon",
        "distance": "3.5 km"
      },
      {
        "name": "Pai Walking Street",
        "distance": "5.0 km"
      },
      {
        "name": "Mo Paeng Waterfall",
        "distance": "8.0 km"
      },
      {
        "name": "Pai Airport",
        "distance": "4.0 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 8,
    id: "lanna-riverside-boutique",
    name: "Lanna Riverside Boutique",
    category: "Luxury Hotel",
    categories: ["Luxury Hotel"],
    region: "north",
    city: "Chiang Rai",
    district: "Mueang Chiang Rai",
    addressLabel: "Chiang Rai, Thailand",
    lat: 19.9072,
    lng: 99.8325,
    ratingAvg: 4.5,
    totalReviews: 64,
    basePrice: 6800,
    description: "Traditional northern architecture meets serene Kok River frontage, featuring handcrafted teak furnishings and landscaped gardens.",
    descriptionExtra: "Every detail honors Lanna craftsmanship — woven textiles, carved lintels and a quiet courtyard courtyard shaded by rain trees.",
    facilities: ["Free Wi-Fi", "River View", "Swimming Pool"],
    specialOptions: ["Breakfast Included", "Free Cancellation"],
    rooms: [
      {
        "room_type_id": "rm-lanna-riverside-boutique-01",
        "name": "Lanna Riverside Boutique Standard Suite",
        "bed_type": "1 King Bed",
        "max_guests": {
          "adults": 2,
          "children": 1
        },
        "price_per_night": 6800,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-lanna-riverside-boutique-02",
        "name": "Lanna Riverside Boutique Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 8500,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/lanna-riverside-boutique/1.jpg", "/images/lanna-riverside-boutique/2.jpg", "/images/lanna-riverside-boutique/3.jpg", "/images/lanna-riverside-boutique/4.jpg", "/images/lanna-riverside-boutique/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Wat Rong Khun (White Temple)",
        "distance": "11 km"
      },
      {
        "name": "Baan Dam Museum",
        "distance": "8.5 km"
      },
      {
        "name": "Chiang Rai Night Bazaar",
        "distance": "2.0 km"
      },
      {
        "name": "Mae Fah Luang Airport",
        "distance": "7.0 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 9,
    id: "isan-ricefield-homestay",
    name: "Isan Ricefield Heritage Homestay",
    category: "Bed & Breakfast",
    categories: ["Bed & Breakfast"],
    region: "isan",
    city: "Ubon Ratchathani",
    district: "Warin Chamrap",
    addressLabel: "Ubon Ratchathani, Thailand",
    lat: 15.1984,
    lng: 104.8623,
    ratingAvg: 4.8,
    totalReviews: 45,
    basePrice: 4200,
    description: "Elevated teak wood pavilions surrounded by emerald paddies, offering an authentic glimpse of rural northeast living.",
    descriptionExtra: "Participate in morning sticky rice rituals, cycle quiet village lanes and fall asleep to the gentle chorus of the fields.",
    facilities: ["Free Wi-Fi", "Restaurant", "Room Service"],
    specialOptions: ["Breakfast Included", "Free Cancellation"],
    rooms: [
      {
        "room_type_id": "rm-isan-ricefield-homestay-01",
        "name": "Isan Ricefield Heritage Homestay Standard Suite",
        "bed_type": "1 King Bed",
        "max_guests": {
          "adults": 2,
          "children": 1
        },
        "price_per_night": 4200,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-isan-ricefield-homestay-02",
        "name": "Isan Ricefield Heritage Homestay Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 5250,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/isan-ricefield-homestay/1.jpg", "/images/isan-ricefield-homestay/2.jpg", "/images/isan-ricefield-homestay/3.jpg", "/images/isan-ricefield-homestay/4.jpg", "/images/isan-ricefield-homestay/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Wat Nong Pah Pong",
        "distance": "6.0 km"
      },
      {
        "name": "Ubon Ratchathani Museum",
        "distance": "8.5 km"
      },
      {
        "name": "Thung Si Mueang Park",
        "distance": "9.0 km"
      },
      {
        "name": "Ubon Airport",
        "distance": "12 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 10,
    id: "mekong-riverside-retreat",
    name: "Mekong Riverside Retreat",
    category: "Luxury Resort",
    categories: ["Luxury Resort"],
    region: "isan",
    city: "Nong Khai",
    district: "Tha Bo",
    addressLabel: "Nong Khai, Thailand",
    lat: 17.8472,
    lng: 102.5831,
    ratingAvg: 4.6,
    totalReviews: 52,
    basePrice: 5600,
    description: "Boutique villas right on the edge of the mighty Mekong, watching local longtail boats drift toward sunset over Laos.",
    descriptionExtra: "An open-air riverside pavilion serves fresh Mekong fish prepared with local herbs as the border lights flicker across the water.",
    facilities: ["Free Wi-Fi", "River View", "Swimming Pool"],
    specialOptions: ["Breakfast Included", "Free Cancellation"],
    rooms: [
      {
        "room_type_id": "rm-mekong-riverside-retreat-01",
        "name": "Mekong Riverside Retreat Standard Suite",
        "bed_type": "1 King Bed",
        "max_guests": {
          "adults": 2,
          "children": 1
        },
        "price_per_night": 5600,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-mekong-riverside-retreat-02",
        "name": "Mekong Riverside Retreat Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 7000,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/mekong-riverside-retreat/1.jpg", "/images/mekong-riverside-retreat/2.jpg", "/images/mekong-riverside-retreat/3.jpg", "/images/mekong-riverside-retreat/4.jpg", "/images/mekong-riverside-retreat/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Sala Keoku Sculpture Park",
        "distance": "7.5 km"
      },
      {
        "name": "Thai-Lao Friendship Bridge",
        "distance": "5.0 km"
      },
      {
        "name": "Tha Sadet Market",
        "distance": "3.2 km"
      },
      {
        "name": "Udon Thani Airport",
        "distance": "58 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 11,
    id: "khaoyai-vineyard-villas",
    name: "Khao Yai Vineyard Villas",
    category: "Private Villa",
    categories: ["Private Villa"],
    region: "isan",
    city: "Nakhon Ratchasima",
    district: "Pak Chong",
    addressLabel: "Nakhon Ratchasima, Thailand",
    lat: 14.5423,
    lng: 101.4112,
    ratingAvg: 4.9,
    totalReviews: 83,
    basePrice: 11000,
    description: "Tuscan-inspired private stone villas tucked between rolling grapevines with cool mountain breezes year-round.",
    descriptionExtra: "Private wine tastings on your terrace, outdoor fireplace for chilly evenings, and waking to mist over the vines.",
    facilities: ["Free Wi-Fi", "Restaurant", "Swimming Pool", "Spa"],
    specialOptions: ["Breakfast Included", "Free Cancellation", "Private Pool"],
    rooms: [
      {
        "room_type_id": "rm-khaoyai-vineyard-villas-01",
        "name": "Khao Yai Vineyard Villas Standard Suite",
        "bed_type": "1 King Bed + 1 Queen Bed",
        "max_guests": {
          "adults": 4,
          "children": 1
        },
        "price_per_night": 11000,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-khaoyai-vineyard-villas-02",
        "name": "Khao Yai Vineyard Villas Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 13750,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/khaoyai-vineyard-villas/1.jpg", "/images/khaoyai-vineyard-villas/2.jpg", "/images/khaoyai-vineyard-villas/3.jpg", "/images/khaoyai-vineyard-villas/4.jpg", "/images/khaoyai-vineyard-villas/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Khao Yai National Park Gate",
        "distance": "8.0 km"
      },
      {
        "name": "PB Valley Winery",
        "distance": "4.5 km"
      },
      {
        "name": "Primo Piazza",
        "distance": "6.0 km"
      },
      {
        "name": "Don Mueang Airport",
        "distance": "135 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 12,
    id: "amanpuri-retreat-villas",
    name: "Amanpuri Retreat Villas",
    category: "Private Villa",
    categories: ["Private Villa", "Luxury Resort"],
    region: "south",
    city: "Phuket",
    district: "Cherngtalay",
    addressLabel: "Phuket, Thailand",
    lat: 7.9842,
    lng: 98.2778,
    ratingAvg: 4.9,
    totalReviews: 142,
    basePrice: 18500,
    description: "Iconic pavilions set within a coconut grove overlooking the Andaman Sea, setting the global standard for secluded coastal luxury.",
    descriptionExtra: "Private black-tiled swimming pool, direct steps to Pansea Beach's secluded cove and a holistic wellness centre.",
    facilities: ["Free Wi-Fi", "Swimming Pool", "Spa", "Gym", "Beach Access"],
    specialOptions: ["Breakfast Included", "Free Cancellation", "Private Pool", "Beachfront"],
    rooms: [
      {
        "room_type_id": "rm-amanpuri-retreat-villas-01",
        "name": "Amanpuri Retreat Villas Standard Suite",
        "bed_type": "1 King Bed + 1 Queen Bed",
        "max_guests": {
          "adults": 4,
          "children": 1
        },
        "price_per_night": 18500,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-amanpuri-retreat-villas-02",
        "name": "Amanpuri Retreat Villas Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 23125,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/amanpuri-retreat-villas/1.jpg", "/images/amanpuri-retreat-villas/2.jpg", "/images/amanpuri-retreat-villas/3.jpg", "/images/amanpuri-retreat-villas/4.jpg", "/images/amanpuri-retreat-villas/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Pansea Beach",
        "distance": "0.1 km"
      },
      {
        "name": "Surin Beach",
        "distance": "1.2 km"
      },
      {
        "name": "Catch Beach Club",
        "distance": "4.5 km"
      },
      {
        "name": "Phuket International Airport",
        "distance": "22 km"
      }
    ],
  }),

  buildAccommodation({
    _id: 13,
    id: "railay-cliff-beach-villas",
    name: "Railay Cliff Beach Villas",
    category: "Luxury Resort",
    categories: ["Luxury Resort"],
    region: "south",
    city: "Krabi",
    district: "Ao Nang",
    addressLabel: "Krabi, Thailand",
    lat: 8.0121,
    lng: 98.8398,
    ratingAvg: 4.7,
    totalReviews: 89,
    basePrice: 13500,
    description: "Accessible only by sea, these cliffside pavilions sit wedged between towering limestone karsts and turquoise Andaman waters.",
    descriptionExtra: "Listen to the gentle slap of waves against the rocks below while watching rock climbers scale the sheer limestone faces.",
    facilities: ["Free Wi-Fi", "Swimming Pool", "Beach Access", "Spa"],
    specialOptions: ["Breakfast Included", "Free Cancellation", "Beachfront"],
    rooms: [
      {
        "room_type_id": "rm-railay-cliff-beach-villas-01",
        "name": "Railay Cliff Beach Villas Standard Suite",
        "bed_type": "1 King Bed",
        "max_guests": {
          "adults": 2,
          "children": 1
        },
        "price_per_night": 13500,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-railay-cliff-beach-villas-02",
        "name": "Railay Cliff Beach Villas Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 16875,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/railay-cliff-beach-villas/1.jpg", "/images/railay-cliff-beach-villas/2.jpg", "/images/railay-cliff-beach-villas/3.jpg", "/images/railay-cliff-beach-villas/4.jpg", "/images/railay-cliff-beach-villas/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Railay West Beach",
        "distance": "0.2 km"
      },
      {
        "name": "Phra Nang Cave Beach",
        "distance": "0.8 km"
      },
      {
        "name": "Railay Viewpoint",
        "distance": "0.6 km"
      },
      {
        "name": "Krabi Airport",
        "distance": "28 km (via boat)"
      }
    ],
  }),

  buildAccommodation({
    _id: 14,
    id: "four-seasons-samui-cove",
    name: "Four Seasons Samui Cove",
    category: "Private Villa",
    categories: ["Private Villa", "Luxury Resort"],
    region: "south",
    city: "Surat Thani",
    district: "Koh Samui",
    addressLabel: "Surat Thani, Thailand",
    lat: 9.5784,
    lng: 100.0124,
    ratingAvg: 4.8,
    totalReviews: 116,
    basePrice: 17200,
    description: "Hillside pool villas cascading down a private bay with uninterrupted views across the Gulf of Thailand.",
    descriptionExtra: "Surrounded by tropical gardens and fruit orchards, every villa offers an infinity-edge pool that merges with the horizon.",
    facilities: ["Free Wi-Fi", "Swimming Pool", "Beach Access", "Spa", "Gym"],
    specialOptions: ["Breakfast Included", "Free Cancellation", "Private Pool", "Beachfront"],
    rooms: [
      {
        "room_type_id": "rm-four-seasons-samui-cove-01",
        "name": "Four Seasons Samui Cove Standard Suite",
        "bed_type": "1 King Bed + 1 Queen Bed",
        "max_guests": {
          "adults": 4,
          "children": 1
        },
        "price_per_night": 17200,
        "available_quantity": 4
      },
      {
        "room_type_id": "rm-four-seasons-samui-cove-02",
        "name": "Four Seasons Samui Cove Deluxe Villa",
        "bed_type": "1 Super King Bed",
        "max_guests": {
          "adults": 2,
          "children": 2
        },
        "price_per_night": 21500,
        "available_quantity": 2
      }
    ],
    pictures: ["/images/four-seasons-samui-cove/1.jpg", "/images/four-seasons-samui-cove/2.jpg", "/images/four-seasons-samui-cove/3.jpg", "/images/four-seasons-samui-cove/4.jpg", "/images/four-seasons-samui-cove/5.jpg"],
    policies: {
      "cancellation_policy": "Free cancellation up to 48 hours before check-in",
      "check_in_time": "13:00",
      "check_out_time": "12:00"
    },
    nearby: [
      {
        "name": "Choeng Mon Beach",
        "distance": "2.0 km"
      },
      {
        "name": "Fisherman's Village",
        "distance": "6.0 km"
      },
      {
        "name": "Big Buddha Temple",
        "distance": "5.5 km"
      },
      {
        "name": "Samui Airport",
        "distance": "7.0 km"
      }
    ],
  }),

];

const TOP_TOURIST_SLUGS = new Set([
  // North (3)
  "chiang-mai", "chiang-rai", "nan",
  // Central (3)
  "bangkok", "phra-nakhon-si-ayutthaya", "nonthaburi",
  // Isan (3)
  "nakhon-ratchasima", "khon-kaen", "udon-thani",
  // South (3)
  "phuket", "surat-thani", "krabi",
  // East (3)
  "chonburi", "rayong", "trat",
  // West (3)
  "kanchanaburi", "prachuap-khiri-khan", "phetchaburi"
]);

const COASTAL_SLUGS = new Set([
  "phuket", "surat-thani", "krabi", "chonburi", "rayong", "trat",
  "prachuap-khiri-khan", "phetchaburi", "chanthaburi", "ranong",
  "phang-nga", "trang", "satun", "chumphon", "nakhon-si-thammarat",
  "songkhla", "pattani", "narathiwat"
]);

const RIVERSIDE_SLUGS = new Set([
  "bangkok", "phra-nakhon-si-ayutthaya", "nonthaburi", "pathum-thani",
  "kanchanaburi", "nong-khai", "nakhon-phanom", "mukdahan",
  "ubon-ratchathani", "bueng-kan", "chiang-rai", "samut-songkhram"
]);

const MOUNTAIN_SLUGS = new Set([
  "chiang-mai", "chiang-rai", "nan", "mae-hong-son", "lampang",
  "lamphun", "phrae", "phayao", "uttaradit", "phetchabun", "loei",
  "nakhon-ratchasima", "kanchanaburi", "tak"
]);

const photoPool = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"
];

// 20 Tiered configurations for top tourist provinces (6 balanced categories)
const TIER_TEMPLATES_20 = [
  { price: 590, cat: "Guest House", nameSuffix: "Cozy Traveler Guesthouse", sub: "Guesthouse" },
  { price: 650, cat: "Bed & Breakfast", nameSuffix: "Garden Heritage Bed & Breakfast", sub: "Bed & Breakfast" },
  { price: 750, cat: "Guest House", nameSuffix: "Old Town Heritage Guesthouse", sub: "Guesthouse" },
  { price: 790, cat: "Budget Hotel", nameSuffix: "Express Budget Inn", sub: "Budget Hotel" },
  { price: 850, cat: "Bed & Breakfast", nameSuffix: "Warm Morning Bed & Breakfast", sub: "Bed & Breakfast" },
  { price: 950, cat: "Guest House", nameSuffix: "Boutique Eco Guesthouse", sub: "Guesthouse" },
  { price: 990, cat: "Budget Hotel", nameSuffix: "City Smart Budget Hotel", sub: "Budget Hotel" },
  { price: 1150, cat: "Bed & Breakfast", nameSuffix: "Charming Villa Bed & Breakfast", sub: "Bed & Breakfast" },
  { price: 1290, cat: "Budget Hotel", nameSuffix: "Comfort Urban Budget Hotel", sub: "Budget Hotel" },
  { price: 1590, cat: "Guest House", nameSuffix: "Riverside Traditional Guesthouse", sub: "Guesthouse" },
  { price: 1890, cat: "Luxury Hotel", nameSuffix: "Grand Premier Luxury Hotel", sub: "Luxury Hotel" },
  { price: 2200, cat: "Bed & Breakfast", nameSuffix: "Colonial Manor Bed & Breakfast", sub: "Bed & Breakfast" },
  { price: 2400, cat: "Luxury Resort", nameSuffix: "Scenic Garden Luxury Resort", sub: "Luxury Resort" },
  { price: 2890, cat: "Luxury Hotel", nameSuffix: "Panorama Suites Luxury Hotel", sub: "Luxury Hotel" },
  { price: 3400, cat: "Private Villa", nameSuffix: "Tropical Haven Private Villa", sub: "Private Villa" },
  { price: 3900, cat: "Luxury Resort", nameSuffix: "Valley Breeze Wellness Luxury Resort", sub: "Luxury Resort" },
  { price: 4500, cat: "Luxury Hotel", nameSuffix: "Executive Suites Luxury Hotel", sub: "Luxury Hotel" },
  { price: 5400, cat: "Private Villa", nameSuffix: "Cliffside Sunset Private Villa", sub: "Private Villa" },
  { price: 6800, cat: "Luxury Resort", nameSuffix: "Grand Sanctuary Luxury Resort", sub: "Luxury Resort" },
  { price: 8500, cat: "Private Villa", nameSuffix: "Signature Lagoon Private Villa", sub: "Private Villa" }
];

// Minor provinces alternating 3-tiered configurations
const TIER_3_CONFIGS = [
  // A: Guest House, Budget Hotel, Luxury Resort
  [
    { price: 590, cat: "Guest House", nameSuffix: "Cozy Town Guesthouse", sub: "Guesthouse" },
    { price: 890, cat: "Budget Hotel", nameSuffix: "City Express Budget Hotel", sub: "Budget Hotel" },
    { price: 1690, cat: "Luxury Resort", nameSuffix: "Riverside Nature Luxury Resort", sub: "Luxury Resort" }
  ],
  // B: Bed & Breakfast, Luxury Hotel, Private Villa
  [
    { price: 590, cat: "Bed & Breakfast", nameSuffix: "Cozy Heritage Bed & Breakfast", sub: "Bed & Breakfast" },
    { price: 1290, cat: "Luxury Hotel", nameSuffix: "City Center Luxury Hotel", sub: "Luxury Hotel" },
    { price: 1890, cat: "Private Villa", nameSuffix: "Garden View Private Villa", sub: "Private Villa" }
  ]
];

function normalizeCity(str) {
  const s = (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (s === "ayutthaya" || s.includes("ayutthaya")) return "phranakhonsiayutthaya";
  return s;
}

function generateAllAccommodations() {
  let currentId = 15;
  const all = [...curatedAccommodations];

  let provIndex = 0;
  for (const prov of provinces) {
    const isTop = TOP_TOURIST_SLUGS.has(prov.slug);
    const targetCount = isTop ? 20 : 3;

    const existingForProv = curatedAccommodations.filter(acc => {
      const accCity = normalizeCity(acc.location.city);
      const provName = normalizeCity(prov.name_en);
      return accCity.includes(provName) || provName.includes(accCity);
    });

    const needed = targetCount - existingForProv.length;
    const templates = isTop ? TIER_TEMPLATES_20 : TIER_3_CONFIGS[provIndex % TIER_3_CONFIGS.length];
    if (!isTop) provIndex++;

    const isCoastal = COASTAL_SLUGS.has(prov.slug);
    const isRiverside = RIVERSIDE_SLUGS.has(prov.slug);
    const isMountain = MOUNTAIN_SLUGS.has(prov.slug);

    for (let i = 0; i < needed; i++) {
      const tIndex = (existingForProv.length + i) % templates.length;
      const template = templates[tIndex];
      const accId = currentId++;
      const slugId = `${prov.slug}-${template.cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${template.price}-${accId}`;
      const name = `${prov.name_en} ${template.nameSuffix}`;
      const photo = photoPool[(accId + i) % photoPool.length];

      // Balanced Special Options:
      // Bed & Breakfast MUST include breakfast!
      const specialOptions = [];

      const isBnB = template.cat === "Bed & Breakfast";
      const hasBreakfast = isBnB || (accId % 10 < 6); // 100% of Bed & Breakfast + ~60% of others
      if (hasBreakfast) specialOptions.push("Breakfast Included");

      const hasFreeCancel = (accId % 10 < 7);
      if (hasFreeCancel) specialOptions.push("Free Cancellation");

      const isVillaOrHighLuxury = template.cat === "Private Villa" || template.price >= 4500;
      if (isVillaOrHighLuxury && (accId % 3 !== 0)) {
        specialOptions.push("Private Pool");
      }

      if (isCoastal && (accId % 2 === 0 || template.price >= 3000)) {
        specialOptions.push("Beachfront");
      }

      // Simplified, natural facility names:
      // Free Wi-Fi, Swimming Pool, Gym, Spa, Restaurant, Room Service, Bar, River View, Mountain View, Beach Access
      const facilities = ["Free Wi-Fi"];

      if (specialOptions.includes("Private Pool") || template.cat === "Private Villa" || template.cat === "Luxury Resort" || template.price >= 2000) {
        facilities.push("Swimming Pool");
      }
      if (template.price >= 1800 || (accId % 4 === 0)) {
        facilities.push("Spa");
      }
      if (template.price >= 1000 || template.cat === "Luxury Hotel" || template.cat === "Budget Hotel") {
        facilities.push("Gym");
      }
      if (template.price >= 1200 || isBnB) {
        facilities.push("Restaurant");
      }
      if (template.price >= 3500 || template.cat === "Luxury Hotel") {
        facilities.push("Room Service");
      }
      if (template.cat === "Luxury Hotel" || template.price >= 2500) {
        facilities.push("Bar");
      }
      if (isRiverside && (accId % 2 === 0 || template.nameSuffix.includes("Riverside"))) {
        facilities.push("River View");
      }
      if (isMountain && (accId % 2 === 0 || template.nameSuffix.includes("Valley") || template.nameSuffix.includes("Mountain"))) {
        facilities.push("Mountain View");
      }
      if (isCoastal && (specialOptions.includes("Beachfront") || accId % 2 === 0)) {
        facilities.push("Beach Access");
      }

      all.push({
        _id: accId,
        id: slugId,
        name,
        category: template.cat,
        categories: [template.cat, template.sub],
        region: prov.region,
        description: `Experience comfortable and authentic hospitality in ${prov.name_en} (${prov.name_th}). Conveniently located near central landmarks with warm service and relaxing accommodations.`,
        descriptionExtra: `Ideal for couples, solo travelers, and families visiting ${prov.name_en}.`,
        location: {
          city: prov.name_en,
          district: "Mueang",
          address_label: `${prov.name_en}, Thailand`,
          map_coordinates: {
            lat: Number((13.0 + (accId % 50) * 0.1).toFixed(4)),
            lng: Number((99.0 + (accId % 40) * 0.1).toFixed(4))
          },
          nearby_landmarks: [
            { name: `${prov.name_en} City Center`, distance: "1.2 km" },
            { name: `${prov.name_en} Night Bazaar`, distance: "2.0 km" }
          ]
        },
        rating_avg: Number((4.2 + (accId % 9) * 0.1).toFixed(1)),
        total_reviews: 15 + (accId * 7) % 180,
        facilities,
        special_options: specialOptions,
        base_price_per_night: template.price,
        rooms: [
          {
            room_type_id: `rm-${accId}-01`,
            name: `${name} Standard Room`,
            bed_type: "1 Queen Bed",
            max_guests: { adults: 2, children: 1 },
            price_per_night: template.price,
            available_quantity: 4
          },
          {
            room_type_id: `rm-${accId}-02`,
            name: `${name} Deluxe Suite`,
            bed_type: "1 King Bed",
            max_guests: { adults: 2, children: 2 },
            price_per_night: Math.round(template.price * 1.3),
            available_quantity: 2
          }
        ],
        pictures: [
          photo,
          photoPool[(accId + 1) % photoPool.length],
          photoPool[(accId + 2) % photoPool.length]
        ],
        policies: {
          cancellation_policy: "Free cancellation up to 48 hours before check-in",
          check_in_time: "13:00",
          check_out_time: "12:00"
        }
      });
    }
  }

  return all;
}

export const accommodations = generateAllAccommodations();

async function seedAccommodations() {
  await Accommodation.deleteMany({});
  await Accommodation.insertMany(accommodations);
  console.log(`Accommodation seed completed ✅ (${accommodations.length} accommodations across ${provinces.length} provinces)`);
}

export default seedAccommodations;
