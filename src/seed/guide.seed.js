import Guide from "../models/Guide.js";

const AVATAR_POOLS = {
  male: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80"
  ],
  female: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
  ]
};

const THAI_NAMES = {
  male: [
    { name: "Somchai Jaidee", nick: "Chai" },
    { name: "Narin Thongkham", nick: "Rin" },
    { name: "Kittisak Wongsuwan", nick: "Kit" },
    { name: "Teerapat Saelim", nick: "Pat" },
    { name: "Anan Sukprasert", nick: "Nan" },
    { name: "Worawut Chanthara", nick: "Wut" },
    { name: "Sarawut Boonme", nick: "Golf" },
    { name: "Thanawat Panyasiri", nick: "Ton" },
    { name: "Peerapat Rattanapong", nick: "Peep" },
    { name: "Natthaphon Kaewmanee", nick: "Nat" },
    { name: "Chakrit Siriphan", nick: "Krit" },
    { name: "Prasert Chaiwong", nick: "Sert" },
    { name: "Komsan Intarawong", nick: "San" },
    { name: "Preecha Charoensuk", nick: "Cha" },
    { name: "Surachai Phromma", nick: "Sur" }
  ],
  female: [
    { name: "Apinya Srisuk", nick: "Ploy" },
    { name: "Ploy Pailin", nick: "Lin" },
    { name: "Supaporn Chanthawong", nick: "Porn" },
    { name: "Kanya Rattanakorn", nick: "Ya" },
    { name: "Waraporn Saeli", nick: "Wa" },
    { name: "Natthamon Bunyarat", nick: "Mon" },
    { name: "Siriporn Wongthep", nick: "Siri" },
    { name: "Pornthip Chaisri", nick: "Thip" },
    { name: "Pimchanok Suwanna", nick: "Pim" },
    { name: "Anchalee Phasuk", nick: "Ann" },
    { name: "Mayuree Raksaphol", nick: "May" },
    { name: "Wanida Srisawat", nick: "Da" },
    { name: "Sunisa Phongphat", nick: "Nisa" },
    { name: "Benjarat Thepthai", nick: "Ben" },
    { name: "Chanikarn Buakhiao", nick: "Karn" }
  ]
};

