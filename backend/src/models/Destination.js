import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  favoritesCount: { type: Number, default: 0 },
  category: { type: String },
  imageUrl: { type: String },
  description: { type: String },
  address: { type: String },
  amenities: {
    guests: { type: String, default: "2 guests" },
    bedrooms: { type: String, default: "1 bedroom" },
    beds: { type: String, default: "1 bed" },
    bathrooms: { type: String, default: "1 bath" },
  },
}, { timestamps: true });

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
