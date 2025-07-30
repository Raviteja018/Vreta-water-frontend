import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { setToken, isAuthenticated, getUserRole } from '../src/utils/auth';

export default function AdminLogin() {
  const [form, setForm] = useState({ username:'', password:'' });
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      if (role === 'admin') {
        navigate('/admin-home', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('🔐 Attempting admin login...');
      const res = await axios.post('http://localhost:4000/api/auth/admin-login', form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Admin login successful');
      
      // Store token using auth utility
      setToken(res.data.token);

      // Show success notification
      setNotificationMessage(`Welcome back, ${form.username}! 🎉 You've successfully logged in as Administrator.`);
      setNotificationType('success');
      setShowNotification(true);

      // Navigate after a short delay to show the notification
      setTimeout(() => {
        navigate('/admin-home', { replace: true });
      }, 1500);
    } catch (err) {
      console.error('❌ Admin login failed:', err);
      const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.';
      setNotificationMessage(errorMessage);
      setNotificationType('error');
      setShowNotification(true);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Notification
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
        duration={4000}
      />
      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded-md">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              name="username"
              id="username"
              type="text"
              autoComplete='username'
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 outline-none"
              required
            />
          </div>
          <button
  type="submit"
  disabled={loading}
  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      Signing In...
    </div>
  ) : (
    'Sign In'
  )}
</button>

        </form>
      </div>
    </div>
  );
}


















