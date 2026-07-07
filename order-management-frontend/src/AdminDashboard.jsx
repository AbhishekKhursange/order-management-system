import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import { useAuth } from "./AuthContext";

const TABS = ["Products", "Users", "Orders"];

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Products");

  // Products state
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);

  // Users state
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);

  // Feedback
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Fetch Data ───────────────────────────────────────────────────────────

  const fetchProducts = () => {
    setProductLoading(true);
    API.get("/products/bulk")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setProductLoading(false));
  };

  const fetchUsers = () => {
    setUserLoading(true);
    API.get("/customer/bulk")
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setUserLoading(false));
  };

  const fetchOrders = () => {
    setOrderLoading(true);
    API.get("/orders")
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setOrderLoading(false));
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  // ─── Product Actions ──────────────────────────────────────────────────────

  const handleDeleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;
    API.delete(`/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
        showToast("Product deleted.");
      })
      .catch(() => showToast("Failed to delete product.", "error"));
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    API.put(`/products/${editProduct.id}`, editProduct)
      .then((res) => {
        setProducts(products.map((p) => (p.id === editProduct.id ? res.data : p)));
        setEditProduct(null);
        showToast("Product updated.");
      })
      .catch(() => showToast("Failed to update product.", "error"));
  };

  // ─── User Actions ─────────────────────────────────────────────────────────

  const handleDeleteUser = (id) => {
    if (!window.confirm("Delete this user?")) return;
    API.delete(`/customer/${id}`)
      .then(() => {
        setUsers(users.filter((u) => u.id !== id));
        showToast("User deleted.");
      })
      .catch(() => showToast("Failed to delete user.", "error"));
  };

  const handleRoleChange = (id, newRole) => {
    API.patch(`/customer/${id}`, { role: newRole })
      .then((res) => {
        setUsers(users.map((u) => (u.id === id ? res.data : u)));
        showToast(`Role updated to ${newRole}.`);
      })
      .catch(() => showToast("Failed to update role.", "error"));
  };

  // ─── Order Actions ────────────────────────────────────────────────────────

  const handleDeleteOrder = (id) => {
    if (!window.confirm("Delete this order?")) return;
    API.delete(`/orders/${id}`)
      .then(() => {
        setOrders(orders.filter((o) => o.id !== id));
        showToast("Order deleted.");
      })
      .catch(() => showToast("Failed to delete order.", "error"));
  };

  // ─── Stats ────────────────────────────────────────────────────────────────

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed", top: "80px", right: "20px", zIndex: 9999,
            background: toast.type === "error" ? "#ef4444" : "#22c55e",
            color: "white", padding: "12px 20px", borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)", fontWeight: 600,
            animation: "fadeIn 0.3s ease"
          }}
        >
          {toast.type === "error" ? "❌" : "✅"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#0f172a", color: "white", padding: "1.5rem 2rem" }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h3 className="fw-bold mb-0" style={{ color: "#38bdf8" }}>
                ⚙️ Admin Dashboard
              </h3>
              <p className="mb-0 text-secondary small">Welcome, {user?.name}</p>
            </div>
            <div className="d-flex gap-3 flex-wrap">
              {[
                { label: "Products", value: products.length, color: "#38bdf8" },
                { label: "Users", value: users.length, color: "#a78bfa" },
                { label: "Orders", value: orders.length, color: "#34d399" },
                { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, color: "#fbbf24" },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-3 py-2 rounded-3"
                  style={{ background: "rgba(255,255,255,0.05)", minWidth: "90px" }}>
                  <div className="fw-bold" style={{ color: stat.color, fontSize: "1.1rem" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-fluid">
          <div className="d-flex gap-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  border: "none", background: "none",
                  padding: "1rem 1.5rem", fontWeight: 600,
                  color: activeTab === tab ? "#0ea5e9" : "#64748b",
                  borderBottom: activeTab === tab ? "2px solid #0ea5e9" : "2px solid transparent",
                  cursor: "pointer", transition: "all 0.2s"
                }}
              >
                {tab === "Products" ? `📦 Products (${products.length})` :
                 tab === "Users" ? `👥 Users (${users.length})` :
                 `🧾 Orders (${orders.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-fluid py-4 px-4">

        {/* ── PRODUCTS TAB ── */}
        {activeTab === "Products" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h5 className="fw-bold mb-0">All Products</h5>
              {outOfStock > 0 && (
                <span className="badge bg-danger px-3 py-2">
                  ⚠️ {outOfStock} out of stock
                </span>
              )}
              <button className="btn btn-primary btn-sm px-4"
                style={{ borderRadius: "8px" }}
                onClick={() => navigate("/upload-product")}>
                + Add Product
              </button>
            </div>

            {productLoading ? <LoadingSpinner /> : (
              <div className="card border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        <th className="py-3 px-3">Image</th>
                        <th className="py-3">Product</th>
                        <th className="py-3">Category</th>
                        <th className="py-3">Price</th>
                        <th className="py-3">Stock</th>
                        <th className="py-3">Rating</th>
                        <th className="py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
                        <tr><td colSpan="7" className="text-center py-5 text-secondary">No products found</td></tr>
                      ) : products.map((product) => (
                        <tr key={product.id}>
                          <td className="py-2 px-3">
                            <div style={{ width: "50px", height: "50px", background: "#f1f5f9", borderRadius: "8px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {product.imageName ? (
                                <img
                                  src={product.imageName.startsWith("http") ? product.imageName : `https://order-management-system-production-92d0.up.railway.app/images/${product.imageName}`}
                                  alt={product.name}
                                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                  onError={(e) => { e.target.style.display = "none"; }}
                                />
                              ) : <span>📦</span>}
                            </div>
                          </td>
                          <td className="py-2">
                            <div className="fw-semibold">{product.name}</div>
                            <div className="text-secondary small">{product.brand}</div>
                          </td>
                          <td className="py-2">
                            <span className="badge" style={{ background: "#e0f2fe", color: "#0369a1", fontSize: "0.75rem" }}>
                              {product.category || "—"}
                            </span>
                          </td>
                          <td className="py-2 fw-semibold" style={{ color: "#0ea5e9" }}>
                            ₹{product.price?.toLocaleString("en-IN")}
                          </td>
                          <td className="py-2">
                            <span className={`badge ${product.stock === 0 ? "bg-danger" : product.stock < 5 ? "bg-warning text-dark" : "bg-success"}`}>
                              {product.stock === 0 ? "Out of Stock" : product.stock}
                            </span>
                          </td>
                          <td className="py-2">⭐ {product.rating}</td>
                          <td className="py-2">
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-outline-primary"
                                style={{ borderRadius: "6px", fontSize: "0.75rem" }}
                                onClick={() => setEditProduct({ ...product })}>
                                ✏️ Edit
                              </button>
                              <button className="btn btn-sm btn-outline-danger"
                                style={{ borderRadius: "6px", fontSize: "0.75rem" }}
                                onClick={() => handleDeleteProduct(product.id)}>
                                🗑 Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === "Users" && (
          <div>
            <h5 className="fw-bold mb-3">All Users</h5>
            {userLoading ? <LoadingSpinner /> : (
              <div className="card border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3">Name</th>
                        <th className="py-3">Email</th>
                        <th className="py-3">Phone</th>
                        <th className="py-3">Role</th>
                        <th className="py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr><td colSpan="6" className="text-center py-5 text-secondary">No users found</td></tr>
                      ) : users.map((u) => (
                        <tr key={u.id}>
                          <td className="py-2 px-3 text-secondary small">#{u.id}</td>
                          <td className="py-2 fw-semibold">{u.name}</td>
                          <td className="py-2 text-secondary">{u.email}</td>
                          <td className="py-2 text-secondary">{u.phone || "—"}</td>
                          <td className="py-2">
                            <span className={`badge px-3 py-1 ${u.role === "ADMIN" ? "bg-warning text-dark" : "bg-primary"}`}
                              style={{ borderRadius: "6px" }}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-2">
                            <div className="d-flex gap-2 align-items-center">
                              {/* Role toggle — don't show for yourself */}
                              {u.email !== user?.email && (
                                <button
                                  className={`btn btn-sm ${u.role === "ADMIN" ? "btn-outline-secondary" : "btn-outline-warning"}`}
                                  style={{ borderRadius: "6px", fontSize: "0.75rem" }}
                                  onClick={() => handleRoleChange(u.id, u.role === "ADMIN" ? "USER" : "ADMIN")}
                                >
                                  {u.role === "ADMIN" ? "→ USER" : "→ ADMIN"}
                                </button>
                              )}
                              {u.email !== user?.email && (
                                <button className="btn btn-sm btn-outline-danger"
                                  style={{ borderRadius: "6px", fontSize: "0.75rem" }}
                                  onClick={() => handleDeleteUser(u.id)}>
                                  🗑 Delete
                                </button>
                              )}
                              {u.email === user?.email && (
                                <span className="text-secondary small">You</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === "Orders" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h5 className="fw-bold mb-0">All Orders</h5>
              <div className="fw-semibold" style={{ color: "#0ea5e9" }}>
                Total Revenue: ₹{totalRevenue.toLocaleString("en-IN")}
              </div>
            </div>
            {orderLoading ? <LoadingSpinner /> : (
              <div className="d-flex flex-column gap-3">
                {orders.length === 0 ? (
                  <div className="text-center py-5 text-secondary">
                    <div style={{ fontSize: "3rem" }}>📦</div>
                    <p className="mt-2">No orders yet</p>
                  </div>
                ) : orders.map((order) => (
                  <div key={order.id} className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                        <div>
                          <span className="text-secondary small">Order #</span>
                          <span className="fw-bold ms-1">{order.id}</span>
                          <span className="text-secondary small ms-3">
                            👤 {order.customer?.name || "Unknown"}
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-secondary small">
                            📅 {new Date(order.orderDate).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </span>
                          <span className="fw-bold" style={{ color: "#0ea5e9" }}>
                            ₹{order.totalAmount?.toLocaleString("en-IN")}
                          </span>
                          <button className="btn btn-sm btn-outline-danger"
                            style={{ borderRadius: "6px", fontSize: "0.75rem" }}
                            onClick={() => handleDeleteOrder(order.id)}>
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        {order.orderItems?.map((item) => (
                          <div key={item.id} className="px-3 py-2 rounded-3"
                            style={{ background: "#f8fafc", fontSize: "0.85rem" }}>
                            <span className="fw-semibold">{item.product?.name || "Product"}</span>
                            <span className="text-secondary ms-2">× {item.quantity}</span>
                            <span className="text-primary ms-2 fw-semibold">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── EDIT PRODUCT MODAL ── */}
      {editProduct && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem"
        }}>
          <div className="card border-0 shadow-lg w-100" style={{ maxWidth: "500px", borderRadius: "16px" }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">✏️ Edit Product</h5>
                <button className="btn btn-sm btn-outline-secondary"
                  style={{ borderRadius: "8px" }}
                  onClick={() => setEditProduct(null)}>✕</button>
              </div>
              <form onSubmit={handleUpdateProduct}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Name</label>
                    <input className="form-control" style={{ borderRadius: "8px" }}
                      value={editProduct.name || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Brand</label>
                    <input className="form-control" style={{ borderRadius: "8px" }}
                      value={editProduct.brand || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, brand: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Price (₹)</label>
                    <input type="number" className="form-control" style={{ borderRadius: "8px" }}
                      value={editProduct.price || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Stock</label>
                    <input type="number" className="form-control" style={{ borderRadius: "8px" }}
                      value={editProduct.stock || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Discount %</label>
                    <input type="number" className="form-control" style={{ borderRadius: "8px" }}
                      value={editProduct.discount || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, discount: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Category</label>
                    <input className="form-control" style={{ borderRadius: "8px" }}
                      value={editProduct.category || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Rating</label>
                    <input type="number" step="0.1" className="form-control" style={{ borderRadius: "8px" }}
                      value={editProduct.rating || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, rating: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Description</label>
                    <textarea className="form-control" rows="2" style={{ borderRadius: "8px" }}
                      value={editProduct.description || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn flex-grow-1 fw-semibold text-white border-0"
                    style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", borderRadius: "8px" }}>
                    Save Changes
                  </button>
                  <button type="button" className="btn btn-outline-secondary px-4"
                    style={{ borderRadius: "8px" }}
                    onClick={() => setEditProduct(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" style={{ width: "2.5rem", height: "2.5rem" }}></div>
      <p className="text-secondary mt-3">Loading...</p>
    </div>
  );
}

export default AdminDashboard;
