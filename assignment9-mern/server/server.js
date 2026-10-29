const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5002;
const MONGO_URI = "mongodb://127.0.0.1:27017/assignment9db";

// CORS: allow requests from the React dev server
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ---------- User model ----------
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email"],
  },
});

const User = mongoose.model("User", userSchema);

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.send("Assignment 9: MERN API is running");
});

// GET all users
app.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.find().sort({ _id: 1 });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// POST a new user
app.post("/api/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// ---------- Error handling ----------
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: "This email is already registered" });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

// ---------- Connect, then start ----------
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });