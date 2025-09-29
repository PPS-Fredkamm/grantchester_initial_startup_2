import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminAuthentication({ children }) {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Only allow site-wide admins
  if (!auth.roles || !auth.roles.includes("Admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
}
