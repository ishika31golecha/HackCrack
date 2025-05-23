import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
// Remove the NavBar import if it's causing duplication
// import NavBar from '../components/Navbar';

const Aboutus = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // API base URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
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

      // Redirect or update UI
      navigate('/dashboard'); // Or wherever you want to redirect
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };
  
  return (
    <div className="about-us-page">
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
      
      {/* Don't include NavBar here - it should be in your layout or parent component */}
      {/* <NavBar onLoginClick={() => setShowLogin(true)}/> */}
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">About HackCrack</h1>
        <p className="text-center max-w-4xl mx-auto leading-relaxed" style={{ color: '#355B7E' }}>
          HackCrack is a student-friendly platform designed to bridge the gap between curious minds and competitive coding events. Whether you're a beginner exploring your first hackathon or a seasoned coder seeking your next challenge, HackCrack makes it easy to discover events tailored to your interests, skills, and availability.
          <br/><br/>
          But we're more than just a hackathon directory, we're a collaboration engine. We understand how hard it can be to find the right teammates, especially when you're excited to join but don't have a group. That's why HackCrack also helps you build or join teams based on skills, interests, or goals.
          <br/><br/>
          Our mission is to foster a supportive and dynamic ecosystem for students and developers to connect, compete, and grow together — one hackathon at a time.
        </p>

        <h1 className="text-4xl font-bold text-center mb-8 mt-16">Special Features</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2 space-y-4">
            <div className="bg-[#E7F0FA] p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Hackathon Discovery</h3>
              <p>Find the perfect hackathon tailored to your interests and experience level.</p>
            </div>
            <div className="bg-[#E7F0FA] p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Team Formation</h3>
              <p>Connect with like-minded developers to build your dream team.</p>
            </div>
            <div className="bg-[#E7F0FA] p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Skill Matching</h3>
              <p>Join teams that need your unique skills and expertise.</p>
            </div>
            <div className="bg-[#E7F0FA] p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Event Tracking</h3>
              <p>Never miss important deadlines with our comprehensive event calendar.</p>
            </div>
            <div className="bg-[#E7F0FA] p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Resource Hub</h3>
              <p>Access tutorials, templates, and tools to help you succeed.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-96 bg-[url('/aboutus.png')] bg-center bg-cover rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default Aboutus