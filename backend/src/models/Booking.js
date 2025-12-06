import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    },

    checkInDate: {
        type: Date,
        required: true
    },

    checkOutDate: {
        type: Date,
        required: true
    },

    guests: {
        type: Number,
        required: true,
        default: 1
    },

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "refunded"],
        default: "pending"
    },

    specialRequests: {
        type: String,
        default: ""
    }
}, { timestamp: true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;