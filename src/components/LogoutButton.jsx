import React from 'react';
import { logout, getUserRole } from '../utils/auth';

/**
 * Logout Button Component
 * Provides a logout button with role-specific styling
 */
const LogoutButton = ({ className = "", variant = "default" }) => {
  const userRole = getUserRole();

  const handleLogout = () => {
    console.log('🚪 User logging out...');
    logout();
  };

  const getButtonStyles = () => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2";
    
    switch (variant) {
      case "header":
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700`;
      case "sidebar":
        return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200`;
      case "minimal":
        return `${baseStyles} text-red-600 hover:text-red-800 hover:bg-red-50`;
      default:
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700`;
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`${getButtonStyles()} ${className}`}
      title={`Logout from ${userRole} dashboard`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Logout
    </button>
  );
};

export default LogoutButton;
