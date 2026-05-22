import taj_mahal from "./taj_mahal.jpg";
import sea_beach from "./sea_beach.jpg";
import island from "./island.jpg";
import rajasthan_desart from "./rajasthan.jpg"
import himachal_mountain from "./himachal-pradesh.jpg"
import chatbot_icon from "./generative.png"
import male_avatar from "./man.png";
import female_avatar from "./avatar.png";

export const assets = { taj_mahal, sea_beach, island, rajasthan_desart, himachal_mountain, chatbot_icon, male_avatar, female_avatar };

export const dummyPlaces = {
  kolkata: [
    {
      id: 1,
      name: "Victoria Memorial",
      distance: 3.2,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800"
    },

    {
      id: 2,
      name: "Howrah Bridge",
      distance: 5.1,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?w=800"
    },

    {
      id: 3,
      name: "Dakshineswar Temple",
      distance: 8.5,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800"
    },

    {
      id: 4,
      name: "Indian Museum",
      distance: 2.8,
      rating: 4.3,
      img: "https://plus.unsplash.com/premium_photo-1697729447666-c39f50d595ea?w=800"
    }
  ],

  delhi: [
    {
      id: 5,
      name: "Red Fort",
      distance: 4.1,
      rating: 4.6,
      img: "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?w=800"
    },

    {
      id: 6,
      name: "India Gate",
      distance: 3.4,
      rating: 4.5,
      img: "https://plus.unsplash.com/premium_photo-1697730429201-381b71f61427?w=800"
    },

    {
      id: 7,
      name: "Qutub Minar",
      distance: 9.2,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1667849521212-e9843b89f322?w=800"
    },

    {
      id: 8,
      name: "Lotus Temple",
      distance: 6.7,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1688257609244-3f2a893f19d6?w=800"
    }
  ]

};

