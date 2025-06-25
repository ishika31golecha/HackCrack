import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
    const navigate = useNavigate();
    const [hackathons, setHackathons] = useState([]);
    const [displayedHackathons, setDisplayedHackathons] = useState([]);
    const [category, setCategory] = useState('both');
    const [loading, setLoading] = useState(true);

    // API base URL
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api' || 'https://hackcrack.onrender.com';

    // Fetch hackathons based on category
    useEffect(() => {
      const fetchHackathons = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/hackathons/category/${category}`);
          console.log('API Response:', response.data);
          setHackathons(response.data);
          
          // Only show first 3 hackathons initially
          setDisplayedHackathons(response.data.slice(0, 3));
        } catch (error) {
          console.error('Error fetching hackathons:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchHackathons();
    }, [category, API_URL]);

    // Handle showing all hackathons
    const handleExploreMore = () => {
      navigate('/hackathons');
    };

    // Format date
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' });
    };

    return (
      <>
        <section className='bg-homebg bg-cover bg-no-repeat h-screen w-full overflow-hidden'>
          <div className="w-full h-full bg-white/70">
            <div className="flex items-center justify-between mt-11 px-32">
              <div className="relative max-w-lg my-1 -mt-8">
                <h1 className="text-6xl font-bold text-black leading-tight">
                  Launch<br />Your Coding <br />Adventure
                </h1>
                <p className="text-black mt-6">
                  The ultimate platform for discovering upcoming hackathons,
                  finding like-minded teammates based on skills, and gaining
                  insights from experienced developers. Whether a beginner or a
                  seasoned coder, we help you connect, collaborate, and crack the
                  code to success.
                </p>

                <div className="relative mt-6 mx-10">
                  <input type="text" placeholder="Search..." className="bg-[#ACD7FF] w-56 px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <svg className="absolute left-3 top-3 w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1016.65 16.65z" />
                  </svg>
                </div>
              </div>

              <div className="flex space-x-4">
                <img src="/image_1_3.jpeg" className="absolute -mx-60 my-14 h-80 w-56 rounded-2xl" />
                <div className='flex flex-col space-y-5'>
                  <img src="/image_1_1.jpeg" className="h-60 w-40 rounded-2xl" />
                  <img src="/image_1_2.jpg" className="h-52 w-40 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hackathons Section */}
        <section className="min-h-screen w-full">
          <div className='relative mx-9 mt-10'>
            <h1 className="text-4xl font-bold text-black leading-tight"> Top Hackathons</h1>
          </div>

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

                  <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button 
                      onClick={handleExploreMore} 
                      className="rounded-full bg-[#ACD7FF] px-3 py-2 w-36 text-sm font-medium text-black hover:bg-black hover:text-white"
                    >
                      Explore more
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Display Hackathons */}
          <div className="container mx-auto my-8 px-4">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedHackathons.length > 0 ? (
                  displayedHackathons.map((hackathon) => (
                    <div key={hackathon._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{hackathon.name}</h3>
                        <p className="text-gray-700 mb-2">Organized by: {hackathon.organization_name}</p>
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
            )}
          </div>
        </section>

        <section className="min-h-screen w-full -mt-20">
          <div className="relative h-screen w-full bg-homebg2 bg-cover bg-center">
            <div className="absolute inset-0 bg-white/30 flex items-center justify-end pr-36 -mt-52">
              <div className="flex flex-col text-left space-y-4">
                <h1 className="text-6xl font-bold text-black leading-tight">
                  Elevate Your <br />Coding Experience <br />to Next Level
                </h1>
                <p className="text-xl text-black">Your hunt for the right Teammate starts here!</p>

                <div className="relative mt-6 mx-10">
                  <input type="text" placeholder="Search..." className="bg-[#ACD7FF] w-72 px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <svg className="absolute left-3 top-3 w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1016.65 16.65z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};

export default Homepage;
