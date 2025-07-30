// Authentication utilities
import { jwtDecode } from 'jwt-decode';

/**
 * Get the current user's authentication token
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Set authentication token
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Remove authentication token
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    if (decoded.exp < currentTime) {
      removeToken();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Invalid token:', error);
    removeToken();
    return false;
  }
};

/**
 * Get current user's role from token
 */
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Get current user's ID from token
 */
export const getUserId = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if user has required role
 */
export const hasRole = (requiredRole) => {
  const userRole = getUserRole();
  return userRole === requiredRole;
};

/**
 * Check if user has any of the required roles
 */
export const hasAnyRole = (requiredRoles) => {
  const userRole = getUserRole();
  return requiredRoles.includes(userRole);
};

/**
 * Logout user
 */
export const logout = () => {
  removeToken();
  window.location.href = '/';
};

/**
 * Get user info from token
 */
export const getUserInfo = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      role: decoded.role,
      exp: decoded.exp,
      iat: decoded.iat
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
