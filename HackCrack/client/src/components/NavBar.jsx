import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onLoginClick, isLoggedIn, onProfileClick, onSignOut }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    setDropdownOpen(false);
    if (onSignOut) {
      onSignOut();
    }
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    if (onProfileClick) {
      onProfileClick();
    }
  };

  return (
    <nav className="bg-white mt-3">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              
              <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              
              <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center space-x-3">
              <img className="h-12 w-auto" src="/HC_logo_icon.jpg" alt="Hackcrack"/>
              <h1 className="text-2xl font-sans">HackCrack</h1>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 flex space-x-4 px-5">
                <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Home</Link>
                <Link to="/aboutus" className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">About Us</Link>
                <Link to="/contactus" className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={toggleDropdown}
                  className="relative rounded-full bg-gray-200 p-1 text-gray-800 hover:bg-gray-300 focus:outline-none"
                >
                  <span className="sr-only">View profile</span>
                  <svg className="size-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                    <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="rounded-md bg-[#ACD7FF] px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white" aria-current="page">Sign Up</Link>
                <button onClick={onLoginClick} className='rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white'>Log In</button>
              </>
            )}
            <button type="button" className="relative rounded-full bg-black p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;