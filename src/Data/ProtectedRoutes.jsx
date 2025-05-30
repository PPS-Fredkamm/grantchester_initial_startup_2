import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './UserContext';

export default function ProtectedRoute() {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
