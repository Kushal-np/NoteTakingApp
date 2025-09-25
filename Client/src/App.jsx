import React from 'react'
import {Routes , Route, Navigate} from 'react-router-dom';
import SignUp from './pages/SignUp';



const App= () =>{
  const token = localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="*" element={< Navigate to="/login"/>} />
    </Routes>
  )
}
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';

export default App ; 