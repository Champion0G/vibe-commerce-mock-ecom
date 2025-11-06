import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
const router = express.Router();

// 🛒 Add item to cart
router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty)
      return res.status(400).json({ error: "productId and qty required" });

    // check if item already exists
    const existing = await Cart.findOne({ productId });
    if (existing) {
      existing.qty += qty;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newItem = await Cart.create({ productId, qty });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🧮 Get full cart with total
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find({ userId: "mockUser01" });


    // Fetch product details
    const detailedCart = await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          ...item._doc,
          name: product?.name || "Unknown Product",
          price: product?.price || 0,
          total: product ? product.price * item.qty : 0,
        };
      })
    );

    const total = detailedCart.reduce((sum, item) => sum + item.total, 0);
    res.json({ items: detailedCart, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🗑️ Remove item
router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
