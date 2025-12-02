import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TurfCard from './TurfCard';
import LocationPicker from '../shared/LocationPicker';

const TurfList = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/turfs');
        setTurfs(response.data);
      } catch (error) {
        console.error('Error fetching turfs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurfs();
  }, []);

  const filteredTurfs = turfs.filter(turf =>
    turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turf.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTurfs = [...filteredTurfs].sort((a, b) => {
    if (sortBy === 'price') return a.pricePerHour - b.pricePerHour;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // distance sorting would need location data
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-green-800 text-white rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Book Your Turf. Join The Competition. Win Big!</h1>
        <p className="text-xl mb-6">Find the perfect turf for your next match or tournament</p>
        <button className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
          Find Turfs Near You
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search turfs by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="distance">Distance</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location and Turf Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <LocationPicker />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedTurfs.map(turf => (
              <TurfCard key={turf.id} turf={turf} />
            ))}
          </div>
          {sortedTurfs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No turfs found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurfList;
