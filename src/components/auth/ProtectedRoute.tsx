
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  admin?: boolean;
}

const ProtectedRoute = ({ children, admin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and save the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin route but user is not admin
  if (admin && !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
