import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await axios.get('http://localhost:3001/fixtures');
        setFixtures(response.data);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  const filteredFixtures = fixtures.filter(fixture => {
    if (filter === 'all') return true;
    return fixture.status === filter;
  });

  const FixtureCard = ({ fixture }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Tournament Header */}
      <div className="bg-gradient-to-r from-primary to-green-800 text-white p-3 rounded-lg mb-4">
        <h3 className="font-bold text-center">FK PREMIER LEAGUE</h3>
      </div>

      {/* Match Time and Venue */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
          <span>🕒</span>
          <span className="font-semibold">{fixture.time} EAT</span>
          <span>🏟️</span>
          <span>{fixture.venue}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            🟢
          </div>
          <h4 className="font-semibold text-primary">{fixture.homeTeam}</h4>
        </div>

        <div className="px-4">
          <span className="text-2xl font-bold text-gray-400">VS</span>
        </div>

        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
            🟡
          </div>
          <h4 className="font-semibold text-primary">{fixture.awayTeam}</h4>
        </div>
      </div>

      {/* Date and Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-600">
          <span>📅</span>
          <span>{new Date(fixture.date).toLocaleDateString()}</span>
        </div>
        <button className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-semibold">
          Preview
        </button>
      </div>

      {/* Live Indicator */}
      {fixture.status === 'live' && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 animate-pulse">
            🔴 LIVE
          </span>
        </div>
      )}
    </div>
  );

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
        <h1 className="text-3xl font-bold text-primary mb-2">Match Fixtures & Results</h1>
        <p className="text-gray-600">Stay updated with the latest matches and tournaments</p>
      </div>

      {/* Filters */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'upcoming'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter('live')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'live'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Live
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'completed'
              ? 'bg-gray-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Fixtures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFixtures.map(fixture => (
          <FixtureCard key={fixture.id} fixture={fixture} />
        ))}
      </div>

      {filteredFixtures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No fixtures found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default Fixtures;
