export default function Cart({ cart, onRemove, onCheckout }) {
  const items = cart.items || [];
  const total = cart.total || 0;

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        items.map((i) => (
          <div key={i._id || i.id}>
            <span>
              {i.name} — ₹{i.price} × {i.qty}
            </span>
            <button onClick={() => onRemove(i._id)}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: ₹{total.toFixed(2)}</h3>
      <button onClick={onCheckout} disabled={!items.length}>
        Checkout
      </button>
    </div>
  );
}
