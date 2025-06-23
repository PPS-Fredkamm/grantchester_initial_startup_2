import { useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

export default function RequireAuthentication({ children }) {
  const authCtx = useAuthContext();
  const location = useLocation();

  if (!authCtx.ctx.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
