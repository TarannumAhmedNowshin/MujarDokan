import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 h-screen flex flex-col justify-center items-center text-white">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url(https://via.placeholder.com/1500x800)' }}></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 md:px-16">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
          Get pookie socks ^*^
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Sleep Better. Wear socks. Start running.
        </p>

        {/* Call-to-Action Button */}
        <div className="flex justify-center gap-8">
          <Link to="/shop" className="bg-black text-yellow-400 py-3 px-6 rounded-full text-xl transition duration-300 hover:bg-yellow-400 hover:text-black">
            SHOP NOW
          </Link>
        </div>
      </div>

      {/* Optional Product Image */}
      <div className="absolute bottom-20 right-16 md:bottom-32 md:right-32">
        <img src="https://via.placeholder.com/200x400" alt="Product" className="rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default LandingPage;

