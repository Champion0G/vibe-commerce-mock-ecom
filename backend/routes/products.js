import express from "express";
import axios from "axios";
import Product from "../models/Product.js";

const router = express.Router();

/**
 * ✅ GET /api/products
 * Fetch products from Fake Store API
 * If API fails, fallback to MongoDB cached data.
 */
router.get("/", async (req, res) => {
  try {
    // Try fetching live data from Fake Store API
    const { data } = await axios.get("https://fakestoreapi.com/products");

    // Format the data for frontend
    const formattedProducts = data.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      image: p.image,
      description: p.description,
      category: p.category,
    }));

    // Optional: cache the products in MongoDB
    await Product.deleteMany({});
    await Product.insertMany(formattedProducts);

    res.json(formattedProducts);
  } catch (error) {
    console.error("❌ Error fetching products from Fake Store API:", error.message);

    try {
      // Fallback — load cached data from your DB
      const cached = await Product.find();
      if (cached.length > 0) {
        console.log("✅ Loaded products from MongoDB cache.");
        res.json(cached);
      } else {
        res.status(500).json({ message: "No products available (API & cache failed)" });
      }
    } catch (dbError) {
      console.error("❌ MongoDB fallback failed:", dbError.message);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  }
});

export default router;
