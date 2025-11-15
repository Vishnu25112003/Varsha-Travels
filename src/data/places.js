export const placesData = [
  {
    id: 1,
    name: "Ooty",
    state: "Tamil Nadu",
    image: "🏔️",
    description:
      'The "Queen of the Nilgiris" with misty mountains and tea gardens',
    details:
      "Ooty is a stunning hill station nestled in the Nilgiri Mountains. Known for its cool climate, lush tea plantations, and breathtaking views. Visit the Botanical Gardens, ride the historic toy train, and enjoy the serene atmosphere of this picturesque destination.",
    highlights: [
      "Toy Train",
      "Botanical Garden",
      "Doddabetta Peak",
      "Tea Gardens",
    ],
  },
  {
    id: 2,
    name: "Madurai",
    state: "Tamil Nadu",
    image: "🕉️",
    description: "Ancient city home to the magnificent Meenakshi Temple",
    details:
      "Madurai is one of the oldest continuously inhabited cities in the world and an important pilgrimage center. The spectacular Meenakshi Temple with its colorful gopurams is the highlight. Explore the vibrant markets and experience the rich cultural heritage.",
    highlights: [
      "Meenakshi Temple",
      "Thiruparankundram",
      "Temple City",
      "Vaigai River",
    ],
  },
  {
    id: 3,
    name: "Kanyakumari",
    state: "Tamil Nadu",
    image: "🌊",
    description: "Where three seas meet - southernmost point of India",
    details:
      "Located at the confluence of the Arabian Sea, Indian Ocean, and Bay of Bengal, Kanyakumari is a unique geographical marvel. Experience stunning sunsets, visit the Vivekananda Rock Memorial, and explore the historic temples.",
    highlights: [
      "Sunset View",
      "Vivekananda Rock",
      "Beach",
      "Thiruvalluvar Statue",
    ],
  },
  {
    id: 4,
    name: "Kodaikanal",
    state: "Tamil Nadu",
    image: "🌲",
    description: "Princess of hill stations with serene lakes and forests",
    details:
      "Kodaikanal is a stunning hill station surrounded by dense forests and misty mountains. The beautiful artificial lake is a major attraction. Trek to nearby viewpoints, visit the chocolate factory, and enjoy the pleasant weather.",
    highlights: ["Lake", "Coaker's Walk", "Waterfalls", "Green Valley"],
  },
  {
    id: 5,
    name: "Rameshwaram",
    state: "Tamil Nadu",
    image: "⛪",
    description: "Sacred pilgrimage site with pristine beaches and temples",
    details:
      "Rameshwaram is one of the most sacred pilgrimage destinations in India. Visit the magnificent Ramanathaswamy Temple, explore the unique Adam's Bridge, and relax on pristine beaches.",
    highlights: [
      "Ramanathaswamy Temple",
      "Adam's Bridge",
      "Beaches",
      "Pilgrimage",
    ],
  },
  {
    id: 6,
    name: "RamakkalMedu",
    state: "Tamil Nadu",
    image: "🏛️",
    description:
      "Historic region known for palatial mansions and unique architecture",
    details:
      "Chettinad is famous for its stunning colonial mansions built by the wealthy Chettiar merchants. These grand structures showcase exquisite architecture with imported materials. Explore the traditional villages and learn about the region's rich merchant heritage.",
    highlights: [
      "Heritage Mansions",
      "Athangudi Tiles",
      "Culture",
      "Architecture",
    ],
  },
  {
    id: 7,
    name: "Munnar",
    state: "Kerala",
    image: "🌿",
    description:
      "Tea garden paradise at the intersection of three mountain ranges",
    details:
      "Munnar is a picturesque hill station known for its sprawling tea plantations. Enjoy trekking through the lush greenery, visit tea factories, and experience the tranquility of nature. The cool climate and misty hills make it a perfect escape.",
    highlights: [
      "Tea Plantations",
      "Anamudi Peak",
      "Hiking Trails",
      "Tea Factory",
    ],
  },
  {
    id: 8,
    name: "Coorg",
    state: "Karnataka",
    image: "☕",
    description: "Coffee country with misty valleys and scenic beauty",
    details:
      "Coorg, also known as Kodagu, is famous for its coffee plantations and spice gardens. The landscape is characterized by misty valleys, rolling hills, and lush forests. Visit coffee estates, trek through the wilderness, and enjoy the natural beauty.",
    highlights: [
      "Coffee Plantations",
      "Trekking",
      "Spice Gardens",
      "Waterfalls",
    ],
  },
  {
    id: 9,
    name: "Mysore",
    state: "Karnataka",
    image: "🏰",
    description: "City of palaces with rich royal heritage and culture",
    details:
      "Mysore is famous for its magnificent palaces, particularly the Mysore Palace. The city is known for silk production and sandalwood. Explore the cultural landmarks, visit the zoo, and experience the royal grandeur of this historic city.",
    highlights: ["Mysore Palace", "Zoo", "Silk Weaving", "Heritage"],
  },
  {
    id: 10,
    name: "Tirupati",
    state: "Andhra Pradesh",
    image: "🛕",
    description:
      "Famous temple town and major pilgrimage center in Andhra Pradesh",
    details:
      "Tirupati is one of the most important pilgrimage centers in India, home to the renowned Sri Venkateswara Temple in Tirumala. Experience the spiritual atmosphere, scenic hills, and historic temples spread across the region.",
    highlights: [
      "Sri Venkateswara Temple",
      "Tirumala Hills",
      "Silathoranam",
    ],
  },
  {
    id: 11,
    name: "Alleppey",
    state: "Kerala",
    image: "🚤",
    description: "Venice of the East with scenic backwaters and houseboats",
    details:
      "Alleppey is famous for its intricate network of backwaters and traditional houseboat cruises. The tranquil lagoons and coconut palm-lined canals make it a unique destination. Experience the serene beauty of Kerala's backwaters.",
    highlights: ["Backwaters", "Houseboat", "Lagoons", "Palm Islands"],
  },
  {
    id: 12,
    name: "Thekkady",
    state: "Kerala",
    image: "🦁",
    description: "Spice gardens and wildlife sanctuary in the mountains",
    details:
      "Thekkady is home to the Periyar National Park and Wildlife Sanctuary. The region is also famous for its spice plantations. Enjoy trekking, boating, and wildlife spotting in this beautiful mountain region.",
    highlights: ["Spice Plantations", "Wildlife", "Trekking", "Boat Rides"],
  },
  {
    id: 13,
    name: "Puducherry",
    state: "Puducherry",
    image: "🏖️",
    description: "Charming coastal town with French colonial heritage",
    details:
      "Puducherry, also known as Pondicherry, is known for its beautiful beaches, French colonial architecture, and serene ashrams. Stroll through the French Quarter, relax on the Promenade Beach, and visit Auroville for a peaceful retreat.",
    highlights: ["Promenade Beach", "Auroville", "French Quarter"],
  },
];

export const getPlacesByState = (state) => {
  if (state === "all") return placesData;
  return placesData.filter((place) => place.state === state);
};

export const getUniqueStates = () => {
  const states = new Set(placesData.map((place) => place.state));
  return ["all", ...Array.from(states)];
};
