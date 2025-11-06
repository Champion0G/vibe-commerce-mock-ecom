export default function Products({ products, onAdd }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 25,
        padding: 20,
      }}
    >
      {products.map((p) => (
        <div
          key={p._id || p.id}
          style={{
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 20,
            padding: 20,
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.2)",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(102, 126, 234, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.2)";
          }}
        >
          <img
            src={p.image}
            alt={p.name}
            style={{ 
              width: "120px", 
              height: "120px", 
              objectFit: "contain",
              marginBottom: "15px",
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
            }}
          />
          <h3 style={{ 
            fontSize: "1rem", 
            color: "#000000",
            margin: "10px 0",
            fontWeight: "600"
          }}>
            {p.name}
          </h3>
          <p style={{ 
            color: "#f093fb",
            fontSize: "1.3rem",
            fontWeight: "bold",
            margin: "8px 0"
          }}>
            ₹{p.price}
          </p>
          <p style={{ 
            fontSize: "0.8rem", 
            color: "rgba(255, 255, 255, 0.7)",
            margin: "5px 0 15px 0",
            textTransform: "capitalize"
          }}>
            {p.category || "General"}
          </p>
          <button 
            onClick={() => onAdd(p.id || p._id)}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "25px",
              padding: "12px 24px",
              color: "#ffffff",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
              width: "100%"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
