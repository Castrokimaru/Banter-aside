import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: -1.2921, lng: 36.8219 }); // Default to Nairobi
  const [locations, setLocations] = useState([
    { id: 1, name: 'Nairobi', lat: -1.2921, lng: 36.8219 },
    { id: 2, name: 'Mombasa', lat: -4.0547, lng: 39.6636 },
    { id: 3, name: 'Kisumu', lat: -0.1014, lng: 34.7679 },
    { id: 4, name: 'Nakuru', lat: -0.3034, lng: 36.0858 },
  ]);

  useEffect(() => {
    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const value = {
    currentLocation,
    setCurrentLocation,
    locations,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
