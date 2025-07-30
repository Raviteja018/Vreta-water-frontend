import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

/**
 * Role-based redirect component
 * Redirects authenticated users to their appropriate dashboard
 */
const RoleBasedRedirect = ({ children }) => {
  const userRole = getUserRole();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (authenticated && userRole) {
      console.log(`🔄 User authenticated with role: ${userRole}`);
    }
  }, [authenticated, userRole]);

  // If user is authenticated, redirect to their role-specific dashboard
  if (authenticated && userRole) {
    switch (userRole) {
      case 'admin':
        console.log('🔄 Redirecting admin to admin dashboard');
        return <Navigate to="/admin-home" replace />;
      case 'manager':
        console.log('🔄 Redirecting manager to manager dashboard');
        return <Navigate to="/manager-home" replace />;
      case 'employee':
        console.log('🔄 Redirecting employee to employee dashboard');
        return <Navigate to="/employee-home" replace />;
      default:
        console.log('🔄 Unknown role, staying on current page');
        break;
    }
  }

  // If not authenticated or no role, show children (login/role selection)
  return children;
};

export default RoleBasedRedirect;
