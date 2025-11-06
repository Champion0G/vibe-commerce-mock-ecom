import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();
const mockUserId = "mockUser01"; // 🧍 Mock user for persistence

// 🛒 Add item to cart
router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty)
      return res.status(400).json({ error: "productId and qty required" });

    // ✅ Check if item already exists for this user
    const existing = await Cart.findOne({ userId: mockUserId, productId });

    if (existing) {
      existing.qty += qty;
      await existing.save();
      return res.status(200).json(existing);
    }

    // ✅ Create new item in user's cart
    const newItem = await Cart.create({ userId: mockUserId, productId, qty });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("❌ Error adding item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🧮 Get full cart with total
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find({ userId: mockUserId });

    // ✅ Fetch product details for each cart item
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

    // ✅ Compute grand total
    const total = detailedCart.reduce((sum, item) => sum + item.total, 0);

    res.status(200).json({ items: detailedCart, total });
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// 🗑️ Remove item from cart
// 🗑️ Remove item from cart (accepts either cart _id or productId)
router.delete("/:id", async (req, res) => {
  try {
    const identifier = req.params.id; // could be cart _id or productId
    // Try deleting by _id + userId first (preferred)
    let deleted = await Cart.findOneAndDelete({ _id: identifier, userId: mockUserId });

    // If not found, try deleting by productId (some frontends send productId)
    if (!deleted) {
      deleted = await Cart.findOneAndDelete({ productId: identifier, userId: mockUserId });
    }

    if (!deleted) {
      return res.status(404).json({ error: "Cart item not found for this user" });
    }

    return res.status(200).json({ success: true, deletedId: deleted._id });
  } catch (error) {
    console.error("❌ Error removing item:", error);
    return res.status(500).json({ error: "Failed to remove item" });
  }
});


export default router;
