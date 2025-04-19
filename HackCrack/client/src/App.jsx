import React from 'react'
import Homepage from './pages/Homepage'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className='w-full overflow-hidden'>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
    </div>
  )
}

export default App