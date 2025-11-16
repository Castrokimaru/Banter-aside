import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1245,
    activeBookings: 89,
    revenue: 125000
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [bookingsResponse] = await Promise.all([
          axios.get('http://localhost:3001/bookings?_limit=10')
        ]);
        setRecentBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage turfs, users, and oversee operations</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">{stats.totalUsers}</h3>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-secondary mb-2">{stats.activeBookings}</h3>
          <p className="text-gray-600">Active Bookings</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-accent mb-2">₵{stats.revenue.toLocaleString()}</h3>
          <p className="text-gray-600">Revenue</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-primary text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
          <div className="text-center">
            <span className="text-2xl block mb-2">➕</span>
            <span className="font-semibold">Add New Turf</span>
          </div>
        </button>
        <button className="bg-secondary text-white p-4 rounded-lg hover:bg-red-700 transition-colors">
          <div className="text-center">
            <span className="text-2xl block mb-2">🏆</span>
            <span className="font-semibold">Schedule Tournament</span>
          </div>
        </button>
        <button className="bg-accent text-primary p-4 rounded-lg hover:bg-yellow-400 transition-colors">
          <div className="text-center">
            <span className="text-2xl block mb-2">👥</span>
            <span className="font-semibold">Manage Users</span>
          </div>
        </button>
        <button className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600 transition-colors">
          <div className="text-center">
            <span className="text-2xl block mb-2">📊</span>
            <span className="font-semibold">Financial Reports</span>
          </div>
        </button>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4">Turf</th>
                <th className="text-left py-2 px-4">User</th>
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Slot</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(booking => (
                <tr key={booking.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">Turf #{booking.turfId}</td>
                  <td className="py-3 px-4">User #{booking.userId}</td>
                  <td className="py-3 px-4">{booking.date}</td>
                  <td className="py-3 px-4">{booking.slot}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:text-green-700 mr-2">Edit</button>
                    <button className="text-red-500 hover:text-red-700">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
