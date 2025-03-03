const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwtAuth = require("./middlewares/jwtAuth");
const User = require("./models/user");
const AuthenticationRouter = require("./routes/authRoutes");
const UserRouter = require("./routes/userRoutes");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const app = express();
const server = createServer(app);

// const io = new Server(server);
// io.on("connection", (socket) => {
//     console.log("a user connected");
//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     });
// });

require("dotenv").config();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173", // Allow frontend origin
        credentials: true, // Allow cookies & sessions
    })
);
// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// User Schema & Model

app.get("/", (req, res) => {
    res.json({ message: "hello" });
});

app.use("/auth", AuthenticationRouter);

// Register User
// app.post("/api/register", async (req, res) => {
    //     const { username, email, password } = req.body;
    
    //     try {
        //         // Check if user already exists
        //         const existingUser = await User.findOne({ email });
        //         if (existingUser) {
            //             return res.status(400).json({ message: "User already exists" });
            //         }
            
            //         // Hash the password
            //         const hashedPassword = await bcrypt.hash(password, 10);
            //         const newUser = new User({ username, email, password: hashedPassword });
            
            //         // Save the new user
            //         await newUser.save();
            //         res.json({ message: "User registered successfully!" });
            //     } catch (err) {
                //         res.status(500).json({ error: "Error registering user" });
                //     }
                // });
                
                // // Login User
                // app.post("/api/login", async (req, res) => {
                    //     const { email, password } = req.body;
                    //     const user = await User.findOne({ email });
                    
                    //     if (!user) return res.status(400).json({ error: "User not found" });
                    
                    //     const isMatch = await bcrypt.compare(password, user.password);
                    //     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
                    
                    //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                        //         expiresIn: "1d",
                        //     });
                        
                        //     res.cookie("token", token, {
                            //         httpOnly: true,
                            //         secure: false, // Set to true in production (requires HTTPS)
                            //         sameSite: "Lax",
                            //         maxAge: 24 * 60 * 60 * 1000, // 1 day
                            //     });
                            
                            //     res.json({
                                //         message: "Login successful!",
                                //         user: { email: user.email, username: user.username },
                                //     });
                                // });
                                
                                // app.post("/api/logout", jwtAuth, (req, res) => {
                                    //     res.clearCookie("token", { path: "/" });
//     res.json({ message: "Cookie deleted successfully" });
// });

app.get("/api/profile", jwtAuth, async (req, res) => {
    try {
        // Fetch user details from the database
        const user = await User.findById(req.userId).select("email username");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json({
            message: "Access Granted!",
            user: {
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// app.use("/auth", AuthenticationRouter);
app.use("/user" , UserRouter);

// Protected Route (Check if user is logged in)

// Start Server
server.listen(5000, () => console.log("Server running on port 5000"));
