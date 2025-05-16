// App.jsx with outlet
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Signin from './pages/Signin';
import Hackathons from './pages/hackathons';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div className='w-full overflow-hidden'>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/hackathons' element={<Hackathons />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/contactus' element={<Contactus />} />
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;