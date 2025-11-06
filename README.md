🛒 Vibe Commerce — Mock E-Com Cart

A full-stack shopping cart web application built using the MERN stack as part of the Vibe Commerce internship assignment.
It demonstrates complete e-commerce flow — from product listing to cart management and mock checkout — using React, Node.js, Express, and MongoDB, with Fake Store API integration.

🚀 Features

✅ Full Stack E-Commerce Flow

- Browse real products (fetched from Fake Store API)
- Add items to cart (quantity auto-increments for duplicate items)
- Remove items from cart
- View cart with items, quantities, and total price
- Automatic total price calculation
- Mock checkout with user details and receipt generation

✅ Bonus Enhancements

🧾 Checkout modal shows cart items and final total

💬 Success & error messages for better UX

💄 Responsive layout and minimal styling

💾 MongoDB caching for products (offline fallback)

👤 Mock user persistence in cart

🧰 Error-handled backend and clean API responses

🧠 Tech Stack
Layer	Technology
Frontend	React (Hooks, Axios)
Backend	Node.js, Express
Database	MongoDB (Mongoose ORM)
API	Fake Store API

Styling	Inline CSS (Simple & Responsive)
⚙️ Folder Structure
/vibe-mock-ecom
  ├── /backend
  │     ├── server.js
  │     ├── .env
  │     ├── /models
  │     │     ├── Product.js
  │     │     └── Cart.js
  │     ├── /routes
  │     │     ├── products.js
  │     │     ├── cart.js
  │     │     └── checkout.js
  │     ├── package.json
  │
  ├── /frontend
  │     ├── /src
  │     │     ├── App.jsx
  │     │     ├── api.js
  │     │     └── /components
  │     │           ├── Products.jsx
  │     │           ├── Cart.jsx
  │     │           └── CheckoutModal.jsx
  │     ├── package.json
  │
  ├── README.md
  └── .gitignore

⚙️ Setup Instructions
🔹 1. Clone the Repository
git clone https://github.com/<your-username>/vibe-commerce-mock-ecom.git
cd vibe-commerce-mock-ecom

🔹 2. Backend Setup
cd backend
npm install


Create a .env file inside /backend:

MONGO_URI=mongodb://127.0.0.1:27017/vibecommerce
PORT=4000


Start the backend:

npm run dev


The backend runs on http://localhost:4000

🔹 3. Frontend Setup

Open a new terminal:

cd ../frontend
npm install
npm start


Frontend runs on http://localhost:3000

🔁 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products (from Fake Store API or MongoDB) |
| POST | `/api/cart` | Add item to cart (increments quantity if item exists) |
| GET | `/api/cart` | Get all cart items with product details + total |
| DELETE | `/api/cart/:id` | Remove item from cart |
| POST | `/api/checkout` | Checkout and generate receipt |
📸 Screenshots
🏠 Homepage

Displays product grid fetched from Fake Store API.

🛒 Cart

Shows added products with quantities and total price. Users can remove items from the cart. Quantity automatically increments when the same product is added multiple times.

💳 Checkout

Modal view to review items, enter name/email, and confirm.

(Add screenshots once you take them — e.g., drag your screenshots into GitHub README or upload them to Imgur and paste URLs here.)

🎥 Demo Video

🎬 Watch the Demo Video:
Loom / YouTube Link

🧩 Key Learnings

Integrating REST APIs in full-stack apps

Managing state between frontend and backend

Handling async data and error states in React

Building a complete CRUD + checkout flow

🧑‍💻 Author

Ayush Kumar Singh
🎓 B.Tech in Computer Science (IoT, Cybersecurity & Blockchain)
💼 Aspiring Full Stack & AI Developer
🌐 LinkedIn
 • GitHub

🏁 Submission Notes

✅ Submitted as part of the Vibe Commerce Internship Screening Assignment (Full Stack Developer)
📅 Deadline: 8 November 2025
📦 Includes: Frontend + Backend + MongoDB + Demo Video + README