const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwtAuth = require("./middlewares/jwtAuth");
const User = require("./models/User");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow Flutter frontend

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// User Schema & Model


// Register User
app.post("/api/register", async (req, res) => {
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
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true in production (requires HTTPS)
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: "Login successful!" , user : {email : user.email , username : user.name }});
});

app.get("/api/profile", jwtAuth, async (req, res) => {
    try {
        // Fetch user details from the database
        const user = await User.findById(req.userId).select("email name"); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "Access Granted!",
            user: {
                email: user.email,
                username: user.name
            }
        });
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/logout", jwtAuth ,  (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.json({ message: "Cookie deleted successfully" });
});

// Protected Route (Check if user is logged in)

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));