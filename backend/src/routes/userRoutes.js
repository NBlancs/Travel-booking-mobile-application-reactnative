import express from "express";
import User from "../models/User.js";
import Destination from "../models/Destination.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get current user profile
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                phone: user.phone || "",
                address: user.address || "",
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.log("Error fetching profile:", error);
        return res.status(500).json({ message: "Unable to load profile. Please try again later." });
    }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
    try {
        const { username, email, profileImage, phone, address } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Validate email format
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Please enter a valid email address." });
            }
        }

        // Validate username length
        if (username && username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters long." });
        }

        // Validate phone format (optional, basic check)
        if (phone && phone.length > 0 && !/^[\d\s\-+()]*$/.test(phone)) {
            return res.status(400).json({ message: "Please enter a valid phone number." });
        }

        // Check if username is taken by another user
        if (username && username !== user.username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({ message: "This username is already taken. Please choose another." });
            }
            user.username = username;
        }

        // Check if email is taken by another user
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "This email is already registered to another account." });
            }
            user.email = email;
        }

        if (profileImage !== undefined) user.profileImage = profileImage;
        if (phone !== undefined) user.phone = phone;
        if (address !== undefined) user.address = address;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully!",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (error) {
        console.log("Error updating profile:", error);
        return res.status(500).json({ message: "Unable to update profile. Please try again later." });
    }
});

// Change password
router.put("/change-password", auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Please provide both current and new password." });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters long." });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({ message: "New password must be different from current password." });
        }

        const user = await User.findById(req.user._id);

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect. Please try again." });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully!" });
    } catch (error) {
        console.log("Error changing password:", error);
        return res.status(500).json({ message: "Unable to change password. Please try again later." });
    }
});

// Toggle favorite destination
router.post("/favorites/:destinationId", auth, async (req, res) => {
    try {
        const { destinationId } = req.params;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isFavorited = user.favorites.includes(destinationId);

        if (isFavorited) {
            user.favorites = user.favorites.filter(id => id.toString() !== destinationId);
            await Destination.findByIdAndUpdate(destinationId, { $inc: { favoritesCount: -1 } });
        } else {
            user.favorites.push(destinationId);
            await Destination.findByIdAndUpdate(destinationId, { $inc: { favoritesCount: 1 } });
        }

        await user.save();

        res.status(200).json({
            message: isFavorited ? "Removed from favorites" : "Added to favorites",
            favorites: user.favorites
        });
    } catch (error) {
        console.log("Error toggling favorite:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Get user favorites
router.get("/favorites", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("favorites");
        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        console.log("Error fetching favorites:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