const PROVINCES_CONFIG = [
  // 1. North (3)
  {
    name: "Chiang Mai",
    nameTh: "เชียงใหม่",
    code: "50",
    region: "Northern Thailand",
    targetCount: 6,
    landmarks: ["Doi Suthep", "Wat Chedi Luang", "Nimmanhaemin", "Doi Inthanon", "Sticky Waterfalls", "Mae Rim Valley"],
    specialties: [
      { title: "Lanna Heritage & Ancient Temples", desc: "Discover centuries-old teakwood temples, sacred chanting rituals, and ancient Lanna kingdom history.", img: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80" },
      { title: "Northern Street Food & Night Bazaar", desc: "Taste Khao Soi, Sai Oua sausage, and night bazaar delicacies with a local food expert.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
      { title: "Doi Inthanon Nature & Waterfall Trek", desc: "Hike misty summit trails, royal twin pagodas, and Karen hill tribe coffee plantations.", img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Chiang Rai",
    nameTh: "เชียงราย",
    code: "57",
    region: "Northern Thailand",
    targetCount: 6,
    landmarks: ["White Temple (Wat Rong Khun)", "Blue Temple", "Golden Triangle", "Doi Mae Salong", "Singha Park", "Choui Fong Tea Plantation"],
    specialties: [
      { title: "Iconic White & Blue Temples Art Tour", desc: "Deep dive into contemporary Buddhist masterpieces crafted by Chalermchai Kositpipat.", img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80" },
      { title: "Golden Triangle & Mekong River Cruise", desc: "Historic exploration of the three-country border (Thailand, Laos, Myanmar) and opium museum.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Nan",
    nameTh: "น่าน",
    code: "55",
    region: "Northern Thailand",
    targetCount: 5,
    landmarks: ["Wat Phumin", "Bo Kluea Ancient Salt Well", "Pua Rice Terraces", "Doi Samer Dao", "Nan Riverside Art Gallery"],
    specialties: [
      { title: "Wat Phumin Whispering Love Heritage Walk", desc: "Discover world-famous murals, Tai Lue culture, and serene slow-life town walks.", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80" },
      { title: "Bo Kluea Salt Wells & Scenic Mountain Pass", desc: "Drive along scenic highway No. 3 and explore 800-year-old rock salt extraction pits.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" }
    ]
  },

  // 2. Central (3)
  {
    name: "Bangkok",
    nameTh: "กรุงเทพมหานคร",
    code: "10",
    region: "Central Thailand",
    targetCount: 6,
    landmarks: ["Grand Palace", "Wat Pho", "Wat Arun", "Yaowarat Chinatown", "Chatuchak Market", "Chao Phraya River"],
    specialties: [
      { title: "Royal Grand Palace & Emerald Buddha", desc: "Comprehensive historical journey through Siamese royal court ceremonies and architecture.", img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80" },
      { title: "Michelin Guide Yaowarat Street Food Crawl", desc: "Explore neon-lit alleys, legendary roasted chestnuts, dim sum, and seafood sizzling woks.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
      { title: "Canal Longtail Boat & Thonburi Klongs", desc: "Cruise through Venice of the East waterways witnessing authentic riverside wooden homes.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Phra Nakhon Si Ayutthaya",
    nameTh: "พระนครศรีอยุธยา",
    code: "14",
    region: "Central Thailand",
    targetCount: 6,
    landmarks: ["Wat Mahathat", "Wat Chaiwatthanaram", "Wat Phra Si Sanphet", "Ayutthaya Historical Park", "Bang Pa-In Summer Palace"],
    specialties: [
      { title: "UNESCO Ancient Capital Ruins Cycling", desc: "Pedal through evocative red-brick temples, giant Buddha head in tree roots, and river moats.", img: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80" },
      { title: "Ayutthaya Giant River Prawn Gourmet Feast", desc: "Savor colossal grilled river prawns by the water and legendary Roti Sai Mai sweets.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Nonthaburi",
    nameTh: "นนทบุรี",
    code: "12",
    region: "Central Thailand",
    targetCount: 5,
    landmarks: ["Koh Kret Pottery Island", "Wat Sangkhathan", "Wat Chalo", "Chao Phraya Express Pier", "Kanchanaphisek Park"],
    specialties: [
      { title: "Koh Kret Mon Pottery & Food Island Tour", desc: "Bicycle around a peaceful car-free river island, try Mon terracotta crafts and local flower fritters.", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80" }
    ]
  },

  // 3. Isan (3)
  {
    name: "Nakhon Ratchasima",
    nameTh: "นครราชสีมา",
    code: "30",
    region: "Northeastern Thailand",
    targetCount: 6,
    landmarks: ["Khao Yai National Park", "Phimai Historical Park", "PB Valley Winery", "Thao Suranari Monument", "Dan Kwian Pottery Village"],
    specialties: [
      { title: "Khao Yai Wildlife Night Safari & Waterfalls", desc: "Encounter wild elephants, hornbills, and gibbons with a certified biodiversity ranger.", img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80" },
      { title: "Phimai Khmer Sanctuary Archaeological Tour", desc: "Explore the ancient royal highway terminus and Angkor-style sandstone temple sanctuary.", img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Khon Kaen",
    nameTh: "ขอนแก่น",
    code: "40",
    region: "Northeastern Thailand",
    targetCount: 6,
    landmarks: ["Kaen Nakhon Lake", "Phu Wiang Dinosaur Park", "Chonnabot Silk Village", "Wat Nong Wang 9-Tier Stupa"],
    specialties: [
      { title: "Isan Mudmee Silk Weaving Workshop", desc: "Learn intricate silk cocoon harvesting and loom weaving techniques from village matriarchs.", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80" },
      { title: "Authentic Isan Somtum & Larb Culinary Trail", desc: "Hands-on spicy papaya salad mortar pounding, sticky rice baskets, and char-grilled chicken.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Udon Thani",
    nameTh: "อุดรธานี",
    code: "41",
    region: "Northeastern Thailand",
    targetCount: 5,
    landmarks: ["Red Lotus Sea (Talay Bua Daeng)", "Ban Chiang UNESCO Heritage Site", "Wat Pa Phu Kon", "Kham Chanod Sanctuary"],
    specialties: [
      { title: "Sunrise Boat Cruise on Red Lotus Sea", desc: "Glide through millions of blooming pink water lilies on Nong Han Kumphawapi Lake at dawn.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
      { title: "Ban Chiang 5,000-Year Bronze Age Culture", desc: "UNESCO World Heritage exploration of prehistoric spiral earthenware pottery and tombs.", img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80" }
    ]
  },

  // 4. South (3)
  {
    name: "Phuket",
    nameTh: "ภูเก็ต",
    code: "83",
    region: "Southern Thailand",
    targetCount: 6,
    landmarks: ["Old Phuket Town", "Promthep Cape", "Big Buddha Phuket", "Wat Chalong", "Patong Beach", "Kata Noi Viewpoint"],
    specialties: [
      { title: "Old Phuket Town Sino-Portuguese Heritage Walk", desc: "Stroll pastel shophouses, discover tin-mining history, and taste Michelin Peranakan cuisine.", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80" },
      { title: "Phang Nga Bay Catamaran & Sea Cave Kayak", desc: "Paddle through hidden limestone lagoons and admire the iconic James Bond Island needle rock.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Surat Thani",
    nameTh: "สุราษฎร์ธานี",
    code: "84",
    region: "Southern Thailand",
    targetCount: 6,
    landmarks: ["Cheow Lan Lake (Khao Sok)", "Koh Samui", "Koh Phangan", "Koh Tao", "Ang Thong National Marine Park"],
    specialties: [
      { title: "Khao Sok Cheow Lan Emerald Lake Safari", desc: "Marvel at Guilin-style karst spires, emerald green waters, and overnight floating bamboo villas.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
      { title: "Ang Thong Marine Park 42-Island Adventure", desc: "Hike to the breathtaking Emerald Lake (Talay Nai) viewpoint and snorkel vibrant coral reefs.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Krabi",
    nameTh: "กระบี่",
    code: "81",
    region: "Southern Thailand",
    targetCount: 5,
    landmarks: ["Railay Beach", "Ao Nang Beach", "Emerald Pool (Sa Morakot)", "Tiger Cave Temple (Wat Tham Suea)", "Hong Islands"],
    specialties: [
      { title: "Railay Bay Climbing & Secret Lagoon Hike", desc: "World-class limestone cliff rock climbing suited for both beginners and experienced climbers.", img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80" },
      { title: "Krabi 4-Island Speedboat Snorkel Tour", desc: "Experience the famous Thale Waek sandbar connection at low tide and turquoise coral lagoons.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" }
    ]
  },

  // 5. East (3)
  {
    name: "Chonburi",
    nameTh: "ชลบุรี",
    code: "20",
    region: "Eastern Thailand",
    targetCount: 6,
    landmarks: ["Sanctuary of Truth", "Koh Larn", "Bang Saen Beach", "Khao Kheow Open Zoo", "Nong Nooch Tropical Garden"],
    specialties: [
      { title: "Sanctuary of Truth All-Wood Architectural Marvel", desc: "Detailed philosophy and hand-carved wood sculpture insights into Thailand's masterpiece.", img: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80" },
      { title: "Koh Larn Clear Water Catamaran & Water Sports", desc: "Escape to white sand beaches just 15 minutes off Pattaya for parasailing and reef walks.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Rayong",
    nameTh: "ระยอง",
    code: "21",
    region: "Eastern Thailand",
    targetCount: 5,
    landmarks: ["Koh Samet", "Mae Ramphueng Beach", "Suphattra Land Fruit Orchard", "Prasae Mangrove Forest Boardwalk"],
    specialties: [
      { title: "Suphattra Land Tropical Fruit Buffet Experience", desc: "Taste King of Fruits Durian, Mangosteen, and Rambutan fresh from organic agro-orchards.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
      { title: "Koh Samet Island Hopping & Fire Show Spectacle", desc: "Cruise idyllic coves, spot sea turtles, and enjoy thrilling beach fire baton shows at night.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Trat",
    nameTh: "ตราด",
    code: "23",
    region: "Eastern Thailand",
    targetCount: 5,
    landmarks: ["Koh Chang", "Koh Kood", "Koh Mak", "Klong Plu Waterfall", "Bang Bao Fishermen Pier"],
    specialties: [
      { title: "Koh Kood Pristine Beach & Jungle Falls Eco Tour", desc: "Discover Thailand's last unspoiled paradise islands with crystal clear rivers and coconut groves.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" }
    ]
  },

  // 6. West (3)
  {
    name: "Kanchanaburi",
    nameTh: "กาญจนบุรี",
    code: "71",
    region: "Western Thailand",
    targetCount: 6,
    landmarks: ["Bridge on the River Kwai", "Erawan National Park", "Hellfire Pass", "Death Railway", "Sai Yok Waterfall"],
    specialties: [
      { title: "Death Railway & River Kwai WWII History Walk", desc: "Moving historical accounts, walking across the wooden Tham Krasae viaduct along cliffs.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
      { title: "Erawan 7-Tier Emerald Cascades Trekking", desc: "Swim in mineral-rich turquoise limestone pools surrounded by lush tropical rainforest.", img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Prachuap Khiri Khan",
    nameTh: "ประจวบคีรีขันธ์",
    code: "77",
    region: "Western Thailand",
    targetCount: 5,
    landmarks: ["Khao Sam Roi Yot National Park", "Phraya Nakhon Cave", "Hua Hin Railway Station", "Cicada Market", "Pranburi Forest Park"],
    specialties: [
      { title: "Phraya Nakhon Cave Royal Pavilion Expedition", desc: "Trek to the magical subterranean royal pavilion illuminated by sunbeams through cave roof.", img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80" },
      { title: "Hua Hin Vintage Royal Heritage & Art Market Walk", desc: "Step back into the 1920s royal seaside glamour, vintage railway architecture, and art stalls.", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    name: "Phetchaburi",
    nameTh: "เพชรบุรี",
    code: "76",
    region: "Western Thailand",
    targetCount: 5,
    landmarks: ["Phra Nakhon Khiri (Khao Wang)", "Tham Khao Luang Cave", "Cha-am Beach", "Kaeng Krachan National Park"],
    specialties: [
      { title: "Khao Wang Mountain Palace & Cable Car Tour", desc: "Explore King Rama IV hilltop summer observatory palace overlooking scenic palm plains.", img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80" },
      { title: "Tham Khao Luang Sunbeam Cave Shrine", desc: "Marvel at hundreds of ancient Buddha statues bathed in natural sunlight cascading from above.", img: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80" }
    ]
  }
];

const LANGUAGE_COMBOS = [
  ["Thai", "English"],
  ["Thai", "English", "Mandarin"],
  ["Thai", "English", "Japanese"],
  ["Thai", "English", "French"],
  ["Thai", "English", "German"],
  ["Thai", "English", "Korean"]
];

function generateGuides() {
  const allGuides = [];
  let licenseCounter = 1001;

  for (let pIdx = 0; pIdx < PROVINCES_CONFIG.length; pIdx++) {
    const prov = PROVINCES_CONFIG[pIdx];

    for (let gIdx = 0; gIdx < prov.targetCount; gIdx++) {
      const isFemale = (gIdx % 2 === 1);
      const gender = isFemale ? "Female" : "Male";
      const namePool = isFemale ? THAI_NAMES.female : THAI_NAMES.male;
      const avatarPool = isFemale ? AVATAR_POOLS.female : AVATAR_POOLS.male;

      const person = namePool[(pIdx * 3 + gIdx) % namePool.length];
      const photo = avatarPool[(pIdx * 2 + gIdx) % avatarPool.length];

      const dailyFee = 1600 + ((pIdx + gIdx * 3) % 8) * 200; // 1,600 - 3,000 THB
      const overtimeRate = Math.round(dailyFee * 0.15); // ~240 - 450 THB
      const rating = Number((4.7 + ((pIdx + gIdx) % 4) * 0.1).toFixed(1)); // 4.7 - 5.0
      const reviews = 20 + ((pIdx * 7 + gIdx * 11) % 85);
      const experience = 3 + ((pIdx + gIdx * 2) % 12);
      const travelers = experience * 120 + ((pIdx * 13 + gIdx * 19) % 300);

      const licenseNumber = `TG-${prov.code}-${licenseCounter++}`;
      const cleanNick = person.nick.toLowerCase();
      const cleanName = person.name.split(" ")[0].toLowerCase();
      const cleanProv = prov.name.toLowerCase().replace(/[^a-z]/g, "");

      const langCombo = LANGUAGE_COMBOS[(pIdx + gIdx) % LANGUAGE_COMBOS.length];

      // Build 2 specialized services per guide
      const services = prov.specialties.map((spec, sIdx) => ({
        service_id: `svc-${prov.code}-${gIdx + 1}-${sIdx + 1}`,
        title: spec.title,
        description: spec.desc,
        image_url: spec.img
      }));

      const guideDoc = {
        name: person.name,
        nickname: person.nick,
        gender,
        guide_photo: photo,
        phone: `08${(1 + (pIdx % 9))}-${String(100 + (gIdx * 77) % 900)}-${String(1000 + (licenseCounter * 7) % 9000)}`,
        email: `${cleanNick}.${cleanName}@gothailand-guide.com`,
        line_id: `@guide_${cleanNick}_${cleanProv.slice(0, 4)}`,
        province: prov.name,
        daily_fee: dailyFee,
        overtime_rate_perhour: overtimeRate,
        license_number: licenseNumber,
        license_category: gIdx === 0 ? "General" : (gIdx % 2 === 0 ? "Specific Region" : "Local"),
        scope_type: gIdx % 2 === 0 ? "Inbound & Domestic" : "Domestic Eco-Tourism",
        scope_description: `Certified professional tourist guide authorized for cultural, heritage, and nature tourism in ${prov.name} and ${prov.region}.`,
        permitted_regions: [prov.region],
        issue_date: new Date(2021, (pIdx % 12), 10 + gIdx),
        expiry_date: new Date(2028, (pIdx % 12), 10 + gIdx),
        verified: true,
        language: langCombo,
        service_areas: prov.landmarks,
        base_location: `Mueang ${prov.name} District, ${prov.name}`,
        max_guest: 8 + (gIdx % 5) * 2, // 8 - 16 guests
        guide_service_duration_per_day: 8,
        status: gIdx === 4 && pIdx % 3 === 0 ? "Busy" : "Available",
        rating_avg: rating,
        total_reviews: reviews,
        years_experience: experience,
        total_travelers: travelers,
        description: `Professional licensed guide based in ${prov.name} with over ${experience} years of expertise. Passionate about sharing authentic local culture, hidden gems, and memorable stories with travelers from all over the world.`,
        specialized_services: services
      };

      allGuides.push(guideDoc);
    }
  }

  return allGuides;
}

export const guides = generateGuides();

async function seedGuides() {
  await Guide.deleteMany({});
  await Guide.insertMany(guides);
  console.log(`Guide seed completed ✅ (${guides.length} guides across ${PROVINCES_CONFIG.length} major provinces)`);
}

export default seedGuides;
