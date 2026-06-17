import { useEffect, useState } from "react";
import API from "./api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/orders")
      .then((res) => setOrders(res.data))
      .catch(() => setError("Failed to load orders."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="text-secondary">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mt-5 text-center py-5">
        <div style={{ fontSize: "4rem" }}>📦</div>
        <h3 className="fw-bold mt-3">No orders yet</h3>
        <p className="text-secondary">When you place an order, it'll show up here.</p>
        <a href="/products" className="btn btn-primary mt-2 px-4">Browse Products</a>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold mb-4">📦 My Orders</h2>

      <div className="d-flex flex-column gap-4">
        {orders.map((order) => (
          <div key={order.id} className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <div className="card-body p-4">

              {/* Order header */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <div>
                  <span className="text-secondary small">Order #</span>
                  <span className="fw-bold ms-1">{order.id}</span>
                </div>
                <div className="d-flex gap-3">
                  <span className="text-secondary small">
                    📅 {new Date(order.orderDate).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </span>
                  <span className="badge bg-success px-3 py-2">Placed</span>
                </div>
              </div>

              {/* Order items */}
              <div className="d-flex flex-column gap-2 mb-3">
                {order.orderItems?.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center p-3 rounded-3"
                    style={{ background: "#f8fafc" }}>
                    <div>
                      <span className="fw-semibold">{item.product?.name || "Product"}</span>
                      <span className="text-secondary ms-2 small">× {item.quantity}</span>
                    </div>
                    <span className="fw-semibold text-primary">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="d-flex justify-content-end">
                <div className="fw-bold fs-5">
                  Total: <span style={{ color: "#0ea5e9" }}>₹{order.totalAmount?.toFixed(2)}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;