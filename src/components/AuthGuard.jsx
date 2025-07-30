import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../utils/auth';

/**
 * Authentication Guard Component
 * Provides a loading state while checking authentication
 * and handles token expiration
 */
const AuthGuard = ({ children, requiredRoles = [], fallbackRoute = '/' }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuth = isAuthenticated();
        const role = getUserRole();
        
        setAuthenticated(isAuth);
        setUserRole(role);
        
        if (!isAuth) {
          console.log('🔒 User not authenticated');
        } else if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
          console.log(`🚫 User role '${role}' not authorized for this route`);
        } else {
          console.log(`✅ User authenticated with role: ${role}`);
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        logout(); // Clear invalid token
        setAuthenticated(false);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Check authentication every 30 seconds
    const interval = setInterval(checkAuth, 30000);
    return () => clearInterval(interval);
  }, [requiredRoles]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!authenticated) {
    return <Navigate to={fallbackRoute} replace />;
  }

  // Redirect if user doesn't have required role
  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    return <Navigate to={fallbackRoute} replace />;
  }

  return children;
};

export default AuthGuard;
