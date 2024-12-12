import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import { getProfile } from './network/api.js'
import Home from './pages/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import './App.css'
import NotFound from './pages/NotFound/NotFound.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Admin from './pages/Admin/Admin.jsx';
import Calendar from './pages/Calendar/Calendar.jsx';
import AddEvent from './pages/Calendar/AddEvent.jsx';
import Announcements from './pages/Announcement/ViewAnnouncements.jsx';
import AddOrModifyEvent from './pages/Calendar/AddEvent.jsx';
import CreateAnnouncement from './pages/Announcement/CreateAnnouncement.jsx';
import About from './pages/About/About.jsx';
 

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async () => {
    try {
      const res = await getProfile();
      setIsAdmin(res.data.isAdmin);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
      checkAdminStatus();
    }
  }, [])

  const logoutCallback = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href='/login';
  }
 
  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} logoutCallback={logoutCallback} isAdmin={isAdmin}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/announcements" element={<Announcements/>} />
          <Route path="/about" element={<About/>} />
          {isAdmin && <Route path="/addEvent" element={<AddOrModifyEvent/>} />}
          {isAdmin && <Route path="/addAnnouncement" element={<CreateAnnouncement/>} />}
          {isAdmin && <Route path="/admin" element={<Admin/>} />}
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
