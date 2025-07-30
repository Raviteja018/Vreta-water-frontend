import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';

export default function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('30');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/admin/analytics?period=${period}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return <div>No analytics data available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Registration Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">User Registration Trends</h3>
            <div className="space-y-3">
              {analyticsData.userRegistrations.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item._id}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((item.count / Math.max(...analyticsData.userRegistrations.map(r => r.count))) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customer Registration Trends</h3>
            <div className="space-y-3">
              {analyticsData.customerRegistrations.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item._id}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((item.count / Math.max(...analyticsData.customerRegistrations.map(r => r.count))) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Form Submissions</h3>
            <div className="space-y-3">
              {analyticsData.contactSubmissions && analyticsData.contactSubmissions.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item._id}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((item.count / Math.max(...analyticsData.contactSubmissions.map(r => r.count))) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">User Role Distribution</h3>
            <div className="space-y-3">
              {analyticsData.roleDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{item._id}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item._id === 'admin' ? 'bg-red-600' :
                          item._id === 'manager' ? 'bg-yellow-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min((item.count / Math.max(...analyticsData.roleDistribution.map(r => r.count))) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customer Location Distribution</h3>
            <div className="space-y-3">
              {analyticsData.locationDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item._id}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((item.count / Math.max(...analyticsData.locationDistribution.map(r => r.count))) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Summary Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {analyticsData.customerRegistrations.reduce((sum, item) => sum + item.count, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Customer Registrations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {analyticsData.contactSubmissions ? analyticsData.contactSubmissions.reduce((sum, item) => sum + item.count, 0) : 0}
              </p>
              <p className="text-sm text-gray-600">Total Contact Submissions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {analyticsData.roleDistribution.length}
              </p>
              <p className="text-sm text-gray-600">User Roles</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">
                {analyticsData.locationDistribution.length}
              </p>
              <p className="text-sm text-gray-600">Customer Locations</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 