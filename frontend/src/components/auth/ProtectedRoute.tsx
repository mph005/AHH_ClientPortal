import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute = ({ 
  allowedRoles = [], 
  redirectPath = '/login' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard or unauthorized page if user doesn't have the required role
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated and has required role, render the children
  return <Outlet />;
};

export default ProtectedRoute; 