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
    location: "6 Akanthous Street, Cyprus",
    country: "Greece",
    price: 13200,
    priceFormatted: "₱13,200",
    rating: "4.9",
    category: "Beach",
    image: require("../assets/images/santorini.png"),
  },
  {
    id: 2,
    name: "Kyoto Temple",
    location: "Kyoto, Japan",
    country: "Japan",
    price: 12450,
    priceFormatted: "₱12,450",
    rating: "4.9",
    category: "Forest",
    image: require("../assets/images/kyoto.png"),
  },
  {
    id: 3,
    name: "Paris City",
    location: "Paris, France",
    country: "France",
    price: 15750,
    priceFormatted: "₱15,750",
    rating: "4.7",
    category: "Islands",
    image: require("../assets/images/paris.png"),
  },
  {
    id: 4,
    name: "Machu Picchu",
    location: "Sacred Valley, Peru",
    country: "Peru",
    price: 11890,
    priceFormatted: "₱11,890",
    rating: "4.8",
    category: "Forest",
    image: require("../assets/images/machupichu.png"),
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
