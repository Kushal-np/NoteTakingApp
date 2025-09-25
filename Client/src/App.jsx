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
      <Route path="/Mynotes" element={<MyNotes />}/>
      <Route path="/CreateNotes" element={<Create />}/>
      <Route path="/EditAndControls" element={<EditAndControls />}/>
      <Route path="/RemoveNotes" element={<Remove />}/>
      <Route path="*" element={< Navigate to="/login"/>} />

    </Routes>
  )
}
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import MyNotes from './components/EditAndControls';
import Create from './components/Create';
import EditAndControls from './components/EditAndControls';
import Remove from './components/Remove';

export default App ; 