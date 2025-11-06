// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import API from "./api";
import Products from "./components/Products";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        API.get("/products"),
        API.get("/cart"),
      ]);
      setProducts(pRes.data);
      setCart(cRes.data); // ✅ cart now always { items: [...], total: 0 }
    } catch (error) {
      console.error("Fetch failed:", error);
      alert("⚠️ Failed to load data");
    }
  };

  const addToCart = async (id) => {
    try {
      await API.post("/cart", { productId: id, qty: 1 });
      const c = await API.get("/cart");
      setCart(c.data);
      alert("✅ Item added to cart!");
    } catch (error) {
      console.error("Add failed:", error);
      alert("❌ Failed to add item");
    }
  };

  const removeItem = async (id) => {
    if (!id) {
      console.error("❌ Remove called with undefined/null id");
      alert("❌ Cannot remove item: missing ID");
      return;
    }

    try {
      console.log("🗑️ Removing item with id:", id, "type:", typeof id);
      const res = await API.delete(`/cart/${id}`);
      console.log("✅ Remove successful, response:", res.data);
      
      // Refresh cart after successful removal
      const c = await API.get("/cart");
      setCart(c.data);
    } catch (error) {
      console.error("❌ Failed to remove item:", error);
      const errorMsg = error?.response?.data?.error || error?.message || "Unknown error";
      console.error("Error details:", errorMsg);
      alert(`❌ Failed to remove item from cart: ${errorMsg}`);
    }
  };

  const handleCheckout = async (info) => {
    try {
      const res = await API.post("/checkout", info);
      alert(`✅ Checkout successful!\nTotal: ₹${res.data.receipt.total}`);
      const c = await API.get("/cart");
      setCart(c.data);
      setShowCheckout(false);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("❌ Checkout failed");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>🛒 Vibe Commerce</h1>
      <Products products={products} onAdd={addToCart} />
      <Cart
        cart={cart}
        onRemove={removeItem}
        onCheckout={() => setShowCheckout(true)}
      />
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
        />
      )}
    </div>
  );
}
