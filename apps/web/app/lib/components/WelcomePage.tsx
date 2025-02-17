"use client"; 
import React from "react";

const WelcomeSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center px-4">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-800">
          Welcome to <span className="text-blue-500">Connectogen</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-600 leading-relaxed">
          Your gateway to meaningful mentorship. Connect with experienced mentors, share knowledge, and grow together in a supportive community.
        </p>

        {/* Call-to-Action Button */}
        <a
          href="/signup"
          className="inline-block bg-black text-white font-semibold px-10 py-4 rounded-lg hover:bg-blue-500 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Get Started
        </a>
      </div>

      {/* Features Section */}
      <div className="mt-16 text-center px-4">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">Expert Mentors</h3>
            <p className="text-gray-600 mt-2">Learn from experienced professionals in various fields.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">Community Support</h3>
            <p className="text-gray-600 mt-2">Engage with a network of like-minded individuals.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">Flexible Scheduling</h3>
            <p className="text-gray-600 mt-2">Connect with mentors at your convenience.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">Personalized Guidance</h3>
            <p className="text-gray-600 mt-2">Get tailored advice to achieve your career goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
