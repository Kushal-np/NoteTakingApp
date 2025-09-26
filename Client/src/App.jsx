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
      <Route path="/Notes" element={<Notes />} />
      <Route path="/CreateNotes" element={<Create />}/>
      <Route path="/Edit" element={<Edit />}/>
      <Route path="/RemoveNotes" element={<Remove />}/>
      <Route path="*" element={< Navigate to="/home"/>} />
      <Route path ="/note/:id" element={<ViewPage />} />
      <Route path="/home" element={<LandingPage/>} />
    </Routes>
  )
}
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import Create from './components/Create';
import Remove from './components/Remove';
import Edit from './components/EditAndControls';
import Notes from './components/MyNotes';
import ViewPage from './components/ViewPage';
import LandingPage from './pages/LandingPage';
import { changeFavicon } from './utils/changeFavIcon';

changeFavicon('/favicon.png')

export default App ; 