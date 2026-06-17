import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";
import { useAuth } from "./AuthContext";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/customer/login", formData);
      login(res.data); // saves { token, id, name, email, role }
      navigate("/products");
    } catch (err) {
      setError(err.response?.data || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>

      <div className="w-100" style={{ maxWidth: "420px", padding: "0 1rem" }}>

        {/* Logo */}
        <div className="text-center mb-4">
          <div className="fs-1 mb-2">🛒</div>
          <h2 className="fw-bold text-white mb-1">Welcome back</h2>
          <p className="text-secondary">Sign in to your ShopEasy account</p>
        </div>

        <div className="card border-0 shadow-lg" style={{ borderRadius: "16px" }}>
          <div className="card-body p-4 p-md-5">

            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2" style={{ borderRadius: "8px", fontSize: "0.875rem" }}>
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: "0.875rem" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control py-2"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ borderRadius: "8px", fontSize: "0.95rem" }}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: "0.875rem" }}>
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control py-2"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ borderRadius: "8px 0 0 8px", fontSize: "0.95rem" }}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    style={{ borderRadius: "0 8px 8px 0" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                className="btn w-100 py-2 fw-semibold text-white border-0"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  opacity: loading ? 0.8 : 1
                }}
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <span className="spinner-border spinner-border-sm"></span>
                    Signing in...
                  </span>
                ) : "Sign In"}
              </button>

            </form>

            <hr className="my-4" />

            <p className="text-center text-secondary mb-0" style={{ fontSize: "0.875rem" }}>
              Don't have an account?{" "}
              <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: "#0ea5e9" }}>
                Create one
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginForm;