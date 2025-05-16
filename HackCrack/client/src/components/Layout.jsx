// In Layout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import LoginModal from './LoginModal';

const Layout = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in on component mount and on any state changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  
  // Handle successful login
  const handleLoginSuccess = () => {
    setShowLogin(false);
    setIsLoggedIn(true);
    navigate('/'); // Navigate to home page after login
  };
  
  // Handle profile click
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  // Handle sign out
  const handleSignOut = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state to reflect logged out status
    setIsLoggedIn(false);
    
    // Redirect to home page
    navigate('/');
  };
  
  return (
    <>
      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={handleLoginSuccess}
      />
      
      <NavBar
        onLoginClick={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn}
        onProfileClick={handleProfileClick}
        onSignOut={handleSignOut}
      />
      
      <Outlet />
    </>
  );
};

export default Layout;