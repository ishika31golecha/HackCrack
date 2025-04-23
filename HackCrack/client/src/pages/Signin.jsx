import React from 'react'

const Signin = () => {
  return (
    <>
      <div className='overflow-hidden h-screen w-full flex justify-between'>
        <div className="w-1/2 flex flex-col justify-start items-center px-10">
          <h1 className='text-4xl font-bold text-black leading-tight mt-5 mb-6'>Create Your Account</h1>

          <form className="w-full max-w-md">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded-md mb-2"
              required
            />

            <input
              type="tel"
              placeholder="Contact No."
              className="w-full p-2 border rounded-md mb-2"
              required
            />

            <input
              type='text'
              placeholder='Address'
              className='w-full p-2 border rounded-md mb-2'
              required
            />

            <input
              type='text'
              placeholder='College/University Name'
              className='w-full p-2 border rounded-md mb-2'
              required
            />

            <select className="w-full p-2 border rounded-md text-gray-500 mb-2" required defaultValue="">
              <option value="" disabled hidden>Branch of Study</option>
              <option value="cs" className="text-black">Computer Science</option>
              <option value="it" className="text-black">Information Technology</option>
              <option value="csai" className="text-black">Computer Science - Artificial Intelligence</option>
              <option value="csaiml" className="text-black">CS - AI & Machine Learning</option>
              <option value="aids" className="text-black">AI & Data Science</option>
              <option value="entc" className="text-black">Electronics & Telecommunication</option>
              <option value="instru" className="text-black">Instrumentation</option>
            </select>

            <select className="w-full p-2 border rounded-md text-gray-500 mb-2" required defaultValue="">
              <option value="" disabled hidden>Year of Graduation</option>
              <option value="2026" className="text-black">2026</option>
              <option value="2027" className="text-black">2027</option>
              <option value="2028" className="text-black">2028</option>
              <option value="2029" className="text-black">2029</option>
              <option value="2030" className="text-black">2030</option>
            </select>

            <input
              type='url'
              placeholder='LinkedIn Link'
              className='w-full p-2 border rounded-md mb-2'
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md mb-2"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded-md mb-4"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="w-1/2 bg-[url('/signin_image.jpg')] bg-cover bg-left h-screen"></div>
      </div>
    </>
  )
}

export default Signin
