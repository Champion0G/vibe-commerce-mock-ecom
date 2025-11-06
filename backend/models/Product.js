import express from "express";
import axios from "axios";
import Product from "../models/Product.js";

const router = express.Router();

// Fetch products from Fake Store API
router.get("/", async (req, res) => {
  try {
    // ✅ Step 1: Try to fetch products from Fake Store API
    const { data } = await axios.get("https://fakestoreapi.com/products");

    // ✅ Step 2: Format products to fit your frontend
    const formattedProducts = data.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      image: p.image,
      description: p.description,
      category: p.category,
    }));

    // ✅ (Optional) Save or update them in MongoDB for persistence
    // await Product.deleteMany({});
    // await Product.insertMany(formattedProducts);

    res.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error.message);

    // ✅ Fallback: If Fake Store API fails, load from MongoDB
    const dbProducts = await Product.find();
    res.json(dbProducts);
  }
});

export default router;
