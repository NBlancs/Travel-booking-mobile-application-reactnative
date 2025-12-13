import express from "express";
import Destination from "../models/Destination.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all destinations
router.get("/", async (req, res) => {
    try {
        const destinations = await Destination.find().sort({ createdAt: -1 });
        res.status(200).json(destinations);
    } catch (error) {
        console.log("Error fetching destinations:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Get a single destination by ID
router.get("/:id", async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: "Destination not found." });
        }
        res.status(200).json(destination);
    } catch (error) {
        console.log("Error fetching destination:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Create a new destination (Protected)
router.post("/", auth, async (req, res) => {
    try {
        const { name, location, country, price, rating, category, imageUrl, description, address, amenities } = req.body;

        if (!name || !location || !country || !price) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const destination = new Destination({
            name,
            location,
            country,
            price,
            rating: rating || 0,
            favoritesCount: 0,
            category,
            imageUrl,
            description,
            address,
            amenities
        });

        await destination.save();

        res.status(201).json({
            message: "Destination created successfully",
            destination
        });
    } catch (error) {
        console.log("Error creating destination:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Search destinations
router.get("/search/:query", async (req, res) => {
    try {
        const query = req.params.query;
        const destinations = await Destination.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { location: { $regex: query, $options: "i" } },
                { country: { $regex: query, $options: "i" } }
            ]
        });
        res.status(200).json(destinations);
    } catch (error) {
        console.log("Error searching destinations:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
