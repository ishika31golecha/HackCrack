import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';

const Signin = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    address: '',
    college: '',
    branch: '',
    graduationYear: '',
    linkedinUrl: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // In your Signin.jsx file
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');
  
  // For debugging
  console.log("API URL:", import.meta.env.VITE_API_URL);
  
  try {
    // Use a fallback if the env variable is undefined
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    console.log("Using API URL:", apiUrl);
    
    const response = await axios.post(`${apiUrl}/register`, formData);
    
    setSuccess('Registration successful! You can now login.');
    
    // Reset form after successful submission
    setFormData({
      name: '',
      contactNo: '',
      address: '',
      college: '',
      branch: '',
      graduationYear: '',
      linkedinUrl: '',
      email: '',
      password: ''
    });
    
    setShowLogin(true);
  } catch (err) {
    console.error("Registration error:", err);
    setError(
      err.response?.data?.message || 
      'Registration failed. Please try again.'
    );
  } finally {
    setLoading(false);
  }
};

  // Handle successful login
  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate('/profile'); // Or wherever you want to redirect
  };

  return (
    <>
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSuccess={handleLoginSuccess} 
      />
      
      <div className='overflow-hidden h-screen w-full flex justify-between'>
        <div className="w-1/2 flex flex-col justify-start items-center px-10">
          <h1 className='text-4xl font-bold text-black leading-tight mt-5 mb-6'>Create Your Account</h1>

          {error && <div className="w-full max-w-md p-3 mb-4 bg-red-100 text-red-700 rounded">{error}</div>}
          {success && <div className="w-full max-w-md p-3 mb-4 bg-green-100 text-green-700 rounded">{success}</div>}

          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded-md mb-2"
              required
            />

            <input
              type="tel"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="Contact No."
              className="w-full p-2 border rounded-md mb-2"
              required
            />

            <input
              type='text'
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder='Address'
              className='w-full p-2 border rounded-md mb-2'
              required
            />

            <input
              type='text'
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder='College/University Name'
              className='w-full p-2 border rounded-md mb-2'
              required
            />

            <select 
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-gray-500 mb-2" 
              required
            >
              <option value="" disabled hidden>Branch of Study</option>
              <option value="cs" className="text-black">Computer Science</option>
              <option value="it" className="text-black">Information Technology</option>
              <option value="csai" className="text-black">Computer Science - Artificial Intelligence</option>
              <option value="csaiml" className="text-black">CS - AI & Machine Learning</option>
              <option value="aids" className="text-black">AI & Data Science</option>
              <option value="entc" className="text-black">Electronics & Telecommunication</option>
              <option value="instru" className="text-black">Instrumentation</option>
            </select>

            <select 
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-gray-500 mb-2" 
              required
            >
              <option value="" disabled hidden>Year of Graduation</option>
              <option value="2026" className="text-black">2026</option>
              <option value="2027" className="text-black">2027</option>
              <option value="2028" className="text-black">2028</option>
              <option value="2029" className="text-black">2029</option>
              <option value="2030" className="text-black">2030</option>
            </select>

            <input
              type='url'
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder='LinkedIn Link'
              className='w-full p-2 border rounded-md mb-2'
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded-md mb-2"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded-md mb-4"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className="w-1/2 bg-[url('/signin_image.jpg')] bg-cover bg-left h-screen"></div>
      </div>
    </>
  );
};

export default Signin;