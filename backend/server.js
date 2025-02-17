const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow Flutter frontend

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model("User", UserSchema);

// Register User
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    try {
        await newUser.save();
        res.json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Error registering user" });
    }
});

// Login User
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("authToken", token, {
        httpOnly: true,
        secure: false, // Set to true in production (requires HTTPS)
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: "Login successful!" });
});

// Protected Route (Check if user is logged in)
app.get("/profile", (req, res) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: "Access granted", userId: decoded.id });
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
});

// Logout (Clear Cookie)
app.get("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logged out successfully!" });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));