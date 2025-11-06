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
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 20,
          width: "90%",
          maxWidth: 400,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Checkout Summary</h2>
        <ul>
          {items.map((i) => (
            <li key={i._id || i.id}>
              {i.name} × {i.qty} — ₹{i.price * i.qty}
            </li>
          ))}
        </ul>
        <h3>Total: ₹{total.toFixed(2)}</h3>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginTop: 10, width: "100%", padding: 5 }}
        />
        <input
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginTop: 10, width: "100%", padding: 5 }}
        />

        <div style={{ marginTop: 15, textAlign: "right" }}>
          <button onClick={() => onSubmit({ name, email })}>Confirm</button>
          <button
            onClick={onClose}
            style={{ marginLeft: 10, background: "#ccc" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
