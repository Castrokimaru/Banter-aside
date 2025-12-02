import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TurfCard = ({ turf }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Gallery */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={turf.images[currentImage] || '/assets/default-turf.jpg'}
          alt={turf.name}
          className="w-full h-full object-cover"
        />
        {turf.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {turf.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
          Available
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-1">{turf.name}</h3>
        <p className="text-gray-600 text-sm mb-2 flex items-center">
          <span className="mr-1">📍</span>
          {turf.location}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(turf.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">({turf.rating})</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {turf.amenities.map(amenity => (
            <span
              key={amenity}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-primary">₵{turf.pricePerHour}</span>
            <span className="text-gray-600 text-sm">/hour</span>
          </div>
          <Link
            to={`/turf/${turf.id}`}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
