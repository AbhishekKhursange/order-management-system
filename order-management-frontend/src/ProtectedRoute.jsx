import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Redirects to /login if not logged in
// If adminOnly=true, redirects to / if not admin
function ProtectedRoute({ children, adminOnly = false }) {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;