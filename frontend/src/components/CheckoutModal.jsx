import React, { useState } from "react";

export default function CheckoutModal({ onClose, onSubmit, cart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const items = cart.items || [];
  const total = cart.total || 0;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          padding: 30,
          width: "90%",
          maxWidth: 450,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(102, 126, 234, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
          💳 Checkout Summary
        </h2>
        <div style={{
          maxHeight: "200px",
          overflowY: "auto",
          marginBottom: 20,
          padding: "10px 0"
        }}>
          {items.map((i) => (
            <div 
              key={i._id || i.id}
              style={{
                padding: "10px",
                marginBottom: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                fontSize: "0.9rem"
              }}
            >
              {i.name} × {i.qty} — <span style={{ color: "#f093fb", fontWeight: "bold" }}>₹{i.price * i.qty}</span>
            </div>
          ))}
        </div>
        <h3 style={{
          color: "#ffffff",
          fontSize: "1.5rem",
          marginBottom: 20,
          paddingTop: "15px",
          borderTop: "2px solid rgba(255, 255, 255, 0.1)"
        }}>
          Total: <span style={{ color: "#f093fb", fontSize: "1.8rem" }}>₹{total.toFixed(2)}</span>
        </h3>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ 
            display: "block", 
            marginTop: 15, 
            width: "100%", 
            padding: "12px 15px",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            fontSize: "1rem",
            outline: "none"
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1px solid rgba(102, 126, 234, 0.8)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(102, 126, 234, 0.3)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <input
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ 
            display: "block", 
            marginTop: 15, 
            width: "100%", 
            padding: "12px 15px",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            fontSize: "1rem",
            outline: "none"
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1px solid rgba(102, 126, 234, 0.8)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(102, 126, 234, 0.3)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />

        <div style={{ marginTop: 25, display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              padding: "12px 24px",
              color: "#ffffff",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }}
          >
            Cancel
          </button>
          <button 
            onClick={() => onSubmit({ name, email })}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "20px",
              padding: "12px 30px",
              color: "#ffffff",
              fontSize: "0.9rem",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease"
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
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
