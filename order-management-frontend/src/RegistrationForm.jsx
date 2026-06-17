import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";

function RegistrationForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", password: "", phone: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (user.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/customer/register", user);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      setError(err.response?.data || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>

      <div className="w-100" style={{ maxWidth: "460px", padding: "0 1rem" }}>

        {/* Logo */}
        <div className="text-center mb-4">
          <div className="fs-1 mb-2">🛒</div>
          <h2 className="fw-bold text-white mb-1">Create your account</h2>
          <p className="text-secondary">Join thousands of happy shoppers</p>
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
                <label className="form-label fw-semibold" style={{ fontSize: "0.875rem" }}>Full Name</label>
                <input type="text" className="form-control py-2" name="name"
                  placeholder="John Doe" value={user.name} onChange={handleChange}
                  style={{ borderRadius: "8px" }} required />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "0.875rem" }}>Email Address</label>
                <input type="email" className="form-control py-2" name="email"
                  placeholder="you@example.com" value={user.email} onChange={handleChange}
                  style={{ borderRadius: "8px" }} required />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "0.875rem" }}>Phone (optional)</label>
                <input type="tel" className="form-control py-2" name="phone"
                  placeholder="+91 98765 43210" value={user.phone} onChange={handleChange}
                  style={{ borderRadius: "8px" }} />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "0.875rem" }}>Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control py-2" name="password"
                    placeholder="Min. 6 characters" value={user.password} onChange={handleChange}
                    style={{ borderRadius: "8px 0 0 8px" }} required
                  />
                  <button type="button" className="btn btn-outline-secondary"
                    style={{ borderRadius: "0 8px 8px 0" }}
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ fontSize: "0.875rem" }}>Confirm Password</label>
                <input
                  type="password" className="form-control py-2"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ borderRadius: "8px" }} required
                />
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
                    Creating account...
                  </span>
                ) : "Create Account"}
              </button>

            </form>

            <hr className="my-4" />

            <p className="text-center text-secondary mb-0" style={{ fontSize: "0.875rem" }}>
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: "#0ea5e9" }}>
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;