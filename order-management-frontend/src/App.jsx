
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

function App() {

    const [cart, setCart] = useState([]);
    const customerId = 1; // Simulating logged-in customer

    const addToCart = (product) => {
        const existing = cart.find(p => p.id === product.id);
        if (existing) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const placeOrder = () => {
        const order = {
            customer: {id: customerId},
            orderItems: cart.map(item => ({
                product: {id: item.id},
                quantity: item.quantity
            }))
        };

        API.post('/orders', order)
            .then(() => {
                alert('Order placed successfully!');
                setCart([]);
            })
            .catch(err => {
                console.error(err);
                alert('Failed to place order');
            });
    };

    return (
        <>
        <Navbar cartCount={cart.length} />

        <div className="container mt-4">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList addToCart={addToCart} />} />
                <Route path="/cart" element={<Cart cart={cart} placeOrder={placeOrder} />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                {/* <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} /> */}
                <Route path="/upload-product" element={<UploadProduct />} />
            </Routes>
            
        </div>
        </>
        
    );
}

export default App;
