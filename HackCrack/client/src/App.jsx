import React from 'react'
import Homepage from './pages/Homepage'
import Signin from './pages/Signin'
import Hackathons from './pages/hackathons'
import Aboutus from './pages/Aboutus'
import Contactus from './pages/Contactus'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className='w-full overflow-hidden'>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/hackathons' element={<Hackathons/>}/>
        <Route path='/aboutus' element={<Aboutus/>}/>
        <Route path='/contactus' element={<Contactus/>}/>
      </Routes>
    </div>
  )
}

export default App