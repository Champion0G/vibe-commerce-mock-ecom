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
    <div style={{ 
      marginTop: 30,
      background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)",
      backdropFilter: "blur(10px)",
      borderRadius: 20,
      padding: 25,
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
    }}>
      <h2 style={{ 
        color: "#ffffff",
        marginBottom: 20,
        fontSize: "1.8rem",
        fontWeight: "bold",
        background: "linear-gradient(135deg, #667eea 0%, #f093fb 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        🛒 Cart
      </h2>
      {items.length === 0 ? (
        <p style={{ color: "#000000", textAlign: "center", padding: "20px" }}>
          Your cart is empty
        </p>
      ) : (
        items.map((i, index) => {
          const itemKey = i._id || i.id || i.productId || `item-${index}`;
          return (
            <div 
              key={itemKey} 
              style={{ 
                marginBottom: 15, 
                padding: 15, 
                border: "1px solid rgba(255, 255, 255, 0.1)", 
                borderRadius: 15, 
                display: "flex", 
                alignItems: "center", 
                gap: 15, 
                flexWrap: "wrap",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(5px)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateX(5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span style={{ 
                flex: 1, 
                minWidth: 200,
                color: "#ffffff",
                fontSize: "1rem"
              }}>
                {i.name} — ₹{i.price} × {i.qty}
              </span>
              <span style={{ 
                fontWeight: "bold",
                color: "#f093fb",
                fontSize: "1.1rem"
              }}>
                ₹{(i.price * i.qty).toFixed(2)}
              </span>
              <button 
                onClick={() => handleRemove(i)}
                style={{
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  border: "none",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(245, 87, 108, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(245, 87, 108, 0.4)";
                }}
              >
                Remove
              </button>
            </div>
          );
        })
      )}
      <div style={{
        marginTop: 25,
        paddingTop: 20,
        borderTop: "2px solid rgba(255, 255, 255, 0.1)"
      }}>
        <h3 style={{ 
          color: "#ffffff",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: 20
        }}>
          Total: <span style={{ 
            color: "#f093fb",
            fontSize: "1.8rem"
          }}>₹{total.toFixed(2)}</span>
        </h3>
        <button 
          onClick={onCheckout} 
          disabled={!items.length}
          style={{
            background: items.length 
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "rgba(255, 255, 255, 0.1)",
            border: "none",
            borderRadius: "25px",
            padding: "15px 40px",
            color: items.length ? "#ffffff" : "#000000",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: items.length ? "pointer" : "not-allowed",
            boxShadow: items.length 
              ? "0 6px 20px rgba(102, 126, 234, 0.5)"
              : "none",
            transition: "all 0.3s ease",
            width: "100%",
            opacity: items.length ? 1 : 0.5
          }}
          onMouseEnter={(e) => {
            if (items.length) {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.7)";
            }
          }}
          onMouseLeave={(e) => {
            if (items.length) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
            }
          }}
        >
          {items.length ? "💳 Checkout" : "Cart is Empty"}
        </button>
      </div>
    </div>
  );
}
