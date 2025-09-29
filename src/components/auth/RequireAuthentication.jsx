import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuthentication({ children }) {
  const auth = useSelector((state) => state.auth);

  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
