import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar({ cartCount }) {
  const { user, logout, isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow sticky-top" style={{ background: "#0f172a" }}>
      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand fw-bold fs-5 d-flex align-items-center gap-2" to="/">
          <span style={{ fontSize: "1.4rem" }}>🛒</span>
          <span style={{ color: "#38bdf8" }}>ShopEasy</span>
        </NavLink>

        {/* Toggle Button (Mobile) */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">

            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/products">Products</NavLink>
            </li>

            {isLoggedIn() && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link px-3 position-relative" to="/cart">
                    🛍 Cart
                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                        {cartCount}
                      </span>
                    )}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link px-3" to="/orders">My Orders</NavLink>
                </li>
              </>
            )}

            {/* Admin-only link */}
            {isAdmin() && (
              <li className="nav-item">
                <NavLink
                  className="nav-link px-3"
                  to="/upload-product"
                  style={({ isActive }) => ({
                    color: isActive ? "#fbbf24" : "#fbbf24aa",
                    fontWeight: 600
                  })}
                >
                  ⚙️ Upload Product
                </NavLink>
              </li>
            )}

            {/* Auth buttons */}
            {!isLoggedIn() ? (
              <>
                <li className="nav-item ms-lg-2">
                  <NavLink to="/register" className="btn btn-outline-light btn-sm px-3">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item ms-lg-1">
                  <NavLink to="/login" className="btn btn-sm px-3" style={{ background: "#38bdf8", color: "#0f172a", fontWeight: 600 }}>
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-2 d-flex align-items-center gap-2">
                <span className="text-light small d-none d-lg-inline">
                  👤 {user?.name}
                  {isAdmin() && <span className="badge ms-1" style={{ background: "#fbbf24", color: "#0f172a", fontSize: "0.6rem" }}>ADMIN</span>}
                </span>
                <button className="btn btn-outline-danger btn-sm px-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;