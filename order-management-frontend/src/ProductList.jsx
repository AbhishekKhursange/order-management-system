import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import { useAuth } from "./AuthContext";

function ProductList({ addToCart, cart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
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
      p.brand?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    return matchSearch && matchCategory;
  });

  const handleAddToCart = (product) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  // ✅ Check if item is already in cart
  const isInCart = (productId) => {
    return cart && cart.some((item) => item.id === productId);
  };

  // ✅ Smart image URL
  const getImageUrl = (imageName) => {
    if (!imageName) return null;
    if (imageName.startsWith("http")) return imageName;
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

        {/* Search with dropdown */}
        <div className="d-flex flex-column gap-2" style={{ minWidth: "200px", width: "100%", maxWidth: "300px" }}>
          <div className="position-relative">
            <input
              type="text"
              className="form-control w-100"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              style={{ borderRadius: "8px"}}
              autoComplete="off"
            />

            {/* Dropdown suggestions */}
            {showDropdown && search.trim().length > 0 && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0,
                background: "white", border: "1px solid #e2e8f0",
                borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                zIndex: 1000, maxHeight: "280px", overflowY: "auto",
                marginTop: "4px"
              }}>
                {products
                  .filter(p =>
                    p.name?.toLowerCase().includes(search.toLowerCase()) ||
                    p.brand?.toLowerCase().includes(search.toLowerCase()) ||
                    p.category?.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice(0, 6)
                  .map(p => (
                    <div
                      key={p.id}
                      className="d-flex align-items-center gap-3 px-3 py-2"
                      style={{ cursor: "pointer", borderBottom: "1px solid #f1f5f9" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                      onClick={() => {
                        setSearch(p.name);
                        setShowDropdown(false);
                      }}
                    >
                      {/* Product thumbnail */}
                      <div style={{
                        width: "40px", height: "40px", flexShrink: 0,
                        background: "#f1f5f9", borderRadius: "8px",
                        overflow: "hidden", display: "flex",
                        alignItems: "center", justifyContent: "center"
                      }}>
                        {getImageUrl(p.imageName) ? (
                          <img
                            src={getImageUrl(p.imageName)}
                            alt={p.name}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : <span style={{ fontSize: "1.2rem" }}>📦</span>}
                      </div>

                      {/* Product info */}
                      <div className="flex-grow-1">
                        <div className="fw-semibold" style={{ fontSize: "0.875rem" }}>{p.name}</div>
                        <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                          {p.brand} • {p.category}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="fw-bold" style={{ fontSize: "0.875rem", color: "#0ea5e9" }}>
                        ₹{p.price?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))
                }

                {/* No results */}
                {products.filter(p =>
                  p.name?.toLowerCase().includes(search.toLowerCase()) ||
                  p.brand?.toLowerCase().includes(search.toLowerCase()) ||
                  p.category?.toLowerCase().includes(search.toLowerCase())
                ).length === 0 && (
                    <div className="text-center text-secondary py-3" style={{ fontSize: "0.875rem" }}>
                      No products found for "{search}"
                    </div>
                  )}
              </div>
            )}
          </div>
          <select
            className="form-select w-100"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ borderRadius: "8px"}}
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
          {filtered.map((product) => {
            const inCart = isInCart(product.id);

            return (
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
                    <p className="text-secondary mb-1"
                      style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {product.brand}
                    </p>
                    <h6 className="fw-bold mb-1" style={{ lineHeight: "1.3" }}>{product.name}</h6>

                    {product.category && (
                      <span className="badge mb-2"
                        style={{ background: "#e0f2fe", color: "#0369a1", fontSize: "0.7rem", width: "fit-content", borderRadius: "4px" }}>
                        {product.category}
                      </span>
                    )}

                    <p className="text-secondary small mb-2"
                      style={{ flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
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

                    {/* ✅ Button logic:
                        - Out of stock → grey, disabled
                        - Already in cart → green "Go to Cart", disabled for adding more
                        - Not in cart → orange "Add to Cart"
                    */}
                    {product.stock === 0 ? (
                      <button className="btn w-100 fw-semibold border-0"
                        style={{ borderRadius: "8px", padding: "0.5rem", background: "#e2e8f0", color: "#94a3b8" }}
                        disabled>
                        Out of Stock
                      </button>
                    ) : inCart ? (
                      <div className="d-flex gap-2">
                        <button
                          className="btn w-100 fw-semibold border-0"
                          style={{
                            borderRadius: "8px", padding: "0.5rem",
                            background: "linear-gradient(135deg, #22c55e, #16a34a)",
                            color: "white", cursor: "default"
                          }}
                          disabled
                        >
                          ✅ Added to Cart
                        </button>
                        <button
                          className="btn btn-outline-primary fw-semibold"
                          style={{ borderRadius: "8px", whiteSpace: "nowrap", fontSize: "0.8rem" }}
                          onClick={() => navigate("/cart")}
                        >
                          View Cart
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn w-100 fw-semibold border-0"
                        style={{
                          borderRadius: "8px", padding: "0.5rem",
                          background: "linear-gradient(135deg, #f59e0b, #d97706)",
                          color: "white", transition: "background 0.3s",
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        🛒 Add to Cart
                      </button>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductList;