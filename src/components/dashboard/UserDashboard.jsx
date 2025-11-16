import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import LocationPicker from '../shared/LocationPicker';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeTournaments: 12,
    availableTurfs: 45,
    liveMatches: 3
  });
  const [recentFixtures, setRecentFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [fixturesResponse] = await Promise.all([
          axios.get('http://localhost:3001/fixtures?_limit=5')
        ]);
        setRecentFixtures(fixturesResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-green-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.teamName}!</h1>
        <p className="text-lg opacity-90">Ready to book your next turf or join a tournament?</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-primary text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-left">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📅</span>
            <div>
              <h3 className="font-semibold">Book Turf</h3>
              <p className="text-sm opacity-90">Find and reserve available turfs</p>
            </div>
          </div>
        </button>

        <button className="bg-secondary text-white p-6 rounded-lg hover:bg-red-700 transition-colors text-left">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="font-semibold">Join Tournament</h3>
              <p className="text-sm opacity-90">Enter upcoming competitions</p>
            </div>
          </div>
        </button>

        <div className="bg-gray-100 p-6 rounded-lg text-left">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">💰</span>
            <div>
              <h3 className="font-semibold text-primary">Wallet: ksh 2,500</h3>
              <p className="text-sm text-gray-600">Available balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <LocationPicker />

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Tournaments:</span>
                <span className="font-semibold text-primary">{stats.activeTournaments}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Available Turfs:</span>
                <span className="font-semibold text-primary">{stats.availableTurfs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Live Matches:</span>
                <span className="font-semibold text-red-500">{stats.liveMatches}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Match Fixtures Panel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Upcoming Matches</h3>
            <div className="space-y-4">
              {recentFixtures.map(fixture => (
                <div key={fixture.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {new Date(fixture.date).toLocaleDateString()} at {fixture.time}
                      </span>
                      {fixture.status === 'live' && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs animate-pulse">
                          LIVE
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{fixture.venue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{fixture.homeTeam}</span>
                      <span className="text-gray-400">vs</span>
                      <span className="font-semibold">{fixture.awayTeam}</span>
                    </div>
                    <button className="text-primary hover:text-green-700 text-sm font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-primary hover:text-green-700 font-semibold">
                View All Fixtures →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
