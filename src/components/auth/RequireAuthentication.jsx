import { useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

// Check environment variable. toggable debug mode to get around the login requirement. 
// True = Bypass, False = Normal login
const debugAuth = import.meta.env.VITE_DEBUG_AUTH === "true";

console.log("DEBUG MODE:", import.meta.env.VITE_DEBUG_AUTH);


export default function RequireAuthentication({ children }) {
  const authCtx = useAuthContext();
  const location = useLocation();

 if (!debugAuth && !authCtx.ctx.isAuthenticated) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}


  return <>{children}</>;
}
