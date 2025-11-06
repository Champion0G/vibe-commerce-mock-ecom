import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  productId: String,
  qty: Number
});

export default mongoose.model('Cart', cartSchema);