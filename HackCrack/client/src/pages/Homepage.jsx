import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Homepage = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);

  return (
    <>

        {showLogin && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md z-50" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-md mb-2"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded-md mb-4"
              />
              <div className="flex justify-between">
                <button
                  className="bg-black text-white px-4 py-2 rounded-md"
                  onClick={() => setShowLogin(false)}
                >
                  Cancel
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Log In
                </button>
              </div>
            </div>
          </div>   
        )}


      <section className='bg-homebg bg-cover bg-no-repeat h-screen w-full overflow-hidden'>
        <div className="w-full h-full bg-white/70">
        <nav className="bg-white mt-3">

            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    
                    <svg className="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    
                    <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
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
                      <a href='#' className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Home</a>
                      <a href='/aboutus' className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">About Us</a>
                      <a href='/contactus' className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Contact Us</a>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                  <a href="/signup" className="rounded-md bg-[#ACD7FF] px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white" aria-current="page">Sign Up</a>
                  <button onClick={() => setShowLogin(true)} className='rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white'>Log In</button>

                  <button type="button" className="relative rounded-full bg-black p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg className="size-6" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path  strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
                    </svg>
                  </button>
                </div>

              </div>
            </div>
        </nav>

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











    <section className="min-h-screen w-full">
      <div className='relative mx-9'>
        <h1 className="text-4xl font-bold text-black leading-tight"> Top Hackathons</h1>
      </div>

      <div className="relative mt-0">
        <nav className="bg-white w-full">
          <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="relative left-1/2 transform -translate-x-1/2 mt-3 flex space-x-9 px-5 font-semibold">
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Upcoming Hackathons</a>
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Hardware + Software</a>
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Hardware</a>
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-black font-sans hover:bg-gray-700 hover:text-white">Software</a>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <a href="/" className="rounded-full bg-[#ACD7FF] px-3 py-2 w-36 text-sm font-medium text-black hover:bg-black hover:text-white" aria-current="page">Explore more</a>

              <svg className="absolute right-3 top-5 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
    </>
  )
}

export default Homepage
