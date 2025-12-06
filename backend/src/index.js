import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/authRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import userRoutes from "./routes/userRoutes.js"


const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for mobile app
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
})