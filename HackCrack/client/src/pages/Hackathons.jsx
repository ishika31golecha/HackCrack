import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hackathons = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [hackathons, setHackathons] = useState([]);
  const [category, setCategory] = useState('both');
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const hackathonsPerPage = 15;

  // Form state for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // API base URL
  const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : 'https://hackcrack.onrender.com/api');


  // Fetch all hackathons based on category
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/hackathons/category/${category}`);
        setHackathons(response.data);
        // Reset to first page when category changes
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, [category, API_URL]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      // Save token to localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Reset form and close modal
      setEmail('');
      setPassword('');
      setShowLogin(false);

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' });
  };

  // Get current hackathons for pagination
  const indexOfLastHackathon = currentPage * hackathonsPerPage;
  const indexOfFirstHackathon = indexOfLastHackathon - hackathonsPerPage;
  const currentHackathons = hackathons.slice(indexOfFirstHackathon, indexOfLastHackathon);
  
  // Calculate total pages
  const totalPages = Math.ceil(hackathons.length / hackathonsPerPage);

  // Page navigation handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top of hackathon list
      window.scrollTo({
        top: document.getElementById('hackathon-list').offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top of hackathon list
      window.scrollTo({
        top: document.getElementById('hackathon-list').offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setShowLogin(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md z-50" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-md mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded-md mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-black text-white px-4 py-2 rounded-md"
                  onClick={() => setShowLogin(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>   
      )}

      {/* Navbar - Same as Homepage */}
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
                  <a href='/' className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Home</a>
                  <a href='/aboutus' className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">About Us</a>
                  <a href='/contactus' className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Contact Us</a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <a href="/signin" className="rounded-md bg-[#ACD7FF] px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white" aria-current="page">Sign Up</a>
              <button onClick={() => setShowLogin(true)} className='rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white'>Log In</button>
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

      {/* Hackathons Section Header */}
      <div className='relative mx-9 mt-10'>
        <h1 className="text-4xl font-bold text-black leading-tight">All Hackathons</h1>
      </div>

      {/* Category Selection */}
      <div className="relative mt-0">
        <nav className="bg-white w-full">
          <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="relative left-1/2 transform -translate-x-1/2 mt-3 flex space-x-9 px-5 font-semibold">
                    <button 
                      onClick={() => setCategory('both')} 
                      className={`rounded-md px-3 py-2 text-sm font-medium font-sans hover:bg-gray-700 hover:text-white ${category === 'both' ? 'bg-gray-700 text-white' : 'text-black'}`}
                    >
                      Hardware + Software
                    </button>
                    <button 
                      onClick={() => setCategory('hardware')} 
                      className={`rounded-md px-3 py-2 text-sm font-medium font-sans hover:bg-gray-700 hover:text-white ${category === 'hardware' ? 'bg-gray-700 text-white' : 'text-black'}`}
                    >
                      Hardware
                    </button>
                    <button 
                      onClick={() => setCategory('software')} 
                      className={`rounded-md px-3 py-2 text-sm font-medium font-sans hover:bg-gray-700 hover:text-white ${category === 'software' ? 'bg-gray-700 text-white' : 'text-black'}`}
                    >
                      Software
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Display Hackathons with Pagination */}
      <div id="hackathon-list" className="container mx-auto my-8 px-4 pb-8">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentHackathons.length > 0 ? (
                currentHackathons.map((hackathon) => (
                  <div key={hackathon._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{hackathon.name}</h3>
                      <p className="text-gray-700 mb-2">Organized by: {hackathon.organization}</p>
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>{hackathon.location}</span>
                        <span>{hackathon.themes}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-gray-700">
                          <strong>Submissions:</strong> {formatDate(hackathon.submission_start_date)} - {formatDate(hackathon.submission_end_date)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span className="text-green-600 font-semibold">Prize: {hackathon.prize_currency} {hackathon.prize_amount}</span>
                        <span className="text-blue-600">{hackathon.registrations} registrations</span>
                      </div>
                      <a 
                        href={hackathon.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Register Now
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-600 text-lg">No hackathons found in this category.</p>
                </div>
              )}
            </div>
            
            {/* Pagination Navigation */}
            {hackathons.length > hackathonsPerPage && (
              <div className="flex justify-center items-center mt-8 space-x-6">
                <button 
                  onClick={goToPreviousPage} 
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="text-lg font-semibold">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button 
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Display showing X of Y hackathons */}
            <div className="text-center text-gray-600 mt-4">
              Showing {indexOfFirstHackathon + 1}-{Math.min(indexOfLastHackathon, hackathons.length)} of {hackathons.length} hackathons
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Hackathons;
