import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Home() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div>

      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0f172a 100%)",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container text-center text-white py-5">
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🛒</div>
          <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: "-0.02em" }}>
            Shop Smarter with{" "}
            <span style={{ color: "#38bdf8" }}>ShopEasy</span>
          </h1>
          <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: "560px", fontSize: "1.15rem" }}>
            Discover thousands of products. Fast delivery. Easy returns.
            {isLoggedIn() ? ` Welcome back, ${user?.name}!` : " Join for free today."}
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/products"
              className="btn btn-lg px-5 py-3 fw-semibold text-dark border-0"
              style={{ background: "#38bdf8", borderRadius: "10px", fontSize: "1rem" }}
            >
              Browse Products →
            </Link>
            {!isLoggedIn() && (
              <Link
                to="/register"
                className="btn btn-lg px-5 py-3 fw-semibold border-0"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2) !important"
                }}
              >
                Create Account
              </Link>
            )}
          </div>

          {/* Trust signals */}
          <div className="d-flex justify-content-center gap-5 mt-5 flex-wrap">
            {[
              { icon: "🔒", label: "Secure Payments" },
              { icon: "🚚", label: "Free Delivery" },
              { icon: "↩️", label: "Easy Returns" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
                <div className="text-secondary small mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: "#f8fafc" }} className="py-5">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { value: "10K+", label: "Products", color: "#0ea5e9" },
              { value: "5K+", label: "Happy Customers", color: "#22c55e" },
              { value: "15K+", label: "Orders Delivered", color: "#f59e0b" },
              { value: "4.8★", label: "Average Rating", color: "#a855f7" },
            ].map((stat) => (
              <div className="col-6 col-md-3" key={stat.label}>
                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "12px" }}>
                  <div className="card-body py-4">
                    <div className="fw-bold mb-1" style={{ fontSize: "2rem", color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-secondary small">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-2">Why ShopEasy?</h2>
        <p className="text-center text-secondary mb-5">Everything you need, all in one place.</p>

        <div className="row g-4">
          {[
            {
              icon: "📦",
              title: "Huge Selection",
              desc: "Browse thousands of products across all categories — electronics, fashion, home, and more.",
              color: "#dbeafe",
            },
            {
              icon: "🛡️",
              title: "Secure & Safe",
              desc: "Your data and payments are protected with industry-standard encryption.",
              color: "#dcfce7",
            },
            {
              icon: "⚡",
              title: "Fast & Easy",
              desc: "Add to cart, place order, done. Shopping has never been this simple.",
              color: "#fef9c3",
            },
          ].map((feature) => (
            <div className="col-md-4" key={feature.title}>
              <div className="card border-0 h-100 text-center" style={{ borderRadius: "14px", background: feature.color }}>
                <div className="card-body p-5">
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{feature.icon}</div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-secondary mb-0">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!isLoggedIn() && (
        <div style={{ background: "linear-gradient(135deg, #0f172a, #0c4a6e)" }} className="py-5">
          <div className="container text-center text-white py-3">
            <h2 className="fw-bold mb-3">Ready to start shopping?</h2>
            <p className="text-secondary mb-4">Join thousands of happy customers today.</p>
            <Link
              to="/register"
              className="btn btn-lg px-5 py-3 fw-semibold text-dark border-0"
              style={{ background: "#38bdf8", borderRadius: "10px" }}
            >
              Get Started for Free →
            </Link>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: "#0f172a" }} className="py-4">
        <div className="container text-center">
          <p className="text-secondary mb-2 small">© 2026 ShopEasy. All rights reserved.</p>
          <div className="d-flex justify-content-center gap-3">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((link, i, arr) => (
              <span key={link} className="d-flex align-items-center gap-3">
                <a href="#" className="text-secondary text-decoration-none small">{link}</a>
                {i < arr.length - 1 && <span className="text-secondary">•</span>}
              </span>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;