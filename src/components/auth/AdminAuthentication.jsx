import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminAuthentication({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const roles = useSelector((state) => state.auth.roles);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Only allow site-wide admins
  if (!roles || !roles.includes("Admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
}
