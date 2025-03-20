import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Favorite from "./components/Favorite";
import Navbar from "./components/Navbar";
import { useState } from "react";

const App = () => {
  const [cart, setCart] = useState([]); // Store cart items

  // 🛒 Function to Add to Cart (No duplicates)
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isExisting = prevCart.some((item) => item._id === product._id);
      if (!isExisting) {
        return [...prevCart, product]; // Add only if not exists
      }
      return prevCart; // Return same cart if product exists
    });
  };

  // 🗑️ Function to Remove from Cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/Product" element={<Product />} />
        <Route
          path="/Product/:id"
          element={<ProductDetail handleAddToCart={handleAddToCart} />}
        />
        <Route path="/Cart" element={<Cart cartItems={cart} handleRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/Favorite" element={<Favorite />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
