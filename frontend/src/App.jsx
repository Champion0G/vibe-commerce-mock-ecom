
import React, { useEffect, useState } from 'react';
import API from './api';
import Products from './components/Products';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';


export default function App(){
const [products, setProducts] = useState([]);
const [cart, setCart] = useState([]);
const [showCheckout, setShowCheckout] = useState(false);


useEffect(()=>{ fetchData(); },[]);


const fetchData = async()=>{
const res = await API.get('/products');
setProducts(res.data);
const cartData = await API.get('/cart');
setCart(cartData.data);
}


const addToCart = async (id) => {
  try {
    await API.post("/cart", { productId: id, qty: 1 });
    const res = await API.get("/cart");
    setCart(res.data);
    alert("✅ Item added to cart!");
  } catch (error) {
    alert("❌ Failed to add item. Try again.");
  }
};




const removeItem = async(id)=>{
await API.delete(`/cart/${id}`);
fetchData();
}


const handleCheckout = async (info) => {
  try {
    const res = await API.post("/checkout", info);
    alert(`✅ Checkout successful!\nTotal: ₹${res.data.receipt.total}`);
    const cartRes = await API.get("/cart");
    setCart(cartRes.data);
  } catch (error) {
    alert("❌ Checkout failed. Please try again.");
  }
};
// const handleCheckout = async(info)=>{
// const res = await API.post('/checkout', info);
// alert(JSON.stringify(res.data.receipt, null, 2));
// fetchData();
// }


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