import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "./models/Destination.js";

dotenv.config();

const seedDB = async () => {
  try {
    // Connect to MongoDB first
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');

    // Clear existing data to avoid duplicates
    await Destination.deleteMany({});
    console.log('Old destinations removed');

    // Add priceFormatted to each destination
    const destinationsWithFormatted = destinations.map(dest => ({
      ...dest,
      priceFormatted: `₱${dest.price.toLocaleString()}`
    }));

    // Insert new data
    await Destination.insertMany(destinationsWithFormatted);
    console.log('New destinations added successfully! Total:', destinations.length);
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

const destinations = [
  {
    name: "Osaka",
    location: "Osaka",
    country: "Japan",
    price: 12100,
    rating: 4.8,
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1590559399607-5752328c2933?q=80&w=1000&auto=format&fit=crop",
    description: "Osaka is a large port city and commercial center on the Japanese island of Honshu. It's known for its modern architecture, nightlife and hearty street food.",
    address: "Osaka, Japan",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Kuala Lumpur",
    location: "Kuala Lumpur",
    country: "Malaysia",
    price: 9300,
    rating: 4.7,
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1000&auto=format&fit=crop",
    description: "Kuala Lumpur is the capital of Malaysia. Its modern skyline is dominated by the 451m-tall Petronas Twin Towers, a pair of glass-and-steel-clad skyscrapers with Islamic motifs.",
    address: "Kuala Lumpur, Malaysia",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Buenos Aires",
    location: "Buenos Aires",
    country: "Argentina",
    price: 10900,
    rating: 4.7,
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=1000&auto=format&fit=crop",
    description: "Buenos Aires is Argentina’s big, cosmopolitan capital city. Its center is the Plaza de Mayo, lined with stately 19th-century buildings including Casa Rosada, the iconic, balconied presidential palace.",
    address: "Buenos Aires, Argentina",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "New York City",
    location: "New York",
    country: "United States",
    price: 17000,
    rating: 4.8,
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop",
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers.",
    address: "New York, NY, USA",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Rome",
    location: "Rome",
    country: "Italy",
    price: 14500,
    rating: 4.7,
    category: "Historical",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop",
    description: "Rome is the capital city and a special comune of Italy, as well as the capital of the Lazio region. The city has been a major human settlement for over two millennia.",
    address: "Rome, Italy",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "London",
    location: "London",
    country: "United Kingdom",
    price: 15200,
    rating: 4.8,
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop",
    description: "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic 'Big Ben' clock tower and Westminster Abbey.",
    address: "London, UK",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Bali",
    location: "Bali",
    country: "Indonesia",
    price: 8900,
    rating: 4.8,
    category: "Island",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop",
    description: "Bali is a province of Indonesia and the westernmost of the Lesser Sunda Islands. East of Java and west of Lombok, the province includes the island of Bali and a few smaller neighbouring islands.",
    address: "Bali, Indonesia",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Sydney Opera House",
    location: "Sydney",
    country: "Australia",
    price: 14500,
    rating: 4.7,
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?q=80&w=1000&auto=format&fit=crop",
    description: "The Sydney Opera House is a multi-venue performing arts centre in Sydney. Located on the banks of the Sydney Harbour, it is often regarded as one of the 20th century's most famous and distinctive buildings.",
    address: "Bennelong Point, Sydney NSW 2000, Australia",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Dubai",
    location: "Dubai",
    country: "United Arab Emirates",
    price: 16200,
    rating: 4.7,
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=1000&auto=format&fit=crop",
    description: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline.",
    address: "Dubai, UAE",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Istanbul",
    location: "Istanbul",
    country: "Turkey",
    price: 11100,
    rating: 4.8,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1000&auto=format&fit=crop",
    description: "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here.",
    address: "Istanbul, Turkey",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Barcelona",
    location: "Barcelona",
    country: "Spain",
    price: 14750,
    rating: 4.7,
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1000&auto=format&fit=crop",
    description: "Barcelona, the cosmopolitan capital of Spain’s Catalonia region, is known for its art and architecture. The fantastical Sagrada Família church and other modernist landmarks designed by Antoni Gaudí dot the city.",
    address: "Barcelona, Spain",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Santorini",
    location: "Santorini Island, Cyclades",
    country: "Greece",
    price: 13200,
    rating: 4.9,
    category: "Beach",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4c79e4284?q=80&w=1000&auto=format&fit=crop",
    description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.",
    address: "Santorini, Greece",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Kyoto Temples",
    location: "Kyoto",
    country: "Japan",
    price: 12450,
    rating: 4.9,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
    description: "Kyoto is famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
    address: "Kyoto, Japan",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Paris",
    location: "Paris",
    country: "France",
    price: 15750,
    rating: 4.7,
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=1000&auto=format&fit=crop",
    description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.",
    address: "Paris, France",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Machu Picchu",
    location: "Sacred Valley",
    country: "Peru",
    price: 11890,
    rating: 4.8,
    category: "Historical",
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop",
    description: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls.",
    address: "Machu Picchu, Peru",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Prague",
    location: "Prague",
    country: "Czech Republic",
    price: 12900,
    rating: 4.8,
    category: "Historical",
    imageUrl: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1000&auto=format&fit=crop",
    description: "Prague, capital city of the Czech Republic, is bisected by the Vltava River. Nicknamed “the City of a Hundred Spires,” it's known for its Old Town Square, the heart of its historic core, with colorful baroque buildings.",
    address: "Prague, Czechia",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Cameroon/ Kribi Beach",
    location: "Kribi, Cameroon",
    country: "Cameroon",
    price: 8100,
    rating: 4.7,
    category: "Beach",
    imageUrl: "https://images.unsplash.com/photo-1590523741831-ab7f852f3278?q=80&w=1000&auto=format&fit=crop",
    description: "Kribi is a beach resort and sea port in the South Province of Cameroon. It is known for its sandy beaches and the Lobe Waterfalls, which plunge directly into the sea.",
    address: "Kribi, Cameroon",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Fiji",
    location: "Fiji Islands",
    country: "Fiji",
    price: 15500,
    rating: 4.9,
    category: "Island",
    imageUrl: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1000&auto=format&fit=crop",
    description: "Fiji, a country in the South Pacific, is an archipelago of more than 300 islands. It's famed for rugged landscapes, palm-lined beaches and coral reefs with clear lagoons.",
    address: "Fiji",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Petra",
    location: "Ma'an Governorate, Jordan",
    country: "Jordan",
    price: 13500,
    rating: 4.8,
    category: "Historical",
    imageUrl: "https://images.unsplash.com/photo-1579606038897-262373c7cb00?q=80&w=1000&auto=format&fit=crop",
    description: "Petra is a famous archaeological site in Jordan's southwestern desert. Dating to around 300 B.C., it was the capital of the Nabatean Kingdom.",
    address: "Petra, Jordan",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
  {
    name: "Great Wall of China",
    location: "Beijing",
    country: "China",
    price: 14200,
    rating: 4.9,
    category: "Historical",
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop",
    description: "The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups.",
    address: "Beijing, China",
    amenities: {
        guests: "2 guests",
        bedrooms: "1 bedroom",
        beds: "1 bed",
        bathrooms: "1 bath"
    },
    favoritesCount: 0
  },
];

seedDB();