export const mountains = [
  {
    id: 1,
    title: "The Himalayan Orchard Home",
    location: "Mukteshwar, Uttarakhand, India",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    ],
    capacity: {
      guests: 8,
      bedrooms: 3,
      beds: 3,
      bathrooms: 3
    },
    host: "Anshu Rawat",
    features: ["Mountain View", "Eco-Friendly", "Yoga Space", "Apple Orchard"],
    about: "A serene 3-bedroom cottage nestled within a private apple orchard. Experience 180-degree views of the Nanda Devi range, perfect for mindful retreats and family bonding.",
    offers: ["Free WiFi", "Private Parking", "Bonfire Pit", "Lawn access"],
    foods: ["Organic Kumaoni Thali", "Homemade Jams", "Unlimited Himalayan Tea"],
    pricing: {
      price: 8100,
      discounted_price: 5600
    },
    rating: 4.9,
    review_count: 42,
    reviews: [
      "The view of the peaks at sunrise is life-changing.",
      "Authentic food and very hospitable host.",
      "Clean rooms and very peaceful environment."
    ],
    likes: 220,
    shares: 140,
    terms_and_conditions: "Free cancellation up to 14 days before check-in. No smoking indoors."
  },
  {
    id: 2,
    title: "Cloud-9 Glass Suite",
    location: "Manali, Himachal Pradesh, India",
    images: [
      "https://images.pexels.com/photos/15595766/pexels-photo-15595766.jpeg",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Olive Stays",
    features: ["Floor-to-ceiling windows", "Jacuzzi", "Valley View", "Heated Floors"],
    about: "A luxury boutique suite designed for couples. Situated on a ridge in Old Manali, it offers unparalleled views of the Beas River and snow-capped peaks.",
    offers: ["Smart TV", "High-speed Fiber WiFi", "Room Service", "Laundry"],
    foods: ["Continental Breakfast", "Italian Dinner Menu", "Local Apple Cider"],
    pricing: {
      price: 5000,
      discounted_price: 3800
    },
    rating: 4.6,
    review_count: 210,
    reviews: [
      "Most romantic spot in Manali, hands down.",
      "The glass walls make you feel like you're sleeping in the clouds.",
      "Excellent service but the climb to the property is a bit steep."
    ],
    likes: 350,
    shares: 200,
    terms_and_conditions: "Non-refundable booking. Adults only property."
  },
  {
    id: 3,
    title: "Kanchenjunga Mist Retreat",
    location: "Gangtok, Sikkim, India",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Pema Dorjee",
    features: ["Traditional Decor", "Buddhist Library", "Monastery Views"],
    about: "Immerse yourself in Sikkimese culture. This stay is located just minutes away from Enchey Monastery and offers a quiet space for spiritual reflection.",
    offers: ["Guided Treks", "Heated Blankets", "Shared Lounge"],
    foods: ["Authentic Momos", "Thukpa", "Butter Tea"],
    pricing: {
      price: 3200,
      discounted_price: 2400
    },
    rating: 4.8,
    review_count: 85,
    reviews: [
      "Pema is a wonderful host. The library is a hidden gem.",
      "Best homemade momos I've ever had.",
      "The view of Kanchenjunga from the balcony is breathtaking."
    ],
    likes: 185,
    shares: 95,
    terms_and_conditions: "Government ID required for Inner Line Permit assistance."
  },
  {
    id: 4,
    title: "Tea Garden Estate Stay",
    location: "Munnar, Kerala, India",
    images: [
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
    ],
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    },
    host: "Mathew Jacob",
    features: ["Tea Plantation Walk", "Colonial Architecture", "Bird Watching"],
    about: "A restored colonial bungalow surrounded by emerald tea gardens. Experience the mist rolling over the Western Ghats from your private veranda.",
    offers: ["Plantation Tour", "Cycles for rent", "Work-from-home setup"],
    foods: ["Kerala Sadya", "Freshly brewed Estate Tea", "Appam & Stew"],
    pricing: {
      price: 6500,
      discounted_price: 4950
    },
    rating: 4.7,
    review_count: 120,
    reviews: [
      "Stunning greenery as far as the eye can see.",
      "Very calm and quiet. Ideal for writers.",
      "Delicious Kerala food and great hospitality."
    ],
    likes: 410,
    shares: 180,
    terms_and_conditions: "Quiet hours after 10 PM. No plastic policy on estate."
  },
  {
    id: 5,
    title: "The Pine Shadow Cabin",
    location: "Gulmarg, Jammu & Kashmir, India",
    images: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    ],
    capacity: {
      guests: 6,
      bedrooms: 2,
      beds: 4,
      bathrooms: 2
    },
    host: "Farooq Ahmed",
    features: ["Fireplace", "Ski-in Access", "Attic Bedroom", "Wood Cabin"],
    about: "A classic A-frame wooden cabin located near the Gulmarg Gondola. Perfect for winter sports enthusiasts and those who love the snow.",
    offers: ["Ski Gear Storage", "Central Heating", "Airport Shuttle"],
    foods: ["Kashmiri Wazwan", "Kahwa", "Fresh Walnuts"],
    pricing: {
      price: 9500,
      discounted_price: 7200
    },
    rating: 4.5,
    review_count: 98,
    reviews: [
      "Cozy fireplace and the best Kahwa in the valley.",
      "Perfect location if you are here to ski.",
      "The attic room is so charming!"
    ],
    likes: 530,
    shares: 310,
    terms_and_conditions: "Full refund if Gondola is closed due to weather. Heavy woolens recommended."
  }
];

