import express from "express";
import Booking from "../models/Booking.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create a new booking
router.post("/", auth, async (req, res) => {
    try {
        const { destinationId, destinationName, destinationCountry, destinationImage, checkInDate, checkOutDate, guests, totalPrice, specialRequests } = req.body;

        if (!destinationId || !destinationName || !destinationCountry || !checkInDate || !checkOutDate || !totalPrice) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const booking = new Booking({
            user: req.user._id,
            destinationId,
            destinationName,
            destinationCountry,
            destinationImage,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            guests: guests || 1,
            totalPrice,
            specialRequests: specialRequests || "",
            status: "confirmed",
            paymentStatus: "paid"
        });

        await booking.save();

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        console.log("Error creating booking:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Get all bookings for the authenticated user
router.get("/", auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({ bookings });
    } catch (error) {
        console.log("Error fetching bookings:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Get a single booking by ID
router.get("/:id", auth, async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        res.status(200).json({ booking });
    } catch (error) {
        console.log("Error fetching booking:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Update booking (full update for pending/confirmed bookings)
router.patch("/:id", auth, async (req, res) => {
    try {
        const { status, paymentStatus, checkInDate, checkOutDate, guests, specialRequests, totalPrice } = req.body;

        const booking = await Booking.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        // Only allow full updates for pending or confirmed bookings
        if (checkInDate || checkOutDate || guests || specialRequests !== undefined || totalPrice) {
            if (booking.status === "cancelled" || booking.status === "completed") {
                return res.status(400).json({ 
                    message: "Cannot modify a cancelled or completed booking." 
                });
            }

            // Validate check-in date is in the future for date changes
            if (checkInDate) {
                const newCheckIn = new Date(checkInDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (newCheckIn < today) {
                    return res.status(400).json({ 
                        message: "Check-in date must be in the future." 
                    });
                }
                booking.checkInDate = newCheckIn;
            }

            if (checkOutDate) {
                const newCheckOut = new Date(checkOutDate);
                const checkIn = checkInDate ? new Date(checkInDate) : booking.checkInDate;
                if (newCheckOut <= checkIn) {
                    return res.status(400).json({ 
                        message: "Check-out date must be after check-in date." 
                    });
                }
                booking.checkOutDate = newCheckOut;
            }

            if (guests) booking.guests = guests;
            if (specialRequests !== undefined) booking.specialRequests = specialRequests;
            if (totalPrice) booking.totalPrice = totalPrice;
        }

        // Status updates (allowed for any booking)
        if (status) booking.status = status;
        if (paymentStatus) booking.paymentStatus = paymentStatus;

        await booking.save();

        res.status(200).json({
            message: "Booking updated successfully",
            booking
        });
    } catch (error) {
        console.log("Error updating booking:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Cancel a booking
router.delete("/:id", auth, async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        booking.status = "cancelled";
        await booking.save();

        res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        });
    } catch (error) {
        console.log("Error cancelling booking:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
