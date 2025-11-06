export default function Products({ products, onAdd }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
        padding: 20,
      }}
    >
      {products.map((p) => (
        <div
          key={p._id || p.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: 10,
            background: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <img
            src={p.image}
            alt={p.name}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
          <h3 style={{ fontSize: "1rem" }}>{p.name}</h3>
          <p style={{ color: "gray" }}>₹{p.price}</p>
          <p style={{ fontSize: "0.8rem", color: "#555" }}>
            {p.category || "General"}
          </p>
          <button onClick={() => onAdd(p.id || p._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
