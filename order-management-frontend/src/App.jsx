import { useState } from "react";
import API from "./api";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import UploadProduct from "./UploadProduct";
import Orders from "./Orders";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";

function App() {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const order = {
      customer: { id: user.id },
      orderItems: cart.map((item) => ({
        product: { id: item.id },
        quantity: item.quantity,
      })),
    };

    API.post("/orders", order)
      .then(() => {
        alert("✅ Order placed successfully!");
        setCart([]);
      })
      .catch((err) => {
        const msg = err.response?.data || "Failed to place order. Please try again.";
        alert("❌ " + msg);
      });
  };

  return (
    <>
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList addToCart={addToCart} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Protected: must be logged in */}
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart cart={cart} placeOrder={placeOrder}
              removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
          </ProtectedRoute>
        } />

        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />

        {/* Protected: must be ADMIN */}
        <Route path="/upload-product" element={
          <ProtectedRoute adminOnly={true}>
            <UploadProduct />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;