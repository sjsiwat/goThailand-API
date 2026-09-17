import Accommodation from "../models/Accommodation.js";

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
    location: makeLocation(city, district, addressLabel, nearby, lat && lng ? { lat, lng } : null),
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

export const accommodations = [
  buildAccommodation({
    _id: 1,
    id: "siam-heritage-sanctuary",
    name: "The Siam Heritage Sanctuary",
    category: "Luxury Resort",
    categories: ["Private Villa", "Luxury Resort"],
    region: "central",
    city: "Bangkok",
    district: "Riverside",
    addressLabel: "Riverside, Bangkok, Thailand",
    lat: 13.7234,
    lng: 100.5147,
    ratingAvg: 5,
    totalReviews: 124,
    basePrice: 12500,
    description: "Experience unparalleled luxury in the heart of Bangkok. The Siam Heritage Sanctuary offers a profound sense of place, blending deep-rooted Thai architectural traditions with exquisite contemporary comfort. Set amidst lush, manicured gardens along the historic Chao Phraya River, this exclusive retreat promises serenity and absolute privacy.",
    descriptionExtra: "Each villa is a masterpiece of design — teak interiors, towering vaulted ceilings and curated antiques. Step outside to your expansive private deck, where a personal infinity pool merges visually with the river beyond.",
    facilities: ["Free High-Speed Wi-Fi", "Private Infinity Pool", "24/7 Butler Service", "Holistic Spa", "State-of-the-Art Gym", "Fine Dining"],
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
    addressLabel: "Sukhumvit, Bangkok, Thailand",
    lat: 13.7423,
    lng: 100.5612,
    ratingAvg: 4.7,
    totalReviews: 88,
    basePrice: 14200,
    description: "Sleek executive suites high above Sukhumvit, with panoramic skyline views and direct access to the BTS for effortless city exploring.",
    descriptionExtra: "Floor-to-ceiling glass wraps every suite, turning the Bangkok skyline into the room's centrepiece day and night.",
    facilities: ["Free Wi-Fi", "Pool", "Gym", "Rooftop Bar"],
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
    category: "B&B",
    categories: ["B&B"],
    region: "central",
    city: "Ayutthaya",
    district: "Phra Nakhon Si Ayutthaya",
    addressLabel: "Ayutthaya, Thailand",
    lat: 14.3532,
    lng: 100.5684,
    ratingAvg: 4.8,
    totalReviews: 92,
    basePrice: 8200,
    description: "A peaceful riverside estate facing the ancient temples of Ayutthaya, blending traditional wooden pavilions with modern comforts.",
    descriptionExtra: "Dine on the river terrace as illuminated stupas glow in the distance, then retire to bedrooms scented with natural cedar.",
    facilities: ["Free Wi-Fi", "Breakfast Included", "River View"],
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
    addressLabel: "Sai Yok, Kanchanaburi, Thailand",
    lat: 14.2831,
    lng: 98.9842,
    ratingAvg: 4.6,
    totalReviews: 70,
    basePrice: 6500,
    description: "Floating eco-villas moored on the Kwai Noi River, surrounded by sheer limestone cliffs and untouched rainforest.",
    descriptionExtra: "Step directly from your bedroom terrace into the cool, flowing river water for an authentic jungle experience.",
    facilities: ["River Access", "Spa", "Free Wi-Fi"],
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
    addressLabel: "Hua Hin, Thailand",
    lat: 12.5684,
    lng: 99.9577,
    ratingAvg: 4.9,
    totalReviews: 104,
    basePrice: 16800,
    description: "Colonial-inspired beachfront residence with a manicured lawn rolling down to the golden sands of Hua Hin's royal coast.",
    descriptionExtra: "Generous veranda living, private infinity pool and dedicated staff make this villa the choice for multi-generational escapes.",
    facilities: ["Free Wi-Fi", "Pool", "Beach Access", "Spa"],
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
    addressLabel: "Mae Rim, Chiang Mai, Thailand",
    lat: 18.9142,
    lng: 98.9452,
    ratingAvg: 4.7,
    totalReviews: 76,
    basePrice: 9500,
    description: "Canopy tents suspended above a private valley, with open-air bathing, forest dining and guided morning treks through the highlands surrounding Chiang Mai.",
    descriptionExtra: "A rare blend of adventure and comfort — wake to birdsong and mist rolling through the canopy below your deck.",
    facilities: ["Free Wi-Fi", "Breakfast Included", "Forest Dining"],
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
    category: "B&B",
    categories: ["B&B"],
    region: "north",
    city: "Mae Hong Son",
    district: "Pai",
    addressLabel: "Pai, Mae Hong Son, Thailand",
    lat: 19.3582,
    lng: 98.4412,
    ratingAvg: 4.6,
    totalReviews: 58,
    basePrice: 7500,
    description: "Perched on a ridge above the Pai valley, this timber lodge wakes to a sea of morning mist rolling between the hills.",
    descriptionExtra: "Floor-to-ceiling windows frame the valley from every room, with a wraparound deck built for slow mountain mornings.",
    facilities: ["Free Wi-Fi", "Breakfast Included", "Mountain View"],
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
    facilities: ["Free Wi-Fi", "River View", "Pool"],
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
    category: "B&B",
    categories: ["B&B"],
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
    facilities: ["Free Wi-Fi", "Breakfast Included", "Cooking Class"],
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
    facilities: ["Free Wi-Fi", "River View", "Pool"],
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
    addressLabel: "Khao Yai, Thailand",
    lat: 14.5423,
    lng: 101.4112,
    ratingAvg: 4.9,
    totalReviews: 83,
    basePrice: 11000,
    description: "Tuscan-inspired private stone villas tucked between rolling grapevines with cool mountain breezes year-round.",
    descriptionExtra: "Private wine tastings on your terrace, outdoor fireplace for chilly evenings, and waking to mist over the vines.",
    facilities: ["Free Wi-Fi", "Wine Tasting", "Pool", "Spa"],
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
    addressLabel: "Pansea Beach, Phuket, Thailand",
    lat: 7.9842,
    lng: 98.2778,
    ratingAvg: 4.9,
    totalReviews: 142,
    basePrice: 18500,
    description: "Iconic pavilions set within a coconut grove overlooking the Andaman Sea, setting the global standard for secluded coastal luxury.",
    descriptionExtra: "Private black-tiled swimming pool, direct steps to Pansea Beach's secluded cove and a holistic wellness centre.",
    facilities: ["Free Wi-Fi", "Pool", "Spa", "Gym", "Beach Access"],
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
    addressLabel: "Railay Beach, Krabi, Thailand",
    lat: 8.0121,
    lng: 98.8398,
    ratingAvg: 4.7,
    totalReviews: 89,
    basePrice: 13500,
    description: "Accessible only by sea, these cliffside pavilions sit wedged between towering limestone karsts and turquoise Andaman waters.",
    descriptionExtra: "Listen to the gentle slap of waves against the rocks below while watching rock climbers scale the sheer limestone faces.",
    facilities: ["Free Wi-Fi", "Pool", "Beach Access", "Spa"],
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
    addressLabel: "Koh Samui, Thailand",
    lat: 9.5784,
    lng: 100.0124,
    ratingAvg: 4.8,
    totalReviews: 116,
    basePrice: 17200,
    description: "Hillside pool villas cascading down a private bay with uninterrupted views across the Gulf of Thailand.",
    descriptionExtra: "Surrounded by tropical gardens and fruit orchards, every villa offers an infinity-edge pool that merges with the horizon.",
    facilities: ["Free Wi-Fi", "Pool", "Beach Access", "Spa", "Gym"],
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

async function seedAccommodations() {
  await Accommodation.deleteMany({});
  await Accommodation.insertMany(accommodations);
  console.log(`Accommodation seed completed ✅ (${accommodations.length} accommodations)`);
}

export default seedAccommodations;
