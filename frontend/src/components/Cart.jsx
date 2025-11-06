// frontend/src/components/Cart.jsx
export default function Cart({ cart, onRemove, onCheckout }) {
  const items = cart.items || [];
  const total = cart.total || 0;
  console.log("🧩 Cart items:", items);

  const handleRemove = (item) => {
    // Use _id first (MongoDB cart document ID), fallback to id, then productId as last resort
    const itemId = item._id || item.id || item.productId;
    console.log("🗑️ Cart component - removing item:", item, "using id:", itemId);
    if (itemId) {
      onRemove(itemId);
    } else {
      console.error("❌ No valid ID found for item:", item);
      alert("❌ Cannot remove item: missing ID");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        items.map((i, index) => {
          const itemKey = i._id || i.id || i.productId || `item-${index}`;
          return (
            <div key={itemKey} style={{ marginBottom: 10, padding: 10, border: "1px solid #ddd", borderRadius: 5, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ flex: 1, minWidth: 200 }}>
                {i.name} — ₹{i.price} × {i.qty}
              </span>
              <span style={{ fontWeight: "bold" }}>₹{(i.price * i.qty).toFixed(2)}</span>
              <button onClick={() => handleRemove(i)}>Remove</button>
            </div>
          );
        })
      )}
      <h3>Total: ₹{total.toFixed(2)}</h3>
      <button onClick={onCheckout} disabled={!items.length}>
        Checkout
      </button>
    </div>
  );
}