export const snows = [
  {
    id: 6,
    title: "The Cedar Wood Cabin",
    location: "Auli, Uttarakhand, India",
    images: [
      "https://assets.cntraveller.in/photos/6937a549e27e0cf2cc656fe4/master/w_1024%2Cc_limit/83b325906f139009ac462b716a3fdfc3.jpeg",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
    ],
    capacity: {
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    host: "Kavita Sharma",
    features: ["Ski-in Access", "Glass Roof", "Mountain Treks", "Traditional Architecture"],
    about: "Located right on the ski slopes of Auli, this cedar-wood cabin features a glass roof for stargazing and unparalleled views of Nanda Devi. The perfect retreat for winter sports enthusiasts.",
    offers: ["Free WiFi", "Electric Heaters", "Ski Equipment Storage", "Bonfire"],
    foods: ["Garhwali Thali", "Hot Chocolate", "Freshly Baked Bread"],
    pricing: {
      price: 4500,
      discounted_price: 3200
    },
    rating: 4.9,
    review_count: 55,
    reviews: [
      "Waking up to the view of Nanda Devi was surreal.",
      "The cabin stays surprisingly warm even in sub-zero temps.",
      "Best place to learn skiing in India!"
    ],
    likes: 120,
    shares: 45,
    terms_and_conditions: "Non-refundable during peak snow season (Dec-Feb)."
  },
  {
    id: 7,
    title: "Afsana Riverside Retreat",
    location: "Pahalgam, Jammu & Kashmir, India",
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/bf/27/89/caption.jpg?h=-1&s=1&w=700",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Heena Khan",
    features: ["River Facing", "Snow Garden", "Persian Carpets", "Quiet Zone"],
    about: "A peaceful cottage tucked away by the Lidder River. Experience the magic of a Kashmiri winter with traditional Kangris and the soothing sound of the flowing river.",
    offers: ["Free WiFi", "Private Parking", "Woolen Blankets", "Room Service"],
    foods: ["Kashmiri Rogan Josh", "Noon Chai", "Walnut Fudge"],
    pricing: {
      price: 3500,
      discounted_price: 2800
    },
    rating: 4.8,
    review_count: 130,
    reviews: [
      "The river view while it's snowing is pure magic.",
      "Heena is an amazing host, felt like home.",
      "The food was authentic and delicious."
    ],
    likes: 95,
    shares: 55,
    terms_and_conditions: "Check-in at 12 PM. Smoking allowed in outdoor garden only."
  },
  {
    id: 8,
    title: "Ladhaki Stone House",
    location: "Leh, Ladakh, India",
    images: [
      "https://gos3.ibcdn.com/d05c54d5-2b54-4497-acfc-05ce9461ae53.jpeg",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Tenzin Namgyal",
    features: ["Solar Heated", "Ancient Architecture", "Monastery Proximity", "Mountain View"],
    about: "A traditional Ladakhi home built with mud and stone. Stay warm with ancient insulation techniques while looking out at the stark, snowy beauty of the Himalayas.",
    offers: ["Airport Pickup", "Oxygen Cylinders", "Heated Beds", "Work Desk"],
    foods: ["Skyu", "Butter Tea", "Local Apricot Jam"],
    pricing: {
      price: 2800,
      discounted_price: 2100
    },
    rating: 4.7,
    review_count: 310,
    reviews: [
      "Unique experience. Very warm despite the cold outside.",
      "Tenzin helped us with local permits. Great host.",
      "The view of the Leh Palace from here is amazing."
    ],
    likes: 260,
    shares: 80,
    terms_and_conditions: "No prepayment required. 24-hour acclimatization advised."
  },
  {
    id: 9,
    title: "Mist & Snow Villa",
    location: "Tawang, Arunachal Pradesh, India",
    images: [
      "https://assets.cntraveller.in/photos/69a93f86399b89a664c43764/master/w_1600%2Cc_limit/Screenshot%25202026-03-05%2520at%25201.57.43%25E2%2580%25AFPM.png",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1494526585095-c41746248156"
    ],
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    },
    host: "Dorjee Khandu",
    features: ["High Altitude", "Balcony", "Modern Amenities", "Temple View"],
    about: "Perched high in the clouds of Tawang, this villa offers modern comfort in one of India's most remote snow destinations. Close to the famous Tawang Monastery.",
    offers: ["Free WiFi", "Full Kitchen", "Parking", "Electric Kettles"],
    foods: ["Thukpa", "Zan", "Chhurpi (Yak Cheese)"],
    pricing: {
      price: 4200,
      discounted_price: 3600
    },
    rating: 4.9,
    review_count: 100,
    reviews: [
      "Truly a hidden gem in the Northeast.",
      "The snowy landscape was like a painting.",
      "Host was incredibly helpful with travel tips."
    ],
    likes: 180,
    shares: 65,
    terms_and_conditions: "Inner Line Permit (ILP) required for entry."
  },
  {
    id: 10,
    title: "The Alpine Attic",
    location: "Srinagar, Jammu & Kashmir, India",
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMwNDg4MjU3MTk2MzUyMjQyOA%3D%3D/original/c9b554c1-86b7-45aa-963a-c28ce2ea90a4.jpeg?im_w=720",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Zubair Ahmed",
    features: ["Attic Style", "Central Heating", "Pashmina Decor", "Cozy Ambience"],
    about: "A charming attic stay in the heart of Srinagar. Experience a white winter with a panoramic view of the snow-laden chinar trees and the Zabarwan range.",
    offers: ["Free WiFi", "Caretaker", "Laundry Service", "Airport Shuttle"],
    foods: ["Gustaaba", "Sheermal", "Saffron Kehwa"],
    pricing: {
      price: 2500,
      discounted_price: 1950
    },
    rating: 5.0,
    review_count: 120,
    reviews: [
      "The best hospitality I've ever experienced.",
      "Coziest room in Srinagar!",
      "Kehwa by the window while it snows—perfection."
    ],
    likes: 310,
    shares: 115,
    terms_and_conditions: "Check-out at 11 AM. Pre-paid mobile networks may not work."
  }
];

export const rivers = [
  {
    id: 11,
    title: "Beas Whispers Retreat",
    location: "Old Manali, Himachal Pradesh, India",
    images: [
      "https://images.unsplash.com/photo-1590515152002-3c812c85b1c5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Ankita Verma",
    features: ["Riverfront Balcony", "Sound of Rapids", "Deodar Forest Access", "Workstation"],
    about: "A serene riverside sanctuary in Old Manali. The property sits directly above the Beas River, allowing guests to fall asleep to the sound of rushing water. Perfect for digital nomads and couples.",
    offers: ["High-Speed WiFi", "Private Balcony", "Power Backup", "Hammock Area"],
    foods: ["Breakfast Bowls", "Local Trouts", "Organic Himalayan Tea"],
    pricing: {
      price: 2400,
      discounted_price: 2198
    },
    rating: 4.5,
    review_count: 180,
    reviews: [
      "The most relaxing sound of the river right under the window.",
      "Clean rooms and very fast WiFi for my zoom calls.",
      "Beautiful vibe and easy walk to Old Manali cafes."
    ],
    likes: 90,
    shares: 50,
    terms_and_conditions: "Free cancellation up to 48 hours before check-in."
  },
  {
    id: 12,
    title: "Ganges Echo Homestay",
    location: "Rishikesh, Uttarakhand, India",
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/13/c4/83/01/beach-resort-pahalgam.jpg",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Sudheesh Nair",
    features: ["Private Ghat Access", "Yoga Terrace", "Holy River View", "Spiritual Vibe"],
    about: "Located on the quieter bank of the Ganges, this homestay offers private access to a small sandy beach. Ideal for those seeking peace and spiritual rejuvenation away from the main town bustle.",
    offers: ["Free WiFi", "Morning Yoga Session", "Laundry", "Meditation Mats"],
    foods: ["Satvik Meals", "Herbal Teas", "Fresh Fruit Platters"],
    pricing: {
      price: 3200,
      discounted_price: 2800
    },
    rating: 4.8,
    review_count: 70,
    reviews: [
      "Deeply peaceful stay near the holy river.",
      "The private beach access is a game changer in Rishikesh.",
      "Sudheesh is a very knowledgeable and kind host."
    ],
    likes: 140,
    shares: 45,
    terms_and_conditions: "Strictly vegetarian and non-alcoholic property."
  },
  {
    id: 13,
    title: "Kabini Riverfront Lodge",
    location: "Kabini, Karnataka, India",
    images: [
      "https://pix10.agoda.net/hotelImages/64672723/0/3ad1534aa1982ce78e8891d1b4187f2b.jpg?ce=2&s=1024x768",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    host: "Swati Sharma",
    features: ["Wildlife Sightings", "Coracle Rides", "Infinity Pool View", "Eco-Design"],
    about: "A luxury eco-stay on the banks of the Kabini River. Wake up to the sounds of tropical birds and catch a glimpse of elephants across the river during sunrise.",
    offers: ["Free WiFi", "Jungle Safaris", "Bonfire", "Naturalist Guides"],
    foods: ["Malnad Cuisine", "Fresh Catch Fish", "Tender Coconut Water"],
    pricing: {
      price: 6500,
      discounted_price: 5200
    },
    rating: 4.7,
    review_count: 210,
    reviews: [
      "Saw a leopard from across the river! Unbelievable.",
      "The coracle ride at sunset was the highlight.",
      "Perfect blend of luxury and raw nature."
    ],
    likes: 375,
    shares: 130,
    terms_and_conditions: "Wildlife guidelines must be followed. No loud music."
  },
  {
    id: 14,
    title: "Tirthan Valley River Cabin",
    location: "Gushaini, Himachal Pradesh, India",
    images: [
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/616799414.jpg?k=f0eb86c8325482146438d861710068543a71f72291cda7da89fffb45287c3b1b&o=",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    ],
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    },
    host: "Dinesh Kropha",
    features: ["Trout Fishing", "Waterfall Trek", "Orchard Garden", "Pet Friendly"],
    about: "Located right next to the crystal clear Tirthan River, this cabin is an angler's paradise. Surrounded by apple orchards and UNESCO heritage forest trails.",
    offers: ["Free WiFi", "Fishing Gear", "Barbecue Grill", "Kitchenette"],
    foods: ["Pan-Fried Trout", "Himachali Siddu", "Local Apricot Juice"],
    pricing: {
      price: 4000,
      discounted_price: 3450
    },
    rating: 4.9,
    review_count: 320,
    reviews: [
      "The most beautiful river water I have ever seen.",
      "Dinesh is an expert guide for trekking in the valley.",
      "So peaceful, we didn't want to leave."
    ],
    likes: 460,
    shares: 175,
    terms_and_conditions: "Fishing requires a local permit (assisted by host)."
  },
  {
    id: 15,
    title: "The Backwater Hideout",
    location: "Alleppey, Kerala, India",
    images: [
      "https://assets.cntraveller.in/photos/63d506a5e83976b8ee9a360a/16%3A9/w_1024%2Cc_limit/rasion-detre-lead.jpg",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    host: "Varun Mehta",
    features: ["Houseboat Views", "Canoe Access", "Coconut Groves", "Backwater Balcony"],
    about: "Experience the slow life on the Pampa River backwaters. Watch houseboats glide by from your balcony and enjoy authentic Kerala hospitality in a traditional setting.",
    offers: ["Free WiFi", "Village Walk Tours", "Canoeing", "Ayurvedic Massage"],
    foods: ["Karimeen Pollichathu", "Appam and Stew", "Fresh Toddy"],
    pricing: {
      price: 2800,
      discounted_price: 2450
    },
    rating: 4.6,
    review_count: 700,
    reviews: [
      "The evening view of the backwaters is therapeutic.",
      "Authentic food and very warm staff.",
      "Great value for money in Alleppey."
    ],
    likes: 510,
    shares: 220,
    terms_and_conditions: "Check-out by 10 AM to accommodate local boat schedules."
  }
];

export const deserts = [
  {
    id: 26,
    title: "The Golden Dune Camp",
    location: "Sam Sand Dunes, Jaisalmer, Rajasthan",
    images: [
      "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Rajasthan Desert Hospitality",
    features: ["Desert Safari", "Camel Trekking", "Folk Dance Show", "Stargazing"],
    about: "An authentic Swiss-tent experience located in the heart of the Thar Desert. Enjoy traditional Kalbelia performances and spend your nights under a canopy of a million stars.",
    offers: ["Welcome Drinks", "Camel Safari", "Bonfire", "Evening Snacks"],
    foods: ["Dal Baati Churma", "Ker Sangri", "Bajra Rotla"],
    pricing: {
      price: 3500,
      discounted_price: 2500
    },
    rating: 4.5,
    review_count: 312,
    reviews: [
      "The desert safari at sunset was spectacular.",
      "Amazing folk music and very clean tents.",
      "A bit cold at night but the blankets provided were heavy and warm."
    ],
    likes: 420,
    shares: 180,
    terms_and_conditions: "Safari timings are subject to weather. Standard check-in is 3 PM."
  },
  {
    id: 27,
    title: "White Rann Bhunga Stays",
    location: "Dhordo Village, Kutch, Gujarat",
    images: [
      "https://images.unsplash.com/photo-1590402444811-bfee29d1df67?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      "https://images.unsplash.com/photo-1494526585095-c41746248156"
    ],
    capacity: {
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    host: "Kutch Heritage Stays",
    features: ["Traditional Bhunga Hut", "Handicraft Workshops", "White Desert View"],
    about: "Stay in traditional 'Bhungas'—circular mud huts with conical roofs that stay naturally cool. Experience the surreal beauty of the Great Rann of Kutch salt flats.",
    offers: ["Rann Utsav Permits", "Village Tours", "Craft Expo Access", "Parking"],
    foods: ["Gujarati Thali", "Kutchi Dabeli", "Masala Chaas"],
    pricing: {
      price: 5200,
      discounted_price: 3500
    },
    rating: 4.8,
    review_count: 365,
    reviews: [
      "The White Desert at full moon is a sight I will never forget.",
      "Bhunga huts are very artistic and comfortable.",
      "The cultural performances are top-notch."
    ],
    likes: 560,
    shares: 240,
    terms_and_conditions: "Seasonal stay (Nov-Feb). Government ID mandatory for Rann permits."
  },
  {
    id: 28,
    title: "Royal Sandstone Villa",
    location: "Khuri Village, Jaisalmer, Rajasthan",
    images: [
      "https://images.unsplash.com/photo-1593073843557-074c5387431e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
    ],
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    },
    host: "Thar Eco Camps",
    features: ["Sandstone Architecture", "Private Dunes", "Sunset Deck"],
    about: "Avoid the crowds of Sam Dunes. This villa in Khuri offers a peaceful sandstone retreat with private access to rolling sand dunes and traditional hospitality.",
    offers: ["Jeep Safari", "Guided Village Walk", "Kitchen Access", "Telescope for Stargazing"],
    foods: ["Gatte ki Sabzi", "Lal Maas", "Local Goat Milk Tea"],
    pricing: {
      price: 3000,
      discounted_price: 2200
    },
    rating: 4.4,
    review_count: 198,
    reviews: [
      "So much quieter than other parts of Jaisalmer. Highly recommend.",
      "The Jeep safari was a thrill ride!",
      "Beautiful sunset views from the terrace."
    ],
    likes: 130,
    shares: 45,
    terms_and_conditions: "Free cancellation up to 72 hours before arrival."
  },
  {
    id: 29,
    title: "Cold Desert Mud Home",
    location: "Kaza, Spiti Valley, Himachal Pradesh",
    images: [
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Sonam Tashi",
    features: ["High Altitude", "Traditional Heating", "Monastery Proximity"],
    about: "A unique cold-desert experience. This homestay is built with local mud and wood, providing warmth and comfort in the rugged, moon-like landscape of Spiti.",
    offers: ["Local Guide", "Heated Blankets", "Shared Dining", "Airport Shuttle"],
    foods: ["Spitian Thukpa", "Butter Tea", "Local Barley Bread"],
    pricing: {
      price: 2500,
      discounted_price: 1800
    },
    rating: 4.9,
    review_count: 85,
    reviews: [
      "The landscape is otherworldly. Sonam is a great host.",
      "Best place to disconnect from the world.",
      "Simple but very cozy and warm."
    ],
    likes: 290,
    shares: 110,
    terms_and_conditions: "Heavily dependent on road accessibility. No high-speed internet."
  },
  {
    id: 30,
    title: "Mirage Luxury Tents",
    location: "Sam Sand Dunes, Jaisalmer, Rajasthan",
    images: [
      "https://images.unsplash.com/photo-1544644113-5b57fe33a9d8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Desert Luxe Retreats",
    features: ["Air Conditioned Tents", "Ensuite Bathroom", "Private Patio"],
    about: "Who says the desert can't be luxurious? Our AC tents provide a premium stay with plush bedding, attached bathrooms, and private dining options amidst the dunes.",
    offers: ["Buffet Dinner", "Gala Night Access", "WiFi", "Valet Parking"],
    foods: ["Continental Breakfast", "Rajasthani Special Buffet", "Cocktails"],
    pricing: {
      price: 6000,
      discounted_price: 4500
    },
    rating: 4.7,
    review_count: 289,
    reviews: [
      "The AC in the desert is a lifesaver.",
      "Luxury at its best. The bathroom was very modern.",
      "The buffet dinner had a huge variety."
    ],
    likes: 640,
    shares: 310,
    terms_and_conditions: "50% advance payment required. No pets allowed."
  }
];

export const beaches = [
  {
    id: 31,
    title: "Azure Blue Beach Shack",
    location: "Varkala, Kerala, India",
    images: [
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Rahul Krishnan",
    features: ["Cliff-top View", "Hammock Area", "Surfing Access", "Beachfront"],
    about: "Perched on the famous North Cliff of Varkala, this stay offers panoramic views of the Arabian Sea. Step right out of your room and down the stairs to the black sand beach.",
    offers: ["Free WiFi", "Yoga Classes", "Airport Shuttle", "Surfboard Rental"],
    foods: ["Kerala Sea Food", "Smoothie Bowls", "Fresh Coconut Water"],
    pricing: {
      price: 3200,
      discounted_price: 2600
    },
    rating: 4.8,
    review_count: 412,
    reviews: [
      "The sunset view from the balcony is unbeatable.",
      "Clean rooms and very close to the best cafes on the cliff.",
      "Great place for beginner surfers!"
    ],
    likes: 850,
    shares: 320,
    terms_and_conditions: "Check-out by 11 AM. Please keep the beach clean."
  },
  {
    id: 32,
    title: "The Coral Sands Villa",
    location: "Havelock Island, Andaman & Nicobar, India",
    images: [
      "https://images.unsplash.com/photo-1589197331516-4d84593eb64b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1506929113675-8e1022bd52ef",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
    ],
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    },
    host: "Sagarika Sen",
    features: ["Private Beach Access", "Scuba Diving Point", "Tropical Garden"],
    about: "Experience island luxury at its best. Located near Radhanagar Beach, this villa is surrounded by ancient tropical trees and turquoise waters. Ideal for honeymooners and families.",
    offers: ["Free WiFi", "Snorkeling Gear", "Private Dinner on Beach", "Cycle for Rent"],
    foods: ["Grilled Lobsters", "Tropical Fruit Platter", "Andaman Fish Curry"],
    pricing: {
      price: 8500,
      discounted_price: 6800
    },
    rating: 4.9,
    review_count: 156,
    reviews: [
      "A slice of paradise. The private beach is so calm.",
      "Best seafood I've ever had in my life.",
      "Staff was incredibly helpful with ferry bookings."
    ],
    likes: 1200,
    shares: 450,
    terms_and_conditions: "Ferry timings are subject to weather. 50% refund for weather cancellations."
  },
  {
    id: 33,
    title: "Lazy Turtle Beach Hut",
    location: "Agonda, Goa, India",
    images: [
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    ],
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    host: "Maria Fernandes",
    features: ["Eco-friendly Stay", "Turtle Nesting Site Nearby", "Beachfront Cafe"],
    about: "Simple, rustic, and beautiful. Our beach huts are made from sustainable materials and offer a pure 'barefoot luxury' experience on the quiet shores of Agonda.",
    offers: ["Free WiFi", "Scooter Rental", "Beach Umbrellas", "Laundry Service"],
    foods: ["Goan Fish Thali", "Prawns Balchao", "Fresh Watermelon Juice"],
    pricing: {
      price: 2500,
      discounted_price: 1850
    },
    rating: 4.7,
    review_count: 890,
    reviews: [
      "Agonda is the quietest beach in Goa. Perfect for a long stay.",
      "Maria is a wonderful host. The cafe serves great breakfast.",
      "Clean rooms and literally 10 steps from the water."
    ],
    likes: 2100,
    shares: 540,
    terms_and_conditions: "Noise levels to be kept low after 10 PM. No plastic bottles allowed."
  },
  {
    id: 34,
    title: "Casuarina Cove Stay",
    location: "Gokarna, Karnataka, India",
    images: [
      "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    ],
    capacity: {
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    host: "Manjunath Hegde",
    features: ["Hillside Beach View", "Trekking Trails", "Open-air Shower"],
    about: "Located on a hillock overlooking Kudle Beach, this stay combines forest vibes with beach access. Perfect for hikers and travelers who want to explore Gokarna's hidden coves.",
    offers: ["Free WiFi", "Guided Beach Trek", "Yoga Deck", "Library"],
    foods: ["Neer Dosa", "Iyer Cafe Style Meals", "Local Ghee Roast"],
    pricing: {
      price: 1800,
      discounted_price: 1450
    },
    rating: 4.6,
    review_count: 320,
    reviews: [
      "Amazing view from the room. The trek to Om beach starts right here.",
      "Very budget-friendly and authentic Gokarna experience.",
      "Simple living at its best."
    ],
    likes: 670,
    shares: 210,
    terms_and_conditions: "Electricity can be unstable during monsoon. Solar water heaters used."
  },
  {
    id: 35,
    title: "The Lighthouse Heritage",
    location: "Puri, Odisha, India",
    images: [
      "https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"
    ],
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 3,
      bathrooms: 2
    },
    host: "Ashok Mohanty",
    features: ["Blue Flag Beach Access", "Sea-facing Balcony", "Cultural Heritage"],
    about: "Stay near the pristine Golden Beach of Puri. This heritage-style home offers modern amenities while keeping you close to the spiritual and coastal heart of Odisha.",
    offers: ["Free WiFi", "Temple Tour Assistance", "AC Rooms", "Pick-up Service"],
    foods: ["Abhada Mahaprasad", "Odisha Pakhala", "Fried Prawns"],
    pricing: {
      price: 4500,
      discounted_price: 3800
    },
    rating: 4.5,
    review_count: 245,
    reviews: [
      "The beach is very clean and safe for children.",
      "Great hospitality and very close to the Jagannath Temple.",
      "Morning walks on the beach were the best part."
    ],
    likes: 430,
    shares: 115,
    terms_and_conditions: "Standard hotel policies apply. Late check-out subject to availability."
  }
];
