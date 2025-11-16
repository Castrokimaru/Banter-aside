import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../contexts/LocationContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { location } = useLocation();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-primary to-green-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              ⚽
            </div>
            <Link to="/" className="text-xl font-bold">
              KenyanTurf
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-accent transition-colors">
              Turfs
            </Link>
            <Link to="/fixtures" className="hover:text-accent transition-colors">
              Fixtures
            </Link>
            <Link to="#" className="hover:text-accent transition-colors">
              Tournaments
            </Link>
            <Link to="#" className="hover:text-accent transition-colors">
              Standings
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {location && (
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span>📍</span>
                <span>{location.city}, {location.region}</span>
              </div>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.teamName}</span>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Login
                </button>
                <Link
                  to="/register"
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
