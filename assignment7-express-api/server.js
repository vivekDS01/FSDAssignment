const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

// Mock database: an in-memory array of users
let users = [
  { id: 1, name: "Vivek Solanke", email: "vivek@example.com" },
  { id: 2, name: "Aarav Sharma", email: "aarav@example.com" },
];
let nextId = 3;

// Home route
app.get("/", (req, res) => {
  res.send("Assignment 7: REST API using Express.js");
});

// GET /api/users - fetch all users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// POST /api/users - add a new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ message: "name and email are required" });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id - update a user
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email } = req.body || {};
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;

  res.status(200).json(user);
});

// DELETE /api/users/:id - remove a user
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const [removed] = users.splice(index, 1);
  res.status(200).json({ message: "User deleted", user: removed });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});