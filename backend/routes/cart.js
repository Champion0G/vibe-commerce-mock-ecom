import express from "express";
import mongoose from "mongoose";
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

    // ✅ Ensure _id is included manually
    const detailedCart = await Promise.all(
      cart.map(async (item) => {
        // Our Product model stores FakeStore's id in the `id` field (not _id)
        const product = await Product.findOne({ id: item.productId });
        // MongoDB documents always have _id, convert it to string
        const cartItemId = item._id.toString();
        return {
          _id: cartItemId, // MongoDB cart document _id (required for updates/deletes)
          productId: item.productId, // FakeStore product ID
          qty: item.qty,
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

// ✏️ Update cart item quantity
router.put("/:id", async (req, res) => {
  try {
    const identifier = req.params.id;
    const { qty } = req.body;
    
    if (qty === undefined || qty === null) {
      return res.status(400).json({ error: "qty is required" });
    }
    
    if (qty < 1) {
      return res.status(400).json({ error: "qty must be at least 1" });
    }

    console.log("✏️ Update request received for identifier:", identifier, "type:", typeof identifier, "new qty:", qty);
    console.log("✏️ Is valid ObjectId?", mongoose.Types.ObjectId.isValid(identifier));

    // Find the cart item by cart _id (MongoDB ObjectId) first
    let cartItem = null;
    
    // Try to match by MongoDB ObjectId (cart document _id)
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      try {
        cartItem = await Cart.findOne({
          _id: new mongoose.Types.ObjectId(identifier),
          userId: mockUserId,
        });
        if (cartItem) {
          console.log("✅ Found cart item by _id (ObjectId)");
        }
      } catch (objIdError) {
        console.log("⚠️ Error converting to ObjectId:", objIdError.message);
      }
    }
    
    // If not found by _id, try by productId as fallback (for backward compatibility)
    if (!cartItem) {
      console.log("⚠️ Not found by _id, trying productId...");
      cartItem = await Cart.findOne({ 
        productId: identifier, 
        userId: mockUserId 
      });
      
      if (!cartItem && !isNaN(identifier)) {
        cartItem = await Cart.findOne({ 
          productId: Number(identifier), 
          userId: mockUserId 
        });
      }
      
      if (cartItem) {
        console.log("✅ Found cart item by productId");
      }
    }

    if (!cartItem) {
      console.log("❌ Cart item not found. Searched with identifier:", identifier);
      // Debug: List all cart items for this user
      const allItems = await Cart.find({ userId: mockUserId });
      console.log("📋 All cart items for user:", allItems.map(i => ({ _id: i._id.toString(), productId: i.productId })));
      return res.status(404).json({ error: "Cart item not found" });
    }

    cartItem.qty = qty;
    await cartItem.save();
    
    console.log("✅ Updated quantity to:", qty, "for cart item:", cartItem._id.toString());
    return res.status(200).json({ success: true, _id: cartItem._id.toString(), qty: cartItem.qty });
  } catch (error) {
    console.error("❌ Error updating item:", error);
    res.status(500).json({ error: "Failed to update item", details: error.message });
  }
});

// 🗑️ Remove one quantity from cart item (or delete if qty becomes 0)
router.delete("/:id", async (req, res) => {
  try {
    const identifier = req.params.id;
    console.log("🗑️ Remove request received for identifier:", identifier, "type:", typeof identifier);

    // Find the cart item by cart _id or productId for this user
    let cartItem = null;
    
    // Try to match by MongoDB ObjectId first
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      cartItem = await Cart.findOne({
        _id: new mongoose.Types.ObjectId(identifier),
        userId: mockUserId,
      });
      if (cartItem) {
        console.log("✅ Found cart item by _id");
      }
    }
    
    // If not found by _id, try by productId (could be string or number)
    if (!cartItem) {
      // Try as string first
      cartItem = await Cart.findOne({ 
        productId: identifier, 
        userId: mockUserId 
      });
      
      // If still not found and identifier is numeric, try as number
      if (!cartItem && !isNaN(identifier)) {
        cartItem = await Cart.findOne({ 
          productId: Number(identifier), 
          userId: mockUserId 
        });
      }
      
      if (cartItem) {
        console.log("✅ Found cart item by productId");
      }
    }

    if (!cartItem) {
      console.log("❌ Cart item not found for identifier:", identifier);
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Decrement quantity or delete
    if (cartItem.qty > 1) {
      cartItem.qty -= 1;
      await cartItem.save();
      console.log("✅ Decremented quantity, new qty:", cartItem.qty);
      return res.status(200).json({ success: true, action: "decremented", _id: cartItem._id, qty: cartItem.qty });
    }

    await Cart.deleteOne({ _id: cartItem._id, userId: mockUserId });
    console.log("✅ Deleted cart item");
    return res.status(200).json({ success: true, action: "deleted", deletedId: cartItem._id });
  } catch (error) {
    console.error("❌ Error removing item:", error);
    res.status(500).json({ error: "Failed to remove item" });
  }
});



export default router;
