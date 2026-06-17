import { Link } from "react-router-dom";

function Cart({ cart, placeOrder, removeFromCart, updateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center py-5">
        <div style={{ fontSize: "4rem" }}>🛒</div>
        <h3 className="fw-bold mt-3">Your cart is empty</h3>
        <p className="text-secondary">Add some products to get started.</p>
        <Link to="/products" className="btn btn-primary mt-2 px-5">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold mb-4">🛍 Your Cart</h2>

      <div className="row g-4">

        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {cart.map((item) => (
              <div key={item.id} className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
                <div className="card-body p-3 d-flex align-items-center gap-3 flex-wrap">

                  {/* Image */}
                  <div className="rounded-3 overflow-hidden flex-shrink-0"
                    style={{ width: "80px", height: "80px", background: "#f1f5f9" }}>
                    {item.imageName ? (
                      <img
                        src={`https://order-management-system-9b64.onrender.com/images/${item.imageName}`}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100 text-secondary">📦</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-0">{item.name}</h6>
                    <small className="text-secondary">{item.brand}</small>
                    <div className="fw-semibold text-primary mt-1">₹{item.price}</div>
                  </div>

                  {/* Quantity controls */}
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm"
                      style={{ width: "32px", height: "32px", padding: 0 }}
                      onClick={() => updateQuantity(item.id, -1)}>−</button>
                    <span className="fw-bold" style={{ minWidth: "24px", textAlign: "center" }}>{item.quantity}</span>
                    <button className="btn btn-outline-secondary btn-sm"
                      style={{ width: "32px", height: "32px", padding: 0 }}
                      onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>

                  {/* Item total */}
                  <div className="fw-bold text-end" style={{ minWidth: "80px" }}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>

                  {/* Remove */}
                  <button className="btn btn-sm text-danger border-0"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove">🗑</button>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ borderRadius: "12px", top: "80px" }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Delivery</span>
                <span className="text-success">Free</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span style={{ color: "#0ea5e9" }}>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <button
                className="btn w-100 py-2 fw-semibold text-white border-0"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  borderRadius: "8px",
                  fontSize: "1rem"
                }}
                onClick={placeOrder}
              >
                ✅ Place Order
              </button>

              <Link to="/products" className="btn btn-outline-secondary w-100 mt-2 py-2"
                style={{ borderRadius: "8px" }}>
                Continue Shopping
              </Link>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;