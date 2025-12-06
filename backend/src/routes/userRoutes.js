import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get current user profile
router.get("/profile", auth, async (req, res) => {
    try {
        res.status(200).json({
            user: {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                profileImage: req.user.profileImage
            }
        });
    } catch (error) {
        console.log("Error fetching profile:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
    try {
        const { username, email, profileImage } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if username is taken by another user
        if (username && username !== user.username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({ message: "Username already taken." });
            }
            user.username = username;
        }

        // Check if email is taken by another user
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already in use." });
            }
            user.email = email;
        }

        if (profileImage) {
            user.profileImage = profileImage;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.log("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Change password
router.put("/change-password", auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Please provide current and new password." });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters." });
        }

        const user = await User.findById(req.user._id);

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect." });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
        console.log("Error changing password:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
