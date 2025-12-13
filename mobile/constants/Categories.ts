export interface Category {
  id: number;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 1, name: "Beach", icon: "🏖️" },
  { id: 2, name: "Islands", icon: "🏝️" },
  { id: 3, name: "Forest", icon: "🌲" },
  { id: 4, name: "More", icon: "➕" },
];

// Extended categories for "More" modal
export const extendedCategories: Category[] = [
  { id: 5, name: "Cabins", icon: "🏡" },
  { id: 6, name: "Mountains", icon: "⛰️" },
  { id: 7, name: "Desert", icon: "🏜️" },
  { id: 8, name: "Lakes", icon: "🏞️" },
  { id: 9, name: "Countryside", icon: "🌾" },
  { id: 10, name: "City", icon: "🏙️" },
  { id: 11, name: "Historical", icon: "🏛️" },
  { id: 12, name: "Cultural", icon: "🎭" },
  { id: 13, name: "Adventure", icon: "🎿" },
  { id: 14, name: "Wildlife", icon: "🦁" },
  { id: 15, name: "Tropical", icon: "🌴" },
  { id: 16, name: "Arctic", icon: "❄️" },
];
