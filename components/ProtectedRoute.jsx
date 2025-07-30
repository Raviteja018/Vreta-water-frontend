import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAuthenticated || auth.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}