import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, hasAnyRole } from '../utils/auth';

/**
 * Protected Route Component
 * Protects routes based on authentication and role requirements
 */
const ProtectedRoute = ({ children, requiredRoles = [], redirectTo = '/' }) => {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    console.log('🚫 User not authenticated, redirecting to:', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  // If roles are specified, check if user has required role
  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    console.log('🚫 User does not have required role, redirecting to:', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  console.log('✅ Access granted to protected route');
  return children;
};

export default ProtectedRoute;
