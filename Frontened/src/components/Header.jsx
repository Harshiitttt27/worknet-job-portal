import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSettings, FiHome, FiBriefcase, FiClipboard, FiInfo, FiPhone } from 'react-icons/fi'; // Importing icons

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        setIsLoggedIn(true);
        try {
          const parsedUser = JSON.parse(userData);
          setUserProfile(parsedUser);
          console.log(parsedUser); // Log the user profile to check
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    };

    checkAuth();

    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserProfile(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/signin');
    setIsDropdownOpen(false); // Close the dropdown after logout
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewProfileClick = () => {
    setIsDropdownOpen(false); // Close the dropdown when "View Profile" is clicked
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <header className="flex flex-wrap justify-between items-center p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="logo text-3xl font-extrabold">
          <h1 className="ml-2 text-3xl font-extrabold tracking-wide text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 uppercase shadow-lg">
            WorkNet
          </h1>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`}>
        <div className="flex flex-col md:flex-row md:space-x-8 md:items-center">
          {/* Home */}
          <Link to="/" className="text-white hover:text-gray-200 flex items-center space-x-2 py-2 md:py-0">
            <FiHome className="w-5 h-5" />
            <span>Home</span>
          </Link>

          {/* Other Links */}
          <Link to="/post-company" className="text-white hover:text-gray-200 flex items-center space-x-2 py-2 md:py-0">
            <FiBriefcase className="w-5 h-5" />
            <span>Company</span>
          </Link>

          <Link to="/post-job" className="text-white hover:text-gray-200 flex items-center space-x-2 py-2 md:py-0">
            <FiClipboard className="w-5 h-5" />
            <span>Post Jobs</span>
          </Link>

          <Link to="/jobs" className="text-white hover:text-gray-200 flex items-center space-x-2 py-2 md:py-0">
            <FiBriefcase className="w-5 h-5" />
            <span>Find Jobs</span>
          </Link>

          <Link to="/about" className="text-white hover:text-gray-200 flex items-center space-x-2 py-2 md:py-0">
            <FiInfo className="w-5 h-5" />
            <span>About</span>
          </Link>

          <Link to="/contact" className="text-white hover:text-gray-200 flex items-center space-x-2 py-2 md:py-0">
            <FiPhone className="w-5 h-5" />
            <span>Contact</span>
          </Link>

          {/* Authentication Buttons */}
          {!isLoggedIn ? (
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 py-2 md:py-0">
              <Link to="/register" className="text-white hover:text-gray-200">
                <button className="py-2 px-6 rounded-lg bg-blue-600 hover:bg-blue-700">Register</button>
              </Link>
              <Link to="/signin" className="text-white hover:text-gray-200">
                <button className="py-2 px-6 rounded-lg bg-green-600 hover:bg-green-700">Sign In</button>
              </Link>
            </div>
          ) : (
            <div className="relative py-2 md:py-0">
              <button
                className="flex items-center space-x-2 bg-gray-700 py-2 px-4 rounded-full"
                onClick={handleProfileClick}
              >
                <img
                  src={userProfile?.profile_picture || 'https://clipart-library.com/2023/855-Free-Clipart-Of-A-Male-Avatar.jpg'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{userProfile?.username}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg w-full md:w-48 z-10">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-200"
                      onClick={handleViewProfileClick} // Close dropdown and navigate to profile
                    >
                      View Profile
                    </li>

                    <li
                      className="px-4 py-2 hover:bg-gray-200 text-red-500 cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
