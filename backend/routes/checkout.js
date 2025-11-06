import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const cartItems = await Cart.find();

    // Calculate total based on product prices
    let total = 0;
    const detailedItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        const subtotal = product.price * item.qty;
        total += subtotal;
        detailedItems.push({
          name: product.name,
          price: product.price,
          qty: item.qty,
          subtotal,
        });
      }
    }

    const receipt = {
      name,
      email,
      total,
      items: detailedItems,
      timestamp: new Date().toISOString(),
    };

    await Cart.deleteMany({});
    res.status(200).json({ message: "Checkout successful", receipt });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
