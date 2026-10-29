const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5001;
const MONGO_URI = "mongodb://127.0.0.1:27017/assignment8db";

app.use(express.json());

// ---------- Schema and model ----------
const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is required"], trim: true },
  price: {
    type: Number,
    required: [true, "price is required"],
    min: [0, "price cannot be negative"],
  },
  category: { type: String, required: [true, "category is required"], trim: true },
  stock: {
    type: Number,
    required: [true, "stock is required"],
    min: [0, "stock cannot be negative"],
  },
});

const Product = mongoose.model("Product", productSchema);

// ---------- Helpers ----------
// Passes errors from async routes to the error middleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Rejects malformed ids before they reach the database
function checkId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }
  next();
}

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.send("Assignment 8: MongoDB integration using Mongoose");
});

// CREATE
app.post(
  "/api/products",
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  })
);

// READ all
app.get(
  "/api/products",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
  })
);

// READ one by id
app.get(
  "/api/products/:id",
  checkId,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  })
);

// UPDATE price or stock
app.put(
  "/api/products/:id",
  checkId,
  asyncHandler(async (req, res) => {
    const { price, stock } = req.body || {};
    const updates = {};
    if (price !== undefined) updates.price = price;
    if (stock !== undefined) updates.stock = stock;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Send price or stock to update" });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  })
);

// DELETE
app.delete(
  "/api/products/:id",
  checkId,
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted", product });
  })
);

// ---------- Error handling ----------
// Unknown route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error-handling middleware
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid value for " + err.path });
  }
  if (err.name === "MongooseServerSelectionError") {
    return res.status(503).json({ message: "Database unavailable" });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

// ---------- Connect to MongoDB, then start ----------
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