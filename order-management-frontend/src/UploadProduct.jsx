import { useState } from "react";
import API from "./api";

function UploadProduct() {
  const [product, setProduct] = useState({
    name: "", brand: "", price: "", discount: "",
    stock: "", category: "", description: "", rating: ""
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setError("");
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please select a product image."); return; }

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    Object.keys(product).forEach((key) => formData.append(key, product[key]));
    formData.append("file", file);

    try {
      await API.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setProduct({ name: "", brand: "", price: "", discount: "", stock: "", category: "", description: "", rating: "" });
      setFile(null);
      setPreview(null);

    } catch (err) {
      setError(err.response?.data || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">

          {/* Header */}
          <div className="mb-4">
            <h2 className="fw-bold">⚙️ Upload New Product</h2>
            <p className="text-secondary">Add a new product to the store.</p>
          </div>

          {success && (
            <div className="alert alert-success d-flex align-items-center gap-2" style={{ borderRadius: "10px" }}>
              ✅ Product uploaded successfully!
            </div>
          )}
          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2" style={{ borderRadius: "10px" }}>
              ⚠️ {error}
            </div>
          )}

          <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>

                {/* Row 1: Name + Brand */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Product Name *</label>
                    <input type="text" className="form-control" name="name"
                      value={product.name} onChange={handleChange}
                      placeholder="e.g. iPhone 15 Pro" style={{ borderRadius: "8px" }} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Brand *</label>
                    <input type="text" className="form-control" name="brand"
                      value={product.brand} onChange={handleChange}
                      placeholder="e.g. Apple" style={{ borderRadius: "8px" }} required />
                  </div>
                </div>

                {/* Row 2: Price + Discount + Stock */}
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Price (₹) *</label>
                    <input type="number" className="form-control" name="price"
                      value={product.price} onChange={handleChange}
                      placeholder="0.00" style={{ borderRadius: "8px" }} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Discount (%)</label>
                    <input type="number" className="form-control" name="discount"
                      value={product.discount} onChange={handleChange}
                      placeholder="0" min="0" max="100" style={{ borderRadius: "8px" }} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Stock *</label>
                    <input type="number" className="form-control" name="stock"
                      value={product.stock} onChange={handleChange}
                      placeholder="0" style={{ borderRadius: "8px" }} required />
                  </div>
                </div>

                {/* Row 3: Category + Rating */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Category</label>
                    <input type="text" className="form-control" name="category"
                      value={product.category} onChange={handleChange}
                      placeholder="e.g. Electronics" style={{ borderRadius: "8px" }} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Rating (0–5)</label>
                    <input type="number" className="form-control" name="rating"
                      value={product.rating} onChange={handleChange}
                      placeholder="4.5" min="0" max="5" step="0.1" style={{ borderRadius: "8px" }} />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Description</label>
                  <textarea className="form-control" rows="3" name="description"
                    value={product.description} onChange={handleChange}
                    placeholder="Describe the product..."
                    style={{ borderRadius: "8px" }} />
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                  <label className="form-label fw-semibold small">Product Image *</label>
                  <input type="file" className="form-control" accept="image/*"
                    onChange={handleFileChange} style={{ borderRadius: "8px" }} />
                  {preview && (
                    <div className="mt-3 text-center">
                      <img src={preview} alt="Preview"
                        style={{ maxHeight: "180px", objectFit: "contain", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn w-100 py-2 fw-semibold text-white border-0"
                  style={{
                    background: loading ? "#94a3b8" : "linear-gradient(135deg, #0ea5e9, #0284c7)",
                    borderRadius: "8px",
                    fontSize: "1rem"
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span className="spinner-border spinner-border-sm"></span>
                      Uploading...
                    </span>
                  ) : "Upload Product"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadProduct;