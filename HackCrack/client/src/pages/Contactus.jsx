import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Contactus = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Form state
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [enquiry, setEnquiry] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
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
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Handle contact form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    // Basic validation
    if (!name || !contactEmail || !enquiry) {
      setSubmitError('Please fill out all fields');
      return;
    }

    try {
      await axios.post(`${API_URL}/contact`, {
        name,
        email: contactEmail,
        message: enquiry
      });

      // Reset form on success
      setName('');
      setContactEmail('');
      setEnquiry('');
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError('Failed to send your message. Please try again.');
    }
  };
  
  return (
    <div className="contact-us-page">
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
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">Contact us</h1>
        
        <p className="text-center max-w-2xl mx-auto mb-8 text-gray-700">
          Whether you have a support query, want to partner with us, or know more about our product,
          we're here to help!
        </p>
        
        <div className="max-w-2xl mx-auto bg-blue-100 rounded-lg p-8 shadow-md">
          <h2 className="text-xl text-center font-medium mb-4 text-gray-800">
            Drop your questions, thoughts, or feature requests here!
          </h2>
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Your message has been sent successfully!
            </div>
          )}
          
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 bg-white border border-gray-200 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full p-3 bg-white border border-gray-200 rounded-md"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>
            
            <textarea
              placeholder="Enquiry"
              className="w-full p-3 bg-white border border-gray-200 rounded-md h-32"
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
              required
            />
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-12 rounded-md transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        
        {/* Contact information */}
        <div className="max-w-2xl mx-auto mt-8 bg-blue-200 rounded-lg p-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <span className="text-sm">abc@gmail.com</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <span className="text-sm">+91 8087588637</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm">@HackCrack25</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;