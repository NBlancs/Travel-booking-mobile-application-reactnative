// Centralized destination data for the entire app
export interface Destination {
  id: number;
  name: string;
  location: string;
  country: string;
  price: number;
  priceFormatted: string;
  rating: string;
  category?: string;
  image: any;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Santorini",
    location: "Santorini Island, Cyclades",
    country: "Greece",
    price: 13200,
    priceFormatted: "₱13,200",
    rating: "4.9",
    category: "Beach",
    image: require("../assets/images/santorini.png"),
  },
  {
    id: 2,
    name: "Kyoto Temples",
    location: "Kyoto",
    country: "Japan",
    price: 12450,
    priceFormatted: "₱12,450",
    rating: "4.9",
    category: "Cultural",
    image: require("../assets/images/kyoto.png"),
  },
  {
    id: 3,
    name: "Paris",
    location: "Paris",
    country: "France",
    price: 15750,
    priceFormatted: "₱15,750",
    rating: "4.7",
    category: "City",
    image: require("../assets/images/paris.png"),
  },
  {
    id: 4,
    name: "Machu Picchu",
    location: "Sacred Valley",
    country: "Peru",
    price: 11890,
    priceFormatted: "₱11,890",
    rating: "4.8",
    category: "Historical",
    image: require("../assets/images/machupichu.png"),
  },
  {
    id: 5,
    name: "Osaka",
    location: "Osaka",
    country: "Japan",
    price: 12100,
    priceFormatted: "₱12,100",
    rating: "4.8",
    category: "City",
    image: require("../assets/images/santorini.png"), // TODO: Add osaka image
  },
  {
    id: 6,
    name: "Kuala Lumpur",
    location: "Kuala Lumpur",
    country: "Malaysia",
    price: 9300,
    priceFormatted: "₱9,300",
    rating: "4.7",
    category: "City",
    image: require("../assets/images/kyoto.png"), // TODO: Add kuala-lumpur image
  },
  {
    id: 7,
    name: "Buenos Aires",
    location: "Buenos Aires",
    country: "Argentina",
    price: 10900,
    priceFormatted: "₱10,900",
    rating: "4.7",
    category: "City",
    image: require("../assets/images/paris.png"), // TODO: Add buenos-aires image
  },
  {
    id: 8,
    name: "New York City",
    location: "New York",
    country: "United States",
    price: 17000,
    priceFormatted: "₱17,000",
    rating: "4.8",
    category: "City",
    image: require("../assets/images/machupichu.png"), // TODO: Add new-york image
  },
  {
    id: 9,
    name: "Rome",
    location: "Rome",
    country: "Italy",
    price: 14500,
    priceFormatted: "₱14,500",
    rating: "4.7",
    category: "Historical",
    image: require("../assets/images/santorini.png"), // TODO: Add rome image
  },
  {
    id: 10,
    name: "London",
    location: "London",
    country: "United Kingdom",
    price: 15200,
    priceFormatted: "₱15,200",
    rating: "4.8",
    category: "City",
    image: require("../assets/images/kyoto.png"), // TODO: Add london image
  },
  {
    id: 11,
    name: "Bali",
    location: "Bali",
    country: "Indonesia",
    price: 8900,
    priceFormatted: "₱8,900",
    rating: "4.8",
    category: "Island",
    image: require("../assets/images/paris.png"), // TODO: Add bali image
  },
  {
    id: 12,
    name: "Sydney Opera House",
    location: "Sydney",
    country: "Australia",
    price: 14500,
    priceFormatted: "₱14,500",
    rating: "4.7",
    category: "City",
    image: require("../assets/images/machupichu.png"), // TODO: Add sydney image
  },
  {
    id: 13,
    name: "Dubai",
    location: "Dubai",
    country: "United Arab Emirates",
    price: 16200,
    priceFormatted: "₱16,200",
    rating: "4.7",
    category: "City",
    image: require("../assets/images/santorini.png"), // TODO: Add dubai image
  },
  {
    id: 14,
    name: "Istanbul",
    location: "Istanbul",
    country: "Turkey",
    price: 11100,
    priceFormatted: "₱11,100",
    rating: "4.8",
    category: "Cultural",
    image: require("../assets/images/kyoto.png"), // TODO: Add istanbul image
  },
  {
    id: 15,
    name: "Barcelona",
    location: "Barcelona",
    country: "Spain",
    price: 14750,
    priceFormatted: "₱14,750",
    rating: "4.7",
    category: "City",
    image: require("../assets/images/paris.png"), // TODO: Add barcelona image
  },
  {
    id: 16,
    name: "Prague",
    location: "Prague",
    country: "Czech Republic",
    price: 12900,
    priceFormatted: "₱12,900",
    rating: "4.8",
    category: "Historical",
    image: require("../assets/images/machupichu.png"), // TODO: Add prague image
  },
  {
    id: 17,
    name: "Cameroon/ Kribi Beach",
    location: "Kribi, Cameroon",
    country: "Cameroon",
    price: 8100,
    priceFormatted: "₱8,100",
    rating: "4.7",
    category: "Beach",
    image: require("../assets/images/santorini.png"), // TODO: Add kribi image
  },
  {
    id: 18,
    name: "Fiji",
    location: "Fiji Islands",
    country: "Fiji",
    price: 15500,
    priceFormatted: "₱15,500",
    rating: "4.9",
    category: "Island",
    image: require("../assets/images/kyoto.png"), // TODO: Add fiji image
  },
  {
    id: 19,
    name: "Petra",
    location: "Ma'an Governorate, Jordan",
    country: "Jordan",
    price: 13500,
    priceFormatted: "₱13,500",
    rating: "4.8",
    category: "Historical",
    image: require("../assets/images/paris.png"), // TODO: Add petra image
  },
  {
    id: 20,
    name: "Great Wall of China",
    location: "Beijing",
    country: "China",
    price: 14200,
    priceFormatted: "₱14,200",
    rating: "4.9",
    category: "Historical",
    image: require("../assets/images/machupichu.png"), // TODO: Add great-wall image
  },
];

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 1, name: "Beach", icon: "🏖️" },
  { id: 2, name: "Islands", icon: "🏝️" },
  { id: 3, name: "Forest", icon: "🌲" },
  { id: 4, name: "Cabins", icon: "🏡" },
];
