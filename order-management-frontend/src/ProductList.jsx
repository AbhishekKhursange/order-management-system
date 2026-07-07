import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import { useAuth } from "./AuthContext";

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [addedMap, setAddedMap] = useState({});
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products/bulk")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    return matchSearch && matchCategory;
  });

  const handleAddToCart = (product) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    addToCart(product);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  // ✅ Smart image URL — works with both Cloudinary URLs and old local filenames
  const getImageUrl = (imageName) => {
    if (!imageName) return null;
    // If it's already a full URL (Cloudinary), use directly
    if (imageName.startsWith("http")) return imageName;
    // Fallback for old local images
    return `https://order-management-system-production-92d0.up.railway.app/images/${imageName}`;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="text-secondary">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-0">🛒 Products</h2>
          <p className="text-secondary mb-0 small">{filtered.length} items found</p>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ borderRadius: "8px", minWidth: "220px" }}
          />
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ borderRadius: "8px", minWidth: "140px" }}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-5 text-secondary">
          <div style={{ fontSize: "3rem" }}>🔍</div>
          <h5 className="mt-3">No products found</h5>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((product) => (
            <div className="col-xl-3 col-lg-4 col-md-6" key={product.id}>
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "14px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                {/* Discount badge */}
                {product.discount > 0 && (
                  <div
                    className="position-absolute top-0 end-0 m-2 badge"
                    style={{ background: "#ef4444", fontSize: "0.75rem", borderRadius: "6px", zIndex: 1 }}
                  >
                    -{product.discount}%
                  </div>
                )}

                {/* Image */}
                <div
                  className="d-flex align-items-center justify-content-center rounded-top-4"
                  style={{ height: "200px", background: "#f8fafc", overflow: "hidden" }}
                >
                  {getImageUrl(product.imageName) ? (
                    <img
                      src={getImageUrl(product.imageName)}
                      alt={product.name}
                      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", padding: "12px" }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <span style={{ fontSize: "3rem" }}>📦</span>
                  )}
                </div>

                <div className="card-body d-flex flex-column p-3">
                  <p className="text-secondary mb-1" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {product.brand}
                  </p>
                  <h6 className="fw-bold mb-1" style={{ lineHeight: "1.3" }}>{product.name}</h6>

                  {product.category && (
                    <span className="badge mb-2" style={{ background: "#e0f2fe", color: "#0369a1", fontSize: "0.7rem", width: "fit-content", borderRadius: "4px" }}>
                      {product.category}
                    </span>
                  )}

                  <p className="text-secondary small mb-2" style={{ flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {product.description}
                  </p>

                  <div className="d-flex align-items-center gap-1 mb-2">
                    <span className="text-warning">★</span>
                    <span className="small fw-semibold">{product.rating}</span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="fw-bold fs-5" style={{ color: "#0ea5e9" }}>
                      ₹{product.price?.toLocaleString("en-IN")}
                    </span>
                    {product.stock > 0 ? (
                      <span className="small text-success fw-semibold">In Stock</span>
                    ) : (
                      <span className="small text-danger fw-semibold">Out of Stock</span>
                    )}
                  </div>

                  <button
                    className="btn w-100 fw-semibold border-0"
                    style={{
                      borderRadius: "8px",
                      padding: "0.5rem",
                      background: addedMap[product.id]
                        ? "linear-gradient(135deg, #22c55e, #16a34a)"
                        : product.stock === 0
                        ? "#e2e8f0"
                        : "linear-gradient(135deg, #f59e0b, #d97706)",
                      color: product.stock === 0 ? "#94a3b8" : "white",
                      transition: "background 0.3s",
                    }}
                    disabled={product.stock === 0}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedMap[product.id] ? "✅ Added!" : product.stock === 0 ? "Out of Stock" : "🛒 Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
