import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiLock, FiUnlock } from 'react-icons/fi';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, ChartDataLabels);

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: { totalUsers: 0, activeUsers: 0, inactiveUsers: 0, totalCustomers: 0, totalContacts: 0, totalEmployees: 0, totalManagers: 0 },
    recentCustomers: [],
    recentUsers: [],
    recentContacts: [],
  });
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({
    userRegistrations: [],
    customerRegistrations: [],
    contactSubmissions: [],
    roleDistribution: [],
    locationDistribution: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState({ customers: 1, users: 1 });
  const [itemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    role: 'employee',
    department: '',
    position: '',
  });
  const [activeTab, setActiveTab] = useState('users');
  const [analyticsPeriod, setAnalyticsPeriod] = useState('30');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('🔑 Token:', token ? 'Present' : 'Missing');

        if (!token) {
          setError('No authentication token found. Please login as admin.');
          setLoading(false);
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log('📡 Starting data fetch...');

        // Fetch dashboard stats
        // console.log('📊 Fetching dashboard stats...');
        const dashboardRes = await axios.get('http://localhost:4000/api/admin/dashboard', config);
        // console.log('✅ Dashboard data:', dashboardRes.data);
        setDashboardData(dashboardRes.data);

        // Fetch customers
        // console.log('👥 Fetching customers...');
        const customersRes = await axios.get('http://localhost:4000/api/admin/customers', config);
        // console.log('✅ Customers data:', customersRes.data);
        setCustomers(customersRes.data || []);

        // Fetch users
        // console.log('👤 Fetching users...');
        const usersRes = await axios.get('http://localhost:4000/api/admin/users', config);
        // console.log('✅ Users data:', usersRes.data);
        setUsers(usersRes.data || []);

        // Fetch analytics
        // console.log('📈 Fetching analytics...');
        const analyticsRes = await axios.get(`http://localhost:4000/api/admin/analytics?period=${analyticsPeriod}`, config);
        // console.log('✅ Analytics data:', analyticsRes.data);
        setAnalytics(analyticsRes.data || {
          userRegistrations: [],
          customerRegistrations: [],
          contactSubmissions: [],
          roleDistribution: [],
          locationDistribution: [],
        });

        setError(''); // Clear any previous errors
        setLoading(false);
        // console.log('🎉 All data fetched successfully!');
      } catch (err) {
        console.error('❌ Error fetching data:', err);
        console.error('❌ Error response:', err.response?.data);
        console.error('❌ Error status:', err.response?.status);

        let errorMessage = 'Failed to fetch data.';
        if (err.response?.status === 401) {
          errorMessage = 'Unauthorized access. Please login as admin.';
        } else if (err.response?.status === 403) {
          errorMessage = 'Access denied. Admin privileges required.';
        } else if (err.response?.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (err.code === 'ECONNREFUSED') {
          errorMessage = 'Cannot connect to server. Please ensure the backend is running.';
        }

        setError(errorMessage);
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [analyticsPeriod]);

  useEffect(() => {
    setSearchQuery('');
    setFilterLocation('all');
    setSortBy('date');
    setCurrentPage({ customers: 1, users: 1 });
  }, [activeTab]);

  // Status color utility
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'follow-up': return 'bg-orange-100 text-orange-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'interested': return 'bg-teal-100 text-teal-800';
      case 'not interested': return 'bg-red-100 text-red-800';
      case 'not answered': return 'bg-gray-200 text-gray-700';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and sort data
  const filterAndSort = (data, type) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'name') {
        if (type === 'users') {
          const aName = (a.fullName || a.username || '').toLowerCase();
          const bName = (b.fullName || b.username || '').toLowerCase();
          return aName.localeCompare(bName);
        } else {
          return (a.fullName || '').toLowerCase().localeCompare((b.fullName || '').toLowerCase());
        }
      } else if (sortBy === 'location' && type === 'customers') {
        return (a.location || '').localeCompare(b.location || '');
      }
      return 0;
    });

    const lowercasedQuery = searchQuery.toLowerCase();

    return sortedData.filter(item => {
      if (searchQuery === '') {
        if (type === 'customers' && filterLocation !== 'all') {
          return (item.location || '').toLowerCase() === filterLocation.toLowerCase();
        }
        return true;
      }

      if (type === 'users') {
        const username = (item.username || '').toLowerCase();
        const fullName = (item.fullName || '').toLowerCase();
        const email = (item.email || '').toLowerCase();
        return username.includes(lowercasedQuery) || fullName.includes(lowercasedQuery) || email.includes(lowercasedQuery);
      } else if (type === 'customers') {
        const name = (item.fullName || '').toLowerCase();
        const email = (item.email || '').toLowerCase();
        const phone = (item.phone || '');
        const location = (item.location || '').toLowerCase();
        const matchesSearch = name.includes(lowercasedQuery) || email.includes(lowercasedQuery) || phone.includes(searchQuery);
        const matchesLocation = filterLocation === 'all' || location === filterLocation.toLowerCase();
        return matchesSearch && matchesLocation;
      }
      return true;
    });
  };

  const filteredCustomers = filterAndSort(customers, 'customers');
  const filteredUsers = filterAndSort(users, 'users');



  // Pagination
  const getPaginatedData = (data, type) => {
    const indexOfLastItem = currentPage[type] * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = {
    customers: Math.ceil(filteredCustomers.length / itemsPerPage),
    users: Math.ceil(filteredUsers.length / itemsPerPage),
  };

  const paginate = (pageNumber, type) => {
    setCurrentPage(prev => ({ ...prev, [type]: pageNumber }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // User Management Functions
  const handleCreateOrUpdateUser = async (e) => {
    e.preventDefault();
    // validation and token check
    if (!formData.username || !formData.password || !formData.role) {
      setError('Please fill in all required fields');
      return;
    }

    // Password strength validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Email validation (only if email is provided)
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        navigate('/admin-login');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const userData = { ...formData };

      let response;
      if (selectedUser) {
        response = await axios.put(
          `http://localhost:4000/api/admin/users/${selectedUser._id}`,
          userData,
          config
        );
      } else {
        response = await axios.post(
          'http://localhost:4000/api/admin/users',
          userData,
          config
        );
      }

      // Show success message
      toast.success(
        `User ${selectedUser ? 'updated' : 'created'} successfully!`,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );

      // Close modal and reset form
      setShowModal(false);
      setSelectedUser(null);
      setFormData({
        username: '',
        password: '',
        email: '',
        fullName: '',
        phone: '',
        role: 'employee',
        department: '',
        position: '',
      });

      // Refresh user list
      const usersRes = await axios.get('http://localhost:4000/api/admin/users', config);
      setUsers(usersRes.data);
      setError('');
    } catch (err) {
      console.error('Error saving user:', err);
      let errorMessage = 'Failed to save user data.';
      if (err.response?.data) {
        const { error, details } = err.response.data;
        errorMessage = error || 'An unknown error occurred.';
        if (details && Array.isArray(details)) {
          errorMessage = `${error}: ${details.join(', ')}`;
        }
      }
      setError(errorMessage);

      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:4000/api/admin/users/${id}`, config);
      const usersRes = await axios.get('http://localhost:4000/api/admin/users', config);
      setUsers(usersRes.data);
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.patch(`http://localhost:4000/api/admin/users/${id}/status`, {}, config);
      const usersRes = await axios.get('http://localhost:4000/api/admin/users', config);
      setUsers(usersRes.data);
    } catch (err) {
      setError('Failed to update user status.');
    }
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setFormData(user ? {
      username: user.username || '',
      email: user.email || '',
      fullName: user.fullName || '',
      phone: user.phone || '',
      role: user.role || 'employee',
      department: user.department || '',
      position: user.position || '',
    } : { username: '', email: '', fullName: '', phone: '', role: 'employee', department: '', position: '' });
    setShowModal(true);
  };

  // Analytics Charts with safe data handling
  const locationChartData = {
    labels: (analytics.locationDistribution || []).map(item => item._id || 'Unknown'),
    datasets: [{
      label: 'Customers by Location',
      data: (analytics.locationDistribution || []).map(item => item.count || 0),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const roleChartData = {
    labels: (analytics.roleDistribution || []).map(item => item._id || 'Unknown'),
    datasets: [{
      label: 'Users by Role',
      data: (analytics.roleDistribution || []).map(item => item.count || 0),
      backgroundColor: ['#2563eb', '#facc15', '#f97316'],
    }],
  };

  // Inquiries Today with safe data handling
  const inquiriesToday = (analytics.contactSubmissions || [])
    .filter(item => item._id === new Date().toISOString().split('T')[0])
    .reduce((sum, item) => sum + (item.count || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            {/* Logo & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                src="/src/assets/Vreta-logo.png"
                alt="Vreta Logo"
                className="h-20 w-20 object-contain"
              />

              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Manage users, monitor customers, and view analytics
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={async () => {
                  setLoading(true);
                  setError('');
                  try {
                    const token = localStorage.getItem('token');
                    console.log('🔄 Manual refresh triggered');

                    if (!token) {
                      setError('No authentication token found. Please login as admin.');
                      setLoading(false);
                      return;
                    }

                    const config = { headers: { Authorization: `Bearer ${token}` } };

                    const dashboardRes = await axios.get('http://localhost:4000/api/admin/dashboard', config);
                    setDashboardData(dashboardRes.data);

                    const customersRes = await axios.get('http://localhost:4000/api/admin/customers', config);
                    setCustomers(customersRes.data || []);

                    const usersRes = await axios.get('http://localhost:4000/api/admin/users', config);
                    setUsers(usersRes.data || []);

                    const analyticsRes = await axios.get(`http://localhost:4000/api/admin/analytics?period=${analyticsPeriod}`, config);
                    setAnalytics(
                      analyticsRes.data || {
                        userRegistrations: [],
                        customerRegistrations: [],
                        contactSubmissions: [],
                        roleDistribution: [],
                        locationDistribution: [],
                      }
                    );

                    console.log('✅ Manual refresh completed');
                  } catch (err) {
                    console.error('❌ Manual refresh failed:', err);
                    setError(`Refresh failed: ${err.response?.data?.error || err.message}`);
                  }
                  setLoading(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh Data'}
              </button>

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>


          {error && (
            <Card>
              <div className="p-6 text-center">
                <div className="text-red-500 text-lg mb-2">⚠️ Error</div>
                <p className="text-gray-600 mb-4">{error}</p>
                <div className="text-sm text-gray-500">
                  <p>Debug info:</p>
                  <p>• Token present: {localStorage.getItem('token') ? 'Yes' : 'No'}</p>
                  <p>• Backend URL: http://localhost:4000</p>
                  <p>• Check browser console for detailed logs</p>
                </div>
                <button
                  onClick={() => {
                    setError('');
                    window.location.reload();
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </Card>
          )}

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'customers' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Customers
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'analytics' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              {/* Filters and Search */}
              <Card className="mb-6">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                      <input
                        type="text"
                        placeholder="Search by username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="date">Date (Newest)</option>
                        <option value="name">Name (A-Z)</option>
                      </select>
                    </div>
                    <div>
                      <button
                        onClick={() => openModal()}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mt-6"
                      >
                        Create User
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* User Table */}
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                    <span className="text-sm text-gray-600">{filteredUsers.length} of {users.length} users</span>
                  </div>
                  {filteredUsers.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500">No users found matching your criteria.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {getPaginatedData(filteredUsers, 'users').map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                <div className="text-sm text-gray-500">{user.username}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                  {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Employee'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                  {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openModal(user)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="Edit User"
                                  >
                                    <FiEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete User"
                                  >
                                    <FiTrash2 />
                                  </button>
                                  <button
                                    onClick={() => handleToggleStatus(user._id, user.status)}
                                    className={user.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}
                                    title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                                  >
                                    {user.status === 'active' ? <FiLock /> : <FiUnlock />}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {/* Pagination */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                    <div className="text-sm text-gray-600 text-center sm:text-left">
                      Showing {Math.min((currentPage.users - 1) * itemsPerPage + 1, filteredUsers.length)} to {Math.min(currentPage.users * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                    </div>

                    <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                      <button
                        onClick={() => paginate(currentPage.users - 1, 'users')}
                        disabled={currentPage.users === 1}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages.users }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => paginate(i + 1, 'users')}
                          className={`px-3 py-1 rounded-lg ${currentPage.users === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => paginate(currentPage.users + 1, 'users')}
                        disabled={currentPage.users === totalPages.users}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>

                </div>
              </Card>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div>
              {/* Filters and Search */}
              <Card className="mb-6">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                      <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Location</label>
                      <select
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All Locations</option>
                        {(analytics.locationDistribution || []).map(loc => (
                          <option key={loc._id || 'unknown'} value={loc._id || ''}>{loc._id || 'Unknown'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="date">Date (Newest)</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="location">Location</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Customer Table */}
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Customers</h3>
                    <span className="text-sm text-gray-600">{filteredCustomers.length} of {customers.length} customers</span>
                  </div>
                  {filteredCustomers.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500">No customers found matching your criteria.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {getPaginatedData(filteredCustomers, 'customers').map(customer => (
                            <tr key={customer._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{customer.fullName}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{customer.email}</div>
                                <div className="text-sm text-gray-500">{customer.phone}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {customer.location}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                                  {customer.status ? customer.status.charAt(0).toUpperCase() + customer.status.slice(1) : 'New'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(customer.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {/* Pagination */}
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Showing {Math.min((currentPage.customers - 1) * itemsPerPage + 1, filteredCustomers.length)} to {Math.min(currentPage.customers * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => paginate(currentPage.customers - 1, 'customers')}
                        disabled={currentPage.customers === 1}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages.customers }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => paginate(i + 1, 'customers')}
                          className={`px-3 py-1 rounded-lg ${currentPage.customers === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => paginate(currentPage.customers + 1, 'customers')}
                        disabled={currentPage.customers === totalPages.customers}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                <select
                  value={analyticsPeriod}
                  onChange={(e) => setAnalyticsPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
              </div>

              {/* Summary Stats */}
              <Card className="mb-6">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Summary Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{dashboardData.stats?.totalUsers || 0}</p>
                      <p className="text-sm text-gray-600">Total Users</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{dashboardData.stats?.totalCustomers || 0}</p>
                      <p className="text-sm text-gray-600">Total Customers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{dashboardData.stats?.inactiveUsers || 0}</p>
                      <p className="text-sm text-gray-600">Blocked Users</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{inquiriesToday || 0}</p>
                      <p className="text-sm text-gray-600">Inquiries Today</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Distribution Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Customer Location Distribution</h3>
                    <div className="h-64 w-full">
                      <Bar
                        data={locationChartData}
                        options={{
                          maintainAspectRatio: false,
                          responsive: true,
                          plugins: {
                            legend: {
                              display: false
                            }
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              grid: {
                                display: true
                              }
                            },
                            x: {
                              grid: {
                                display: false
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">User Role Distribution</h3>
                    <div className="h-64 w-full flex items-center justify-center">
                      <Pie
                        data={roleChartData}
                        options={{
                          maintainAspectRatio: false,
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                padding: 20,
                                usePointStyle: true
                              }
                            },
                            tooltip: {
                              callbacks: {
                                label: function (context) {
                                  const label = context.label || '';
                                  const value = context.parsed;
                                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                  const percentage = ((value / total) * 100).toFixed(1);
                                  return `${label}: ${value} (${percentage}%)`;
                                }
                              }
                            },
                            datalabels: {
                              display: true,
                              color: 'white',
                              font: {
                                weight: 'bold',
                                size: 12
                              },
                              formatter: function (value, context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return percentage + '%';
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* User Management Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <Card className="w-full max-w-md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {selectedUser ? 'Edit User' : 'Create User'}
                  </h3>
                  <form onSubmit={handleCreateOrUpdateUser}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Username *</label>
                        <input
                          type="text"
                          value={formData.username || ''}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter username"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Password *</label>
                        <input
                          type="password"
                          value={formData.password || ''}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter password (min 6 characters)"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                          value={formData.role || 'employee'}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="employee">Employee</option>
                          <option value="manager">Manager</option>
                        </select>
                      </div>

                    </div>
                    <div className="mt-6 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        {selectedUser ? 'Update' : 'Create'}
                      </button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}