import React, { useState } from 'react';
import { useLocation } from '../../contexts/LocationContext';

const kenyanCounties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale', 'Garissa', 'Kakamega'
];

const LocationPicker = () => {
  const { location, loading } = useLocation();
  const [selectedCounty, setSelectedCounty] = useState(location?.region || 'Nairobi');

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-10 rounded"></div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <span className="mr-2">📍</span>
        Your Location
      </h3>
      {location ? (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Detected: {location.city}, {location.region}
          </p>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Location access denied. Select manually:</p>
        </div>
      )}
      <select
        value={selectedCounty}
        onChange={(e) => setSelectedCounty(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        {kenyanCounties.map(county => (
          <option key={county} value={county}>{county}</option>
        ))}
      </select>
      <button className="mt-2 w-full bg-primary text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
        Change Location
      </button>
    </div>
  );
};

export default LocationPicker;
