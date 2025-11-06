import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, default: "mockUser01" }, // 👈 Add this line
  productId: String,
  qty: Number
});

export default mongoose.model("Cart", cartSchema);
